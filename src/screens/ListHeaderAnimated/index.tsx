import React from 'react';
import {StatusBar, View, StyleSheet, Text} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {RFValue} from 'react-native-responsive-fontsize';

const ListHeaderAnimated: React.FC = () => {
  const dummyData = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event: any) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 180],
        [152, 64], // 64 é o que diz em qual tamanho a header vai ficar
        Extrapolate.CLAMP,
      ),
    };
  });

  const wrapperNameStyle = useAnimatedStyle(() => {
    return {
      marginTop: interpolate(
        scrollY.value,
        [0, 150],
        [96, 15], // 15 é o que diz em qual tamanho o marginTop vai ficar
        Extrapolate.CLAMP,
      ),

      marginLeft: interpolate(
        scrollY.value,
        [0, 150],
        [16, 65], // 65 é o que diz em qual tamanho o marginLeft vai ficar
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <View>
      <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />

      <View style={styles.leftIcon} />

      <View style={styles.rightIcon} />

      <Animated.View style={[styles.header, headerStyle]}>
        <Animated.View style={[styles.wrapperName, wrapperNameStyle]}>
          <Text style={styles.name}>Suéllen Castro</Text>
        </Animated.View>
      </Animated.View>

      <Animated.FlatList
        data={dummyData}
        renderItem={() => <Text style={styles.listItem}>Item da Lista</Text>}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: RFValue(152),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: RFValue(152),
    backgroundColor: '#6C63FF',

    position: 'absolute',
    overflow: 'hidden',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
  },

  leftIcon: {
    height: RFValue(24),
    width: RFValue(24),
    backgroundColor: 'blueviolet',

    position: 'absolute',
    left: RFValue(20),
    top: RFValue(24),
    zIndex: 2,
  },

  rightIcon: {
    height: RFValue(24),
    width: RFValue(24),
    backgroundColor: 'powderblue',

    position: 'absolute',
    right: RFValue(20),
    top: RFValue(24),
    zIndex: 2,
  },

  wrapperName: {
    marginTop: RFValue(96),
    marginLeft: RFValue(16),
  },

  name: {
    fontSize: RFValue(28),
    fontWeight: 'bold',
    color: '#FFF',
  },

  listItem: {
    padding: RFValue(20),
    fontSize: RFValue(18),
  },
});

export default ListHeaderAnimated;
