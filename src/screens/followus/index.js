import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import userfollow from '../../../assets/images/screens/follow.png';
import facebookButton from '../../../assets/images/screens/facebookbutton.png';
import twitterButton from '../../../assets/images/screens/twitterbutton.png';
import instagramButton from '../../../assets/images/screens/instagrambutton.png';
import linkeinButton from '../../../assets/images/screens/linkedinbutton.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
const FollowUs = (props) => {
    return (
        <>
            <View style={[{ flex: .08, flexDirection: 'row', height: 45, backgroundColor: '#F8F8F8', alignItems: 'center', paddingLeft: 50 }, styles.boxWithShadow]}
            >
                <Image source={userfollow} />
                <Text style={{ fontSize: 20, paddingLeft: 20 }}>Follow us</Text>
            </View>
            <View style={styles.screen}>

                <View style={{ flex: .5, justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>

                    <TouchableOpacity><Image source={facebookButton} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={twitterButton} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={instagramButton} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={linkeinButton} />
                    </TouchableOpacity>

                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})
export default FollowUs;