import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { set } from 'react-native-reanimated';
import settings from '../../../assets/images/screens/settings.png';
import GlobeIcon from '../../../assets/images/screens/globe.png';
import telephoneIcon from '../../../assets/images/screens/telephone.png';
import emailicon from '../../../assets/images/screens/emailicon.png';
import lockicon from '../../../assets/images/screens/lockicon.png';
import logouticon from '../../../assets/images/screens/logouticon.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
const SettingsScreen = (props) => {
    return (
        <>
            <View style={[{ flex: .1, flexDirection: 'row', height: 45, backgroundColor: '#F8F8F8', alignItems: 'center', paddingLeft: 50 }, styles.boxWithShadow]}
            >
                <Image source={settings} />
                <Text style={{ fontSize: 20, paddingLeft: 20 }}>Settings</Text>
            </View>
            <View style={styles.screen}>

                <View style={{ flex: 1, paddingHorizontal: 20 }}>
                    <TouchableOpacity style={[{ flexDirection: 'row', height: 45, backgroundColor: '#FFFFFF', marginTop: 20, alignItems: 'center', paddingLeft: 70 }, styles.boxWithShadow]}
                    >
                        <Image source={GlobeIcon} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ fontSize: 14, }}>Language</Text>
                            <Text style={{ fontSize: 10, color: "#BFBEBE", marginTop: 5 }}>English</Text>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ flexDirection: 'row', height: 45, backgroundColor: '#FFFFFF', marginTop: 20, alignItems: 'center', paddingLeft: 70 }, styles.boxWithShadow]}
                    >
                        <Image source={telephoneIcon} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ fontSize: 14, }}>Phone Number</Text>
                            <Text style={{ color: "#BFBEBE", marginTop: 5 }}>+03129171244</Text>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ flexDirection: 'row', height: 45, backgroundColor: '#FFFFFF', marginTop: 20, alignItems: 'center', paddingLeft: 70 }, styles.boxWithShadow]}
                    >
                        <Image source={emailicon} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ fontSize: 14, }}>Email</Text>
                            <Text style={{ color: "#BFBEBE", marginTop: 5 }}>zuby641@gmail.com</Text>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ flexDirection: 'row', height: 45, backgroundColor: '#FFFFFF', marginTop: 20, alignItems: 'center', paddingLeft: 70 }, styles.boxWithShadow]}
                    >
                        <Image source={lockicon} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ fontSize: 14, }}>Change Password</Text>
                            <Text style={{ color: "#BFBEBE", marginTop: 2 }}>.........</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[{ flexDirection: 'row', height: 45, backgroundColor: '#FFFFFF', marginTop: 20, alignItems: 'center', paddingLeft: 70 }, styles.boxWithShadow]}
                    >
                        <Image source={logouticon} />
                        <View style={{ alignItems: 'center', marginLeft: 20 }}>
                            <Text style={{ fontSize: 14, }}>Logout</Text>

                        </View>
                    </TouchableOpacity>
                </View>


            </View>
        </>)
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
export default SettingsScreen;