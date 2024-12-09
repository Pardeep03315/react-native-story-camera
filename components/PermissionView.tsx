import { BackHandler, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const PermissionView = ({ missingPermissions, blockedPermissions, requestAllPermissions, handleBlockedPermissions }:any) => {
  
  const _onPressButton = () => 
    {       
       BackHandler.exitApp(),
       Linking.openSettings();
    }

  return (
    <View style={styles.container}>
          <Text style={styles.textStyle}>To get it work , Please go to settings and allow the necessary permissions like camera , gallery and microphone to access and record video.</Text>
          <Pressable onPress={_onPressButton} style={styles.button}>
            <Text style={styles.buttonText}>Open Settings</Text>
          </Pressable>
    </View>
  );
};

export default PermissionView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7F9995',
    paddingHorizontal: '5%',
    marginTop: 20,
  },
  textStyle: {
    fontSize: 16,
    color: 'white',
    paddingHorizontal: '15%',
    textAlign:"center",
    lineHeight:25
  },

  buttonText: {
    fontSize: 16,
    color: 'white',
    marginBottom:2
  },
});
