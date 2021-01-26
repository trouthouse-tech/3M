import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import simpleImage from '../../../assets/images/screens/simpleimage.png';
import forwardIcon from '../../../assets/images/screens/forwardicon.png';
import nextButton from '../../../assets/images/screens/nextbutton.png';
import upArrow from '../../../assets/images/screens/uparrowicon.png';
import downArrow from '../../../assets/images/screens/downarrowicon.png';
const simpleTrade = (props) => {
    return (
        <View style={styles.screen}>
            {/* upper  header part */}
            <View style={[{ flex: .1, flexDirection: 'row', height: 45, backgroundColor: 'white', marginTop: 20, }, styles.boxWithShadow]}

            >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={simpleImage} />
                        <Text style={{ paddingLeft: 20 }}>Starbucks</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginRight: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', fontSize: 14 }}>$87.87</Text>
                            <Text style={{ color: '#34A371', fontSize: 10 }}>-3.20%</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={forwardIcon} style={{ paddingLeft: 4 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* lower card part */}
            <View style={[{ flex: 1, marginBottom: 15, marginHorizontal: 20, marginTop: 25, backgroundColor: 'white', borderRadius: 10 }, styles.boxWithShadow]}>
                <View style={{ width: 48, height: 4, backgroundColor: '#CFD0D4', alignSelf: 'center', marginTop: 30, borderRadius: 4 }}>

                </View>
                <View style={{ alignSelf: 'center', marginTop: 15 }}>
                    <Text style={{ fontSize: 20, alignSelf: 'center' }}>Select Trade</Text>
                    <Text style={{ color: '#636363' }}> will the close price be be over $87.00 or</Text>
                    <Text style={{ alignSelf: 'center', marginTop: 3, color: '#636363' }}>Under $87.50 on Oct 30?</Text>

                </View>
                <View style={{ flex: 1, alignSelf: 'center', marginTop: 15 }}>
                    <FlatList
                        data={[1, 2]}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={[{ width: 305, height: 141, backgroundColor: 'white', padding: 20, justifyContent: 'space-between' }, styles.cardWithShadow]}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={upArrow} />
                                        <Text style={{ color: '#636363' }}>Over $87.00</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: '#636363' }}>Max Return</Text>
                                        <Text style={{ color: '#636363' }}>52%</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: '#636363' }}>Win Probability</Text>
                                        <Text style={{ color: '#636363' }}>53%</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: '#636363' }}>Min Trade</Text>
                                        <Text style={{ color: '#636363' }}>$33.00</Text>
                                    </View>



                                </View>
                            )
                        }}
                        ItemSeparatorComponent={() => <View style={{ margin: 4 }}></View>}
                    />
                </View>
                {/* button area */}

                <TouchableOpacity
                    style={{ alignSelf: 'center' }}
                >
                    <Image source={nextButton} />
                </TouchableOpacity>

            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5
    },
    cardWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        borderColor: 'gray',
        borderWidth: .3,
        borderRadius: 8

    }
})
export default simpleTrade;