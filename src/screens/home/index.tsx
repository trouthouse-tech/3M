import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, Linking, TextInput, FlatList, Image, ListRenderItem, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts'
import Pie from 'react-native-pie';
import { AppState } from '../../store/types';
import { connect } from 'react-redux';
import { HomeStackProps } from '../../navigation/home/types';
import Header from '../../components/Header';
import { UserState } from '../../store/user/types';
import { ROUTES } from '../../util/routes';
import { ChatButton } from '../../components/Header/HeaderItems';
import { TradeState } from '../../store/trade/types';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { getQuotes } from '../../services/tradier';
import WebApi from '../../services/WebApi';
import searchIcon from '../../../assets/images/screens/searchIcon.png';
import dropDownIcon from '../../../assets/images/screens/dropdownicon.png';
import dropUpIcon from '../../../assets/images/screens/dropupicon.png';
import dotIcon from '../../../assets/images/screens/doticons.png';
import circleImage from '../../../assets/images/screens/circleimage.png';
import greenTag from '../../../assets/images/screens/greentag.png';
import purpleTag from '../../../assets/images/screens/purpletag.png';
import blueTag from '../../../assets/images/screens/bluetag.png';

type Props = HomeStackProps & {
  user: UserState;
  trade: TradeState;
};

const HomeBase = (props: Props) => {
  // console.log('home props: ', props.trade.quotes);
  const [toggleSummary, setToggleSummary] = useState(false);
  const [stockdatatoggle, setStockDataToggle] = useState(false);
  const [holdingSymbolsList, setholdingSymbolsList] = useState(false);
  const [fUnknownDropDown, setFUnknownDropDown] = useState(false);
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    if (props.user.tradierIsWaitingForApproval) {
      Alert.alert(
        'Your Tradier account has been created.',
        'The approval process may take up to 1 business day. Please note that certain 3M features will be unavailable until your account is approved.',
        [
          {
            text: 'Attempt Login',
            onPress: () => props.navigation.push(ROUTES.Tradier),
          },
          { text: 'OK', onPress: () => console.log('Success') },
        ],
      );
    }
    const expiration = props.user.tradierAccessTokenExpiration!;
    const isExpired = expiration * 1000 < Date.now();
    if (isExpired) {
      Alert.alert(
        "Let's setup your Tradier account.",
        'The 3M Club has partnered with Tradier to enable trading.',
        [
          { text: 'Do this later', onPress: () => { }, style: 'cancel' },
          { text: 'OK', onPress: () => props.navigation.push(ROUTES.Tradier) },
          // {text: 'Tradier', onPress: () => goToTradier()},
        ],
      );
    }
  }, [
    props.navigation,
    props.user.tradierAccessTokenExpiration,
    props.user.tradierIsWaitingForApproval,
  ]);
  useEffect(() => {
    // set default all open tabs
    setToggleSummary(!toggleSummary);
    setStockDataToggle(!stockdatatoggle);
    setholdingSymbolsList(!holdingSymbolsList);

    new WebApi().getQuotes('SPY,QQQ,IWM').then(response => {
      console.log("i am that fishing response from the api", response.data.quotes.quote);
      setQuotes(response.data.quotes.quote)
    })

  }, [])

  async function handleChatPressed() {
    const url = 'https://discord.gg/SKbm6tN';
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  }
  //function that renders summary data...


  const renderMarketSummaryData = () => {

    let graphArrView = [];
    for(let i = 0; i < quotes.length; i++){
      graphArrView.push(
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '33.3%' }} key ={'MarketSummary_'+i}>
          <View>
            <Text>{quotes[i].symbol}</Text>
            <Text style={{ marginTop: 5 }}>{quotes[i].last}</Text>
            <Text style={{ marginTop: 5 }}>{quotes[i].change_percentage}%</Text>
          </View>
          {/* graph goes here */}
          <LineChart
            style={{ height: 100, width: 50 }}
            data={[50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]}
            svg={{ stroke: 'rgb(0, 128, 0)' }}
          //contentInset={{ top: 20, bottom: 20 }}
          >
            {/* <Grid /> */}
          </LineChart>
        </View>
      );
    }

    return (
      // <FlatList
      //   data={DATA}
      //  renderItem={({item}:Object)=>{

      //  }}

      //   keyExtractor={item => item.id}
      // />
      <>
        {graphArrView}
      </>
    )
  }
  return (
    // <ScrollView style={{ flex: 1, }}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.screen}>

        {/* <Header
        showLogo
        showBottomBorder
        rightButton={{child: ChatButton, onclick: () => handleChatPressed()}}
      /> */}
        {/* search input area starts here */}

        <View style={{ height: 40, paddingHorizontal: 30 }}>
          <View style={{ alignItems: 'center', paddingLeft: 4, flex: 1, height: 50, flexDirection: 'row', backgroundColor: '#f8f8f8', borderRadius: 80, }}>
            <TextInput style={{ width: '90%', height: 40 }} />
            <TouchableOpacity>
              <Image source={searchIcon} />
            </TouchableOpacity>
          </View>


        </View>

        {/* starting dropdown section  for market summary*/}
        <TouchableOpacity style={[{ flexDirection: 'row', height: 45, width: '100%', backgroundColor: '#f8f8f8', marginTop: 20 }, styles.boxWithShadow]}
          onPress={() => {
            setToggleSummary(!toggleSummary)

          }}
        >
          <View style={{ flexDirection: 'row', paddingLeft: 34, alignItems: 'center', }}>
            {/* <Image source={dropDownIcon} /> */}
            {
              !toggleSummary ?
                <Image source={dropDownIcon} /> : <Image source={dropUpIcon} />
            }
            <Text style={{ paddingLeft: 7 }}>Markets Summary</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={{ flex: 1, backgroundColor: 'red', marginHorizontal: 20 }}> */}
        {
          toggleSummary ? (
            <View style={[{ flex: .23, flexDirection: 'row', backgroundColor: "#f8f8f8", marginTop: 20, paddingHorizontal: 10, marginHorizontal: 20 }, styles.boxWithShadow]}>
              {
                renderMarketSummaryData()
              }
            </View>
          ) : null
        }

        <View style={[{ flexDirection: 'row', height: 45, width: '90%', backgroundColor: '#f8f8f8', marginTop: 20, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginHorizontal: 20 }, styles.boxWithShadow]}

        >
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5, }}
              onPress={() => {
                setStockDataToggle(!stockdatatoggle);
              }}
            >
              {/* <Image source={dropDownIcon} /> */}
              {
                !stockdatatoggle ?
                  <Image source={dropDownIcon} /> : <Image source={dropUpIcon} />
              }



            </TouchableOpacity>
            <LineChart
              style={{ height: 30, width: 30 }}
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 24, 23, 22, 21, 18, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 7, 20, 5, 30, 31, 32, 33, 34, 35, 35, 37, 38, 39, 40, 50, 55, 56, 57, 58, 59, 60, 61, 2, 4, 5, 34, 34, 22, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117]}
              svg={{ stroke: 'rgb(0, 128, 0)' }}
            //contentInset={{ top: 20, bottom: 20 }}
            >
              {/* <Grid /> */}
            </LineChart>
          </View>
          <Text>$1000.01234</Text>
          {/* <TouchableOpacity
            onPress={() => { props.navigation.push("Portfolio") }}
          >
           
          </TouchableOpacity> */}


          <Menu onSelect={value => { }} >

            <MenuTrigger>
              <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={dotIcon} />
              </View>
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles} >
              <MenuOption value={1} onSelect={() => { props.navigation.push(ROUTES.PortfoliSummary) }} >
                <View style={{ borderColor: '#34A271', borderBottomWidth: 1, paddingBottom: 3 }}>
                  <Text style={{ fontSize: 15, borderBottomWidth: 1, borderBottomColor: '#34A271' }}>Portfolio Summary</Text>
                </View>
              </MenuOption>
              <MenuOption value={2} onSelect={() => { props.navigation.navigate(ROUTES.TradeHistory) }} >
                <View style={{ borderColor: '#34A271', borderBottomWidth: 1, paddingBottom: 3 }}>
                  <Text style={{ fontSize: 15, borderBottomWidth: 1, borderBottomColor: '#34A271' }}>Trade History</Text>
                </View>
              </MenuOption>
              <MenuOption value={3} onSelect={() => { }}>
                <View>
                  <Text style={{ fontSize: 15, borderBottomWidth: 1, borderBottomColor: '#34A271' }}>Orders</Text>
                </View>
              </MenuOption>
            </MenuOptions>
          </Menu>


        </View>
        {
          stockdatatoggle ? (
            <View style={{ flex: .4, marginHorizontal: 20 }}>
              {/* <Image source={circleImage} style={{ alignSelf: 'center', marginTop: 10 }} /> */}
              <View style={{ width: 200, alignItems: 'center', alignSelf: 'center', marginTop: 20 }}>
                <Pie
                  radius={85}
                  innerRadius={75}
                  sections={[
                    {
                      percentage: 100,
                      color: 'green',
                    },
                  ]}
                  backgroundColor="#ddd"
                />
                <View
                  style={styles.gauge}
                >
                  <Text
                    style={styles.gaugeText}
                  >
                    Trading
                </Text>


                  <Text style={{ paddingLeft: 3 }}>Va232321332</Text>
                </View>

              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={greenTag} />
                  <Text style={{ paddingLeft: 10 }}>CASH</Text>
                </View>
                <Text>$125.3434343</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={blueTag} />
                  <Text style={{ paddingLeft: 10 }}>STOCKS</Text>
                </View>
                <Text>$125.3434343</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={purpleTag} />
                  <Text style={{ paddingLeft: 10 }}>OPTIONS</Text>
                </View>
                <Text>$125.3434343</Text>
              </View>


            </View>

          ) : null
        }
        {/* </View> */}

        <TouchableOpacity style={[{ flexDirection: 'row', height: 45, width: '90%', backgroundColor: '#f8f8f8', marginHorizontal: 20, marginTop: 20, paddingHorizontal: 20 }, styles.boxWithShadow,]}
          onPress={() => {

            setholdingSymbolsList(!holdingSymbolsList)
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>

            {
              !holdingSymbolsList ? <Image source={dropDownIcon} /> : <Image source={dropUpIcon} />
            }

            <Text style={{ paddingLeft: 7 }}>List of Holdings Symbol,amount </Text>
          </View>
        </TouchableOpacity>

        {
          holdingSymbolsList ?
            <View style={{ marginTop: 20, marginHorizontal: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Menu onSelect={value => { }} >

                  <MenuTrigger>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={fUnknownDropDown ? dropUpIcon : dropDownIcon} />
                      <Text style={{ marginLeft: 4 }}>Short:value high to low</Text>
                    </View>
                  </MenuTrigger>
                  <MenuOptions customStyles={optionsStyles} >
                    <MenuOption value={1} onSelect={() => { }} >
                      <View style={{ borderColor: '#34A271', borderBottomWidth: 1, paddingBottom: 3 }}>
                        <Text style={{ fontSize: 15, borderBottomWidth: 1, borderBottomColor: '#34A271' }}>Value High to Low / Low to High </Text>
                      </View>
                    </MenuOption>
                    <MenuOption value={2} onSelect={() => { }} >
                      <View style={{ borderColor: '#34A271', borderBottomWidth: 1, paddingBottom: 3 }}>
                        <Text style={{ fontSize: 15, borderBottomWidth: 1, borderBottomColor: '#34A271' }}>Total Gain - High to Low / Low to High </Text>
                      </View>
                    </MenuOption>
                    <MenuOption value={3} onSelect={() => { }}>
                      <View style={{ borderColor: '#34A271', borderBottomWidth: 1, paddingBottom: 3 }}>
                        <Text style={{ fontSize: 15, borderBottomWidth: 1, borderBottomColor: '#34A271' }}>Percentage High to Low / Low to High </Text>
                      </View>
                    </MenuOption>
                    <MenuOption value={4} onSelect={() => { }}>
                      <View style={{ borderColor: '#34A271', borderBottomWidth: 1, paddingBottom: 3 }}>
                        <Text style={{ fontSize: 15, borderBottomWidth: 1, borderBottomColor: '#34A271' }}>Expiration Date - Nearest / Farthest  </Text>
                      </View>
                    </MenuOption>
                    <MenuOption value={4} onSelect={() => { }}>
                      <View >
                        <Text style={{ fontSize: 15, borderBottomWidth: 1, borderBottomColor: '#34A271' }}>Name - A-Z / Z-A </Text>
                      </View>
                    </MenuOption>
                  </MenuOptions>
                </Menu>



                <Menu onSelect={value => { }} >

                  <MenuTrigger>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={fUnknownDropDown ? dropUpIcon : dropDownIcon} />
                      <Text style={{ marginLeft: 4 }}>Time range</Text>
                    </View>
                  </MenuTrigger>
                  <MenuOptions customStyles={optionsStyles} >
                    <MenuOption value={1} onSelect={() => { }} >
                      <View style={{ borderColor: '#34A271', borderBottomWidth: 1, paddingBottom: 3 }}>
                        <Text style={{ fontSize: 15, borderBottomWidth: 1, borderBottomColor: '#34A271' }}>1 Day</Text>
                      </View>
                    </MenuOption>
                    <MenuOption value={2} onSelect={() => { }} >
                      <View style={{ borderColor: '#34A271', borderBottomWidth: 1, paddingBottom: 3 }}>
                        <Text style={{ fontSize: 15, borderBottomWidth: 1, borderBottomColor: '#34A271' }}>1 Week</Text>
                      </View>
                    </MenuOption>
                    <MenuOption value={3} onSelect={() => { }}

                    >
                      <View style={{ borderColor: '#34A271', borderBottomWidth: 1, paddingBottom: 3 }}>
                        <Text style={{ fontSize: 15, borderBottomWidth: 1, borderBottomColor: '#34A271' }}>1 Month</Text>
                      </View>
                    </MenuOption>
                    <MenuOption value={3} onSelect={() => { }}>
                      <View style={{ borderColor: '#34A271', borderBottomWidth: 1, paddingBottom: 3 }}>
                        <Text style={{ fontSize: 15, borderBottomWidth: 1, borderBottomColor: '#34A271' }}>1 Quarter</Text>
                      </View>
                    </MenuOption>
                    <MenuOption value={3} onSelect={() => { }}>
                      <View >
                        <Text style={{ fontSize: 15, borderBottomWidth: 1, borderBottomColor: '#34A271' }}>1 Year</Text>
                      </View>
                    </MenuOption>

                  </MenuOptions>
                </Menu>


              </View>


              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <View>
                  <Text>Market News</Text>
                  <Text style={{ marginTop: 10 }}>10 shares</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <Image source={dropUpIcon} />
                    <Text>15.94%</Text>
                  </View>
                  <Text>$12746.343</Text>
                </View>
              </View>

            </View> : null
        }

      </View>
    </ScrollView>
  );
};

const triggerStyles = {
  triggerText: {
    color: 'white',
  },
  triggerOuterWrapper: {
    backgroundColor: 'orange',
    padding: 5,
    flex: 1,
  },
  triggerWrapper: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  triggerTouchable: {
    underlayColor: 'darkblue',
    activeOpacity: 70,
    style: {
      flex: 1,
    },
  },
};
const optionsStyles = {
  optionsContainer: {
    backgroundColor: '#f8f8f8',
    //padding: 5,
    borderRadius: 5
  },
  // optionsWrapper: {
  //   backgroundColor: 'purple',
  // },
  optionWrapper: {
    backgroundColor: '#f8f8f8',
    margin: 5,
  },
  // optionTouchable: {
  //   underlayColor: 'gold',
  //   activeOpacity: 70,
  // },
  // optionText: {
  //   color: 'brown',
  // },
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 20,
    height: '100%',
    //backgroundColor: 'red'
  },
  txt: {
    textAlign: 'center',
    marginTop: 50,
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5
  },
  container: { alignItems: 'center', justifyContent: 'center', height: 1050 },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24,
  },
});
const triggerOuterWrapper = {
  backgroundColor: '#f8f8f8'
}

const mapStateToProps = (state: AppState) => ({
  user: state.user,
  trade: state.tradeReducer,
});

const mapDispatchToProps = () => ({});

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeBase);
