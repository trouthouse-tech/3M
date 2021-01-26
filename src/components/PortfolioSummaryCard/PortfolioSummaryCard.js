import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import PortfolioSummary from '../../screens/portfolio/PortfolioSummary';
import Colors from '../../screens/Colors/Colors';
const PortfolioSummaryCard = (props) => {
    return (
        <FlatList
            data={[1, 2, 3]}
            renderItem={({ item, index }) => {
                return (
                    <View style={{
                        backgroundColor: 'white',
                        height: 300, justifyContent: 'space-evenly', paddingHorizontal: 20, shadowColor: "#000",
                        shadowOffset: {
                            width: 4,
                            height: 4,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                        margin: 20,
                        borderColor: '#707070',
                        borderWidth: .3,
                        borderRadius: 10,

                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Starting account value</Text>
                            <Text style={{ color: Colors.secondaryColor }}>$500.00</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Largest Winning Trade</Text>
                            <Text style={{ color: Colors.secondaryColor }}>$500.00</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Starting account value</Text>
                            <Text style={{ color: Colors.secondaryColor }}>$500.00</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Starting account value</Text>
                            <Text style={{ color: Colors.secondaryColor }}>$500.00</Text>
                        </View>
                    </View>
                )
            }}
            ItemSeparatorComponent={() => (<View style={{ margin: 0 }}></View>)}
        />
    )
}
const styles = StyleSheet.create({
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5
    },
});
export default PortfolioSummaryCard;