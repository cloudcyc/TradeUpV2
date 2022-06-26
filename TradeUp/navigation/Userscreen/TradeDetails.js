import React,{useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform, SafeAreaView, ImageBackground } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { createOpenLink } from 'react-native-open-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImgToBase64 from 'react-native-image-base64';
import ImagePicker from 'react-native-image-crop-picker';

function TradeDetailScreen({ navigation }){
  const route = useRoute();
  const isFocused = useIsFocused(); //used to refresh upon entering new screen
  // const coordinate = { latitude: parseFloat(route.params.requestMeetCoordinate[1]) , longitude: parseFloat(route.params.requestMeetCoordinate[0]) };
  // console.log(route.params.requestMeetCoordinate[0] + " " + route.params.requestMeetCoordinate[1]);
  // const openCoordinate = createOpenLink({ ...coordinate, zoom: 20 });


  //From user
  const [fromUserName, setfromUserName] = React.useState('');

  //Posted by Another User
  const [itemName, setitemName] = React.useState('');
  const [itemDesc, setitemDesc] = React.useState('');
  const [image, setImage] = useState('https://tradeups3.s3.ap-southeast-1.amazonaws.com/RequestAsset/' + route.params.requestID +'.jpg');


  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        console.log(image);
        ImgToBase64.getBase64String(image.path)
            .then(base64String => 
                setuploadImage(base64String)
                )
            .catch(err => 
                alert("Something wrong here. Error: " + err)
                );
        setImage(image.path);
      });
};

  const getfromUserInfo = () =>{
    var getUserAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/users?inputUserID='+route.params.requestTradeToID;
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
        setitemName(json[0].itemName);
        setitemDesc(json[0].itemDesc);
        // setitemInfo(json);
        // console.log(itemInfo);
      }).catch((error) => {
          console.log("Wrong API");
          console.error(error);
      });
    };

    
    const cancelRequest = async () => {
            let res = await fetch("https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/requests?NewImage=False&inputRequestID="+route.params.requestID, {
                        method: "POST",
                        body: JSON.stringify({
                            requestID:  route.params.requestID,
                            requestTradeItemName: route.params.requestTradeItemName, 
                            requestTradeItemDesc:  route.params.requestTradeItemDesc,
                            requestTradeDate:  route.params.requestTradeDate,
                            requestTradeStatus: "Canceled",
                            requestTradeToID: route.params.requestTradeToID,
                            requestTradeFromID:  route.params.requestTradeFromID,
                            requestItemID: route.params.requestItemID,
                            requestMeetLocation:  route.params.requestMeetLocation,
                        }),
                    }).then((res) => {
                        if (res.status == 200) {
                                alert("Request canceled successfully.")
                                navigation.navigate('MyTradeRequest', {userID: route.params.requestTradeFromID})
                            } else {
                                alert("Submission failed Error:" + res.status)
                                console.log("Some error occured: ");
                                console.log(res.status)
                                console.log(res)
                            }
                    });  
        
        
    }

    const displayButtons = (inputStatus) => {
      if (inputStatus == "Rejected" || inputStatus == "Canceled"){
        
      }
      else
      {
        return(
          <View style={styles.addToCarContainer}>
          <TouchableOpacity style={styles.shareButton2} onPress={() => cancelRequest()}>
              <Text style={styles.shareButtonText}>Cancel Request</Text>  
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={() => navigation.navigate('EditTradeRequest', route.params)}>
              <Text style={styles.shareButtonText}>Edit Request</Text>  
            </TouchableOpacity>
          </View> 
        )
      }
    }
  
  React.useEffect(() => {
    if(isFocused){ 
      getitemInfo();
      getfromUserInfo();
    }
  },[navigation, isFocused]);

    return(
        <View style={styles.container}>
        <ScrollView>
          <View >
            {/* i want */}
            <ImageBackground style={styles.productImg} resizeMode="contain" source={{uri:'https://tradeups3.s3.ap-southeast-1.amazonaws.com/ItemAsset/' + route.params.requestItemID +'.jpg'}}/>
            <Text style={styles.name}>{itemName}</Text>
            <Text style={styles.price}>Post By: {fromUserName}</Text>
            <Text style={styles.price}>Description: {itemDesc}</Text>

            {/* i trade with */}
                <Text style={styles.title}>Request Trade Item Name:</Text>
                <View style={styles.sectionStyle}>

                    <Ionicons name='briefcase-outline' size={25} style={{paddingLeft:5, paddingRight:10}} />
                    <TextInput
                        style={styles.Desc}
                        placeholder={route.params.requestTradeItemName}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="black"
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
                    />

                </View>

                <Text style={styles.title}>Status:</Text>
                <View style={styles.sectionStyle}>

                    <Ionicons name='pulse-outline' size={25} style={{paddingLeft:5, paddingRight:10}} />
                    <TextInput
                        style={styles.Desc}
                        placeholder={route.params.requestTradeStatus}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="black"
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
                    />

                </View>
                 

                <View style={styles.row}>
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
                </View>
            
            {/* <View style={styles.row}>
                <Text style={styles.title2}>Attachment:</Text>
                <Image style={styles.productImg2} resizeMode="contain" source={{uri:'https://tradeups3.s3.ap-southeast-1.amazonaws.com/RequestAsset/' + route.params.requestID +'.jpg'}}/>
            </View> */}

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

imageStyle2: {
  padding: 10,
  margin: 5,
  height: 120,
  width: 120,
  resizeMode: 'stretch',
  justifyContent: 'center',
  alignSelf: 'center',
  marginRight:10,
  alignContent:'center',
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
      marginLeft: '43%',
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

sectionStyle4: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderWidth: 1,
  height: 150,
  borderRadius: 5,
  marginTop: 10,
  marginBottom:10,
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



export default TradeDetailScreen