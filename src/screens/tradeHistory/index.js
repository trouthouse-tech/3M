import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Color from '../Colors/Colors';
const TradeHistory = (props) => {
    return (
        <>
            <View style={[{ flex: .1, flexDirection: 'row', height: 45, backgroundColor: '#F8F8F8', alignItems: 'center', paddingLeft: 50 }, styles.boxWithShadow]}
            >
                <Text style={{ fontSize: 20 }}>Trade History </Text>
            </View>
            <View style={styles.screen}>


                <View style={{ flex: 1, marginTop: 20 }}>
                    <FlatList
                        data={[1, 2, 3]}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ flex: 1 }}>
                                    <View style={[{ flex: .1, flexDirection: 'row', height: 45, backgroundColor: Color.secondaryColor, marginTop: 20, alignItems: 'center', justifyContent: 'space-around' }, styles.boxWithShadow]}

                                    >
                                        <Text style={{ color: 'white' }}>Symbol</Text>
                                        <Text style={{ color: 'white' }}>Entry Date</Text>
                                        <Text style={{ color: 'white' }}>Exit Date</Text>
                                        <Text style={{ color: 'white' }}>P/L</Text>
                                    </View>
                                    <FlatList
                                        data={[1, 2, 3, 4]}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View style={[{ flex: .1, flexDirection: 'row', height: 45, backgroundColor: Color.primaryColor, marginTop: 20, alignItems: 'center', justifyContent: 'space-around', marginHorizontal: 20 }, styles.boxWithShadow]}

                                                >
                                                    <Text style={{ fontSize: 12, color: Colors.FONTSCOLOR }}>ADS</Text>
                                                    <Text style={{ fontSize: 12, color: Colors.FONTSCOLOR }}>10/19/20 </Text>
                                                    <Text style={{ fontSize: 12, color: Colors.FONTSCOLOR }}>10/19/20 </Text>
                                                    <Text style={{ fontSize: 12, color: Colors.FONTSCOLOR }}>$20.00</Text>
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                            )
                        }}
                    />
                </View>
            </View >
        </>
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
})
export default TradeHistory;