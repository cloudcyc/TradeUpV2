import React,{useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform, SafeAreaView, ImageBackground } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { createOpenLink } from 'react-native-open-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
function ViewTradeRequestDetails({ navigation }){
  const route = useRoute();
  const isFocused = useIsFocused();

  //From user
  const [fromUserName, setfromUserName] = useState('');

  //Posted by Another User
    const [itemID, setitemID] = useState('');
    const [userID, setuserID] = useState('');
    const [itemCategory, setitemCategory] = useState('');
    const [itemDate, setitemDate] = useState('');
    const [itemDesc, setitemDesc] = useState('');
    const [itemMode, setitemMode] = useState('');
    const [itemName, setitemName] = useState('');
    const [itemPrice, setitemPrice] = useState('');
    //Item status neeed to be updated once accepted
    // const [itemStatus, setitemStatus] = useState('');

  const getfromUserInfo = () =>{
    var getUserAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/users?inputUserID='+route.params.requestTradeFromID;
    fetch(getUserAPI).then((response) => response.json()).then((json) => {
      setfromUserName(json[0].userFullname);
    }).catch((error) => {
        console.log("Wrong API");
        console.error(error);
    });
  };

  const getitemInfo = () =>{
      var getItemAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items?inputItemID='+ route.params.requestItemID;
      
      fetch(getItemAPI).then((response) => response.json()).then((json) => {
        setitemID(json[0].itemID);
        setuserID(json[0].userID);
        setitemCategory(json[0].itemCategory);
        setitemDate(json[0].itemDate);
        setitemMode(json[0].itemMode);
        setitemPrice(json[0].itemPrice);
        setitemName(json[0].itemName);
        setitemDesc(json[0].itemDesc);
        // setitemInfo(json);
        // console.log(itemInfo);
      }).catch((error) => {
          console.log("Wrong API");
          console.error(error);
      });
    };

    useEffect(() => {
      if(isFocused){ 
        getitemInfo();
        getfromUserInfo();
      }
    },[navigation, isFocused]);


    //Not sure why it hit Error
    const removePendingItem = async (inputRequestItemID, inputNewStatus) => {
      var removePendingRequestAPI = "https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/requests?inputRequestItemID="+inputRequestItemID+"&inputNewStatus="+inputNewStatus;
      let res = await fetch(removePendingRequestAPI, {
          method: "POST",
      }).then((res) => {
          if (res.status == 200) {
              navigation.navigate('ViewTradeRequest', {userID: route.params.requestTradeToID})
              } else {
                  // alert("Submission failed Error:" + res.status)
                  navigation.navigate('ViewTradeRequest', {userID: route.params.requestTradeToID})
                  console.log("Some error occured: ");
                  console.log(res.status)
                  console.log(res)
              }
      });
    }

    const decisionRequest = async (inputDecision) => {
      if (inputDecision == "Accept"){
        let res = await fetch("https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/requests?NewImage=False&inputRequestID="+route.params.requestID, {
                  method: "POST",
                  body: JSON.stringify({
                      requestID:  route.params.requestID,
                      requestTradeItemName: route.params.requestTradeItemName, 
                      requestTradeItemDesc:  route.params.requestTradeItemDesc,
                      requestTradeDate:  route.params.requestTradeDate,
                      requestTradeStatus: "Accepted",
                      requestTradeToID: route.params.requestTradeToID,
                      requestTradeFromID:  route.params.requestTradeFromID,
                      requestItemID: route.params.requestItemID,
                      requestMeetLocation:  route.params.requestMeetLocation,
                  }),
              }).then((res) => {
                  if (res.status == 200) {
                    alert("Request Accepted successfully.");
                    updateItem();
                    removePendingItem(route.params.requestItemID, "Rejected");
                          
                      } else {
                          alert("Submission failed Error321:" + res.status)
                          console.log("Some error occured: ");
                          console.log(res.status)
                          console.log(res)
                      }
              });  
      }
      else if (inputDecision == "Reject"){
        let res = await fetch("https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/requests?NewImage=False&inputRequestID="+route.params.requestID, {
                  method: "POST",
                  body: JSON.stringify({
                      requestID:  route.params.requestID,
                      requestTradeItemName: route.params.requestTradeItemName, 
                      requestTradeItemDesc:  route.params.requestTradeItemDesc,
                      requestTradeDate:  route.params.requestTradeDate,
                      requestTradeStatus: "Rejected",
                      requestTradeToID: route.params.requestTradeToID,
                      requestTradeFromID:  route.params.requestTradeFromID,
                      requestItemID: route.params.requestItemID,
                      requestMeetLocation:  route.params.requestMeetLocation,
                  }),
              }).then((res) => {
                  if (res.status == 200) {
                          alert("Request rejected successfully.")
                          navigation.navigate('ViewTradeRequest', {userID: route.params.requestTradeToID})
                      } else {
                          alert("Submission failed Error:" + res.status)
                          console.log("Some error occured: ");
                          console.log(res.status)
                          console.log(res)
                      }
              });  
      }
    }

    const displayButtons = (inputStatus) => {
      if (inputStatus == "Rejected" || inputStatus == "Accepted" || inputStatus == "Item Removed by Owner" || inputStatus == "Item Removed by Admin" ){
        
      }
      else
      {
        return(
          <View style={styles.addToCarContainer}>
          <TouchableOpacity style={styles.shareButton2} onPress={() => decisionRequest("Reject")}>
              <Text style={styles.shareButtonText}>Reject</Text>  
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={() => decisionRequest("Accept")}>
              <Text style={styles.shareButtonText}>Accept</Text>  
            </TouchableOpacity>
          </View> 
        )
      }
    }

    const updateItem = async () => {
              var updateItemAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items?';
              updateItemAPI = updateItemAPI + "NewImage=False&inputItemID="+itemID;
              let res = await fetch(updateItemAPI, {
                  method: "POST",
                  body: JSON.stringify({
                      itemID: itemID,
                      userID: userID,
                      itemCategory: itemCategory,
                      itemDate: itemDate,
                      itemDesc: itemDesc,
                      itemMode: itemMode,
                      itemName: itemName,
                      itemPrice: itemPrice,
                      itemStatus: "Traded"
                  }),
              }).then((res) => {
                  if (res.status == 200) {
                      
                      } else {
                          alert("Submission failed Error:" + res.status)
                          console.log("Some error occured: ");
                          console.log(res.status)
                          console.log(res)
                      }
              });
              // navigation.navigate('ManageMarketplace')
          
    }

    return(
      <View style={styles.container}>
      <ScrollView>
        <View >
          {/* i want */}
          <ImageBackground style={styles.productImg} resizeMode="contain" source={{uri:'https://tradeups3.s3.ap-southeast-1.amazonaws.com/ItemAsset/' + route.params.requestItemID +'.jpg'}}/>
          <Text style={styles.name}>{itemName}</Text>
          <Text style={styles.price}>Description: {itemDesc}</Text>

          {/* i trade with */}
          <Text style={styles.title}>Request By:</Text>
              <View style={styles.sectionStyle}>

                  <Ionicons name='briefcase-outline' size={25} style={{paddingLeft:5, paddingRight:10}} />
                  <TextInput
                      style={styles.Desc}
                      placeholder={fromUserName}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="black"
                      editable= {false}
                  />

              </View>
              <Text style={styles.title}>Request Trade Item Name:</Text>
              <View style={styles.sectionStyle}>

                  <Ionicons name='briefcase-outline' size={25} style={{paddingLeft:5, paddingRight:10}} />
                  <TextInput
                      style={styles.Desc}
                      placeholder={route.params.requestTradeItemName}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="black"
                      editable= {false}
                  />

              </View>

              <Text style={styles.title}>Description:</Text>
              <View style={styles.sectionStyle}>

                  <Ionicons name='chatbox-ellipses-outline' size={25} style={{paddingLeft:5, paddingRight:10}} />
                  <TextInput
                      style={styles.Desc}
                      placeholder={route.params.requestTradeItemDesc}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="black"
                      editable= {false}
                  />

              </View>


              <View style={styles.row2}>
              <Text style={styles.title}>Meet Up Location:</Text>

              {/* <TouchableOpacity
                      style={styles.loginScreenButton3}
                      onPress={openCoordinate}
                      underlayColor='#fff'>
                      <Text style={styles.loginText}>View in Map</Text>
                  </TouchableOpacity> */}
              </View>
              <View style={styles.sectionStyle}>

                  <Ionicons name='location-outline' size={25} style={{paddingLeft:5, paddingRight:10}} />
                  <TextInput
                      style={styles.Desc}
                      placeholder={route.params.requestMeetLocation}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="black"
                      editable= {false}
                  />

              </View>
               

              {/* <View style={styles.row}>
                  <Text style={styles.title2}>Attachment:</Text>
                  <View>
                      <TouchableOpacity onPress={choosePhotoFromLibrary}>
                      <Image
                          source={{
                          uri:
                              image,
                          }}
                          style={styles.productImg2}
                          resizeMode="contain"
                      />
                      </TouchableOpacity>
                  </View>
              </View> */}
          
          <View style={styles.row}>
              <Text style={styles.title2}>Attachment:</Text>
              <Image style={styles.productImg2} resizeMode="contain" source={{uri:'https://tradeups3.s3.ap-southeast-1.amazonaws.com/RequestAsset/' + route.params.requestID +'.jpg'}}/>
          </View>

          </View>

          <View style={styles.separator}></View>
          {displayButtons(route.params.requestTradeStatus)}
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