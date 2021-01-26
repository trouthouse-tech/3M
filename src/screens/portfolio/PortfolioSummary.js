import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import portfoliosummary from '../../../assets/images/screens/portfoliosummary.png';
import PortfolioSummaryCard from '../../components/PortfolioSummaryCard/PortfolioSummaryCard';
const PortfolioSummary = (props) => {
    return (
        <View style={styles.screen}>
            <View style={[{ flex: .07, flexDirection: 'row', height: 45, backgroundColor: 'white', marginTop: 20, paddingHorizontal: 50 }, styles.boxWithShadow]}
            >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Text style={{ paddingLeft: 7, fontWeight: 'bold', fontSize: 15 }}>Porfolio Summary</Text>
                    <Image source={portfoliosummary} />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <PortfolioSummaryCard />
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
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5
    },
})

export default PortfolioSummary;