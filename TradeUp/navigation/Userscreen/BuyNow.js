import React,{useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { event } from 'react-native-reanimated';
import { Picker } from "@react-native-picker/picker";
import uuid from 'react-native-uuid';
import { useIsFocused } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function BuyNow({ navigation }){
    const route = useRoute();
    const isFocused = useIsFocused();

    
    const [createdTime, setcreatedTime] = useState(null);
    
    const [location, setlocation] = useState(null);
    
    const [paymentMethod, setpaymentMethod] = useState(null);
    const [totalBill, settotalBill] = useState(route.params.itemPrice);
    const [sellerID, setsellerID] = useState(route.params.userID);
    const [userID, setuserID] = useState(null);
    const [displayLocation, setdisplayLocation] = useState("Location:");
    
    const getcurrentTime = () => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        setcreatedTime(
          date + '/' + month + '/' + year 
          + ' ' + hours + ':' + min + ':' + sec
        );
    }

    const retrieveUserID  = async () =>{
        try {
          const value = await AsyncStorage.getItem('userID')
          if(value != null) {
            // value previously stored
            console.log(value);
            setuserID(value);
            
          }
        } catch(e) {
          // error reading value
          console.log(e);
        }
      }
        
    useEffect(() => {
        retrieveUserID();
        getcurrentTime();
    },[navigation, isFocused]);

    const locationMode = (inputBillingMethod) =>{
    if (inputBillingMethod == "COD"){
        setdisplayLocation("Meet up location:");
        setpaymentMethod(inputBillingMethod);
    }else if (inputBillingMethod == "Bank Transfer"){
        setdisplayLocation("Delivery location:");
        setpaymentMethod(inputBillingMethod);
    }else{
        setdisplayLocation("Location:");
        setpaymentMethod(inputBillingMethod);
    }
    }

    const payNow = async (inputpaymentMethod) => {
        if (location == null || paymentMethod == null){
            alert("Please fill in every criteria.");
        }else{
            switch (inputpaymentMethod) {
                case "COD":
                    let res = await fetch("https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/receipts", {
                method: "POST",
                body: JSON.stringify({
                    receiptID: 're' + uuid.v4(),
                    itemID: route.params.itemID,
                    buyerID: userID, //update this when logging
                    sellerID: sellerID,
                    paymentMethod: paymentMethod,
                    meetLocation: location,
                    deliverLocation: '',
                    totalBill: route.params.itemPrice,
                    createdTime: createdTime,
                    decoyView: "True",
                }),
              }).then((res) => {
                if (res.status == 200) {
                        alert("Successfully purchased.")
                        updateItem();
                      } else {
                        alert("Submission failed Error:" + res.status)
                        console.log("Some error occured: ");
                        console.log(res.status)
                        console.log(res)
                      }
              });
                break;
                case "Bank Transfer":
                    let res1 = await fetch("https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/receipts", {
                method: "POST",
                body: JSON.stringify({
                    receiptID: 're' + uuid.v4(),
                    itemID: route.params.itemID,
                    buyerID: userID, //update this when logging
                    sellerID: sellerID,
                    paymentMethod: paymentMethod,
                    meetLocation: '',
                    deliverLocation: location,
                    totalBill: route.params.itemPrice,
                    createdTime: createdTime,
                    decoyView: "True",
                }),
                }).then((res1) => {
                    if (res1.status == 200) {
                            alert("Successfully purchased.")
                            updateItem();
                        } else {
                            alert("Submission failed Error:" + res1.status)
                            console.log("Some error occured: ");
                            console.log(res1.status)
                            console.log(res1)
                        }
                });
                break;

        }
 
        }
    }

    const updateItem = async () => {
        var updateItemAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items?';
        updateItemAPI = updateItemAPI + "NewImage=False&inputItemID="+route.params.itemID;
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
                itemStatus: "Sold"
            }),
        }).then((res) => {
            if (res.status == 200) {
                navigation.navigate('HomeTabs')
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
        <ScrollView style={styles.root}>
            <View>
                <Text style={styles.title2}>Billing methods:</Text>
                <View style={styles.sectionStyle1}>
                <Picker
                        selectedValue={paymentMethod}
                        onValueChange={(itemValue, itemIndex) =>
                        locationMode(itemValue)
                        }>
                        <Picker.Item label="Select a billing method" value='' />
                        <Picker.Item label="COD" value="COD" />
                        <Picker.Item label="Bank Transfer" value="Bank Transfer" />

                    </Picker>
                </View>
            </View>
            
            <View>
                <Text style={styles.title2}>{displayLocation}</Text>
                <View style={styles.sectionStyle2}>
                    
                    <Ionicons name='location-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter Delivery Address Here"
                        underlineColorAndroid="transparent"
                        multiline={true}
                        value={location} onChangeText = {(val) => setlocation(val)}
                    />
                </View>
            </View>

            <View>
                <Text style={styles.title2}>Total:</Text>
                <View style={styles.sectionStyle}>

                    <Ionicons name='person-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter Name Here"
                        underlineColorAndroid="transparent"
                        editable = {false}
                        value= {"RM " + totalBill} 
                    />
                    {/* call the name of user according to the account */}

                </View>
            </View>

            <View style={[styles.bottomView]}>

                <TouchableOpacity
                    style={styles.loginScreenButton}
                    onPress={() => payNow(paymentMethod)}                    
                    underlayColor='#fff'>
                    <Text style={styles.loginText}>Pay</Text>
                </TouchableOpacity>

            </View>
                
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    root:{
        backgroundColor: 'white',
        height:'100%',
        paddingLeft:20,
        paddingRight:20
    },

    container:{
        backgroundColor: '#E9ECEF',
        borderRadius: 40,
        height: '100%',
    },

    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00BFFF',
        textAlign:'center'
    },

    description:{
        paddingTop:10,
        fontSize: 15,
        color: 'gray',
        textAlign:'center'
    },

    title2:{
        paddingTop: 25,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00BFFF',
    },

    title3:{
        paddingTop: 5,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fb5607',
    },

    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        height: 50,
        borderRadius: 5,
        marginTop: 10,
        marginBottom:10,
    },

    sectionStyle2: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 1,
        height: 100,
        borderRadius: 5,
        marginTop: 10,
        marginBottom:10,
        paddingTop:10
    },

    sectionStyle3: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        height: 50,
        borderRadius: 5,
        marginTop: 10,
        marginBottom:10,
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

    imageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
        marginRight:10,
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

    textInputStyle: {
        flex: 1
    },

    textInputStyle2: {
        flex: 1,
        textAlign:'center',
    },

    button:{
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#90e0ef',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        height:45,
        alignSelf:'flex-end',
        width:'40%'
    },

    button2:{
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#4166f5',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        height:45,
        alignSelf:'flex-end',
        width:'40%',
    },

    submitText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10
    },

    row:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom:10
    },

    loginScreenButton:{
        marginTop:10,
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

    loginText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10
    },

    bottomView:{
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        width:'100%',
    },

})


export default BuyNow