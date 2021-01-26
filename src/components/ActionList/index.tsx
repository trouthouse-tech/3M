import React from 'react';

import {View, FlatList, StyleSheet} from 'react-native';

import {ActionListProps, ActionListItemProps} from './types';
import ListItem from './ListItem';
import {Utils} from '../../styles';

const ActionList: React.FC<ActionListProps> = ({items}) => {
  return (
    <View style={styles.listStyle}>
      <FlatList
        keyExtractor={(item: ActionListItemProps, index: number) =>
          index.toString()
        }
        data={items}
        renderItem={({item}: {item: ActionListItemProps}) => (
          <ListItem
            title={item.title}
            route={item.route}
            onPress={(route) => item.onPress!(route)}
          />
        )}
      />
    </View>
  );
};

export default ActionList;

const styles = StyleSheet.create({
  listStyle: {
    width: Utils.DEVICE_WIDTH / 1.1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
