import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
// @ts-ignore
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Colors, Fonts, Utils} from '../../styles';
import {TextCarouselEntry} from '../../types';

type CarouselProps = {
  entries: TextCarouselEntry[];
};

export default function TextCarousel(props: CarouselProps) {
  const {entries} = props;
  const [activeEntry, setActiveEntry] = useState(0);

  function renderItem(item: TextCarouselEntry, index: number) {
    return <CarouselItem item={item} key={index} />;
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

type ItemProps = {
  item: TextCarouselEntry;
};

function CarouselItem(props: ItemProps) {
  return <Text style={styles.text}>{props.item.text}</Text>;
}

const styles = StyleSheet.create({
  paginationContainer: {},

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: Colors.blue_green,
  },

  inactiveDot: {},

  text: {
    fontSize: Fonts.large,
    alignSelf: 'center',
  },
});
