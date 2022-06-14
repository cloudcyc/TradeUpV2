import React,{useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from "@react-native-picker/picker";
import { event } from 'react-native-reanimated';

function AdminEditMarketplaceProduct({ navigation }){

    const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/401/401061.png');

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            setImage(image.path);
          });
    };

    const [selectedCat, setSelectedCat] = useState();


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
                    />
                    {/* call the name of user according to the account */}

                </View>
            </View>

            <View>
                <Text style={styles.title2}>Product Description:</Text>
                <View style={styles.sectionStyle2}>
                    
                    <Ionicons name='chatbox-ellipses-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter Description Here"
                        underlineColorAndroid="transparent"
                        multiline={true}
                    />
                </View>
            </View>

            <View>

                <Text style={styles.title2}>Product Categories:</Text>
                <View style={styles.sectionStyle3}>
                    <Picker
                        selectedValue={selectedCat}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedCat(itemValue)
                        }>
                        <Picker.Item label="Select a categories" value="NULL" />
                        <Picker.Item label="Electronics" value="Electronics" />
                        <Picker.Item label="Clothes" value="Clothes" />
                        <Picker.Item label="Deals" value="Deals" />
                        <Picker.Item label="Vehicles" value="Vehicles" />
                        <Picker.Item label="Entertainment" value="Entertainment" />
                        <Picker.Item label="Home & Garden" value="Home & Garden" />
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
                    onPress={() => navigation.navigate('AdminTabs')}                    
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


export default AdminEditMarketplaceProduct