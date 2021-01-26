import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, Linking, TextInput, FlatList, Image, ListRenderItem, ScrollView, Dimensions } from 'react-native';
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
import { TouchableOpacity } from 'react-native-gesture-handler';
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
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  const renderMarketSummaryView = () => {

  }
  const renderMarketSummaryData = () => {
    return (
      // <FlatList
      //   data={DATA}
      //  renderItem={({item}:Object)=>{

      //  }}

      //   keyExtractor={item => item.id}
      // />
      <>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Text>SPY</Text>
            <Text style={{ marginTop: 5 }}>$287.75</Text>
            <Text style={{ marginTop: 5 }}>0.16%</Text>
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Text>SPY</Text>
            <Text style={{ marginTop: 5 }}>$287.75</Text>
            <Text style={{ marginTop: 5 }}>0.16%</Text>
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Text>SPY</Text>
            <Text style={{ marginTop: 5 }}>$287.75</Text>
            <Text style={{ marginTop: 5 }}>0.16%</Text>
          </View>
          {/* graph goes here */}
          <LineChart
            style={{ height: 100, width: 50 }}
            data={[10, 40, 95, 8, 100, 85, 91, 35, 53, -53, 24, 50, -20, -80]}
            svg={{ stroke: 'rgb(0, 128, 0)' }}
          //contentInset={{ top: 20, bottom: 20 }}
          >
            {/* <Grid /> */}
          </LineChart>
        </View>
      </>
    )
  }
  return (
    <ScrollView>
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
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }}
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
          <Text>$1000.01234</Text>
          <TouchableOpacity
            onPress={() => { props.navigation.push("Portfolio") }}
          >
            <Image source={dotIcon} />
          </TouchableOpacity>

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
            <View style={{ marginTop: 20 }}>

              <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 20
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

const mapStateToProps = (state: AppState) => ({
  user: state.user,
  trade: state.tradeReducer,
});

const mapDispatchToProps = () => ({});

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeBase);
