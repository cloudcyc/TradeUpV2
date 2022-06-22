import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform, SafeAreaView, ImageBackground } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { createOpenLink } from 'react-native-open-maps';
function TradeDetailScreen({ navigation }){
  const route = useRoute();
  const isFocused = useIsFocused(); //used to refresh upon entering new screen
  const coordinate = { latitude: parseFloat(route.params.requestMeetCoordinate[1]) , longitude: parseFloat(route.params.requestMeetCoordinate[0]) };
  console.log(route.params.requestMeetCoordinate[0] + " " + route.params.requestMeetCoordinate[1]);
  const openCoordinate = createOpenLink({ ...coordinate, zoom: 20 });


  //From user
  const [fromUserName, setfromUserName] = React.useState('');

  //Posted by Another User
  const [itemName, setitemName] = React.useState('');
  const [itemDesc, setitemDesc] = React.useState('');

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
            <View style={styles.row}>
                <Text style={styles.title}>Item Name:</Text>
                <Text style={styles.Desc}>{route.params.requestItemID}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.title}>Description:</Text>
                <Text style={styles.Desc}>{route.params.requestTradeItemDesc}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.title}>Status:</Text>
                <Text style={styles.Desc}>{route.params.requestTradeStatus}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.title}>Meet Up Location:</Text>
                <View>
                  <Text style={styles.Desc}>{route.params.requestMeetLocation}</Text>
                  <TouchableOpacity
                        style={styles.loginScreenButton3}
                        onPress={openCoordinate}
                        underlayColor='#fff'>
                        <Text style={styles.loginText}>View in Map</Text>
                    </TouchableOpacity>
                  </View>
            </View>

            
            
            <View style={styles.row}>
                <Text style={styles.title}>Attachment:</Text>
                <Image style={styles.productImg2} resizeMode="contain" source={{uri:'https://tradeups3.s3.ap-southeast-1.amazonaws.com/RequestAsset/' + route.params.requestID +'.jpg'}}/>
            </View>

          </View>

          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
          <TouchableOpacity style={styles.shareButton2} onPress={() => navigation.navigate('MyTradeRequest')}>
              <Text style={styles.shareButtonText}>Delete</Text>  
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={() => navigation.navigate('EditTradeRequest')}>
              <Text style={styles.shareButtonText}>Edit Request</Text>  
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
      marginLeft: '40%',
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
    marginLeft:'68%',
    height:45,
    marginBottom:20
},

  loginText:{
    color:'white',
    alignSelf:'center'
  }
  });    

export default TradeDetailScreen