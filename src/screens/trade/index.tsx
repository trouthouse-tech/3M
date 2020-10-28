import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import {ClearButton} from '../../components/Header/HeaderItems';
import {Colors, Fonts} from '../../styles';
import {DEVICE_WIDTH} from '../../styles/util';
import {Buttons} from 'golfpro-rn-components';
import {TradeStackProps} from '../../navigation/trade/types';
import {UserState} from '../../store/user/types';
import {RecentlyViewedCompany} from '../../model';
import store from '../../store';
import {updateRecentlyViewedSymbols} from '../../store/user/actions';
import {
  getExpirationDates,
  getOptionChain,
  getQuotes,
} from '../../services/tradier';
import {FindOptionChainResponse, GetQuoteResponse} from '../../model';
import {ROUTES} from '../../util/routes';
import {
  addExpirationDates,
  addOptions,
  addQuote,
  resetOptions,
} from '../../store/trade/actions';
import {updateInvestorDocument} from '../../services/investor';
import {LoadingScreen} from '../../components/ActivityIndicator';

type Props = TradeStackProps & {
  user: UserState;
};

const TradeBase = (props: Props) => {
  const [filterText, setFilterText] = useState<string>('');
  const [recentlyViewedSymbols] = useState<RecentlyViewedCompany[]>(
    props.user.recentlyViewed!,
  );
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  const recentlyViewedComponents = recentlyViewedSymbols.map((company) => (
    <SymbolRow
      company={company}
      key={company.symbol}
      onPress={() => searchForRecentlyViewed(company.symbol)}
    />
  ));

  function clearSearch() {
    setFilterText('');
  }

  async function searchForRecentlyViewed(symbol: string) {
    await getOptions(symbol);
  }

  async function searchForFilterText() {
    if (!filterText) {
      notifyUserToAddCompanyToSearch();
      return;
    }

    await getOptions(filterText);
  }

  /**
   * Find options for the given symbol
   * @param symbol Used to search for options
   */
  async function getOptions(symbol: string) {
    store.dispatch(resetOptions());
    setShowActivityIndicator(true);

    const token = props.user.tradierAccessToken!;
    const dates = await getExpirationDates(symbol, token);
    if (!dates) {
      notifyUserThatOptionsWereNotFound();
    }
    store.dispatch(addExpirationDates(dates));

    dates.map((expirationDate: string) => {
      getOptionChain(symbol, expirationDate, token).then(
        (response: FindOptionChainResponse) => {
          const {options} = response;
          if (options !== null) {
            // Options found
            store.dispatch(addOptions(options.option));
          }
        },
      );
    });

    /**
     * Retrieve information about a given symbol's stock
     */
    await getQuotes(symbol, token).then((quotes: GetQuoteResponse) => {
      const {quote} = quotes.quotes;
      // console.log('quote: ', quote);
      store.dispatch(addQuote(quote));
      // Update store
      updateRecentlyViewed({
        symbol: quote.symbol,
        name: quote.description,
      });
      setShowActivityIndicator(false);
      props.navigation.push(ROUTES.TradeForm, {symbol: quote.symbol});
    });

    // if (optionsFound) {
    // } else {
    //   notifyUserThatOptionsWereNotFound();
    // }
  }

  /**
   * Add a symbol/name pair to user's most recently viewed symbols
   * @param symbol - Company recently searched
   */
  function updateRecentlyViewed(symbol: RecentlyViewedCompany) {
    // If it already exists within the user's recently viewed then don't add
    if (props.user.recentlyViewed!.some((o) => o.symbol === symbol.symbol)) {
      return;
    } else {
      updateInvestorDocument(props.user.email!, {
        recentlyViewed: [...props.user.recentlyViewed!, symbol],
      });
      store.dispatch(updateRecentlyViewedSymbols(symbol));
    }
  }

  function notifyUserToAddCompanyToSearch() {
    Alert.alert("Please specify a company's symbol before searching", '', [
      {text: 'OK', onPress: () => {}},
    ]);
  }

  function notifyUserThatOptionsWereNotFound() {
    setShowActivityIndicator(false);
    Alert.alert('No options found for given symbol', '', [
      {text: 'OK', onPress: () => {}},
    ]);
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
          placeholder="Search company symbol"
          placeholderTextColor="grey"
          value={filterText}
          onChangeText={(textToFilter) => setFilterText(textToFilter)}
          onSubmitEditing={() => searchForFilterText()}
        />
        <Buttons.TextButton
          text="Search"
          textStyle={styles.searchText}
          buttonStyle={styles.searchButton}
          onPress={() => searchForFilterText()}
        />
      </View>
      <View style={styles.main}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>RECENTLY VIEWED</Text>
        </View>
        <ScrollView style={styles.rows}>{recentlyViewedComponents}</ScrollView>
      </View>
      {showActivityIndicator && <LoadingScreen />}
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});
const mapDispatchToProps = () => ({});
export const Trade = connect(mapStateToProps, mapDispatchToProps)(TradeBase);

type SymbolRowProps = {
  company: RecentlyViewedCompany;
  onPress(): void;
};

export function SymbolRow(props: SymbolRowProps) {
  return (
    <TouchableOpacity
      style={styles.row}
      key={props.company.symbol}
      onPress={() => props.onPress()}>
      <View style={styles.symbolContainer}>
        <Text style={styles.symbol}>{props.company.symbol}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {props.company.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  filterContainer: {
    height: 75,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.blue_green,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },

  filter: {
    height: 40,
    width: DEVICE_WIDTH / 1.4,
    borderColor: Colors.light_gray,
    borderWidth: 1,
    borderRadius: 10,
    color: Colors.black,
    alignSelf: 'center',
    padding: 10,
  },

  searchButton: {
    backgroundColor: Colors.main_green,
    width: 75,
    height: 40,
    alignSelf: 'center',
    borderRadius: 10,
  },

  searchText: {
    fontSize: Fonts.normal,
    color: Colors.white,
  },

  rows: {},

  row: {
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
  },

  titleContainer: {
    paddingVertical: 15,
    borderBottomWidth: 0.5,
  },

  title: {
    fontSize: Fonts.normal,
    alignSelf: 'flex-start',
    color: Colors.gray,
  },

  main: {
    flex: 1,
    marginHorizontal: 12,
  },

  company: {
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
  },

  symbolContainer: {
    flexDirection: 'row',
  },

  symbol: {
    fontSize: Fonts.large,
    fontWeight: 'bold',
  },

  name: {
    fontSize: Fonts.large,
    paddingLeft: 15,
  },
});
