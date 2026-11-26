# LIVION

A PS2-era style open-world crime game built with **Three.js (r128)**. Play as Adam in the island city of Livonia: a 40-mission story campaign (chapter 1, missions 1–10, playable), cars and bikes, traffic with working signals, pedestrians, interiors, a phone, a world map, and saving.

## ⬇️ Download for Android

**[Download LIVION.apk](https://github.com/mostafa02235-sys/LIVION/releases/download/latest-apk/LIVION.apk)** (latest automatic build)

1. Open the link above on your Android phone (Android 7.0 or newer).
2. Open the downloaded file. If Android asks, allow your browser to **install unknown apps**.
3. Tap **Install**, then **Open**.

The app runs fully offline in landscape and full screen.

## Repository layout

| Path | What it is |
|---|---|
| `index.html` | The complete game: engine code, world, missions, UI. Open it in a browser to play the web/PC version. |
| `android/` | Android app project (`com.livion.game`): a full-screen activity that runs the game offline. |
| `android/scripts/prepare_game.py` | Packs `index.html` for the app: local three.js and fonts, plus the Android bridge. |
| `android/bridge/android.js` | Android-only additions: the back button opens/closes pause, the game pauses and mutes in the background, and the action button reads EXIT while driving. |
| `.github/workflows/build-android.yml` | Builds, checks, signs and publishes `LIVION.apk`. |

## Controls (touchscreen)

Left stick: move or steer · drag the right side: look around · **JUMP**, **RUN**, **E** (interact, enter car, **EXIT** car) · **GAS / BRAKE / HORN / RADIO** while driving · ⏸ top button or the Android back button: pause menu (save, settings) · tap the minimap: world map.

## How the build works

Each push to `main` runs **Build LIVION Android APK**:

1. installs Java 17, Android SDK platform 34 and Gradle 8.7
2. downloads three.js r128 and the game fonts into the app's assets (so the app needs no internet)
3. builds and signs the APK, then checks its package, signature and contents
4. uploads `LIVION.apk` as an Actions artifact and to the **latest-apk** release (the download link above)

Pushing a tag such as `v1.0` also creates a numbered release.

## App signing (GitHub Secrets)

No key or password is stored in this repository. To sign every build with the same key, so updates install over the old version and keep your save, add these under **Settings → Secrets and variables → Actions**:

| Secret | Value |
|---|---|
| `LIVION_KEYSTORE_BASE64` | the keystore file, base64-encoded |
| `LIVION_KEYSTORE_PASSWORD` | keystore password |
| `LIVION_KEY_ALIAS` | key alias |
| `LIVION_KEY_PASSWORD` | key password (optional if same as the keystore password) |

Until these are set, each build is signed with a temporary key. Updating then means uninstalling the previous LIVION first, which clears its save data.

## Save data

Progress and settings are stored on the device inside the app (browser `localStorage` in the web version).
