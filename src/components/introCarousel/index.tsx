import React, {useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
// @ts-ignore
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Colors, Fonts, Utils} from '../../styles';
import {IntroCarouselEntry} from '../../types';

type CarouselProps = {
  entries: IntroCarouselEntry[];
};


export default function IntroCarousel(props: CarouselProps) {
  const {entries} = props;
  const [activeEntry, setActiveEntry] = useState(0);

  function renderItem(item: any, index: number) {
    return (
              <View style={styles.container}>
                <View style={styles.logoContainer}>
                  <Image
                    style={styles.logoIcon}
                    source={item.img}
                  />
                </View>
                <Text style={styles.heading}>{item.heading}</Text>
                <Text style={styles.text}>{item.text}</Text>
              </View>
          );
  }

  // @ts-ignore
  return (
    <View>
      <Carousel
        data={entries}
        renderItem={({item, index}: any) => renderItem(item, index)}
        onSnapToItem={(item: number) => setActiveEntry(item)}
        sliderWidth={Utils.DEVICE_WIDTH / 1.2}
        itemWidth={Utils.DEVICE_WIDTH / 1.2}
      />
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeEntry}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dot}
        inactiveDotStyle={styles.inactiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
}

const imageSize = Utils.DEVICE_WIDTH / 2;

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  logoContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  logoIcon: {
    height: imageSize / 1,
    width: imageSize / 1,
    // backgroundColor: 'red',
  },
  paginationContainer: {},

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: Colors.main_green,
  },

  inactiveDot: {},
  heading: {
    flex:1,
    fontSize: Fonts.largest,
    textAlign: "center",
  },
  text: {
    fontSize: Fonts.normal,
    textAlign: "center",
  },
});
