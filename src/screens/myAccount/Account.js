import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Color from '../Colors/Colors';
import userAccountIcon from '../../../assets/images/screens/useraccount.png';
import dropDownIcon from '../../../assets/images/screens/dropdownicon.png';
import dropUpIcon from '../../../assets/images/screens/dropupicon.png';
import { ScrollView } from 'react-native-gesture-handler';

const Account = () => {
    const [toggleBilling, setToggleBilling] = useState(false);
    const [togglePersonalInfo, setTogglePersonalInfo] = useState(false)
    const [toggleInvesmentProfile, setToggleInvesmentProfile] = useState(false)
    return (
        <>
            <View style={[{ height: 50, flexDirection: 'row', height: 45, backgroundColor: '#F8F8F8', alignItems: 'center', paddingLeft: 50 }, styles.boxWithShadow]}
            >
                <Image source={userAccountIcon} />
                <Text style={{ fontSize: 20, paddingLeft: 20 }}>Account</Text>
            </View>
            <View style={styles.screen}>

                <ScrollView>
                    <View style={{ flex: 1, padding: 20 }}>
                        <TouchableOpacity style={[{ flexDirection: 'row', height: 45, width: '100%', backgroundColor: '#f8f8f8', marginTop: 20 }, styles.boxWithShadow]}
                            onPress={() => {
                                //  setToggleSummary(!toggleSummary)
                                setToggleBilling(!toggleBilling)

                            }}
                        >
                            <View style={{ flexDirection: 'row', paddingLeft: 34, alignItems: 'center', }}>
                                {/* <Image source={dropDownIcon} /> */}
                                {
                                    !toggleBilling ?
                                        <Image source={dropDownIcon} /> : <Image source={dropUpIcon} />
                                }
                                <Text style={{ paddingLeft: 7 }}>Billing</Text>
                            </View>
                        </TouchableOpacity>

                        {
                            toggleBilling ? (

                                <View style={{ flex: .5, justifyContent: 'space-between', paddingLeft: 30, paddingTop: 2 }}>
                                    <View style={{ marginTop: 20 }}>
                                        <Text style={{ fontSize: 14, color: '#686868' }}>Bank</Text>
                                        <TextInput
                                            style={{ height: 48, borderColor: Color.TextInputBorderColor, borderWidth: 1, borderRadius: 4, paddingLeft: 5, marginTop: 10 }}
                                            placeholder="abc bank"
                                        />
                                    </View>

                                    <View style={{ marginTop: 20 }}>
                                        <Text style={{ fontSize: 14, color: '#686868' }}>Mobile</Text>
                                        <TextInput
                                            style={{ height: 48, borderColor: Color.TextInputBorderColor, borderWidth: 1, borderRadius: 4, paddingLeft: 5, marginTop: 10 }}
                                            placeholder="+123098172"
                                            keyboardType='numeric'
                                        />
                                    </View>

                                    <View style={{ marginTop: 20 }}>
                                        <Text style={{ fontSize: 14, color: '#686868' }}>Email</Text>
                                        <TextInput
                                            style={{ height: 48, borderColor: Color.TextInputBorderColor, borderWidth: 1, borderRadius: 4, paddingLeft: 5, marginTop: 10 }}
                                            placeholder="zuby641@gmail.com"
                                            keyboardType='email-address'
                                        />
                                    </View>

                                </View>) : null
                        }
                        <TouchableOpacity style={[{ flexDirection: 'row', height: 45, width: '100%', backgroundColor: '#f8f8f8', marginTop: 20 }, styles.boxWithShadow]}
                            onPress={() => {
                                //  setToggleSummary(!toggleSummary)
                                //setToggleBilling(!toggleBilling)
                                setTogglePersonalInfo(!togglePersonalInfo)

                            }}
                        >
                            <View style={{ flexDirection: 'row', paddingLeft: 34, alignItems: 'center', }}>
                                {/* <Image source={dropDownIcon} /> */}
                                {
                                    !togglePersonalInfo ?
                                        <Image source={dropDownIcon} /> : <Image source={dropUpIcon} />
                                }
                                <Text style={{ paddingLeft: 7 }}>Personal info </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{ flexDirection: 'row', height: 45, width: '100%', backgroundColor: '#f8f8f8', marginTop: 20 }, styles.boxWithShadow]}
                            onPress={() => {
                                setToggleInvesmentProfile(!toggleInvesmentProfile)

                            }}
                        >
                            <View style={{ flexDirection: 'row', paddingLeft: 34, alignItems: 'center', }}>
                                {/* <Image source={dropDownIcon} /> */}
                                {
                                    !toggleInvesmentProfile ?
                                        <Image source={dropDownIcon} /> : <Image source={dropUpIcon} />
                                }
                                <Text style={{ paddingLeft: 7 }}>Investment profile </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

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

export default Account;
