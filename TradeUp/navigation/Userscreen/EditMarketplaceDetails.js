import React,{useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from "@react-native-picker/picker";
import { event } from 'react-native-reanimated';
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import ImgToBase64 from 'react-native-image-base64';

function EditMarketplaceDetails({ navigation }){
    const route = useRoute();
    const isFocused = useIsFocused(); //used to refresh upon entering new screen

    const [itemID, setitemID] = useState(route.params.itemID);
    const [userID, setuserID] = useState(route.params.userID);
    const [itemCategory, setitemCategory] = useState(route.params.itemCategory);
    const [itemDate, setitemDate] = useState(route.params.itemDate);
    const [itemDesc, setitemDesc] = useState(route.params.itemDesc);
    const [itemMode, setitemMode] = useState(route.params.itemMode);
    const [itemName, setitemName] = useState(route.params.itemName);
    const [itemPrice, setitemPrice] = useState(route.params.itemPrice);
    const [itemStatus, setitemStatus] = useState(route.params.itemStatus);
    const [currentitemStatus, setcurrentitemStatus] = useState(route.params.itemStatus);
    
    //new
    const [newitemImage, setnewitemImage] = useState();
    

    //current
    const [image, setImage] = useState('https://tradeups3.s3.ap-southeast-1.amazonaws.com/ItemAsset/' + route.params.itemID +'.jpg');
    var updateItemAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items?';
    
    

    const itemModeHandle = (inputitemMode) =>{
        if(inputitemMode == "Sell"){
            //display price text input
            return (
                
                <View>
                <Text style={styles.title2}>Item Price:</Text>
                <View style={styles.sectionStyle}>

                    <Ionicons name='person-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter Price Here"
                        underlineColorAndroid="transparent"
                        value={itemPrice} onChangeText = {(val) => setitemPrice(val)}
                    />
                    {/* call the name of user according to the account */}

                </View>
                </View>
            )
        }
        
    }

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
            ImgToBase64.getBase64String(image.path)
                .then(base64String => 
                    setnewitemImage(base64String)
                    )
                .catch(err => 
                    alert("Something wrong here. Error: " + err)
                    );
            setImage(image.path);
          });
    };


    React.useEffect(() => {
        if(isFocused){ 
          
        }
      },[navigation, isFocused]);

      const removePendingRequest = async (inputRequestItemID, inputNewStatus) => {
        var removePendingRequestAPI = "https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/requests?inputRequestItemID="+inputRequestItemID+"&inputNewStatus="+inputNewStatus;
        console.log(removePendingRequestAPI)
        let res = await fetch(removePendingRequestAPI, {
            method: "POST",
        }).then((res) => {
            if (res.status == 200) {
              console.log("200")
              navigation.navigate('ManageMarketplace')
                } else {
                    // alert("Submission failed Error:" + res.status)
                    console.log("400")
                    navigation.navigate('ManageMarketplace')
                    console.log("Some error occured: ");
                    console.log(res.status)
                    console.log(res)
                }
        });
      }
      const updateItem = async () => {
        if (newitemImage != null){
            // update with new image
            if (itemCategory == '' || itemDesc == '' || itemMode == '' || itemName == '' || itemStatus == ''){
                alert("Please fill in every criteria.");
            }
            else if(itemStatus == "Inactive"){
                updateItemAPI = updateItemAPI + "NewImage=True&inputItemID="+itemID;
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
                            itemStatus: itemStatus,
                            itemImage: newitemImage
                        }),
                    }).then((res) => {
                        if (res.status == 200) {
                                alert("Item updated successfully.")
                                console.log("Item updated successfully");
                                removePendingRequest(itemID, "Rejected");
                                
                            } else {
                                alert("Submission failed Error:" + res.status)
                                console.log("Some error occured: ");
                                console.log(res.status)
                                console.log(res)
                            }
                    });
            }
            else{
                updateItemAPI = updateItemAPI + "NewImage=True&inputItemID="+itemID;
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
                            itemStatus: itemStatus,
                            itemImage: newitemImage
                        }),
                    }).then((res) => {
                        if (res.status == 200) {
                                alert("Item updated successfully.")
                                console.log("Item updated successfully");
                                navigation.navigate('ManageMarketplace')
                            } else {
                                alert("Submission failed Error:" + res.status)
                                console.log("Some error occured: ");
                                console.log(res.status)
                                console.log(res)
                            }
                    });
                // navigation.navigate('ManageMarketplace')
            }
        }
        else{
            //update without new image
            if (itemCategory == '' || itemDesc == '' || itemMode == '' || itemName == '' || itemStatus == ''){
                alert("Please fill in every criteria.");
            }
            else if(itemStatus == "Inactive"){
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
                            itemStatus: itemStatus
                        }),
                    }).then((res) => {
                        if (res.status == 200) {
                                alert("Item updated successfully.")
                                console.log("Item updated successfully");
                                removePendingRequest(itemID, "Rejected");
                                
                            } else {
                                alert("Submission failed Error:" + res.status)
                                console.log("Some error occured: ");
                                console.log(res.status)
                                console.log(res)
                            }
                    });
            }
            else{
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
                        itemStatus: itemStatus
                    }),
                }).then((res) => {
                    if (res.status == 200) {
                            alert("Item updated successfully.")
                            console.log("Item updated successfully");
                            navigation.navigate('ManageMarketplace')
                        } else {
                            alert("Submission failed Error:" + res.status)
                            console.log("Some error occured: ");
                            console.log(res.status)
                            console.log(res)
                        }
                });
                // navigation.navigate('ManageMarketplace')
            }
        }
      }


    return(
        <ScrollView style={styles.root}>
            <View>
                <Text style={styles.title2}>Item Name:</Text>
                <View style={styles.sectionStyle}>

                    <Ionicons name='person-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter Item Name Here"
                        underlineColorAndroid="transparent"
                        value={itemName} onChangeText = {(val) => setitemName(val)}
                    />
                    {/* call the name of user according to the account */}

                </View>
            </View>

            <View>
                <Text style={styles.title2}>Description:</Text>
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
                    
                        <Picker.Item label="Select a categories" value="NULL" />
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
                <Text style={styles.title2}>Item Mode: {itemMode}</Text>
                {itemModeHandle(itemMode)}
                {/* <View style={styles.sectionStyle3}>
                    <Picker
                        selectedValue={itemMode}
                        onValueChange={(itemValue, itemIndex) =>
                        setitemMode(itemValue)
                    }>
                        
                        <Picker.Item label="Select a Mode" value="NULL" />
                        <Picker.Item label="Sell" value="Sell" />
                        <Picker.Item label="Trade" value="Trade" />
                    </Picker>
                </View> */}


            </View>
            <View>
            <Text style={styles.title2}>Current Status: {currentitemStatus}</Text>
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
                    onPress={() => updateItem()}                    
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


export default EditMarketplaceDetails