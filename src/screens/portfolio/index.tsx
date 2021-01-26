import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Modal, ScrollView } from 'react-native';
import Pie from 'react-native-pie';
import { LineChart, Grid } from 'react-native-svg-charts'
import dropUpIcon from '../../../assets/images/screens/dropupicon.png';
import dropDownIcon from '../../../assets/images/screens/dropdownicon.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Portfolio = (props: any) => {
    const [firstModal, setFirstModal] = useState(false)
    const [secondModal, setSecondModal] = useState(false)
    const [showModalData, setShowModalData] = useState(false);
    return (
        <View style={styles.screen}>
            {/* modal one starts here */}
            <Modal
                animationType="slide"
                //transparent={true}
                visible={firstModal}

            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            setFirstModal(!firstModal)
                            setShowModalData(true);
                        }}
                    >
                        <Text>close first modal</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                //transparent={true}
                visible={secondModal}

            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            // setFirstModal(!firstModal)
                            setSecondModal(!secondModal)
                            setShowModalData(true);
                        }}
                    >
                        <Text>close second modal</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <View style={[{ flex: .07, flexDirection: 'row', height: 45, width: '100%', backgroundColor: 'white', marginTop: 20 }, styles.boxWithShadow]}

            >
                <View style={{ flexDirection: 'row', paddingLeft: 34, alignItems: 'center', }}>

                    <Text style={{ paddingLeft: 7, fontWeight: 'bold', fontSize: 15 }}>Porfolio</Text>
                </View>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
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
                            $12323.45
                </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={dropUpIcon} />
                            <Text style={{ paddingLeft: 3 }}>16%</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => {
                            setFirstModal(!firstModal);
                            setShowModalData(false);
                        }}
                    >
                        <Image source={dropDownIcon} />
                        <Text style={{ paddingLeft: 5 }}>Short:value high to low</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => {

                            setSecondModal(!secondModal);
                            setShowModalData(false);
                        }}
                    >
                        <Image source={dropDownIcon} />
                        <Text style={{ paddingLeft: 5 }}>Time arrange:1 day </Text>
                    </TouchableOpacity>
                </View>

                {/* here to put the flatlist */}
                <TouchableOpacity style={[{ flexDirection: 'row', backgroundColor: '#f8f8f8', marginTop: 20, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }, styles.boxWithShadow]}
                    onPress={() => {
                        props.navigation.navigate("PortfolioSummary")
                    }}
                >
                    <View>
                        <LineChart
                            style={{ height: 70, width: 50 }}
                            data={[10, 40, 95, 8, 100, 85, 91, 35, 53, -53, 24, 50, -20, -80]}
                            svg={{ stroke: 'rgb(0, 128, 0)' }}
                        //contentInset={{ top: 20, bottom: 20 }}
                        >
                            {/* <Grid /> */}
                        </LineChart>
                    </View>
                    <View>
                        <Text>
                            Growth 2021
                    </Text>
                        <Text>
                            100%/100%
                    </Text>
                    </View>
                    <View >
                        <Text>Growth</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={dropDownIcon} />
                            <Text>-$12.512</Text>
                        </View>
                    </View>

                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
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

})

export default Portfolio;