import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '../utils/images'
import MediaList from './MediaList'
import Icon from './Icon'
import AnimatedIcon from './AnimatedIcon'

const BottomContainer = (props:any) => {
  
  const {
    isRecording , 
    mediaType , 
    openPicker , 
    stopRecording , 
    capturePhoto , 
    startRecording, 
    toggleFacing , 
    onSubmit,
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
    submitButtonIcon,
    submitButtonIconStyle,
    submitButtonStyle,
    submitButtonTextStyle,
    mediaPerPage,
    mediaSelectIcon,
    mediaSelectIconStyle,
  } = props
  
  return (
    <View style={styles.bottomView}>
    {!isRecording && (
      <Pressable style={styles.arrowIcon} onPress={openPicker}>
        <Image
          source={slideUpIcon?slideUpIcon:images.drop_up}
          style={[styles.arrowIconStyle,slideUpIconStyle]}
          resizeMode="contain"
        />
      </Pressable>
    )}
    {!isRecording && 
     <MediaList 
      mediaPerPage={mediaPerPage}
      mediaSelectIcon={mediaSelectIcon}
      mediaSelectIconStyle={mediaSelectIconStyle}
      submitButtonIcon={submitButtonIcon}
      submitButtonIconStyle={submitButtonIconStyle}
      submitButtonStyle={submitButtonStyle}
      submitButtonTextStyle={submitButtonTextStyle}
      onSubmit = {onSubmit}/>}
    <View
      style={[
        styles.buttonView,
        isRecording && {justifyContent: 'center'},
      ]}>
      {!isRecording && (
        <Icon 
         source={galleryIcon?galleryIcon:images.gallery} 
         iconStyle={[styles.galleryIcon,galleryIconStyle]}  
         onPress={openPicker}/>
      )}
      {isRecording ? (
        <Icon 
         source={recordVideoIcon?recordVideoIcon:images.camera_capture} 
         iconStyle={[styles.cameraIcon,recordVideoIconStyle]}  
         onPress={stopRecording}/>
      ) : (
        mediaType==="Photo"?
        <Icon 
         source={cameraCaptureIcon?cameraCaptureIcon:images.camera_button} 
         iconStyle={[styles.cameraIcon,cameraCaptureIconStyle]}  
         onPress={capturePhoto}/>:
         <Icon 
         source={videoCaptureIcon?videoCaptureIcon:images.camera_capture} 
         iconStyle={[styles.cameraIcon,videoCaptureIconStyle]}  
         onPress={startRecording}/>
      )}
      {!isRecording && (
        <AnimatedIcon 
         source={cameraToggleIcon?cameraToggleIcon:images.camera_toggle} 
         iconStyle={[styles.galleryIcon,cameraToggleIconStyle]} 
         onPress={toggleFacing}/>
      )}
    </View>
  </View>
  )
}

export default BottomContainer

const styles = StyleSheet.create({

      bottomView: {
        bottom: 0,
        position: 'absolute',
        width: '100%',
      },
    
      arrowIcon: {
        alignSelf: 'center',
      },
    
      arrowIconStyle: {
        height: 22,
        width: 22,
        tintColor: 'white',
      },
    
      buttonView: {
        flexDirection: 'row',
        paddingVertical: '3%',
        paddingHorizontal: '5%',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    
      galleryIcon: {
        height: 25,
        width: 25,
        tintColor: 'white',
      },
    
      cameraIcon: {
        height: 60,
        width: 60,
        tintColor: 'white',
      },
    
      commonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      switchButton: {
        height: 30,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3,
        marginTop: 10,
      },
    
      selected: {
        backgroundColor: '#2E2D2C',
        borderRadius: 15,
      },
    
      buttonText: {
        fontSize: 13,
        color: 'white',
        fontWeight: '500',
      },
    
      itemView: {
        height: 65,
        width: 65,
        position: 'relative',
        marginTop: 10,
        marginRight: 5,
        backgroundColor: '#2E2D2C',
      },

      videoIcon: {
        position: 'absolute',
        height: 15,
        width: 15,
        tintColor: 'white',
        top: 0,
        zIndex: 999,
        right: 5,
      },
})