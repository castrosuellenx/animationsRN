import React, {useEffect} from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
  withSequence,
} from 'react-native-reanimated';
import {RFValue} from 'react-native-responsive-fontsize';

import heroImg from '../../assets/hero.png';

const Home: React.FC = () => {
  const titlePosition = useSharedValue(30);
  const imagePosition = useSharedValue(-30);

  useEffect(() => {
    imagePosition.value = withTiming(
      0,
      {
        duration: 500,
      },
      () => {
        titlePosition.value = withSequence(
          withTiming(-10, {
            duration: 500,
            easing: Easing.bounce,
          }),
          withTiming(10, {
            duration: 1000,
            easing: Easing.bounce,
          }),
        );
      },
    );
  }, [imagePosition, titlePosition]);

  const titleStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: titlePosition.value}],
      opacity: interpolate(
        titlePosition.value,
        [30, 0],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  const heroStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: imagePosition.value}],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#13131a" barStyle="light-content" />

      <Animated.Image source={heroImg} style={[styles.hero, heroStyle]} />

      <Animated.Text style={[styles.title, titleStyle]}>
        Bem-vindo
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#13131A',
  },

  hero: {
    width: RFValue(288),
    height: RFValue(200),
    marginBottom: RFValue(40),
  },

  title: {
    fontWeight: 'bold',
    fontSize: RFValue(32),
    color: '#fff',
  },
});

export default Home;
