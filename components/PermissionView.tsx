import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { openSettings  } from 'react-native-permissions';

const PermissionView = ({ missingPermissions, blockedPermissions, requestAllPermissions, handleBlockedPermissions }:any) => {
  return (
    <View style={styles.container}>
      {missingPermissions.length > 0 && (
        <>
          <Text style={styles.textStyle}>The following permissions are not granted:</Text>
          {missingPermissions.map((permission:any, index:any) => (
            <Text style={styles.textStyle} key={index}>
              {permission}
            </Text>
          ))}
          <Pressable onPress={requestAllPermissions} style={styles.button}>
            <Text style={styles.textStyle}>Grant Permissions</Text>
          </Pressable>
        </>
      )}

      {blockedPermissions.length > 0 && (
        <>
          <Text style={styles.textStyle}>The following permissions are permanently blocked:</Text>
          {blockedPermissions.map((permission:any, index:any) => (
            <Text style={styles.textStyle} key={index}>
              {permission}
            </Text>
          ))}
          <Pressable onPress={openSettings} style={styles.button}>
            <Text style={styles.textStyle}>Open Settings</Text>
          </Pressable>
        </>
      )}
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
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7F9995',
    paddingHorizontal: '5%',
    marginTop: 20,
  },
  textStyle: {
    fontSize: 14,
    color: 'white',
  },
});
