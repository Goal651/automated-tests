/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/jest.config.js'
    },
    rootCollectionPeriod: 10000,
  },
  apps: {
    'android.debug': {
      type: 'android.apk',
      // The native path where Expo outputs your compiled development APK
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
    }
  },
  devices: {
    'emulator': {
      type: 'android.attached',
      device: {
        adbName: 'emulator-5554'
      }
    }
  },
  configurations: {
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug'
    }
  }
};