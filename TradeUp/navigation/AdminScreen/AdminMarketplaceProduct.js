import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform, SafeAreaView, ImageBackground, Alert} from 'react-native';
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

function AdminMarketplaceProduct({ navigation }){

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

    const deleteItemFunction = async(inputItemID, inputUserID) => {
      var deleteUserAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items?inputItemID='+ inputItemID + '&inputUserID='+ inputUserID;
      console.log(deleteUserAPI);
      let res = await fetch(deleteUserAPI, {
        method: "DELETE"
      }).then((res) => {
        if (res.status == 200) {
                alert("Item deleted successfully.");
                removePendingItem(route.params.itemID, "Item Removed by Admin");
                
              } else {
                alert("Item delete failed. Error:" + res.status)
                console.log("Some error occured: ");
                console.log(res.status)
                console.log(res)
              }
      });
    };

    const removePendingItem = async (inputRequestItemID, inputNewStatus) => {
      var removePendingRequestAPI = "https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/requests?inputRequestItemID="+inputRequestItemID+"&inputNewStatus="+inputNewStatus;
      let res = await fetch(removePendingRequestAPI, {
          method: "POST",
      }).then((res) => {
          if (res.status == 200) {
              navigation.navigate('AdminTabs');
              } else {
                  alert("Submission failed Error:" + res.status)
                  console.log("Some error occured: ");
                  console.log(res.status)
                  console.log(res)
              }
      });
    }

    const showAlertBox = (inputItemID,inputUserID,inputUserName) => {
      return Alert.alert(
        "Are your sure?",
        "Are you sure you want to delete this Item by "+inputUserName+" ?" ,
        [
          // The "Yes" button
          {
            text: "Yes",
            onPress: () => {
              deleteItemFunction(inputItemID,inputUserID);
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: "No",
          },
        ]
      );
    };

    const displayButtons = (inputStatus) => {
      if (inputStatus == "Active" || inputStatus == "Removed"){
        return (
          <TouchableOpacity style={styles.shareButton2} onPress={() => showAlertBox(route.params.itemID,route.params.userID, userName)}>
              <Text style={styles.shareButtonText}>Remove</Text>  
          </TouchableOpacity>
        )
        
      }
      
    }


    return(
        <View style={styles.container}>
        <ScrollView>
          <View >
            <ImageBackground style={styles.productImg} resizeMode="contain" source={{uri:'https://tradeups3.s3.ap-southeast-1.amazonaws.com/ItemAsset/' +route.params.itemID +'.jpg'}}/>
            <Text style={styles.name}>{route.params.itemName}</Text>
            <Text style={styles.price}>By: { userName }</Text>
            <Text style={styles.description}>{route.params.itemDesc}</Text>
          </View>

          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
          { 
            displayButtons(route.params.itemStatus)
          }
          {/* <TouchableOpacity style={styles.shareButton2} onPress={() => showAlertBox(route.params.itemID,route.params.userID, userName)}>
              <Text style={styles.shareButtonText}>Delete</Text>  
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.shareButton} onPress={() => navigation.navigate('AdminEditMarketplaceProduct')}>
              <Text style={styles.shareButtonText}>Edit Details</Text>  
            </TouchableOpacity> */}
          </View> 
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

export default AdminMarketplaceProduct