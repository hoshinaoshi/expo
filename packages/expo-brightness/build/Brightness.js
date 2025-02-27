import { UnavailabilityError } from '@unimodules/core';
import { PermissionStatus } from 'expo-modules-core';
import { Platform } from 'react-native';
import ExpoBrightness from './ExpoBrightness';
// @needsAudit
export var BrightnessMode;
(function (BrightnessMode) {
    /**
     * Means that the current brightness mode cannot be determined.
     */
    BrightnessMode[BrightnessMode["UNKNOWN"] = 0] = "UNKNOWN";
    /**
     * Mode in which the device OS will automatically adjust the screen brightness depending on the
     * ambient light.
     */
    BrightnessMode[BrightnessMode["AUTOMATIC"] = 1] = "AUTOMATIC";
    /**
     * Mode in which the screen brightness will remain constant and will not be adjusted by the OS.
     */
    BrightnessMode[BrightnessMode["MANUAL"] = 2] = "MANUAL";
})(BrightnessMode || (BrightnessMode = {}));
export { PermissionStatus };
/**
 * Returns whether the Brightness API is enabled on the current device. This does not check the app
 * permissions.
 * @return Async `boolean`, indicating whether the Brightness API is available on the current device.
 * Currently this resolves `true` on iOS and Android only.
 */
export async function isAvailableAsync() {
    return !!ExpoBrightness.getBrightnessAsync;
}
// @needsAudit
/**
 * Gets the current brightness level of the device's main screen.
 * @return A `Promise` that fulfils with a number between `0` and `1`, inclusive, representing the
 * current screen brightness.
 */
export async function getBrightnessAsync() {
    if (!ExpoBrightness.getBrightnessAsync) {
        throw new UnavailabilityError('expo-brightness', 'getBrightnessAsync');
    }
    return await ExpoBrightness.getBrightnessAsync();
}
// @needsAudit
/**
 * Sets the current screen brightness. On iOS, this setting will persist until the device is locked,
 * after which the screen brightness will revert to the user's default setting. On Android, this
 * setting only applies to the current activity; it will override the system brightness value
 * whenever your app is in the foreground.
 * @param brightnessValue A number between `0` and `1`, inclusive, representing the desired screen
 * brightness.
 * @return A `Promise` that fulfils when the brightness has been successfully set.
 */
export async function setBrightnessAsync(brightnessValue) {
    if (!ExpoBrightness.setBrightnessAsync) {
        throw new UnavailabilityError('expo-brightness', 'setBrightnessAsync');
    }
    const clampedBrightnessValue = Math.max(0, Math.min(brightnessValue, 1));
    if (isNaN(clampedBrightnessValue)) {
        throw new TypeError(`setBrightnessAsync cannot be called with ${brightnessValue}`);
    }
    return await ExpoBrightness.setBrightnessAsync(clampedBrightnessValue);
}
// @needsAudit
/**
 * __Android only.__ Gets the global system screen brightness.
 * @return A `Promise` that is resolved with a number between `0` and `1`, inclusive, representing
 * the current system screen brightness.
 */
export async function getSystemBrightnessAsync() {
    if (Platform.OS !== 'android') {
        return await getBrightnessAsync();
    }
    return await ExpoBrightness.getSystemBrightnessAsync();
}
// @needsAudit
/**
 * > __WARNING:__ This method is experimental.
 *
 * __Android only.__ Sets the global system screen brightness and changes the brightness mode to
 * `MANUAL`. Requires `SYSTEM_BRIGHTNESS` permissions.
 * @param brightnessValue A number between `0` and `1`, inclusive, representing the desired screen
 * brightness.
 * @return A `Promise` that fulfils when the brightness has been successfully set.
 */
export async function setSystemBrightnessAsync(brightnessValue) {
    const clampedBrightnessValue = Math.max(0, Math.min(brightnessValue, 1));
    if (isNaN(clampedBrightnessValue)) {
        throw new TypeError(`setSystemBrightnessAsync cannot be called with ${brightnessValue}`);
    }
    if (Platform.OS !== 'android') {
        return await setBrightnessAsync(clampedBrightnessValue);
    }
    return await ExpoBrightness.setSystemBrightnessAsync(clampedBrightnessValue);
}
// @needsAudit
/**
 * __Android only.__ Resets the brightness setting of the current activity to use the system-wide
 * brightness value rather than overriding it.
 * @return A `Promise` that fulfils when the setting has been successfully changed.
 */
export async function useSystemBrightnessAsync() {
    if (Platform.OS !== 'android') {
        return;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return await ExpoBrightness.useSystemBrightnessAsync();
}
// @needsAudit
/**
 * __Android only.__ Returns a boolean specifying whether or not the current activity is using the
 * system-wide brightness value.
 * @return A `Promise` that fulfils with `true` when the current activity is using the system-wide
 * brightness value, and `false` otherwise.
 */
export async function isUsingSystemBrightnessAsync() {
    if (Platform.OS !== 'android') {
        return false;
    }
    return await ExpoBrightness.isUsingSystemBrightnessAsync();
}
// @needsAudit
/**
 * __Android only.__ Gets the system brightness mode (e.g. whether or not the OS will automatically
 * adjust the screen brightness depending on ambient light).
 * @return A `Promise` that fulfils with a [`BrightnessMode`](#brightnessmode). Requires
 * `SYSTEM_BRIGHTNESS` permissions.
 */
export async function getSystemBrightnessModeAsync() {
    if (Platform.OS !== 'android') {
        return BrightnessMode.UNKNOWN;
    }
    return await ExpoBrightness.getSystemBrightnessModeAsync();
}
// @needsAudit
/**
 * __Android only.__ Sets the system brightness mode.
 * @param brightnessMode One of `BrightnessMode.MANUAL` or `BrightnessMode.AUTOMATIC`. The system
 * brightness mode cannot be set to `BrightnessMode.UNKNOWN`.
 */
export async function setSystemBrightnessModeAsync(brightnessMode) {
    if (Platform.OS !== 'android' || brightnessMode === BrightnessMode.UNKNOWN) {
        return;
    }
    return await ExpoBrightness.setSystemBrightnessModeAsync(brightnessMode);
}
// @needsAudit
/**
 * Checks user's permissions for accessing system brightness.
 * @return A promise that fulfils with an object of type [PermissionResponse](#permissionrespons).
 */
export async function getPermissionsAsync() {
    return ExpoBrightness.getPermissionsAsync();
}
// @needsAudit
/**
 * Asks the user to grant permissions for accessing system brightness.
 * @return A promise that fulfils with an object of type [PermissionResponse](#permissionrespons).
 */
export async function requestPermissionsAsync() {
    return ExpoBrightness.requestPermissionsAsync();
}
//# sourceMappingURL=Brightness.js.map