import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();


function AdminDashboard ({navigation}) {

   
    return(

        <View style={styles.root}>

            <View style={styles.row3}>
                <View>
                    <View style={styles.nameContainer}>
                    <Text style={styles.title}>Welcome Back,</Text>
                    </View>
                    <View style={styles.end}>
                    <Text style={styles.title2}>Username</Text>
                    </View>
                </View>
                <Ionicons name='person-circle-outline' size={40} color='#FFF' source={{uri: 'https://cdn-icons-png.flaticon.com/512/758/758645.png'}} onPress={() => navigation.navigate('AdminProfile')}/>
            </View>

            <View style={styles.container}>

                <ScrollView style={styles.root2}>

                <Text style={styles.title3}>Marketplace:</Text>

                <View style={styles.separator}></View>

                    <View style={styles.row}>
                        <TouchableOpacity style={styles.roundcard} onPress={() => navigation.navigate('AdminTradeRequest')}>

                            <Text style={styles.totalrequest}>Total Request:</Text>
                            <Text style={styles.cardnumber}> 123</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.roundcard} onPress={() => navigation.navigate('AdminTradeRequest')}>

                            <Text style={styles.pendingrequest}>Request Pending:</Text>
                            <Text style={styles.cardnumber}>8</Text>

                        </TouchableOpacity>

                    </View>

                    <Text style={styles.title3}>Shop:</Text>

                    <View style={styles.separator}></View>

                        <View style={styles.row}>
                            <TouchableOpacity style={styles.roundcard} onPress={() => navigation.navigate('AdminPurchaseHistory')}>

                                <Text style={styles.totalrequest}>Total Purchase:</Text>
                                <Text style={styles.cardnumber}> 123</Text>

                            </TouchableOpacity>

                            <TouchableOpacity style={styles.roundcard} onPress={() => navigation.navigate('AdminPurchaseHistory')}>

                                <Text style={styles.pendingrequest}>Purchase Pending:</Text>
                                <Text style={styles.cardnumber}>8</Text>

                            </TouchableOpacity>

                        </View>

                        <Text style={styles.title3}>Users:</Text>

                        <View style={styles.separator}></View>

                        <View style={styles.row}>

                            <TouchableOpacity style={styles.roundcard} onPress={() => navigation.navigate('AdminManageUserScreen')}>

                                <Text style={styles.totalrequest}>Total Users:</Text>
                                <Text style={styles.cardnumber}> 123</Text>

                            </TouchableOpacity>

                        </View>

                </ScrollView>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({

    root:{
        backgroundColor: '#00BFFF',
        height:'100%',
        paddingTop: 50,
    },

    row3:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight:20
    },

    separator:{
        height:2,
        backgroundColor:"#ced4da",
        marginTop:10,
        marginBottom:20,
        width:'80%',
        marginLeft:5
    },

    title3:{
        marginLeft:5,
        fontSize:18,
        fontWeight:'500',
        paddingTop:10
    },

    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 270,
    },

    title:{
        paddingLeft:20,
        fontSize: 15,
        color: 'white',
        marginBottom:5,
    },

    title2:{
        paddingLeft:20,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        paddingBottom:20,
    },

    container:{
        backgroundColor: '#E9ECEF',
        borderRadius: 40,
        paddingLeft:20,
        paddingRight:30,
        height: '100%',
    },

    end: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    root2:{
        height:'100%',
        paddingTop:20,
    },

    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    roundcard: {
        width: 165,
        height: 100,
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        marginBottom: 10,
    },

    totalrequest:{
        color:'green',
        fontSize:18,
        paddingBottom:10,
        fontWeight:'bold',
        alignSelf:'center',
    },

    pendingrequest:{
        color:'orange',
        fontSize:18,
        paddingBottom:10,
        fontWeight:'bold',
        alignSelf:'center',
    },

    cardnumber:{
        fontSize:18,
        alignSelf:'flex-end',
        paddingRight:25,
        fontWeight:'600',
    },

    PieCard:{
        width: '100%',
        height: 300,
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        marginTop:10,
        marginLeft: 5,
        marginRight: 5,
    },

    updateButton:{
        backgroundColor:'#248277',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        height:45,
        width:'50%',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:10,
    },

    updateText:{
        color:'#fff',
        textAlign:'center',
    },

});

export default AdminDashboard;