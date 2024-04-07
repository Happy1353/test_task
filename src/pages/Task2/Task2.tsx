import React, { useEffect, useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const IMAGES = [
  require('../../assets/cat.jpeg'),
  require('../../assets/dog.jpeg'),
  require('../../assets/turtle.jpeg'),
  require('../../assets/elephant.jpeg'),
  require('../../assets/lion.jpeg'),
];

const ITEM_SIZE = 200;

export const Task2 = () => {
  const [currentIndex, setCurrentIndex] = useState(Math.ceil(IMAGES.length/2*-1));
  const scrollX = useSharedValue(Math.floor(IMAGES.length / 2) * ITEM_SIZE * -1);

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -scrollX.value }],
    };
  });

  //Проскролить вперед
  const handleNext = () => {
    const newIndex = currentIndex === Math.ceil(IMAGES.length / 2) - 1 ? Math.ceil(IMAGES.length/2*-1) : currentIndex + 1;
    setCurrentIndex(newIndex);
    scrollX.value = newIndex * ITEM_SIZE;
  };

  //Проскролить назад
  const handlePrev = () => {
    const newIndex = currentIndex === Math.ceil(IMAGES.length/2*-1) ? Math.floor(IMAGES.length / 2) : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollX.value = newIndex * ITEM_SIZE;
  };

  return (
    <View style={styles.container}>
        <Animated.View style={[styles.imageWrapper, imageStyle]}>
            {IMAGES.map((image, index) => (
                <View key={index} style={styles.imageContainer}>
                    <Image source={image} style={styles.image} resizeMode='cover'/>
                </View>
            ))}
        </Animated.View>

        <Text style={styles.indexText}>Index: {currentIndex+Math.ceil(IMAGES.length/2) - 1}</Text>
        <View style={styles.buttonWrapper}>
            <Button onPress={handlePrev} title="Prev" />
            <Button onPress={handleNext} title="Next" />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageWrapper: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  indexText: {
    fontSize: 20,
    marginBottom: 10,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
