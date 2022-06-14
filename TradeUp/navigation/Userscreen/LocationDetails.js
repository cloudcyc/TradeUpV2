import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';
import { createOpenLink } from 'react-native-open-maps';



function LocationDetails ({navigation}) {

    const Pavilion = { latitude: 3.1482334236652827, longitude: 101.71304510925147 };
    const openPavilion = createOpenLink({ ...Pavilion, zoom: 20 });


    return(
        <View>
            <View style={styles.root}>
                <Image 
                    source={{uri: 'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1200,h_630/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/etofkoegds1mjx1yv1ti/Skytropolis%20Indoor%20Theme%20Park%20Ticket%20in%20Genting%20Highlands,%20Malaysia.jpg'}}
                    style={{width: 400, height: 250}}
                    resizeMode='stretch'
                />          
            </View>

            <View style={[styles.container]}>


                <View style={styles.container2}>
                    <Text style={styles.title}>Address:</Text>
                    <Text style={styles.Desc}>168, Bukit Bintang St, Bukit Bintang, 55100 Kuala Lumpur, Federal Territory of Kuala Lumpur</Text>
                </View>

                <View style={styles.container2}>
                    <Text style={styles.title}>Contact Number:</Text>
                    <Text style={styles.Desc}>03-2118 8833</Text>
                </View>

                <View style={styles.container2}>
                    <Text style={styles.title}>Open Hours:</Text>
                    <Text style={styles.Desc}>

                        Monday	            Closed{"\n"}
                        Tuesday            10am–10pm{"\n"}
                        Wednesday	     10am–10pm{"\n"}
                        Thursday	         10am–10pm{"\n"}
                        Friday	               10am–10pm{"\n"}
                        Saturday           10am–10pm{"\n"}
                        Sunday	             10am–10pm{"\n"}

                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.loginScreenButton}
                    onPress={openPavilion}
                    underlayColor='#fff'>
                    <Text style={styles.loginText}>View in Map</Text>
                </TouchableOpacity>

            </View>

            
            
        </View>

        
    )
}

const styles = StyleSheet.create({

    root:{
        flex: 1, 
        alignItems: "center"
    },

    container:{
        paddingTop:255,
        paddingLeft:20,
        paddingRight:20,
        maxHeight:690,
    },

    container2:{
        paddingTop:10,
        paddingBottom:10,
        borderBottomColor:'#b6b6b8',
        borderBottomWidth:1,
    },

    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00BFFF',
    },

    Desc:{
        fontSize: 15,
        paddingTop:10,
    },

    image:{
        width:'100%',
        maxHeight:300,
    },

    row:{
        flexDirection: 'row',
        justifyContent:'center',
        height:80,
        paddingBottom:10,
    },

    backButton:{
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#50C878',
        width:'50%',
        justifyContent:'center'
    },

    CancelButton:{
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#e63946',
        width:'50%',
        justifyContent:'center'

      },

    buttonText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10,
          fontSize: 18,
          paddingBottom:10
    },

    loginScreenButton:{
        marginTop:30,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#4cc9f0',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        width:'100%',
        height:45,
        marginBottom:50
    },

    loginText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10
    },

});


export default LocationDetails;