import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { _formatTimer, deviceWidth } from '../utils';

const TimerView = ({ timer , mediaType, timerContainer , timerTextStyle }:any) => {
  return mediaType ==="Video" ? (
    <View style={[styles.timerView,timerContainer]}>
      <Text style={[styles.timerText,timerTextStyle]}>{_formatTimer(timer)}</Text>
    </View>
  ) : null;
};

export default TimerView;

const styles = StyleSheet.create({
    timerView: {
        paddingVertical: deviceWidth*0.015,
        backgroundColor: '#D94E4E',
        position: 'absolute',
        top: 20,
        alignItems: 'center',
        left: deviceWidth / 2 - 30,
        borderRadius: 30,
        paddingHorizontal:deviceWidth*0.035
      },
    
      timerText: {
        color: 'white',
        fontWeight: '500',
        fontSize: deviceWidth*0.035,
      },
    
});
