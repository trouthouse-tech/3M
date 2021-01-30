import React, { useState } from 'react';
import {
    View, Text, StyleSheet, Image, FlatList, Modal, TouchableOpacity,
} from 'react-native';
import { ROUTES } from '../../util/routes';
import userAccountIcon from '../../../assets/images/screens/tensioncreator.png';
import userReviewIcon from '../../../assets/images/screens/review.png';
import userReferral from '../../../assets/images/screens/referral.png';
import userfollow from '../../../assets/images/screens/follow.png';
import settings from '../../../assets/images/screens/settings.png';
import help from '../../../assets/images/screens/helpicon.png';
import abouticon from '../../../assets/images/screens/Brainer1_1_2021_happy_new_year.png';
import supporticon from '../../../assets/images/screens/support.png';
import termicon from '../../../assets/images/screens/metrowarning.png';

import finallogo from '../../../assets/images/screens/finalLogo.png';

const data = [{
    iconName: userReviewIcon,
    title: 'Rate Us',
    navigateTo: '',
},
{
    iconName: userAccountIcon,
    title: 'Account',
    navigateTo: ROUTES.Account,
},
{
    iconName: supporticon,
    title: 'Support',
    navigateTo: ROUTES.SupportAccount,
},
{
    iconName: settings,
    title: 'Settings',
    navigateTo: ROUTES.SettingScreen,
},
{
    iconName: userfollow,
    title: 'Follow us',
    navigateTo: ROUTES.FollowUs,
},
{
    iconName: abouticon,
    title: 'Disclaimer',
    navigateTo: ROUTES.DisclaimerScreen,
},
{
    iconName: userReferral,
    title: 'Referral',
    navigateTo: '',
},
{
    iconName: help,
    title: 'Help',
    navigateTo: '',
},
{
    iconName: termicon,
    title: 'Term of Use',
    navigateTo: '',
},
{
    iconName: abouticon,
    title: 'About us',
    navigateTo: '',
},
]
const MyAccount = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <View style={[{ flex: .08, flexDirection: 'row', height: 45, backgroundColor: '#F8F8F8', alignItems: 'center', paddingLeft: 50 }, styles.boxWithShadow]}
            >
                <Image source={userAccountIcon} />
                <Text style={{ fontSize: 20, paddingLeft: 20 }}>Trade History </Text>
            </View>
            <View style={styles.screen}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}

                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', paddingHorizontal: 20, }}>
                        <View style={{ height: 249, backgroundColor: 'white', borderRadius: 8, justifyContent: 'space-between' }}>
                            <Image source={finallogo} style={{ alignSelf: 'center', marginTop: 30 }} />
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={{ fontSize: 20 }}>How is your experience</Text>
                                <Text style={{ fontSize: 20, alignSelf: 'center', marginTop: 10 }}>with us</Text>
                            </View>
                            {/* <View style={{ flex: 1, justifyContent: 'flex-end' }}> */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity
                                        style={{ height: 59, backgroundColor: '#E6E6E6', justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={{ fontSize: 20 }}>Later</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity
                                        style={{ height: 59, backgroundColor: '#34A271', justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={{ fontSize: 20 }}>Rate Us</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* </View> */}
                            </View>
                        </View>
                    </View>
                </Modal>



                <View style={{ flex: 1, padding: 40 }}>
                    <FlatList
                        data={data}
                        style={{ marginTop: 20 }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => {
                                        if (index == 0) {
                                            setModalVisible(true);
                                            return;
                                        }
                                        if (item.navigateTo == "") return

                                        props.navigation.navigate(item.navigateTo)
                                    }}

                                >
                                    <Image source={item.iconName} style={{ alignSelf: 'center' }} />
                                    <Text style={{ marginTop: 20 }}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        numColumns={3}
                        ItemSeparatorComponent={() => <View style={{ margin: 20 }}></View>}
                        columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
                    />
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,

    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        //margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})

export default MyAccount;