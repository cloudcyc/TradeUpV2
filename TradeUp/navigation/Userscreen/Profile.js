import React,{useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
Ionicons.loadFont();


function Profile({ navigation }){
    const isFocused = useIsFocused(); //used to refresh upon entering new screen
    const [userFullname, setUserFullname] = useState('Username');
    const [userEmail, setuserEmail] = useState('Useremail');
    const [userInfo, setUserInfo] = useState([]);

    const getUserFunction = async(inputUserID) => {
        var getUsersAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/users?inputUserID='+ inputUserID;
        fetch(getUsersAPI).then((response) => response.json()).then((json) => {
          // console.log(json);
          // console.log(json[0].userFullname);
          setUserInfo(json);
          // console.log(userInfo);
          setUserFullname(json[0].userFullname);
          setuserEmail(json[0].userEmail);
          // console.log(userFullname);
          
          
        }).catch((error) => {
          console.error(error);
        });
    
      };

      const retrieveUserID  = async () =>{
        try {
          const value = await AsyncStorage.getItem('userID')
          if(value != null) {
            // value previously stored
            getUserFunction(value);
            
          }
        } catch(e) {
          // error reading value
          console.log(e);
        }
      };


      useEffect(() => {
        retrieveUserID();
      }, [navigation,isFocused]);

    const clearAsyncStorage  = () =>{
        try {
             AsyncStorage.removeItem('userID');
          return true;
        }
        catch(exception) {
            return false;
        }
      };
    
      const logoutFunction = () =>{
        console.log(clearAsyncStorage());
        if (clearAsyncStorage() == true){
    
          alert("Logout Success.");
          navigation.navigate('NonMemberHomeTabs');
          console.log("Logout success")
        }
        else{
          alert("Logout fail");
        }
      };

    return(
        <View style={styles.container}>
            <View style = {styles.Header}>
                <Image source={{ uri: "https://tradeups3.s3.ap-southeast-1.amazonaws.com/asset/yaoxi.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaDmFwLXNvdXRoZWFzdC0xIkcwRQIgZRMAZTuBysETvIIE953ztMDe6QQavu86JtTAyiv4QGMCIQDLCsHWZjEA3hWkeymDCgUfETJx6dW%2FlKFxkVPOLpWlKCqFAwhKEAEaDDQzOTAzMzYzNDI5NCIMDAMqzjgsfs48UqRtKuICF3Nisup0JHHO98gg0nJ9SPaXw8yYzhahSKrgad8nfY5XBM2926FPSShM7mlPwqeH1d6BbCIbZt1H2u0yW5NU1gD4XiknxvXZU4iKYr1f%2B3IV9VwUQys347uZF9PexLTeOjlnVgPISExGSBLeJpkDe2WoxJCgM6oICpNo9rfiAexbxZSmf3uKaKuphUPQ7mt0OSqrGQxWDQmB8hrExwBvhBt2M1UNiwq5nGIhVjpH6LET5gL6XIUH4HRislZBnDV6UbQMq40AOCFjeIYzCdCom%2Fyh83pDlwQAfe0aol14bMPJMRgLcZEUfFuEBn9Q7PePkvTIT6xWJuCYWIt8kM5nkZWxJM086JX%2FJ3TmQs7rdfKIBVZ2YACiTy1Q1v6Sv9heM2R95aYZNmJ%2BxAEmLo%2Bm0WcA4fiLehCMGb8OctoRpWLnoCvK6JBVnX4yglN1nfp6OTLIJqee3Wr5nRqneRpx04osMJuar5YGOrMCblurSZ9HQxKDqC3p4lX%2BV3X0MovFkMW0NRV5Qo%2BHgHIuXS9dqReNeSe76Mgr9v3deU0RvFvhSmB8dbFvnUC2w9%2F5weUY%2FmDjeuU6doEGc6LTDD6ur%2FaBxVsM8OnEI4umWGx4QrvR0qzEKW7f1QhpABcuUlGDQNqKmwXVNeIjsXUA2wQFLrmRQD2CQdr4wiW3kwss9EjVevg2MkahKpMTXpOll6XNWOQacmrEofoWH8va5%2B5fcIRC1WlYrLN%2BGuPRtDGQDOP03Exgdu1HShq%2FjcHLdWyePbr6breo0dH5%2FH06OZCLsvgK%2BzXl6lK9rBids0qFaoYrO8vtHJFhYIa1Z8nYyH%2Bqq9rGiiACpuaN8wEaHeuPQ0%2Bi07FJ0GEjuzIxT9RpCjbzICfCIg1kHGXowcyj%2Bw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220711T171502Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAWMODRTX3HTBOGRGD%2F20220711%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=157a97f6951e87f358836776cecd0fa628ea1b2196646c1fb84957e610f075a0" }} style={styles.pic} />
                <View style={styles.ProfileDetail}>
                    <Text style={styles.name}>{userFullname}</Text>
                    <Text style={styles.Email}>{userEmail}</Text>
                </View>
            </View>
            <ScrollView style={styles.bodyContent}>

                <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('EditProfile',userInfo[0])}>
                  <View style={styles.row}>
                      <Ionicons name='person-outline' size={35} />
                      <Text style={styles.ButtonText}>Edit Profile</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('MyTradeRequest',userInfo[0])}>
                  <View style={styles.row}>
                      <Ionicons name='newspaper-outline' size={35} />
                      <Text style={styles.ButtonText}>My Trade Request</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('ViewTradeRequest',userInfo[0])}>
                  <View style={styles.row}>
                      <Ionicons name='albums-outline' size={35} />
                      <Text style={styles.ButtonText}>View Trade Request</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('PurchaseHistory',userInfo[0])}>
                  <View style={styles.row}>
                      <Ionicons name='cart-outline' size={35} />
                      <Text style={styles.ButtonText}>My Purchase History</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('ManageMarketplace',userInfo[0])}>
                  <View style={styles.row}>
                      <Ionicons name='briefcase-outline' size={35} />
                      <Text style={styles.ButtonText}>Manage My Inventory</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('AddNewRequest')}>
                  <View style={styles.row}>
                      <Ionicons name='location-outline' size={35} />
                      <Text style={styles.ButtonText}>Request Missing Location</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.Signoutbutton} onPress={() => logoutFunction()}>
                  <View style={styles.row}>
                      <Ionicons name='power-outline' size={35} color='#FFF' />
                      <Text style={styles.SignoutText}>Sign Out</Text>
                  </View>
              </TouchableOpacity>

            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({

    container:{
        flex:1,
      },
    Header:{
        paddingTop:40,
        paddingLeft:20,
        height:200,
        flexDirection: 'row',
        alignItems:'center',
        borderEndColor:'grey',
        borderEndWidth:1,
        backgroundColor:'#00BFFF'
    },

    pic: {
        borderRadius: 60,
        width: 80,
        height: 80,
    },

    ProfileDetail:{
        paddingLeft:20
    },

    name:{
        paddingBottom:5,
        color:'white',
        fontSize:25,
        fontWeight:'bold'
    },

    Email:{
        paddingBottom:10,
        fontSize:18
    },

    bodyContent: {
        height:'100%'
    },

    ButtonContainer:{
        backgroundColor:'white',
        paddingTop:20,
        paddingBottom:20,
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        borderBottomColor:'#DEE2E6',
        borderBottomWidth:1,
    },

    row: {
        paddingLeft:20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    ButtonText:{
        paddingLeft:15,
        fontSize: 18,
        fontWeight:'400',
    },

    Signoutbutton:{
        backgroundColor:'#e63946',
        paddingTop:20,
        paddingBottom:20,
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        borderBottomColor:'#DEE2E6',
        borderBottomWidth:1,
    },

    SignoutText:{
        paddingLeft:15,
        fontSize: 18,
        fontWeight:'400',
        color: '#FFF',
    },

})

export default Profile