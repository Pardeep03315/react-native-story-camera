import { useState, useEffect } from 'react';
import { 
  checkMultiple, 
  requestMultiple, 
  PERMISSIONS, 
  RESULTS 
} from 'react-native-permissions';
import { Platform } from 'react-native';

const usePermissions = () => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [missingPermissions, setMissingPermissions] = useState([]);
  const [blockedPermissions, setBlockedPermissions] = useState([]);

  useEffect(() => {
    // checkAllPermissions();
  }, []);

  const getRequiredPermissions = () => {
    const iosPermissions = [
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.MICROPHONE,
      PERMISSIONS.IOS.PHOTO_LIBRARY,
      // PERMISSIONS.IOS.MEDIA_LIBRARY,
    ];

    const androidBasePermissions = [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ];

    // Check Android version and add additional permissions for API 33+ (Android 14)
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        return [
          ...androidBasePermissions,
          PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
          PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
        ];
      }
      return androidBasePermissions;  // Return base permissions for versions below 33
    }

    return iosPermissions;  // Return iOS permissions if running on iOS
  };

  const checkAllPermissions = async (statuses) => {

    const requiredPermissions = getRequiredPermissions();

    // const statuses = await checkMultiple(requiredPermissions);

    // console.log("statuses : in ",statuses);
    
    const deniedPermissions = [];
    const blockedPermissions = [];

    for (const [permission, status] of Object.entries(statuses)) {
      if (status === RESULTS.DENIED) {
        deniedPermissions.push(permission);
      } else if (status === RESULTS.BLOCKED) {
        blockedPermissions.push(permission);
      }
    }

    
  setMissingPermissions(deniedPermissions);
  setBlockedPermissions(blockedPermissions);
  setPermissionsGranted(deniedPermissions.length === 0 && blockedPermissions.length === 0);
  };

  const requestAllPermissions = async () => {
    const requiredPermissions = getRequiredPermissions();
     const statuses = await requestMultiple(requiredPermissions);
    //  console.log("statuses : ",statuses);
     
    checkAllPermissions(statuses);
  };

  return {
    permissionsGranted,
    missingPermissions,
    requestAllPermissions,
    blockedPermissions,
  };
};

export default usePermissions;
