import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {RFValue} from 'react-native-responsive-fontsize';

const Drag: React.FC = () => {
  const posX = useSharedValue(0);
  const posY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event: any, ctx: any) {
      ctx.posX = posX.value;
      ctx.posY = posY.value;
    },
    onActive(event, ctx) {
      posX.value = ctx.posX + event.translationX;
      posY.value = ctx.posY + event.translationY;
    },
    onEnd() {
      posX.value = withSpring(0);
      posY.value = withSpring(0);
    },
  });

  const positionStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: posX.value}, {translateY: posY.value}],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#13131a" barStyle="light-content" />

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.box, positionStyle]} />
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#13131a',
  },

  box: {
    width: RFValue(150),
    height: RFValue(150),
    borderRadius: RFValue(30),
    backgroundColor: 'peru',
  },
});

export default Drag;
