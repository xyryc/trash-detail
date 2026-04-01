import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";

const root = process.cwd();
const buildGradlePath = path.join(root, "android", "app", "build.gradle");
const keystorePropsPath = path.join(root, "android", "keystore.properties");

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const out = {};
  const raw = fs.readFileSync(filePath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

const envFile = loadDotEnv(path.join(root, ".env"));
const getVar = (k) => process.env[k] || envFile[k] || "";

const storeFile = getVar("ANDROID_KEYSTORE_FILE") || "upload-keystore.jks";
const keystorePath = path.join(root, "android", "app", storeFile);
const storePassword = getVar("ANDROID_KEYSTORE_PASSWORD");
const keyAlias = getVar("ANDROID_KEY_ALIAS") || "upload";
const keyPassword = getVar("ANDROID_KEY_PASSWORD") || storePassword;
const createKeystore = getVar("ANDROID_CREATE_KEYSTORE") === "1";
const dname = getVar("ANDROID_KEYSTORE_DNAME") || "CN=Trash Detail, OU=Engineering, O=Trash Detail, L=Dhaka, ST=Dhaka, C=BD";

if (!fs.existsSync(buildGradlePath)) {
  console.error("Missing android/app/build.gradle. Run from project root.");
  process.exit(1);
}

if (!storePassword) {
  console.error("ANDROID_KEYSTORE_PASSWORD is required.");
  console.error("Set it in .env or shell env.");
  console.error('PowerShell: $env:ANDROID_KEYSTORE_PASSWORD="your-pass"; $env:ANDROID_KEY_PASSWORD="your-pass"; npm run android:sign');
  process.exit(1);
}

let text = fs.readFileSync(buildGradlePath, "utf8");

const headerBlock = `import java.util.Properties\nimport java.io.FileInputStream\n\ndef keystorePropertiesFile = rootProject.file("keystore.properties")\ndef keystoreProperties = new Properties()\nif (keystorePropertiesFile.exists()) {\n    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))\n}\n`;

if (!text.includes('def keystorePropertiesFile = rootProject.file("keystore.properties")')) {
  const pluginLine = 'apply plugin: "com.facebook.react"';
  if (!text.includes(pluginLine)) {
    console.error("Could not find React plugin line in build.gradle");
    process.exit(1);
  }
  text = text.replace(pluginLine, `${pluginLine}\n\n${headerBlock}`);
}

const signingBlock = `    signingConfigs {\n        debug {\n            storeFile file('debug.keystore')\n            storePassword 'android'\n            keyAlias 'androiddebugkey'\n            keyPassword 'android'\n        }\n        release {\n            if (keystorePropertiesFile.exists()) {\n                storeFile file(keystoreProperties['storeFile'])\n                storePassword keystoreProperties['storePassword']\n                keyAlias keystoreProperties['keyAlias']\n                keyPassword keystoreProperties['keyPassword']\n            }\n        }\n    }`;

if (/signingConfigs\s*\{[\s\S]*?\n\s*\}\s*\n\s*buildTypes\s*\{/.test(text)) {
  text = text.replace(/signingConfigs\s*\{[\s\S]*?\n\s*\}\s*\n\s*buildTypes\s*\{/m, `${signingBlock}\n    buildTypes {`);
} else {
  console.error("Could not find signingConfigs/buildTypes section in build.gradle");
  process.exit(1);
}

if (/buildTypes\s*\{[\s\S]*?\n\s*\}\s*\n\s*packagingOptions\s*\{/.test(text)) {
  text = text.replace(/buildTypes\s*\{[\s\S]*?\n\s*\}\s*\n\s*packagingOptions\s*\{/m, (section) => {
    let out = section;

    if (/(debug\s*\{[\s\S]*?signingConfig\s+)signingConfigs\.[A-Za-z_][A-Za-z0-9_]*/m.test(out)) {
      out = out.replace(/(debug\s*\{[\s\S]*?signingConfig\s+)signingConfigs\.[A-Za-z_][A-Za-z0-9_]*/m, "$1signingConfigs.debug");
    }

    if (/(release\s*\{[\s\S]*?signingConfig\s+)signingConfigs\.[A-Za-z_][A-Za-z0-9_]*/m.test(out)) {
      out = out.replace(/(release\s*\{[\s\S]*?signingConfig\s+)signingConfigs\.[A-Za-z_][A-Za-z0-9_]*/m, "$1signingConfigs.release");
    } else {
      out = out.replace(/release\s*\{/m, "release {\n            signingConfig signingConfigs.release");
    }

    return out;
  });
} else {
  console.error("Could not find complete buildTypes block in build.gradle");
  process.exit(1);
}

fs.writeFileSync(buildGradlePath, text, "utf8");

const keystoreProps = `storeFile=${storeFile}\nstorePassword=${storePassword}\nkeyAlias=${keyAlias}\nkeyPassword=${keyPassword}\n`;
fs.writeFileSync(keystorePropsPath, keystoreProps, "utf8");

if (!fs.existsSync(keystorePath)) {
  if (createKeystore) {
    const args = [
      "-genkeypair", "-v", "-storetype", "PKCS12", "-keystore", keystorePath,
      "-alias", keyAlias, "-keyalg", "RSA", "-keysize", "2048", "-validity", "10000",
      "-storepass", storePassword, "-keypass", keyPassword, "-dname", dname,
    ];
    const res = spawnSync("keytool", args, { stdio: "inherit" });
    if (res.status !== 0) process.exit(res.status || 1);
  } else {
    console.warn(`Warning: ${keystorePath} not found.`);
    console.warn("Create it manually, or set ANDROID_CREATE_KEYSTORE=1 in .env or shell.");
  }
}

console.log("Android signing config applied.");
console.log(`Updated: ${buildGradlePath}`);
console.log(`Updated: ${keystorePropsPath}`);
