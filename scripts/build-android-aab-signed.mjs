import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";

const root = process.cwd();
const isWindows = process.platform === "win32";

function ensureAndroidReleaseSigningConfigured() {
  const buildGradlePath = path.join(root, "android", "app", "build.gradle");
  if (!fs.existsSync(buildGradlePath)) {
    console.error(`ERROR: Missing ${buildGradlePath}`);
    process.exit(1);
  }

  let text = fs.readFileSync(buildGradlePath, "utf8");

  const headerBlock = `import java.util.Properties\nimport java.io.FileInputStream\n\ndef keystorePropertiesFile = rootProject.file("keystore.properties")\ndef keystoreProperties = new Properties()\nif (keystorePropertiesFile.exists()) {\n    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))\n}\n\n`;

  if (!text.includes('def keystorePropertiesFile = rootProject.file("keystore.properties")')) {
    const pluginLine = 'apply plugin: "com.facebook.react"';
    const idx = text.indexOf(pluginLine);
    if (idx === -1) {
      console.error('ERROR: Could not find `apply plugin: "com.facebook.react"` in android/app/build.gradle');
      process.exit(1);
    }
    text = text.replace(pluginLine, `${pluginLine}\n\n${headerBlock.trimEnd()}`);
  }

  const signingBlock = `    signingConfigs {\n        debug {\n            storeFile file('debug.keystore')\n            storePassword 'android'\n            keyAlias 'androiddebugkey'\n            keyPassword 'android'\n        }\n        release {\n            if (!keystorePropertiesFile.exists()) {\n                throw new GradleException(\"Missing android/keystore.properties. Run: npm run android:aab\")\n            }\n            storeFile file(keystoreProperties['storeFile'])\n            storePassword keystoreProperties['storePassword']\n            keyAlias keystoreProperties['keyAlias']\n            keyPassword keystoreProperties['keyPassword']\n        }\n    }`;

  if (/signingConfigs\s*\{[\s\S]*?\n\s*\}\s*\n\s*buildTypes\s*\{/.test(text)) {
    text = text.replace(
      /signingConfigs\s*\{[\s\S]*?\n\s*\}\s*\n\s*buildTypes\s*\{/m,
      `${signingBlock}\n    buildTypes {`
    );
  } else {
    console.error("ERROR: Could not find signingConfigs/buildTypes block in android/app/build.gradle");
    process.exit(1);
  }

  // Ensure build types reference correct signing configs.
  if (/buildTypes\s*\{[\s\S]*?\n\s*\}\s*\n\s*packagingOptions\s*\{/.test(text)) {
    text = text.replace(
      /buildTypes\s*\{[\s\S]*?\n\s*\}\s*\n\s*packagingOptions\s*\{/m,
      (section) => {
        let out = section;

        // debug signingConfig -> debug
        if (/(debug\s*\{[\s\S]*?signingConfig\s+)signingConfigs\.[A-Za-z_][A-Za-z0-9_]*/m.test(out)) {
          out = out.replace(
            /(debug\s*\{[\s\S]*?signingConfig\s+)signingConfigs\.[A-Za-z_][A-Za-z0-9_]*/m,
            "$1signingConfigs.debug"
          );
        } else {
          out = out.replace(/debug\s*\{/m, "debug {\n            signingConfig signingConfigs.debug");
        }

        // release signingConfig -> release
        if (/(release\s*\{[\s\S]*?signingConfig\s+)signingConfigs\.[A-Za-z_][A-Za-z0-9_]*/m.test(out)) {
          out = out.replace(
            /(release\s*\{[\s\S]*?signingConfig\s+)signingConfigs\.[A-Za-z_][A-Za-z0-9_]*/m,
            "$1signingConfigs.release"
          );
        } else {
          out = out.replace(/release\s*\{/m, "release {\n            signingConfig signingConfigs.release");
        }

        return out;
      }
    );
  } else {
    console.error("ERROR: Could not find buildTypes/packagingOptions block in android/app/build.gradle");
    process.exit(1);
  }

  fs.writeFileSync(buildGradlePath, text, "utf8");
}

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
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

const envFile = loadDotEnv(path.join(root, ".env"));
const getVar = (k) => process.env[k] || envFile[k] || "";

const keystoreFile = getVar("ANDROID_KEYSTORE_FILE") || "upload-keystore.jks";
const keystorePath = path.join(root, keystoreFile);
const storePassword = getVar("ANDROID_KEYSTORE_PASSWORD");
const keyAlias = getVar("ANDROID_KEY_ALIAS");
const keyPassword = getVar("ANDROID_KEY_PASSWORD") || storePassword;
const verify = (getVar("ANDROID_VERIFY_SIGNING") || "1").toLowerCase() !== "0";

if (!fs.existsSync(keystorePath)) {
  console.error(`ERROR: Keystore not found: ${keystorePath}`);
  process.exit(1);
}

if (!storePassword) {
  console.error("ERROR: ANDROID_KEYSTORE_PASSWORD is required.");
  process.exit(1);
}

if (!keyAlias) {
  console.error("ERROR: ANDROID_KEY_ALIAS is required.");
  console.error(`Tip: keytool -list -keystore "${keystoreFile}"`);
  process.exit(1);
}

const keystorePropsPath = path.join(root, "android", "keystore.properties");

// IMPORTANT: android/app/build.gradle resolves storeFile relative to the android/app module.
// android/app/../../upload-keystore.jks -> <repo>/upload-keystore.jks
const keystoreProps = `storeFile=../../${keystoreFile}\nstorePassword=${storePassword}\nkeyAlias=${keyAlias}\nkeyPassword=${keyPassword}\n`;
fs.writeFileSync(keystorePropsPath, keystoreProps, "utf8");
console.log(`Wrote: ${keystorePropsPath}`);

const androidDir = path.join(root, "android");
const gradlew = isWindows ? "gradlew.bat" : "./gradlew";

const shouldClean = (getVar("ANDROID_GRADLE_CLEAN") || "").toLowerCase() === "1";
const gradleArgs = shouldClean ? ["clean", ":app:bundleRelease"] : [":app:bundleRelease"];

const run = (cmd, args, opts = {}) => {
  const res = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: isWindows,
    ...opts,
  });
  if ((res.status ?? 1) !== 0) process.exit(res.status ?? 1);
  return res;
};

// `expo prebuild --clean` can regenerate android/app/build.gradle and revert release signing to debug.
// Ensure release signing is configured before building.
ensureAndroidReleaseSigningConfigured();

run(gradlew, gradleArgs, { cwd: androidDir });

const aabPath = path.join(
  root,
  "android",
  "app",
  "build",
  "outputs",
  "bundle",
  "release",
  "app-release.aab"
);

if (!fs.existsSync(aabPath)) {
  console.error(`ERROR: Expected AAB not found: ${aabPath}`);
  process.exit(1);
}

console.log(`\nAAB built: ${aabPath}`);

if (verify) {
  console.log("\nVerifying signing (Gradle signingReport)...");
  const signing = spawnSync(gradlew, [":app:signingReport"], {
    cwd: androidDir,
    encoding: "utf8",
    shell: isWindows,
  });
  const signingOut = `${signing.stdout || ""}\n${signing.stderr || ""}`;
  if ((signing.status ?? 1) !== 0) {
    console.error(signingOut);
    process.exit(signing.status ?? 1);
  }

  const releaseBlockMatch = signingOut.match(
    /Variant:\s*release[\s\S]*?(?=Variant:|\Z)/i
  );
  if (!releaseBlockMatch) {
    console.error("ERROR: Could not find 'Variant: release' in signingReport output.");
    process.exit(1);
  }

  const releaseBlock = releaseBlockMatch[0];
  if (/CN=Android Debug/i.test(releaseBlock) || /debug\.keystore/i.test(releaseBlock)) {
    console.error("ERROR: Release variant appears to be using debug signing.");
    console.error(releaseBlock);
    process.exit(1);
  }
  if (!releaseBlock.includes(keyAlias)) {
    console.error(`ERROR: Release signingReport did not include expected alias '${keyAlias}'.`);
    console.error(releaseBlock);
    process.exit(1);
  }
  if (!releaseBlock.toLowerCase().includes(path.basename(keystoreFile).toLowerCase())) {
    console.error(
      `ERROR: Release signingReport did not reference expected keystore file '${path.basename(
        keystoreFile
      )}'.`
    );
    console.error(releaseBlock);
    process.exit(1);
  }

  console.log("OK: Gradle release signing looks correct.");

  console.log("\nVerifying AAB certificate (keytool)...");
  const keytool = spawnSync("keytool", ["-printcert", "-jarfile", aabPath], {
    encoding: "utf8",
    shell: isWindows,
  });
  const keytoolOut = `${keytool.stdout || ""}\n${keytool.stderr || ""}`.trim();
  if ((keytool.status ?? 1) !== 0) {
    console.error("ERROR: keytool failed. Ensure JDK is installed and 'keytool' is on PATH.");
    console.error(keytoolOut);
    process.exit(keytool.status ?? 1);
  }
  if (/Android Debug/i.test(keytoolOut)) {
    console.error("ERROR: AAB certificate looks like Android Debug.");
    console.error(keytoolOut);
    process.exit(1);
  }
  console.log("OK: AAB certificate is not Android Debug.");
}

process.exit(0);
