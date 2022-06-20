import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();


function AdminDashboard ({navigation}) {

   
    return(

        <ScrollView style={styles.root}>

            <Text style={styles.title}>Your Dashboard</Text>
            <Text style={styles.title2}>Monitor Your App Here In Simple View</Text>

            <View style={styles.container}>

                <View style={styles.root2}>

                <View style={{backgroundColor:'white', borderRadius:15}}>
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
                    </View>

                    <View style={{backgroundColor:'white', borderRadius:15, marginTop:10}}>

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
                        </View>

                        <View style={{backgroundColor:'white', borderRadius:15, marginTop:10, marginBottom:25}}>

                        <Text style={styles.title3}>Users:</Text>

                        <View style={styles.separator}></View>

                        <View style={styles.row2}>

                            <TouchableOpacity style={styles.roundcard} onPress={() => navigation.navigate('AdminManageUserScreen')}>

                                <Text style={styles.totalrequest}>Total Users:</Text>
                                <Text style={styles.cardnumber}> 123</Text>

                            </TouchableOpacity>

                        </View>
                        </View>

                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({

    root:{
        backgroundColor: '#dff0fb',
        // paddingTop: 50,
    },

    row3:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight:20,
    },

    separator:{
        height:2,
        backgroundColor:"#ced4da",
        marginTop:10,
        marginBottom:20,
        width:'80%',
        marginLeft:5
    },

    title:{
        marginLeft:20,
        fontSize:25,
        fontWeight:'500',
        paddingTop:10,
        color:'#6c757d'
    },

    title2:{
        marginLeft:20,
        fontSize:15,
        fontWeight:'500',
        paddingTop:10,
        color:'#6c757d'
    },


    title3:{
        marginLeft:10,
        fontSize:18,
        fontWeight:'500',
        paddingTop:10
    },

    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 270,
    },

    container:{
        backgroundColor: '#dff0fb',
        paddingLeft:20,
        paddingRight:30,
        height: '1000%',
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
        justifyContent: 'space-evenly',
    },

    row2:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft:15
    },

    roundcard: {
        width: 145,
        height: 90,
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#f2f6f9',
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