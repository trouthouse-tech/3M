import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import {ClearButton} from '../../components/Header/HeaderItems';
import {Colors} from '../../styles';
import {DEVICE_WIDTH} from '../../styles/util';

const TradeBase = () => {
  const [filterText, setFilterText] = useState<string>('');

  function clearSearch() {
    console.log('clear');
  }

  return (
    <View style={styles.container}>
      <Header
        showLogo
        showBottomBorder
        rightButton={{child: ClearButton, onclick: () => clearSearch()}}
      />
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.filter}
          placeholder="John Doe..."
          placeholderTextColor="grey"
          value={filterText}
          onChangeText={(textToFilter) => {
            console.log('textToFilter: ', textToFilter);
            setFilterText(textToFilter);
          }}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.userReducer,
});

const mapDispatchToProps = () => ({});

export const Trade = connect(mapStateToProps, mapDispatchToProps)(TradeBase);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  filterContainer: {
    height: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.blue_green,
    justifyContent: 'center',
  },

  filter: {
    height: 40,
    width: DEVICE_WIDTH / 1.1,
    borderColor: Colors.light_gray,
    borderWidth: 1,
    borderRadius: 10,
    color: Colors.black,
    alignSelf: 'center',
    padding: 10,
  },
});
