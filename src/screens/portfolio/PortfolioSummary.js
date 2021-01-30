import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import portfoliosummary from '../../../assets/images/screens/portfoliosummary.png';
import PortfolioSummaryCard from '../../components/PortfolioSummaryCard/PortfolioSummaryCard';
const PortfolioSummary = (props) => {
    return (
        <>
            <View style={[{ flex: .07, flexDirection: 'row', height: 45, backgroundColor: 'white', paddingHorizontal: 50 }, styles.boxWithShadow]}
            >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Text style={{ paddingLeft: 7, fontWeight: 'bold', fontSize: 15 }}>Summary</Text>
                    <Menu onSelect={value => { }} >

                        <MenuTrigger>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginLeft: 4, color: '#636363', paddingRight: 3 }}>Sort by</Text>
                                <Image source={portfoliosummary} />
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
            </View>
            <View style={styles.screen}>

                <View style={{ flex: 1 }}>
                    <PortfolioSummaryCard />
                </View>
            </View>
        </>
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

export default PortfolioSummary;