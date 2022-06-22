import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform, SafeAreaView, ImageBackground } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { createOpenLink } from 'react-native-open-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
function ViewTradeRequestDetails({ navigation }){


    return(
        <View style={styles.container}>
        <ScrollView>
          <View >
            {/* i want */}
            <ImageBackground style={styles.productImg} resizeMode="contain" source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_Homepage.svg/800px-Google_Homepage.svg.png'}}/>
            <Text style={styles.name}>XXX</Text>
            <Text style={styles.price}>Post By: XXX</Text>
            <Text style={styles.price}>Description: XXX</Text>

            {/* i trade with */}
                <Text style={styles.title}>Request Trade Item Name:</Text>
                <View style={styles.sectionStyle}>

                    <Ionicons name='briefcase-outline' size={25} style={{paddingLeft:5, paddingRight:10}} />
                    <TextInput
                        style={styles.Desc}
                        placeholder='XXX'
                        underlineColorAndroid="transparent"
                        placeholderTextColor="black"
                    />

                </View>

                <Text style={styles.title}>Description:</Text>
                <View style={styles.sectionStyle}>

                    <Ionicons name='chatbox-ellipses-outline' size={25} style={{paddingLeft:5, paddingRight:10}} />
                    <TextInput
                        style={styles.Desc}
                        placeholder='XXX'
                        underlineColorAndroid="transparent"
                        placeholderTextColor="black"
                    />

                </View>

                <Text style={styles.title}>Status:</Text>
                <View style={styles.sectionStyle}>

                    <Ionicons name='pulse-outline' size={25} style={{paddingLeft:5, paddingRight:10}} />
                    <TextInput
                        style={styles.Desc}
                        placeholder='XXX'
                        underlineColorAndroid="transparent"
                        placeholderTextColor="black"
                    />

                </View>

                <View style={styles.row2}>
                <Text style={styles.title}>Meet Up Location:</Text>

                <TouchableOpacity
                        style={styles.loginScreenButton3}
                        underlayColor='#fff'>
                        <Text style={styles.loginText}>View in Map</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.sectionStyle}>

                    <Ionicons name='location-outline' size={25} style={{paddingLeft:5, paddingRight:10}} />
                    <TextInput
                        style={styles.Desc}
                        placeholder='XXX'
                        underlineColorAndroid="transparent"
                        placeholderTextColor="black"
                    />

                </View>
                 

            
            
            <View style={styles.row}>
                <Text style={styles.title2}>Attachment:</Text>
                <Image style={styles.productImg2} resizeMode="contain" source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_Homepage.svg/800px-Google_Homepage.svg.png'}}/>
            </View>

          </View>

          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
          <TouchableOpacity style={styles.shareButton2} onPress={() => navigation.navigate('MyTradeRequest')}>
              <Text style={styles.shareButtonText}>Reject</Text>  
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={() => navigation.navigate('EditTradeRequest')}>
              <Text style={styles.shareButtonText}>Accept</Text>  
            </TouchableOpacity>
          </View> 
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    row: {
      padding: 10,
      flexDirection: "row",
      marginRight: 5,
      justifyContent: "flex-start",
      width: '95%',
  },

  row2: {
    flexDirection: "row",
    marginRight: 5,
    marginBottom: 3,
    justifyContent: "flex-start",
    width: '95%',
},
  
  title:{
      paddingLeft:20,
      paddingTop: 24,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2a9d8f',
  
  },

  title2:{
    paddingLeft:20,
    paddingTop: 24,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2a9d8f',
    position: 'absolute',

},
  
  Desc:{
      paddingLeft:20,
      fontSize: 18,
      fontWeight: 'bold',
  },

  Desc2:{
    paddingLeft:20,
    paddingTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: '50%',
},
    productImg:{
      alignSelf:'center',
      width: '100%',
      minHeight:230,
      maxHeight: 250,
      marginBottom:20
    },
    productImg2:{
      alignSelf:'center',
      width: 200,
      height: 120,
      alignSelf:'flex-end',
      marginLeft: '42%',
      marginTop:20
    },
    name:{
      paddingLeft:20,
      paddingRight:20,
      fontSize:28,
      color:"black",
      fontWeight:'bold'
    },
    price:{
      paddingLeft:20,
      paddingRight:20,
      marginTop:10,
      fontSize:15,
      color:"grey",
      fontWeight:'bold'
    },
    description:{
      marginTop:20,
      paddingLeft:20,
      paddingRight:20,
    },
    star:{
      width:40,
      height:40,
    },
    btnColor: {
      height:30,
      width:30,
      borderRadius:30,
      marginHorizontal:3
    },
    btnSize: {
      height:40,
      width:40,
      borderRadius:40,
      borderColor:'#778899',
      borderWidth:1,
      marginHorizontal:3,
      backgroundColor:'white',
  
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    starContainer:{
      justifyContent:'center', 
      marginHorizontal:30, 
      flexDirection:'row', 
      marginTop:20
    },
    contentColors:{ 
      justifyContent:'center', 
      marginHorizontal:30, 
      flexDirection:'row', 
      marginTop:20
    },
    contentSize:{ 
      justifyContent:'center', 
      marginHorizontal:30, 
      flexDirection:'row', 
      marginTop:20
    },
    separator:{
      height:2,
      backgroundColor:"#eeeeee",
      marginTop:20,
      marginHorizontal:30
    },
    shareButton: {
      marginTop:20,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      backgroundColor: "#00BFFF",
      width:'50%',
      marginRight:10,
      marginLeft:10
    },
    shareButton2: {
      marginTop:20,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      backgroundColor: "red",
      width:'50%',
      marginRight:10,
      marginLeft:10
    },
    shareButtonText:{
      color: "#FFFFFF",
      fontSize:20,
    },
    addToCarContainer:{
      marginHorizontal:30,
      marginBottom:20,
      flexDirection:'row', 
      justifyContent: 'center',
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

  loginScreenButton3:{
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#4cc9f0',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft:'20%',
    height:45,
    width:'30%'
},

  loginText:{
    color:'white',
    alignSelf:'center'
  },

  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    height: 50,
    borderRadius: 5,
    marginTop: 10,
    marginBottom:10,
    marginLeft:20,
    marginRight:20
},

sectionStyle2: {
  alignItems: 'center',
  backgroundColor: '#fff',
  borderWidth: 1,
  height: 50,
  borderRadius: 5,
  marginTop: 10,
  marginBottom:10,
  marginLeft:20,
  marginRight:20
},
  });    



export default ViewTradeRequestDetails