import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const Container = (props: any) => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={[styles.container, props.style]}>
        <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
        {props.children}
      </View>
    </GestureHandlerRootView>
  );
};
export default Container;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingBottom: '15%',
    paddingTop: '10%',
  },
});
