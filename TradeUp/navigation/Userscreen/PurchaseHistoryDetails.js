import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform, SafeAreaView, ImageBackground } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

function PurchaseHistoryDetails({ navigation }){
  const route = useRoute();
  const isFocused = useIsFocused(); //used to refresh upon entering new screen
  //Buyer
  const [buyerName, setbuyerName] = React.useState('');

  //Seller
  const [sellerName, setsellerName] = React.useState('');
  const [itemName, setitemName] = React.useState('');
  const [itemDesc, setitemDesc] = React.useState('');

  const getBuyerInfo = () =>{
    var getUserAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/users?inputUserID='+route.params.buyerID;
    fetch(getUserAPI).then((response) => response.json()).then((json) => {
      setbuyerName(json[0].userFullname);
    }).catch((error) => {
        console.log("Wrong API");
        console.error(error);
    });
  };
  const getSellerInfo = () =>{
    var getUserAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/users?inputUserID='+route.params.sellerID;
    fetch(getUserAPI).then((response) => response.json()).then((json) => {
      setsellerName(json[0].userFullname);
    }).catch((error) => {
        console.log("Wrong API");
        console.error(error);
    });
  };

  const getitemInfo = () =>{
    var getItemAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items?inputItemID='+ route.params.itemID;
    
    fetch(getItemAPI).then((response) => response.json()).then((json) => {
      setitemName(json[0].itemName);
      setitemDesc(json[0].itemDesc);
      // setitemInfo(json);
      // console.log(itemInfo);
    }).catch((error) => {
        console.log("Wrong API");
        console.error(error);
    });
  };

  React.useEffect(() => {
    if(isFocused){ 
      getBuyerInfo();
      getSellerInfo();
      getitemInfo();
    }
  },[navigation, isFocused]);

  const showLocation = (inputPaymentMode) => {
    if (inputPaymentMode == "COD"){
      return(
        <View style={styles.row}>
                <Text style={styles.title}>Meet Location: </Text>
                <Text style={styles.Desc}>{route.params.meetLocation}</Text>
        </View>
      )
    }
    else if (inputPaymentMode == "Bank Transfer"){
      return(
        <View style={styles.row}>
                <Text style={styles.title}>Deliver Location: </Text>
                <Text style={styles.Desc}>{route.params.deliverLocation}</Text>
            </View>
      )
    }
  }

    return(
        <View style={styles.container}>
        <ScrollView>
          <View >
            <ImageBackground style={styles.productImg} resizeMode="contain" source={{uri:'https://tradeups3.s3.ap-southeast-1.amazonaws.com/ItemAsset/' +route.params.itemID +'.jpg'}}/>
            <Text style={styles.name}>{itemName} - {itemDesc}</Text>

            <View style={styles.row}>
                <Text style={styles.title}>Seller Name:</Text>
                <Text style={styles.Desc}>{sellerName}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.title}>Phone:</Text>
                <Text style={styles.Desc}>0123456789</Text>
                {/* //remember to update */}
            </View>

            <View style={styles.row}>
                <Text style={styles.title}>Buyer Name:</Text>
                <Text style={styles.Desc}>{buyerName}</Text>
            </View>
            
            <View style={styles.row}>
                <Text style={styles.title}>Phone:</Text>
                <Text style={styles.Desc}>0123456789</Text>
                {/* //remember to update */}
            </View>

            <View style={styles.row}>
                <Text style={styles.title}>Payment method:</Text>
                <Text style={styles.Desc}>{route.params.paymentMethod}</Text>
                {/* //remember to update */}
            </View>

            {showLocation(route.params.paymentMethod)}
            

          </View>

          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
          {/* <TouchableOpacity style={styles.shareButton2} onPress={() => navigation.navigate('PurchaseHistory')}>
              <Text style={styles.shareButtonText}>Cancel Order</Text>  
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.shareButton} onPress={() => navigation.navigate('PurchaseHistory')}>
              <Text style={styles.shareButtonText}>Back</Text>  
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
      position: 'absolute',
  
  },
  
  Desc:{
      paddingLeft:20,
      paddingTop: 15,
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: '36%',
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
    },
    name:{
      paddingLeft:20,
      paddingRight:20,
      fontSize:18,
      paddingBottom:10
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
    }
  });    

export default PurchaseHistoryDetails