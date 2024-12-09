import { Image, Pressable, View, StyleSheet } from 'react-native';
import React, { useCallback } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const AnimatedIcon = React.memo(({ source, style = {}, iconStyle = {}, onPress }: any) => {
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      ...style,
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  }, [style]);

  const onPressIcon = useCallback(() => {
    rotation.value = withTiming(rotation.value + 360, { duration: 500 });
  }, [rotation]);

  return (
    <View style={style}>
      <Animated.View style={animatedStyle}>
        <Image source={source} style={iconStyle} resizeMode="contain" />
      </Animated.View>
      <Pressable onPressOut={onPressIcon} onPress={onPress} style={styles.icon} />
    </View>
  );
});

export default AnimatedIcon;

const styles = StyleSheet.create({
  icon: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 999,
  },
});
