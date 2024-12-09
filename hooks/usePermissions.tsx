import { useState, useEffect } from 'react';
import { 
  checkMultiple, 
  requestMultiple, 
  PERMISSIONS, 
  RESULTS 
} from 'react-native-permissions';
import { Alert, BackHandler, Linking, Platform } from 'react-native';

const usePermissions = () => 
{
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  const checkPermission = () => 
    {  
      if (Platform.OS === 'android') {
        checkMultiple([
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
          PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.RECORD_AUDIO,
        ]).then(statuses => {
          if (
            statuses[PERMISSIONS.ANDROID.CAMERA] !== RESULTS.GRANTED ||
            statuses[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] !== RESULTS.GRANTED ||
            statuses[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] !== RESULTS.GRANTED || 
            statuses[PERMISSIONS.ANDROID.RECORD_AUDIO] !== RESULTS.GRANTED
  
          ) {
            requestMultiple([
              PERMISSIONS.ANDROID.CAMERA,
              PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
              PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
              PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
              PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
              PERMISSIONS.ANDROID.RECORD_AUDIO
  
            ]).then(res => 
            {  
              if (res[PERMISSIONS.ANDROID.CAMERA] == RESULTS.GRANTED && res[PERMISSIONS.ANDROID.RECORD_AUDIO] == RESULTS.GRANTED &&
                (res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] == RESULTS.GRANTED || res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] == RESULTS.UNAVAILABLE || res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] == RESULTS.LIMITED) && 
                (res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] == RESULTS.GRANTED || res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] == RESULTS.UNAVAILABLE || res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] == RESULTS.LIMITED) 
              ) 
              {
                 setPermissionsGranted(true)                
              } else 
              {
                setPermissionsGranted(false) 
              }
            });
          } else 
          {
            setPermissionsGranted(true)  
          }
        });
      } else {
        // toProceed()
        checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE,
          PERMISSIONS.IOS.PHOTO_LIBRARY,]).then(statuses => 
          {
          if (statuses[PERMISSIONS.IOS.CAMERA] !== RESULTS.GRANTED || statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] !== RESULTS.GRANTED )
          {
              requestMultiple([PERMISSIONS.IOS.CAMERA,PERMISSIONS.IOS.PHOTO_LIBRARY]).then(res => 
              {
                if (res[PERMISSIONS.IOS.CAMERA] == RESULTS.GRANTED  && (res[PERMISSIONS.IOS.PHOTO_LIBRARY] == RESULTS.GRANTED || res[PERMISSIONS.IOS.PHOTO_LIBRARY] == RESULTS.LIMITED)) 
                {
                  setPermissionsGranted(true) 
                } 
                else 
                {
                   setPermissionsGranted(false) 

                }
            });
          } 
          else 
          {
            setPermissionsGranted(true) 
          }
        });
      }
    };

  function showWarning() 
  {
    Alert.alert(
      'Permissions Require!',
      "To get it work , Please go to settings and allow the necessary permissions like camera , gallery and microphone to access and record video.",
      [
        {
          text: 'Cancel',
          onPress: () => 
          {  
             setPermissionsGranted(false)                                
          },
        },
        {
          text: 'Open Settings',
          onPress: () => 
          {
            BackHandler.exitApp(),
            Linking.openSettings();
          },
        },
      ],
    );
  }  

  const requestAllPermissions = async () => {
    checkPermission()     
  };

  return {
    permissionsGranted,
    requestAllPermissions,
  };
};

export default usePermissions;
