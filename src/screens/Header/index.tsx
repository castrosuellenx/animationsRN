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

const Header: React.FC = () => {
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
        [300, 120], // 120 é o que diz em qual tamanho a header vai ficar
        Extrapolate.CLAMP,
      ),
    };
  });

  const avatarStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [100, 150],
        [1, 0], // 120 é o que diz em qual tamanho a header vai ficar
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <View>
      <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />

      <Animated.View style={[styles.header, headerStyle]}>
        <Animated.Image
          style={[styles.avatar, avatarStyle]}
          source={{uri: 'https://github.com/castrosuellenx.png'}}
        />

        <Text style={styles.name}>Suéllen Castro</Text>
      </Animated.View>

      <Animated.FlatList
        data={dummyData}
        renderItem={() => <Text style={styles.listItem}>Item da Lista</Text>}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: RFValue(300),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: RFValue(300),
    backgroundColor: '#6C63FF',
    paddingVertical: RFValue(30),
    justifyContent: 'flex-end',
    alignItems: 'center',

    position: 'absolute',
    overflow: 'hidden',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
  },

  avatar: {
    height: RFValue(140),
    width: RFValue(140),
    borderRadius: RFValue(70),
    backgroundColor: 'rgba(0,0,0,0.2)',
  },

  name: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    marginTop: RFValue(16),
    color: '#FFF',
  },

  listItem: {
    padding: RFValue(20),
    fontSize: RFValue(18),
  },
});

export default Header;
