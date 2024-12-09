import {StyleSheet, View, Text, Platform} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {images} from '../utils/images';
import Container from '../components/Container';
import {_formatResponse, _formatTimer, deviceWidth} from '../utils';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {usePreferredCameraDevice} from '../hooks/usePreferredCameraDevice';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import Icon from '../components/Icon';
import SwitchView from '../components/SwitchView';
import BottomContainer from '../components/BottomContainer';
import TimerView from '../components/TimerView';
import usePermissions from '../hooks/usePermissions';
import PermissionView from '../components/PermissionView';
import { checkMultiple, PERMISSIONS, requestMultiple, RESULTS } from 'react-native-permissions';

let timer = 0;

const CameraPicker = (props: any) => {
  const cameraRef = useRef();
  const {
    containerStyle,
    onBackPress,
    backIcon,
    backIconStyle,
    flashOnIcon,
    flashOffIcon,
    flashIconStyle,
    galleryIcon,
    galleryIconStyle,
    cameraToggleIcon,
    cameraToggleIconStyle,
    cameraCaptureIcon,
    cameraCaptureIconStyle,
    videoCaptureIcon,
    videoCaptureIconStyle,
    recordVideoIcon,
    recordVideoIconStyle,
    slideUpIcon,
    slideUpIconStyle,
    timerContainer,
    timerTextStyle,
    onSelect=()=>{},
    maxRecordDuration=30,
    submitButtonStyle,
    submitButtonIcon,
    submitButtonIconStyle,
    submitButtonTextStyle,
    mediaPerPage,
    mediaSelectIcon,
    mediaSelectIconStyle,
    activeMediaType="Photo",
    mediaTypeActiveButtonStyle,
    mediaTypeButtonStyle,
    mediaTypeTextStyle,
    mediaTypeActiveTextStyle,
  } = props;


  const {
    permissionsGranted,
    missingPermissions,
    requestAllPermissions,
    blockedPermissions,
  } = usePermissions();


  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'back',
  );
  const [preferredDevice] = usePreferredCameraDevice();
  let device = useCameraDevice(cameraPosition);
  if (preferredDevice != null && preferredDevice.position === cameraPosition) {
    device = preferredDevice;
  }
  const supportsFlash = device?.hasFlash ?? false;
  const [mediaType, setMediaType] = useState(activeMediaType==="Photo"?"Photo":"Video");
  const [isActive, setActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [timerUpdate, setTimer] = useState(0); // 60 seconds
  const [timerInterval, setTimerInterval] = useState<null | ReturnType< typeof setInterval >>(null);

  const [flash, setFlash] = useState<'off' | 'on'>('off');

  useEffect(() => {
    requestAllPermissions();
    timer = 0;
    setTimeout(() => 
    {
      setActive(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (timerUpdate===maxRecordDuration) 
    {
        stopRecording()
    }
  }, [timerUpdate]);

  function toggleButton(type: any) {
    setMediaType(type);
  }

  const toggleFacing = () => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
  };

  const onSwipeUpComplete = () => {
    openPicker();
  };

  const swipeUpGesture = Gesture.Pan().onEnd(event => {
    if (event.translationY < -50) {
      runOnJS(onSwipeUpComplete)();
    }
  });

  const openPicker = () => {
    let options = {
      multiple: true,
      quality: 1,
      type: 'image',
      freeStyleCropEnabled: true,
    };
    ImageCropPicker.openPicker(options)
      .then(response => {
    
        onSubmit(response,"gallery");
      })
      .catch(function (error) {
        
      });
  };

  const onSubmit = async (data: any, type :string) => {
    let responseData = await _formatResponse(data,type)
    console.log("responseData : ",responseData);
    onSelect(responseData)
  };

  const onSave = (data: any) => {
    let arr = []
    arr.push(data)
    onSubmit(arr,"capture");
  };

  const onRecordingError = (err:any) =>
  {
      console.log("err : ",err);  
  }
  
  const capturePhoto = async () => {
    const photo = await cameraRef.current.takePhoto({
      flash: flash,
      enableAutoRedEyeReduction: true,
    });
    let arr=[]
    arr.push(photo);
     onSubmit(arr,"capture");
  };

  const startRecording = async () => {
    setIsRecording(true);
    startTimer();
    cameraRef.current.startRecording({
      quality: '360p',
      videoBitrate: 2000000,
      maxDuration: 10,
      onRecordingFinished: (video: any) => onSave(video),
      onRecordingError: (error: any) =>onRecordingError(error)
    });
  };

  const stopRecording = async () => {
    await cameraRef.current.stopRecording();
    clearInterval(timerInterval);
    setIsRecording(false);
    timer = 0;
    setTimer(timer);
  };

  const startTimer = () => {
    setTimerInterval(
      setInterval(() => {
        timer = timer + 1;
        setTimer(timer);
      }, 1000),
    );
  };

  const toggleFlash = () => {
    setFlash(flash === 'off' ? 'on' : 'off');
  };
  

  if (!permissionsGranted) {
    return (
      <PermissionView />
    );
  }
  
  return (
    <Container style={containerStyle}>
      <View style={styles.contentStyle}>
        <GestureDetector gesture={swipeUpGesture}>
          <View style={styles.contentStyle}>
            {device &&
             <Camera
              ref={cameraRef}
              key={device.id}
              isActive={isActive}
              device={device}
              video={true}
              audio={true}
              photo={true}
              style={StyleSheet.absoluteFill}/>}
            <TimerView 
              isRecording={isRecording} 
              timer={timer} 
              mediaType={mediaType}
              timerContainer={timerContainer}
              timerTextStyle={timerTextStyle}/>
            <Icon
              source={backIcon?backIcon:images.close}
              iconStyle={[styles.closeIconStyle,backIconStyle]}
              style={styles.closeIcon}
              onPress={onBackPress}/>
            {supportsFlash && mediaType === 'Photo' && (
              <Icon
                source={flash === 'off' ?flashOffIcon?flashOffIcon:images.flash_off:flashOnIcon?flashOnIcon:images.flash_on}
                iconStyle={[styles.flashIconStyle,flashIconStyle]}
                style={styles.flashIcon}
                onPress={toggleFlash}/>
            )}
          </View>
        </GestureDetector>
        <BottomContainer
          isRecording={isRecording}
          mediaType={mediaType}
          openPicker={openPicker}
          stopRecording={stopRecording}
          startRecording={startRecording}
          capturePhoto={capturePhoto}
          toggleFacing={toggleFacing}
          onSubmit={(data:any)=>onSubmit(data,"cameraroll")} 
          galleryIcon={galleryIcon}
          galleryIconStyle={galleryIconStyle}
          cameraToggleIcon={cameraToggleIcon}
          cameraToggleIconStyle={cameraToggleIconStyle}
          cameraCaptureIcon={cameraCaptureIcon}
          cameraCaptureIconStyle={cameraCaptureIconStyle}
          videoCaptureIcon={videoCaptureIcon}
          videoCaptureIconStyle={videoCaptureIconStyle}
          recordVideoIcon={recordVideoIcon}
          recordVideoIconStyle={recordVideoIconStyle}
          slideUpIcon={slideUpIcon}
          slideUpIconStyle={slideUpIconStyle}
          submitButtonIcon={submitButtonIcon}
          submitButtonIconStyle={submitButtonIconStyle}
          submitButtonStyle={submitButtonStyle}
          submitButtonTextStyle={submitButtonTextStyle}
          mediaPerPage={mediaPerPage}
          mediaSelectIcon={mediaSelectIcon}
          mediaSelectIconStyle={mediaSelectIconStyle}/>
      </View>
      <SwitchView
        isRecording={isRecording}
        mediaType={mediaType}
        activeMediaType={activeMediaType}
        mediaTypeButtonStyle={mediaTypeButtonStyle}
        mediaTypeActiveButtonStyle={mediaTypeActiveButtonStyle}
        mediaTypeTextStyle={mediaTypeTextStyle}
        mediaTypeActiveTextStyle={mediaTypeActiveTextStyle}
        toggleButton={toggleButton}/>
    </Container>
  );
};

export default CameraPicker;

export const styles = StyleSheet.create({
  contentStyle: {
    flex: 1,
    position: 'relative',
  },

  cameraStyle: {
    flex: 1,
  },

  closeIcon: {
    position: 'absolute',
    top: Platform.OS==="ios"?25:20,
    left: 20,
  },

  closeIconStyle: {
    height: 20,
    width: 20,
  },

  flashIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },

  flashIconStyle: {
    height: 25,
    width: 25,
  },

  bottomView: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
});
