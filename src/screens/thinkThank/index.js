import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Pie from 'react-native-pie';
import fireLogo from '../../../assets/images/screens/fire.png';
import arrowchart from '../../../assets/images/screens/arrow-chart.png';
import fireWhite from '../../../assets/images/screens/firewhite.png';
import arrowChartWhite from '../../../assets/images/screens/arrow-chartwhite.png';
import maskGreen from '../../../assets/images/screens/Mask.png';
import maskWhite from '../../../assets/images/screens/Maskgroup1white.png';
import safestStockGreen from '../../../assets/images/screens/Layer.png';
import safestStockWhite from '../../../assets/images/screens/layerwhite.png';
import dividentgreen from '../../../assets/images/screens/dividentgreen.png';
import whitedivident from '../../../assets/images/screens/Layer2white.png';
import rehabilitationgreen from '../../../assets/images/screens/rehabilitation.png';
import rehabilitationwhite from '../../../assets/images/screens/rehabilitationwhite.png';
import insurancegreen from '../../../assets/images/screens/insurance.png';
import insurancewhite from '../../../assets/images/screens/insurancewhite.png';
import airplanegreen from '../../../assets/images/screens/airplane-mode.png';
import airplanewhite from '../../../assets/images/screens/airplanewhite.png';
import greenbus from '../../../assets/images/screens/truck.png';
import truckwhite from '../../../assets/images/screens/truckwhite.png';
import greenswitch from '../../../assets/images/screens/maskcircle.png';
import whiteswitch from '../../../assets/images/screens/Maskgroup2white.png';
import greenStar from '../../../assets/images/screens/Capa.png';
import whiteStar from '../../../assets/images/screens/Capawhite.png';
import greenWebPage from '../../../assets/images/screens/webpage.png';
import whiteWebPage from '../../../assets/images/screens/web-pagewhite.png';
const ThinkTank = (props) => {
    const [toggleHotStockButtons, setHotStockButtons] = useState(null);
    const [toggleRetirementStoc, setRetirementStock] = useState(null);
    const [toggleHotIndustries, setToggleHotIndustries] = useState(null);
    const [togglePremiumStock, setTogglePremiumStock] = useState(null);

    return (
        <ScrollView>
            <View style={styles.screen}>
                {/* creating the box */}
                <View style={{ flex: .5, marginTop: 10, }}>
                    {/* first row */}
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={[{ width: 141, height: 138, backgroundColor: '#FFFFFF', alignSelf: 'center', borderRadius: 7, justifyContent: 'center' }, styles.boxWithShadow]}>

                            <View style={{ alignItems: 'center', alignSelf: 'center', }}>
                                <Pie
                                    radius={50}
                                    innerRadius={43}
                                    sections={[
                                        {
                                            percentage: 80,
                                            color: 'green',
                                        },
                                    ]}
                                    backgroundColor="#ddd"
                                />
                                <View
                                    style={styles.gauge}
                                >
                                    <Text

                                    >
                                        Bullish
                                        </Text>



                                </View>

                            </View>
                            <View style={{ justifyContent: 'flex-end', marginTop: 10 }}>
                                <Text style={{ alignSelf: 'center', }}>sentiment</Text>
                            </View>
                        </View>
                        <View style={[{ width: 141, height: 138, backgroundColor: '#FFFFFF', alignSelf: 'center', borderRadius: 7, justifyContent: 'center', marginLeft: 20 }, styles.boxWithShadow]}>

                            <View style={{ alignItems: 'center', alignSelf: 'center', }}>
                                <Pie
                                    radius={50}
                                    innerRadius={43}
                                    sections={[
                                        {
                                            percentage: 20,
                                            color: 'green',
                                        },
                                    ]}
                                    backgroundColor="#ddd"
                                />
                                <View
                                    style={styles.gauge}
                                >
                                    <Text

                                    >
                                        0.40
                                        </Text>



                                </View>

                            </View>
                            <View style={{ justifyContent: 'flex-end', marginTop: 10 }}>
                                <Text style={{ alignSelf: 'center', }}>put:call</Text>
                            </View>
                        </View>
                    </View>
                    {/* second row starts here */}
                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                        <View style={[{ width: 141, height: 138, backgroundColor: '#FFFFFF', alignSelf: 'center', borderRadius: 7, justifyContent: 'center' }, styles.boxWithShadow]}>

                            <View style={{ alignItems: 'center', alignSelf: 'center', }}>
                                <Pie
                                    radius={50}
                                    innerRadius={43}
                                    sections={[
                                        {
                                            percentage: 80,
                                            color: 'green',
                                        },
                                    ]}
                                    backgroundColor="#ddd"
                                />
                                <View
                                    style={styles.gauge}
                                >
                                    <Text

                                    >
                                        29%
                                        </Text>



                                </View>

                            </View>
                            <View style={{ justifyContent: 'flex-end', marginTop: 10 }}>
                                <Text style={{ alignSelf: 'center', }}>70359 Puts</Text>
                            </View>
                        </View>
                        <View style={[{ width: 141, height: 138, backgroundColor: '#FFFFFF', alignSelf: 'center', borderRadius: 7, justifyContent: 'center', marginLeft: 20 }, styles.boxWithShadow]}>

                            <View style={{ alignItems: 'center', alignSelf: 'center', }}>
                                <Pie
                                    radius={50}
                                    innerRadius={43}
                                    sections={[
                                        {
                                            percentage: 20,
                                            color: 'green',
                                        },
                                    ]}
                                    backgroundColor="#ddd"
                                />
                                <View
                                    style={styles.gauge}
                                >
                                    <Text

                                    >
                                        70%
                                        </Text>



                                </View>

                            </View>
                            <View style={{ justifyContent: 'flex-end', marginTop: 10 }}>
                                <Text style={{ alignSelf: 'center', }}>129023 calls</Text>
                            </View>
                        </View>
                    </View>




                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold' }}>Hot Stocks</Text>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>


                        <TouchableOpacity style={[{ alignItems: 'center', width: 127, height: 100, backgroundColor: toggleHotStockButtons ? '#34A271' : '#FFFFFF', borderRadius: 7, }, styles.boxWithShadow]}
                            onPress={() => {
                                setHotStockButtons(true)
                                props.navigation.navigate('SimpleTrade')
                            }
                            }
                        >
                            <Image source={toggleHotStockButtons ? fireWhite : fireLogo} style={{ marginTop: 10 }} />

                            <Text style={{ alignSelf: 'center', marginTop: 10, color: toggleHotStockButtons ? 'white' : 'black' }}>Hot Stocks</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={[{ alignItems: 'center', width: 127, height: 100, backgroundColor: toggleHotStockButtons ? '#FFFFFF' : '#34A271', borderRadius: 7, marginLeft: 34 }, styles.boxWithShadow]}
                            onPress={() => setHotStockButtons(false)}
                        >
                            <Image source={toggleHotStockButtons ? arrowchart : arrowChartWhite} style={{ marginTop: 10 }} />

                            <Text style={{ alignSelf: 'center', marginTop: 10, color: toggleHotStockButtons ? 'black' : 'white' }}>High Momentum</Text>
                            <Text style={{ alignSelf: 'center', color: toggleHotStockButtons ? 'black' : 'white' }}>Stocks</Text>

                        </TouchableOpacity>
                    </View>
                </View>
                {/* retirement stock data starts here */}
                <View style={{ marginTop: 10 }}>
                    <Text style={{ alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold' }}>Retirement Stocks</Text>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>


                        <TouchableOpacity style={[{ alignItems: 'center', width: 127, height: 100, backgroundColor: toggleRetirementStoc == 1 ? '#34A271' : '#FFFFFF', borderRadius: 7, }, styles.boxWithShadow]}
                            onPress={() => setRetirementStock(1)}

                        >
                            <Image source={toggleRetirementStoc == 1 ? maskWhite : maskGreen} style={{ marginTop: 10 }} />

                            <Text style={{ alignSelf: 'center', marginTop: 10, color: toggleRetirementStoc == 1 ? 'white' : 'black' }}>Overall Top</Text>
                            <Text style={{ color: toggleRetirementStoc == 1 ? 'white' : 'black' }}>Rated Stocks</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={[{ alignItems: 'center', width: 127, height: 100, backgroundColor: toggleRetirementStoc == 2 ? '#34A271' : '#FFFFFF', borderRadius: 7, marginLeft: 34 }, styles.boxWithShadow]}
                            onPress={() => setRetirementStock(2)}
                        >
                            <Image source={toggleRetirementStoc == 2 ? safestStockWhite : safestStockGreen} style={{ marginTop: 10 }} />

                            <Text style={{ alignSelf: 'center', marginTop: 10, color: toggleRetirementStoc == 2 ? 'white' : 'black' }}>Safest Stocks</Text>


                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[{ alignItems: 'center', width: 127, height: 100, backgroundColor: toggleRetirementStoc == 3 ? '#34A271' : '#FFFFFF', borderRadius: 7, marginTop: 20 }, styles.boxWithShadow]}
                        onPress={() => setRetirementStock(3)}
                    >
                        <Image source={toggleRetirementStoc == 3 ? whitedivident : dividentgreen} style={{ marginTop: 10 }} />

                        <Text style={{ alignSelf: 'center', marginTop: 10, color: toggleRetirementStoc == 3 ? 'white' : 'black' }}>Top Dividend
</Text>
                        <Text style={{ alignSelf: 'center', color: 'black', color: toggleRetirementStoc == 3 ? 'white' : 'black' }}>Stocks</Text>

                    </TouchableOpacity>
                </View>



                {/* hot industries start here */}
                <View style={{ marginTop: 10 }}>
                    <Text style={{ alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold' }}>Hot Industries</Text>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>


                        <TouchableOpacity style={[{ alignItems: 'center', width: 127, height: 100, backgroundColor: toggleHotIndustries == 1 ? '#34A271' : '#FFFFFF', borderRadius: 7, }, styles.boxWithShadow]}
                            onPress={() => setToggleHotIndustries(1)}

                        >
                            <Image source={toggleHotIndustries == 1 ? rehabilitationwhite : rehabilitationgreen} style={{ marginTop: 10 }} />

                            <Text style={{ alignSelf: 'center', marginTop: 10, color: toggleHotIndustries == 1 ? 'white' : 'black' }}>Healthcare</Text>
                            <Text style={{ color: toggleHotIndustries == 1 ? 'white' : 'black' }}>HMO</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={[{ alignItems: 'center', width: 127, height: 100, backgroundColor: toggleHotIndustries == 2 ? '#34A271' : '#FFFFFF', borderRadius: 7, marginLeft: 34 }, styles.boxWithShadow]}
                            onPress={() => setToggleHotIndustries(2)}
                        >
                            <Image source={toggleHotIndustries == 2 ? insurancewhite : insurancegreen} style={{ marginTop: 10 }} />

                            <Text style={{ alignSelf: 'center', marginTop: 10, color: toggleHotIndustries == 2 ? 'white' : 'black' }}>Insurance</Text>
                            <Text style={{ alignSelf: 'center', color: toggleHotIndustries == 2 ? 'white' : 'black' }}>Acc/Health</Text>


                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>


                        <TouchableOpacity style={[{ alignItems: 'center', width: 127, height: 100, backgroundColor: toggleHotIndustries == 3 ? '#34A271' : '#FFFFFF', borderRadius: 7, }, styles.boxWithShadow]}
                            onPress={() => setToggleHotIndustries(3)}

                        >
                            <Image source={toggleHotIndustries == 3 ? airplanewhite : airplanegreen} style={{ marginTop: 10 }} />

                            <Text style={{ alignSelf: 'center', marginTop: 10, color: toggleHotIndustries == 3 ? 'white' : 'black' }}>Aerospace</Text>
                            <Text style={{ color: toggleHotIndustries == 3 ? 'white' : 'black' }}> &Defense</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={[{ alignItems: 'center', width: 127, height: 100, backgroundColor: toggleHotIndustries == 4 ? '#34A271' : '#FFFFFF', borderRadius: 7, marginLeft: 34 }, styles.boxWithShadow]}
                            onPress={() => setToggleHotIndustries(4)}
                        >
                            <Image source={toggleHotIndustries == 4 ? truckwhite : greenbus} style={{ marginTop: 10 }} />

                            <Text style={{ alignSelf: 'center', marginTop: 10, color: toggleHotIndustries == 4 ? 'white' : 'black' }}>Auto & Truck</Text>
                            <Text style={{ alignSelf: 'center', color: toggleHotIndustries == 4 ? 'white' : 'black' }}>OEM</Text>


                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>


                        <TouchableOpacity style={[{ alignItems: 'center', width: 127, height: 100, backgroundColor: toggleHotIndustries == 5 ? '#34A271' : '#FFFFFF', borderRadius: 7, }, styles.boxWithShadow]}
                            onPress={() => setToggleHotIndustries(5)}

                        >
                            <Image source={toggleHotIndustries == 5 ? whiteswitch : greenswitch} style={{ marginTop: 10 }} />

                            <Text style={{ alignSelf: 'center', marginTop: 10, color: toggleHotIndustries == 5 ? 'white' : 'black' }}>Electrical</Text>
                            <Text style={{ color: toggleHotIndustries == 5 ? 'white' : 'black' }}>connectors</Text>
                        </TouchableOpacity>



                    </View>

                </View>
                {/* premiem stock starts here */}

                <View style={{ marginTop: 5 }}>
                    <Text style={{ alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold' }}>Premium Stock Pick Ideas</Text>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>


                        <TouchableOpacity style={[{ alignItems: 'center', width: 127, height: 100, backgroundColor: togglePremiumStock == 1 ? '#34A271' : '#FFFFFF', borderRadius: 7, }, styles.boxWithShadow]}

                            onPress={() => setTogglePremiumStock(1)}

                        >
                            <Image source={togglePremiumStock == 1 ? whiteStar : greenStar} style={{ marginTop: 10 }} />

                            <Text style={{ alignSelf: 'center', marginTop: 10, color: togglePremiumStock == 1 ? 'white' : 'black' }}>Premium</Text>
                            <Text style={{ alignSelf: 'center', color: togglePremiumStock == 1 ? 'white' : 'black' }}>WatchLists</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={[{ alignItems: 'center', width: 127, height: 100, backgroundColor: togglePremiumStock == 2 ? '#34A271' : '#FFFFFF', borderRadius: 7, marginLeft: 34 }, styles.boxWithShadow]}
                            onPress={() => setTogglePremiumStock(2)}
                        >
                            <Image source={togglePremiumStock == 2 ? whiteWebPage : greenWebPage} style={{ marginTop: 10 }} />

                            <Text style={{ alignSelf: 'center', marginTop: 10, color: togglePremiumStock == 2 ? 'white' : 'black' }}>Featured</Text>
                            <Text style={{ alignSelf: 'center', color: togglePremiumStock == 2 ? 'white' : 'black' }}>Screens</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        //backgroundColor: 'red'
        alignItems: 'center'
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5
    },
    gauge: {
        position: 'absolute',
        width: 80,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',

    },
    gaugeText: {
        backgroundColor: 'transparent',
        color: '#000',
        fontSize: 24,
    },
})
export default ThinkTank;