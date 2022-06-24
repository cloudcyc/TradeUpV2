import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform, SafeAreaView, ImageBackground } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";


function ManageMarketplaceDetails({ navigation }){

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

  const displayButtons = (inputStatus) => {
    if (inputStatus == "Sold" || inputStatus == "Traded"){
      
    }
    else
    {
      return(
        <View style={styles.addToCarContainer}>
          <TouchableOpacity style={styles.shareButton2} onPress={() => deleteItem()}>
                <Text style={styles.shareButtonText}>Delete</Text>  
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} onPress={() => navigation.navigate('EditMarketplaceDetails', route.params)}>
                <Text style={styles.shareButtonText}>Edit Details</Text>  
          </TouchableOpacity>
        </View>
      )
    }
  }

  const deleteItem = async () => {
    var updateItemAPI = "https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items?NewImage=False&inputItemID="+route.params.itemID;
    let res = await fetch(updateItemAPI, {
        method: "POST",
        body: JSON.stringify({
            itemID: route.params.itemID,
            userID: route.params.userID,
            itemCategory: route.params.itemCategory,
            itemDate: route.params.itemDate,
            itemDesc: route.params.itemDesc,
            itemMode: route.params.itemMode,
            itemName: route.params.itemName,
            itemPrice: route.params.itemPrice,
            itemStatus: "Removed"
        }),
    }).then((res) => {
        if (res.status == 200) {
                alert("Item removed successfully.")
                console.log("Item removed successfully");
                navigation.navigate('ManageMarketplace')
            } else {
                alert("Submission failed Error:" + res.status)
                console.log("Some error occured: ");
                console.log(res.status)
                console.log(res)
            }
    });
  }

  const Statuscolor = (inputStatus) => {
    if (inputStatus == "Active"){
      return(
        <Text style={styles.GreenStatus}>{inputStatus}</Text>
      )
    }
    else
    {
      return(
        <Text style={styles.RedStatus}>{inputStatus}</Text>
      )
    }
  }

  const showPrice = (inputitemMode) => {
    if (inputitemMode == "Sell"){
      return(
        <Text style={styles.price}>RM {route.params.itemPrice}</Text>
      )
    }
  }

    return(
        <View style={styles.container}>
        <ScrollView>
          <View >
            <ImageBackground style={styles.productImg} resizeMode="contain" source={{uri:'https://tradeups3.s3.ap-southeast-1.amazonaws.com/ItemAsset/' + route.params.itemID +'.jpg'}}/>
            <Text style={styles.name}>{route.params.itemName}</Text> 
            {Statuscolor(route.params.itemStatus)}
            {showPrice(route.params.itemMode)}
            <Text style={styles.price}>By: { userName }</Text>
            <Text style={styles.description}>{route.params.itemDesc}</Text>
          </View>

          <View style={styles.separator}></View>
          {displayButtons(route.params.itemStatus)}
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    productImg:{
      alignSelf:'center',
      width: '100%',
      minHeight:250,
      maxHeight: 250,
      marginBottom:20
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
      fontSize:18,
      color:"grey",
      fontWeight:'bold'
    },
    RedStatus:{
      paddingLeft:20,
      paddingRight:20,
      marginTop:10,
      fontSize:18,
      color:"#dc2f02",
      fontWeight:'bold'
    },
    GreenStatus:{
      paddingLeft:20,
      paddingRight:20,
      marginTop:10,
      fontSize:18,
      color:"#02DC13",
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
    }
  });    

export default ManageMarketplaceDetails