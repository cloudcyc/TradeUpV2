import React,{useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();


function AdminProfile({ navigation }){
    return(
        <View>
            <View style = {styles.Header}>
                <Image source={{ uri: "https://static.wikia.nocookie.net/pingu/images/9/97/KFCLogo.png/revision/latest?cb=20170428071912" }} style={styles.pic} />
                <View style={styles.ProfileDetail}>
                    <Text style={styles.name}>Holland Team</Text>
                    <Text style={styles.Email}>Holland@gmail.com</Text>
                </View>
            </View>
            <ScrollView style={styles.bodyContent}>

                <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('AdminEditProfile')}>
                  <View style={styles.row}>
                      <Ionicons name='person-outline' size={35} />
                      <Text style={styles.ButtonText}>Edit Profile</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('AdminManageUserScreen')}>
                  <View style={styles.row}>
                      <Ionicons name='people-circle-outline' size={35} />
                      <Text style={styles.ButtonText}>Manage Users</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('AdminTradeRequest')}>
                  <View style={styles.row}>
                      <Ionicons name='newspaper-outline' size={35} />
                      <Text style={styles.ButtonText}>View All Trade Request</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('AdminPurchaseHistory')}>
                  <View style={styles.row}>
                      <Ionicons name='cart-outline' size={35} />
                      <Text style={styles.ButtonText}>View All Purchase History</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('RequestScreen')}>
                  <View style={styles.row}>
                      <Ionicons name='location-outline' size={35} />
                      <Text style={styles.ButtonText}>View Location Request</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.Signoutbutton} onPress={() => navigation.navigate('HomeTabs')}>
                  <View style={styles.row}>
                      <Ionicons name='power-outline' size={35} color='#FFF' />
                      <Text style={styles.SignoutText}>Sign Out</Text>
                  </View>
              </TouchableOpacity>

            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({

    Header:{
        paddingTop:40,
        paddingLeft:20,
        height:200,
        flexDirection: 'row',
        alignItems:'center',
        borderEndColor:'grey',
        borderEndWidth:1,
        backgroundColor:'#00BFFF'
    },

    pic: {
        borderRadius: 60,
        width: 80,
        height: 80,
    },

    ProfileDetail:{
        paddingLeft:20
    },

    name:{
        paddingBottom:5,
        color:'white',
        fontSize:25,
        fontWeight:'bold'
    },

    Email:{
        paddingBottom:10,
        fontSize:18
    },

    bodyContent: {
        height:'100%'
    },

    ButtonContainer:{
        backgroundColor:'white',
        paddingTop:20,
        paddingBottom:20,
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        borderBottomColor:'#DEE2E6',
        borderBottomWidth:1,
    },

    row: {
        paddingLeft:20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    ButtonText:{
        paddingLeft:15,
        fontSize: 18,
        fontWeight:'400',
    },

    Signoutbutton:{
        backgroundColor:'#e63946',
        paddingTop:20,
        paddingBottom:20,
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        borderBottomColor:'#DEE2E6',
        borderBottomWidth:1,
    },

    SignoutText:{
        paddingLeft:15,
        fontSize: 18,
        fontWeight:'400',
        color: '#FFF',
    },

})

export default AdminProfile