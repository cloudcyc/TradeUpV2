import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();


function Signupscreen ({navigation}) {
    return(
        <ScrollView style={styles.root}>

            <Text style={styles.title}>Create an new account</Text>
            <Text style={styles.title2}>Feel Free To Join Us</Text>

            <View style={styles.sectionStyle}>
                <Ionicons name='person-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Name Here"
                    underlineColorAndroid="transparent"
                    editable={false}
                    selectTextOnFocus={false}
                />
            </View>

            <View style={styles.sectionStyle}>
                <Ionicons name='mail-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Email Here"
                    underlineColorAndroid="transparent"
                    keyboardType="email-address"
                    editable={false}
                    selectTextOnFocus={false}
                />
            </View>

            <View style={styles.sectionStyle}>
                <Ionicons name='call-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Phone Number Here"
                    underlineColorAndroid="transparent"
                    keyboardType="phone-pad"
                />
            </View>

            <View style={styles.sectionStyle}>
                <Ionicons name='lock-closed-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Password Here"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                />
            </View>

            <View style={styles.sectionStyle}>
                <Ionicons name='lock-closed-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Password Here Again"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                />
            </View>

            <TouchableOpacity
                    style={styles.loginScreenButton}
                    onPress={() => navigation.navigate('HomeTabs')}
                    underlayColor='#fff'>
                    <Text style={styles.loginText}>Create an account</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

const styles = StyleSheet.create({

    root:{
        padding:20, 
        //backgroundColor: '#D8F3DC',
        height: '100%',
    },

    logo:{
        width:'100%',
        maxHeight:200,
    },

    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        height: 50,
        borderRadius: 5,
        marginTop: 10,
        marginBottom:10,
    },

    imageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
        marginRight:10,
    },

    loginScreenButton:{
        marginTop:45,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#00BFFF',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        width:'100%',
        height:45,
      },

    loginText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10
    },

    container:{
        width: '100%',
        padding: 5,
        marginVertical: 5,  
        alignItems: 'center',
        borderRadius: 5,
    },

    container2:{
        width: '100%',
        padding: 5,
        marginVertical: 5,  
        alignItems: 'center',
        borderRadius: 5,
    },

    container3:{
        padding: 10,
    },
    
    text:{
        fontWeight: 'bold',
        color: 'gray',
    },

    text2:{
        fontWeight: 'bold',
        color: '#d9dadb',
    },

    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00BFFF',
        margin: 10,
        marginBottom:5,
        alignSelf:'center'
    },

    title2:{
        fontSize: 15,
        color: 'gray',
        paddingBottom:20,
        alignSelf:'center'
    },

    textInputStyle: {
        color: 'green',
        flex: 1
    },

})

export default Signupscreen;