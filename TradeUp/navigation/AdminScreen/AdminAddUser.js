import React,{useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();


function AdminAddUser ({navigation}) {

    const [centreStatus, setCentreStatus] = useState(null);

    return(
        <ScrollView style={styles.root}>

            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.title2}>Create a new account</Text>

            <View style={styles.sectionStyle}>
                <Ionicons name='person-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Name Here"
                    underlineColorAndroid="transparent"
                />
            </View>

            <View style={styles.sectionStyle}>
                <Image
                    source={{
                    uri:
                        'https://cdn-icons-png.flaticon.com/512/546/546394.png',
                    }}
                    style={styles.imageStyle}
                />
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Email Here"
                    underlineColorAndroid="transparent"
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.sectionStyle}>
                <Image
                    source={{
                    uri:
                        'https://cdn-icons-png.flaticon.com/512/159/159832.png',
                    }}
                    style={styles.imageStyle}
                />
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

            <Picker
                    selectedValue={centreStatus}
                    onValueChange={(value, index) => setCentreStatus(value)}
                    mode="dropdown" // Android only
                    style={styles.picker}>
                    
                    <Picker.Item label="Select user's role" value= {null} />
                    <Picker.Item label="Admin" value="Admin" />
                    <Picker.Item label="User" value="User" />

            </Picker>

            <TouchableOpacity
                    style={styles.loginScreenButton}
                    onPress={() => navigation.navigate('AdminManageUserScreen')}
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
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#00BFFF',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        width:'100%',
        height:45,
        marginBottom:40,
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

    title3:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2a9d8f',
        paddingTop:10,
    },

    picker: {
        marginVertical: 30,
        padding: 10,
        borderWidth: 1,
        borderColor: "#666",
    },

})

export default AdminAddUser;