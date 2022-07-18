import React,{useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { event } from 'react-native-reanimated';
import { Picker } from "@react-native-picker/picker";
import ImgToBase64 from 'react-native-image-base64';
import uuid from 'react-native-uuid';
import { useIsFocused } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddMarketplaceProduct({ navigation }){
    const isFocused = useIsFocused(); //used to refresh upon entering new screen
    const route = useRoute();

    const [itemID, setitemID] = useState();
    const [userID, setuserID] = useState();
    const [itemCategory, setitemCategory] = useState();
    // const [itemDate, setitemDate] = useState();
    const [currentTime,setcurrentTime] = useState('');
    const [itemDesc, setitemDesc] = useState();
    const [itemMode, setitemMode] = useState('');
    const [itemName, setitemName] = useState();
    const [itemPrice, setitemPrice] = useState();
    const [itemStatus, setitemStatus] = useState();
    const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/401/401061.png');
    const [uploadImage, setuploadImage] = useState(null);

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

    const getcurrentTime = () => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        setcurrentTime(
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

    const addItem = async () => {
        // console.log("\nThis is iid : iid" + uuid.v4());
        // console.log("\nThis is CentreName :" + centreName);
        // console.log("\nThis is centreDesc :" + centreDesc);
        // console.log("\nThis is centreAddress :" + centreAddress);
        // console.log("\nThis is centreLatitude :" + centreLatitude);
        // console.log("\nThis is centreLongitude :" + centreLongitude);
        // console.log("\nThis is currentTime :" + currentTime);
        // console.log("\nThis is uploadImage :" + uploadImage);
        
        if (itemCategory == null || itemDesc == null || itemMode == '' || itemName == null || itemStatus == null || uploadImage == null){
            
            alert("Please fill in every criteria.");
        }
        else 
        {
            switch (itemMode) {
                case "Trade":
                    let res = await fetch("https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items", {
                        method: "POST",
                        body: JSON.stringify({
                            itemID: 'iid' + uuid.v4(),
                            userID: userID, //update this when logging
                            itemCategory: itemCategory,
                            itemDate: currentTime,
                            itemDesc: itemDesc,
                            itemMode: itemMode,
                            itemName: itemName,
                            itemPrice: '',
                            itemStatus: itemStatus,
                            itemImage: uploadImage
                        }),
                    }).then((res) => {
                        if (res.status == 200) {
                                alert("Item added successfully.")
                                console.log("Item created successfully");
                                navigation.navigate('ManageMarketplace')
                            } else {
                                alert("Submission failed Error:" + res.status)
                                console.log("Some error occured: ");
                                console.log(res.status)
                                console.log(res)
                            }
                    });
                    
                break;

                case "Sell":
                    if (itemPrice == null){
                        alert("Please fill in item price.");
                    }
                    else{
                        
                        let res1 = await fetch("https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items", {
                        method: "POST",
                        body: JSON.stringify({
                            itemID: 'iid' + uuid.v4(),
                            userID: userID, //update this when logging
                            itemCategory: itemCategory,
                            itemDate: currentTime,
                            itemDesc: itemDesc,
                            itemMode: itemMode,
                            itemName: itemName,
                            itemPrice: itemPrice,
                            itemStatus: itemStatus,
                            itemImage: uploadImage
                        }),
                    }).then((res1) => {
                        if (res1.status == 200) {
                                alert("Item added successfully.")
                                console.log("Item created successfully");
                                navigation.navigate('ManageMarketplace')
                            } else {
                                alert("Submission failed Error:" + res1.status)
                                console.log("Some error occured: ");
                                console.log(res1.status)
                                console.log(res1)
                            }
                    });
                    }
                    
                break;
            }
            
        }
        
    }

    return(
        <ScrollView style={styles.root}>
            <View>
                <Text style={styles.title2}>Title:</Text>
                <View style={styles.sectionStyle}>

                    <Ionicons name='person-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter Title Here"
                        underlineColorAndroid="transparent"
                        value={itemName} onChangeText = {(val) => setitemName(val)}
                    />
                    {/* call the name of user according to the account */}

                </View>
            </View>

            <View>
                <Text style={styles.title2}>Item Description:</Text>
                <View style={styles.sectionStyle2}>
                    
                    <Ionicons name='chatbox-ellipses-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter Description Here"
                        underlineColorAndroid="transparent"
                        multiline={true}
                        value={itemDesc} onChangeText = {(val) => setitemDesc(val)}
                    />
                </View>
            </View>

            <View>

                <Text style={styles.title2}>Item Categories:</Text>
                <View style={styles.sectionStyle3}>
                    <Picker
                        selectedValue={itemCategory}
                        onValueChange={(itemValue, itemIndex) =>
                            setitemCategory(itemValue)
                        }>
                        <Picker.Item label="Select a categories" value="" />
                        <Picker.Item label="Mobile & Accessories" value="MobileAndAccessories" />
                        <Picker.Item label="Automotive" value="Automotive" />
                        <Picker.Item label="Health & Beauty" value="HealthAndBeauty" />
                        <Picker.Item label="Computer & Accessories" value="ComputerAndAccessories" />
                        <Picker.Item label="Clothes" value="Clothes" />
                        <Picker.Item label="Home & Living" value="HomeAndLiving" />
                    </Picker>
                </View>

            </View>

            <View>

                <Text style={styles.title2}>Select Mode:</Text>
                <View style={styles.sectionStyle3}>
                    <Picker
                        selectedValue={itemMode}
                        onValueChange={(itemValue, itemIndex) =>
                            setitemMode(itemValue)
                        }>
                        <Picker.Item label="Select a mode" value="" />
                        <Picker.Item label="Trade" value="Trade" />
                        <Picker.Item label="Sell" value="Sell" />

                    </Picker>
                </View>

            </View>

            <View>
                <Text style={styles.title2}>Item Price:</Text>
                
                <View style={styles.sectionStyle}>

                    <Ionicons name='pricetags-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter Price Here"
                        underlineColorAndroid="transparent"
                        keyboardType='numeric'
                        value={itemPrice} onChangeText = {(val) => setitemPrice(val)}
                    />

                </View>
                <Text>Note: If selected Trade, this field does not need to be filled.</Text>
            </View>

            <View>
            <Text style={styles.title2}>Current Status: {itemStatus}</Text>
                <View style={styles.sectionStyle3}>
                <Picker
                        selectedValue={itemStatus}
                        onValueChange={(itemValue, itemIndex) =>
                        setitemStatus(itemValue)
                        }>
                        <Picker.Item label="Select a Status" value="" />
                        <Picker.Item label="Active" value="Active" />
                        <Picker.Item label="Inactive" value="Inactive" />
                        
                        
                    </Picker>
                </View>
            </View>

            

            

            <View>
                <Text style={styles.title2}>Add Images:</Text>
                <View style={styles.sectionStyle4}>
                    <TouchableOpacity onPress={choosePhotoFromLibrary}>
                    <Image
                        source={{
                        uri:
                            image,
                        }}
                        style={styles.imageStyle2}
                    />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.bottomView]}>

                <TouchableOpacity
                    style={styles.loginScreenButton}
                    onPress={() => addItem()}                    
                    underlayColor='#fff'>
                    <Text style={styles.loginText}>Submit</Text>
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
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        marginBottom:10,
        paddingTop:10
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


export default AddMarketplaceProduct