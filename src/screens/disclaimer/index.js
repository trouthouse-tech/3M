import React from 'react';
import { View, Text, StyleSheet, Image,ScrollView } from 'react-native';


import abouticon from '../../../assets/images/screens/Brainer1_1_2021_happy_new_year.png';

const Support = (props) => {
    return (
        <>
          <View style={[{  flexDirection: 'row', height: 45, backgroundColor: '#F8F8F8', alignItems: 'center', paddingLeft: 50 }, styles.boxWithShadow]}
            >
                <Image source={abouticon} />
                    <Text style={{ fontSize: 20, paddingLeft: 20 }}>Disclaimer</Text>
            </View>
        <ScrollView>
        <View style={styles.screen}>
          
            <View style={{flex:1,marginTop:10,padding:20}}>
                    <Text style={{ fontSize: 16, color:'#707070', lineHeight:40,textAlign:'justify'}}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout.
            
</Text>
            </View>
        </View>
        </ScrollView>
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
})
export default Support;