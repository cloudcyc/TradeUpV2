import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform, SafeAreaView, ImageBackground } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

function AdminShopProduct({ navigation }){

  const route = useRoute();
  const isFocused = useIsFocused(); //used to refresh upon entering new screen
  const [userName, setuserName] = React.useState('');

  const getUserInfo = () =>{
    var getUserAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/users?inputUserID='+route.params.userID;
    fetch(getUserAPI).then((response) => response.json()).then((json) => {
      setuserName(json[0].userFullname);
    }).catch((error) => {
        console.log("Wrong API");
        console.error(error);
    });
  };

  React.useEffect(() => {
    if(isFocused){ 
      getUserInfo();
    }
    
    
},[navigation, isFocused]);

    return(
        <ScrollView style={styles.container}>

        <ImageBackground style={styles.productImg} resizeMode="contain" source={{uri:'https://tradeups3.s3.ap-southeast-1.amazonaws.com/ItemAsset/' +route.params.itemID +'.jpg'}}/>

          <View style={{ marginLeft:20,marginRight:20,height:'100%'}}>

            <View style={styles.row}>
                <Text style={styles.name}>{route.params.itemName}</Text>
                <Text style={styles.price}>RM {route.params.itemPrice}</Text>
                <Text style={styles.price}>By: { userName }</Text>
            </View>

            <Text style={styles.description}>{route.params.itemDesc}</Text>

            <View style={styles.separator}></View>
            <View style={styles.addToCarContainer}>
                <TouchableOpacity style={styles.shareButton2} onPress={() => navigation.navigate('AdminTabs')}>
                <Text style={styles.shareButtonText}>Delete</Text>  
                </TouchableOpacity>

                <TouchableOpacity style={styles.shareButton} onPress={() => navigation.navigate('AdminEditShopProduct')}>
                <Text style={styles.shareButtonText}>Edit Details</Text>  
                </TouchableOpacity>
          </View> 

          </View>

      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10,
        
    },
    productImg:{
      alignSelf:'center',
      width: '100%',
      minHeight:250,
      maxHeight: 250,
      marginBottom:20
    },
    name:{
      fontSize:25,
      color:"black",
      fontWeight:'bold'
    },
    price:{
      marginTop:10,
      fontSize:20,
      color:"#dc2f02",
      fontWeight:'bold',
      paddingBottom:5
    },
    description:{
      marginTop:20,
      paddingLeft:10,
      paddingRight:10,
      paddingBottom:40
    },
    title2:{
        paddingTop: 25,
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom:20
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
    }
  });    

export default AdminShopProduct