import React,{useState} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
Ionicons.loadFont();


function AdminEditProfile ({navigation}) {
    const route = useRoute();

    const [userID,setuserID] = useState(route.params.userID);
    const [userFullname,setuserFullname] = useState(route.params.userFullname);
    const [userEmail,setuserEmail] = useState(route.params.userEmail);
    const [userDoB,setuserDoB] = useState(route.params.userDoB);
    const [userPhone,setuserPhone] = useState(route.params.userPhone);
    const [userCurrentPassword,setuserPassword] = useState(route.params.userPassword);
    const [userRole,setuserRole] = useState(route.params.userRole);
    const [createdTime,setcreatedTime] = useState(route.params.createdTime);

    const [userOldPassword,setuserOldPassword] = useState('');
    const [userNewPassword,setuserNewPassword] = useState('');
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

    const updateProfileFunction = async () => {
        // console.log(userID);
        // console.log(userFullname);
        // console.log(userEmail);
        // console.log(userCurrentPassword);
        // console.log(userRole);
        // console.log(createdTime);
        // console.log(userDoB);

        if (userOldPassword == '' && userNewPassword == ''){
            if (userEmail == '' || userFullname == '' || userRole == '' || userPhone == ''){
                alert("Please fill in every criteria.");
            }else {
                let res = await fetch("https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/users?UpdateUser=true", {
                    method: "POST",
                    body: JSON.stringify({
                        userID: userID,
                            userEmail: userEmail,
                            userFullname: userFullname,
                            userPassword: userCurrentPassword,
                            userDoB: userDoB,
                            userRole: userRole,
                            userPhone: userPhone,
                            createdTime: createdTime
                    }),
                }).then((res) => {
                    if (res.status == 200) {
                            alert("Profile update successfully without changing password.")
                            navigation.navigate('AdminTabs')
                        } else {
                            alert("User update failed Error:" + res.status)
                            console.log("Some error occured: ");
                            console.log(res.status)
                            console.log(res)
                        }
                });
            }
            
        }
        else if (userOldPassword != '' && userCurrentPassword == userOldPassword)
        {
            if (userNewPassword != ''){
                if (userEmail == '' || userFullname == '' || userRole == '' || userPhone == ''){
                    alert("Please fill in every criteria.");
                }else {
                    let res = await fetch("https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/users?UpdateUser=true", {
                        method: "POST",
                        body: JSON.stringify({
                            userID: userID,
                            userEmail: userEmail,
                            userFullname: userFullname,
                            userPassword: userNewPassword,
                            userDoB: userDoB,
                            userRole: userRole,
                            userPhone: userPhone,
                            createdTime: createdTime
                        }),
                    }).then((res) => {
                        if (res.status == 200) {
                                alert("Profile update successfully with new password.")
                                navigation.navigate('AdminTabs')
                            } else {
                                alert("User update failed Error:" + res.status)
                                console.log("Some error occured: ");
                                console.log(res.status)
                                console.log(res)
                            }
                    });
                }
                
            }
            else
            {
                alert("Please enter new Password")
            }
            
        }
        else if (userOldPassword != '' && userCurrentPassword != userOldPassword)
        {
            alert("Current password does not match.")
        }

    }

    return(
        <ScrollView style={styles.root}>

            <Text style={styles.title}>Update Profile</Text>
            <Text style={styles.title2}>Update Your Profile Information Here</Text>

            <View style={styles.sectionStyle}>
                <Ionicons name='person-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Name Here"
                    underlineColorAndroid="transparent"
                    editable={true}
                    selectTextOnFocus={false}
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
                    editable={false}
                    selectTextOnFocus={false}
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
                    editable={false}
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
                    value={userOldPassword}
                    onChangeText = {(val) => setuserOldPassword(val)}
                />
            </View>

            <View style={styles.sectionStyle}>
                <Ionicons name='lock-closed-outline' size={25} style={{paddingLeft:5, paddingRight:5}} />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Password Here Again"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    value={userNewPassword}
                    onChangeText = {(val) => setuserNewPassword(val)}
                />
            </View>

            <TouchableOpacity
                    style={styles.loginScreenButton}
                    onPress={() => updateProfileFunction()}
                    underlayColor='#fff'>
                    <Text style={styles.loginText}>Update Profile</Text>
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

export default AdminEditProfile;