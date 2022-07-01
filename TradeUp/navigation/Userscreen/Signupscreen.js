import React,{useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, ActivityIndicator, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import uuid from 'react-native-uuid';
Ionicons.loadFont();


function Signupscreen ({navigation}) {
    const [userID,setuserID] = useState();
    const [userFullname,setuserFullname] = useState('');
    const [userEmail,setuserEmail] = useState('');
    const [userDoB,setuserDoB] = useState('');
    const [userPassword,setuserPassword] = useState('');
    const [userConfirmPassword,setuserConfirmPassword] = useState('');
    const [userRole,setuserRole] = useState('Member');
    const [userPhone,setuserPhone] = useState('');
    const [createdTime,setcreatedTime] = useState();

    const [userEmailExist, setuserEmailExist] = useState();
    const [userPhoneExist, setuserPhoneExist] = useState();

    const [date, setDate] = useState(new Date())
    const [text, setText] = useState('Select DOB');
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');

    const onChange = ( event, selectedDate) => {
        
        if (event.type == 'dismissed'){
            setShow(false);
            
        }else if (event.type == 'set'){
            const currentDate = selectedDate || date;
            setDate(currentDate);
            
            let tempDate = new Date(currentDate);
            let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
            setuserDoB(fDate);
            setShow(false);
        }
        
        
    }

    const showMode = (cureentMode) => {
        setShow(true);
        setMode(cureentMode);
    }

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

    const checkEmailExist = async(inputUserEmail) => {
        var getUserbyEmailAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/users?inputUserEmail='+ inputUserEmail;
        fetch(getUserbyEmailAPI).then((response) => response.json()).then((json) => {
            // return true;
            if (json.length > 0){
                //exist
                returnTrue();
                
              }else{
                //does not exist
                returnFalse();
                
              } 
                 
        }).catch((error) => {
            console.error(error);
        });
    }

    const returnTrue = () =>{
        setuserEmailExist(true);
    }
    const returnFalse = () =>{
        setuserEmailExist(false);
    }

    const checkPhoneExist = async(inputUserPhone) => {
        var getUserbyPhoneAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/users?inputUserPhone='+ inputUserPhone;
        fetch(getUserbyPhoneAPI).then((response) => response.json()).then((json) => {
            // return true;
            if (json.length > 0){
                //exist
                returnPhoneTrue();
                
              }else{
                //does not exist
                returnPhoneFalse();
                
              } 
                 
        }).catch((error) => {
            console.error(error);
        });
    }

    const returnPhoneTrue = () =>{
        setuserPhoneExist(true);
    }
    const returnPhoneFalse = () =>{
        setuserPhoneExist(false);
    }

    const validation = () =>{
        const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

        if (userFullname == '' || userEmail == '' || userDoB == '' || userPassword == '' || userConfirmPassword == ''){
            alert('Please fill in all the criteria.');
        }else{
            if (userFullname.length < 1 ){
                    alert('Please Fill in your name');
                }
                else if (!strongRegex.test(userEmail)) {
                    alert('Please Fill in your email in correct format');
                }
                else if (userPhone.length < 10){
                    alert('Please Fill in your phone number in correct formula');
                }
                else if (userPassword.length < 8){
                    alert('Password must be minimum 8 characters');
                }
                else if (userPassword != userConfirmPassword){
                    alert('Password does not match');
                }
                else{
                    addNewUser();
                } 
            
        }
        // 

        // 
          
    }

    const addNewUser = async () => {
            checkEmailExist(userEmail);
            checkPhoneExist(userPhone);
            // checkEmailExist(userEmail);
            // const exist = checkEmailExist(userEmail);
            
            if (userEmailExist == false){
                if (userPhoneExist == false){
                    if (userRole != ''){
                        let res = await fetch("https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/users?NewUser=true", {
                                method: "POST",
                                body: JSON.stringify({
                                    userID: 'uid' + uuid.v4(),
                                    userEmail: userEmail,
                                    userFullname: userFullname,
                                    userPhoneNumber: userPhone,
                                    userPassword: userConfirmPassword,
                                    userDoB: userDoB,
                                    userRole: userRole,
                                    userPhone: userPhone,
                                    createdTime: createdTime
                                }),
                            }).then((res) => {
                                if (res.status == 200) {
                                        alert("Create account successfully.")
                                        console.log("Item created successfully");
                                        navigation.navigate('NonMemberHomeTabs');
                                        
                                    } else {
                                        alert("Submission failed Error:" + res.status)
                                        console.log("Some error occured: ");
                                        console.log(res.status)
                                        console.log(res)
                                        
                                    }
                            });
                    }
                    else {
                        alert("Select a role");
                        
                    }
                }
                else if (userPhoneExist == true){
                    alert("Phone number has been taken.");
                }
            }else if (userEmailExist == true){
                alert("Email has been taken.");
            }
    }
    

    useEffect(() => {
        getcurrentTime();
        //improvise for the moment on how to check email
        checkEmailExist(userEmail);
        checkPhoneExist(userPhone);
        
    },[userEmail,userPhone]); 

    return(
        <ScrollView style={styles.root}>

            <Text style={styles.title}>Create an new account</Text>
            <Text style={styles.title2}>Feel Free To Join Us</Text>

            <View style={styles.sectionStyle}>
                <Ionicons name='person-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Name Here"
                    underlineColorAndroid="transparent"
                    value={userFullname} onChangeText = {(val) => setuserFullname(val)}

                />
            </View>

            <View style={styles.sectionStyle}>
                <Ionicons name='mail-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Email Here"
                    underlineColorAndroid="transparent"
                    keyboardType="email-address"
                    value={userEmail} onChangeText = {(val) => setuserEmail(val)}

                />
            </View>

            <TouchableOpacity style={styles.sectionStyle} onPress={() => showMode('date') }>
                <Image
                    source={{
                    uri:
                    'https://cdn-icons.flaticon.com/png/512/591/premium/591638.png?token=exp=1654161253~hmac=492a2b141cafe63e458129caf10a4a0e',
                }}
                    style={styles.imageStyle}
                />
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="DD-MM-YYYY"
                    underlineColorAndroid="transparent"
                    selectTextOnFocus={false}
                    keyboardType="number-pad"
                    editable={false}
                    value={userDoB} onChangeText = {(val) => setuserDoB(val)}
                />
                
            </TouchableOpacity>
            {show && (
                    <DateTimePicker
                    testID = 'dateTimePicker'
                    value = {date}
                    mode = {mode}
                    is24Hour = {true}
                    display = 'default'
                    onChange = {onChange}
                    // onTouchCancel = {setShow(false)}
                    // onCancel={() => {
                    //     setShow(false)
                    //   }}
                />)}

            <View style={styles.sectionStyle}>
                <Ionicons name='call-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Phone Number Here"
                    underlineColorAndroid="transparent"
                    keyboardType="phone-pad"
                    value={userPhone} onChangeText = {(val) => setuserPhone(val)}

                />
            </View>

            <View style={styles.sectionStyle}>
                <Ionicons name='lock-closed-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Password Here"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    value={userPassword} onChangeText = {(val) => setuserPassword(val)}
                />
            </View>

            <View style={styles.sectionStyle}>
                <Ionicons name='lock-closed-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Password Here Again"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    value={userConfirmPassword} onChangeText = {(val) => setuserConfirmPassword(val)}
                />
            </View>

            <TouchableOpacity
                    style={styles.loginScreenButton}
                    onPress={() => validation()}
                    underlayColor='#fff'>
                    <Text style={styles.loginText}>Create an account</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

const styles = StyleSheet.create({

    root:{
        padding:20, 
        //backgroundColor: '#D8F3DC',
        height: '100%',
    },

    logo:{
        width:'100%',
        maxHeight:200,
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

    imageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
        marginRight:10,
    },

    loginScreenButton:{
        marginTop:45,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#00BFFF',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        width:'100%',
        height:45,
      },

    loginText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10
    },

    container:{
        width: '100%',
        padding: 5,
        marginVertical: 5,  
        alignItems: 'center',
        borderRadius: 5,
    },

    container2:{
        width: '100%',
        padding: 5,
        marginVertical: 5,  
        alignItems: 'center',
        borderRadius: 5,
    },

    container3:{
        padding: 10,
    },
    
    text:{
        fontWeight: 'bold',
        color: 'gray',
    },

    text2:{
        fontWeight: 'bold',
        color: '#d9dadb',
    },

    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00BFFF',
        margin: 10,
        marginBottom:5,
        alignSelf:'center'
    },

    title2:{
        fontSize: 15,
        color: 'gray',
        paddingBottom:20,
        alignSelf:'center'
    },

    textInputStyle: {
        color: 'green',
        flex: 1
    },

})

export default Signupscreen;