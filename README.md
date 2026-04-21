# Trash Detail - Smart Waste Management & Problem Reporting

Trash Detail is a comprehensive waste management application designed to streamline communication between waste collection employees, customers, and administrators. Report collection issues instantly with photo evidence and track their resolution in real-time.

**KEY FEATURES:**

🚛 **Problem Reporting & Tracking**

- Capture and report trash collection issues with your camera
- Document blocked bins, parked cars, locked gates, and access problems
- Track problem status: pending, forwarded, or cancelled
- View problem history with detailed timestamps and locations
- Attach photos and additional notes for clarity

💬 **Real-Time Communication**

- Built-in chat system for instant communication
- Separate threads for problems and support requests
- Real-time messaging with typing indicators
- Unread message notifications
- Direct communication between employees, customers, and administrators

👥 **Multi-Role Support**

- **Employees**: Report collection problems with 4-step guided process
- **Customers**: Track issues affecting your location
- **Administrators**: Manage problems, users, and system-wide operations
- **Super Admins**: Complete system oversight and user management

📸 **Smart Documentation**

- In-app camera for instant photo capture
- Image gallery access for existing photos
- Location-based problem logging
- Customer code and problem code tracking
- Detailed problem categorization

📊 **Comprehensive Management**

- View all problems by status and date
- Filter and search functionality
- Customer, employee, and admin management
- Invitation system for new users
- User profile management with edit capabilities

🔔 **Notifications & Updates**

- Push notifications for problem updates
- Real-time status changes
- Chat message alerts
- System-wide announcements

🔐 **Secure Authentication**

- Email/password login
- Social login with Google
- Password recovery system
- Verification code support
- Role-based access control

**WHO IS IT FOR?**

**Waste Collection Companies**: Streamline operations, improve communication, and resolve collection issues faster.

**Municipal Services**: Track and manage waste collection problems across neighborhoods and districts.

**Property Management**: Keep residents informed about trash collection issues and resolutions.

**Residential Communities**: Direct communication channel between residents and waste management services.

**WHY CHOOSE TRASH DETAIL?**

✓ **Instant Problem Resolution**: Report issues as they happen with photo evidence
✓ **Transparent Communication**: Everyone stays informed with real-time updates
✓ **Accountability**: Photo documentation ensures clear understanding of problems
✓ **Efficient Workflow**: Guided reporting process makes documentation quick and easy
✓ **Complete Visibility**: Track problems from report to resolution

**PROBLEM TYPES SUPPORTED:**

- Blocked dumpsters and bins
- Parked cars blocking access
- Locked gates during collection time
- Overflowing bins requiring urgent pickup
- Road construction blocking access routes
- Fire hydrant blockages
- Wrong parking locations
- Driveway obstructions

**SUPPORT FEATURES:**

- In-app support chat for technical issues
- Login and credential support
- Notification troubleshooting
- Direct connection to support team

Whether you're a waste collection employee documenting field issues, a customer tracking problem resolution, or an administrator managing operations, Trash Detail provides the tools you need for efficient waste management communication.

---

## Development Setup

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

### Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

### Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

## Play Store (Android) — Signed AAB

This repo includes `upload-keystore.jks` (upload key) and a helper script to generate a **signed** Android App Bundle (`.aab`) using Gradle.

### 1) Set signing env vars

From the project root:

```bash
export ANDROID_KEYSTORE_FILE="upload-keystore.jks"
export ANDROID_KEYSTORE_PASSWORD="***"
export ANDROID_KEY_ALIAS="***"
export ANDROID_KEY_PASSWORD="***" # optional (defaults to ANDROID_KEYSTORE_PASSWORD)
```

### 2) Build the signed AAB

```bash
npm run android:aab
```

Output:

`android/app/build/outputs/bundle/release/app-release.aab`

Note: if you specifically need to run `clean` first, some React Native New Architecture projects may fail during native clean due to missing codegen folders. You can opt-in via:

```bash
ANDROID_GRADLE_CLEAN=1 npm run android:aab
```

By default the build script also verifies signing (fails if it detects the debug keystore). To disable verification:

```bash
ANDROID_VERIFY_SIGNING=0 npm run android:aab
```

### 3) Verify keystore + AAB signature

List keystore details (fingerprints/owner):

```bash
keytool -list -v -keystore upload-keystore.jks -alias "$ANDROID_KEY_ALIAS"
```

Verify the generated AAB is signed:

```bash
jarsigner -verify -verbose -certs android/app/build/outputs/bundle/release/app-release.aab
```

You can also view the Gradle signing configuration:

```bash
npm run android:signingReport
```
