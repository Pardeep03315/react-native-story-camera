import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from './Icon'
import TextButton from './TextButton'
import { deviceWidth } from '../utils'

const SwitchView = (props:any) => {

  const {
    isRecording , 
    mediaType , 
    toggleButton,
    activeMediaType,
    mediaTypeButtonStyle,
    mediaTypeActiveButtonStyle,
    mediaTypeTextStyle,
    mediaTypeActiveTextStyle
  } = props

  return (!isRecording?
    <View style={styles.commonView}>
    <TextButton 
      onPress={() => toggleButton('Video')}
      text={"Video"}
      isActive={mediaType==="Video"?true:false}
      activeTextStyle={[styles.activeButtonText,mediaTypeActiveTextStyle]}
      textStyle={[styles.buttonText,mediaTypeTextStyle]}
      style={[ styles.switchButton,  mediaType === 'Video' ?mediaTypeActiveButtonStyle?mediaTypeActiveButtonStyle:styles.selected :mediaTypeButtonStyle, ]}/>
      <TextButton 
      onPress={() => toggleButton('Photo')}
      text={"Photo"}
      isActive={mediaType==="Photo"?true:false}
      activeTextStyle={[styles.activeButtonText,mediaTypeActiveTextStyle]}
      textStyle={[styles.buttonText,mediaTypeTextStyle]}
      style={[ styles.switchButton,  mediaType === 'Photo' ?mediaTypeActiveButtonStyle?mediaTypeActiveButtonStyle:styles.selected :mediaTypeButtonStyle, ]}/>
  </View>:null
  )
}

export default SwitchView

const styles = StyleSheet.create({
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
        fontSize: deviceWidth*0.033,
        color: 'white',
        fontWeight: '500',
      },

      activeButtonText: {
        fontSize: deviceWidth*0.033,
        color: 'white',
        fontWeight: '500',
      },

      commonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
})