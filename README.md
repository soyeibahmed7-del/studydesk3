# Study Desk: Android app project

Name: Study Desk. App id: com.studydesk.app (change it in capacitor.config.json before publishing).
Logo: assets/ (icon and splash are generated into the Android project by step 4).

## You need
Node.js (current LTS), JDK 17 and Android Studio (with an Android SDK).

## Build steps (run inside this folder)
1. npm install
2. npm run fonts        (copies the fonts into www/fonts so the app works offline)
3. npx cap add android
4. npm run icons        (makes the launcher icon and splash screen from assets/)
5. npm run sync
6. npx cap open android, then in Android Studio: Build > Build APK(s)
   Or from the command line: cd android, then gradlew assembleDebug (Windows: gradlew.bat assembleDebug)
   The APK is at android/app/build/outputs/apk/debug/app-debug.apk

Copy the APK to your phone and open it (allow "install unknown apps" when asked).
For Google Play you need a signed release build: Build > Generate Signed Bundle / APK. Keep the keystore safe.

## Build with GitHub instead (no Android Studio needed)
Upload this folder to a PRIVATE GitHub repository (config.js holds your registration link). The workflow in .github/workflows builds the APK in the cloud. Open the Actions tab, run "Build APK", then download study-desk-apk from the finished run.

## Updating the app
Replace www/index.html with the new Study Desk file, run `npm run fonts` again only if www/fonts is missing, then `npm run sync` and rebuild.
