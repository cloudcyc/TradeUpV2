import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable,FlatList } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

function Location({ navigation }){
    return(
        <View style={styles.root}>

            <View style={styles.row}>
                
                <View style={styles.containerSearch}>
                    <Ionicons name='search-outline' size={25} color='grey' style={{paddingLeft:5,paddingRight:5}} />
                    <TextInput placeholder='Search Location Name'/>
                </View>

                <Ionicons name='person-circle-outline' size={40} color='#00b4d8' style={{paddingLeft:5}} onPress={() => navigation.navigate('Profile')}/>

            </View>

        <TouchableOpacity
            onPress={() => navigation.navigate('LocationDetails')}
            style={styles.roundButton}>
            <Image style={styles.icon} source={{
            uri:
                'https://s1.cdn.autoevolution.com/images/news/google-maps-is-getting-a-feature-that-just-makes-sense-these-days-150219_1.jpg',
            }}/>
            <Text style={styles.locationtitle}>Pavilion Kuala Lumpur</Text>
            <Text style={styles.locationtitle2}>Phone:      03-2118 8833</Text>
            <Text style={styles.locationtitle2}>Location:  Lot 5.100.00 Level 5, Pavilion Elite</Text>


        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => navigation.navigate('LocationDetails')}
            style={styles.roundButton}>
            <Image style={styles.icon} source={{
            uri:
                'https://s1.cdn.autoevolution.com/images/news/google-maps-is-getting-a-feature-that-just-makes-sense-these-days-150219_1.jpg',
            }}/>
            <Text style={styles.locationtitle}>KLCC Malaysia</Text>
            <Text style={styles.locationtitle2}>Phone:      03-2382 2828</Text>
            <Text style={styles.locationtitle2}>Location:  Lot 316-A, Level 3</Text>
        </TouchableOpacity> 
    </View>
    );
}

const styles = StyleSheet.create({

    root:{
        padding:20,
        height:'100%',
        paddingTop:40,
    },

    roundButton: {
        width: '100%',
        height: 270,
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        shadowColor: '#00000021',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },

    icon: {
        width:'100%',
        height:150,
        borderRadius:5,
        paddingBottom:5,
    },

    row:{
        flexDirection: 'row',
        alignItems:'center',
        marginBottom:20,

    },

    containerSearch:{
        flexDirection: 'row',
        width: '88%',
        height: 35,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent:'flex-start',
        borderWidth: 1,
        borderColor:'grey',
        alignItems:'center',
        
    },

    locationtitle: {
        fontWeight:'500',
        padding:5,
        paddingTop: 8,
        fontSize:18,
        color:'#00a6fb'
    },

    locationtitle2: {
        fontWeight:'500',
        padding:5,
        paddingTop: 5,
        color:'grey'
    },

});

export default Location