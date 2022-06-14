import  React, {useState} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, ActivityIndicator, Platform } from 'react-native';
import Logo from '../../assets/TradeUpLogo.png'
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

function LoginScreen ({navigation}) {

    const [text, setText] = useState('');
    const anotherFunc = (val) =>{
        setText('');
    }

    const [pass, setPass] = useState('');
    const ClearPass = (val) =>{
        setPass('');
    }

    const [visible, setVisible] = useState(false);

    const LoginOnPress = () => {
        //loading
        setVisible(true)
        //loading end
        setVisible(false)
        navigation.navigate('AdminTabs')
        anotherFunc(text)
        ClearPass(text)
    }
    
    return(
        <View style={styles.root}>
           <Image 
           source={Logo}
           style={[styles.logo]}
           resizeMode="contain"
           />

            <View style={styles.sectionStyle}>
                <Image
                    source={{
                    uri:
                        'https://cdn-icons-png.flaticon.com/512/546/546394.png',
                    }}
                    style={styles.imageStyle}
                />
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Email Here"
                    underlineColorAndroid="transparent"
                    keyboardType="email-address"
                    value ={text}
                    onChangeText ={setText}
                />
            </View>

            <View style={styles.sectionStyle}>
                <Image
                    source={{
                    uri:
                        'https://cdn-icons-png.flaticon.com/512/3064/3064197.png',
                    }}
                    style={styles.imageStyle}
                />
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Password Here"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    value ={pass}
                    onChangeText ={setPass}
                />
            </View>

            <TouchableOpacity
                    style={styles.loginScreenButton}
                    onPress={LoginOnPress}
                    underlayColor='#fff'>
                    <View
          style={{
            ...styles.button,
            backgroundColor: visible ? "#adb5bd" : "#00BFFF",
          }}
        >
          {visible && <ActivityIndicator size="large" color="white" />}
          <Text style={styles.loginText}>
            {visible ? "Please Wait" : "Login"}
          </Text>
        </View>
            </TouchableOpacity>


            <View style={[styles.container2]}>
                <Text style={[styles.text2]}>______________________________________</Text>
            </View>

            <View style={styles.container3}>
                <TouchableOpacity onPress={() => navigation.navigate('Signupscreen')} style={{ alignSelf: 'center' , borderRadius:5, paddingTop:10 , paddingVertical:10, paddingHorizontal:30, flexDirection: 'row', backgroundColor: '#008080' , height: 40, width:"90%"}}>
                    <Ionicons name='ios-mail-outline' size={20} color='#fff' />
                    <Text style={{ marginLeft: 10, color: '#fff', fontWeight: 'bold', alignSelf: 'center' }}>
                    Register As New User 
                    </Text>
                </TouchableOpacity>
            </View>

        </View>

        
    )
}

const styles = StyleSheet.create({

    root:{
        padding:20, 
        paddingTop:100,
    },

    logo:{
        width:'100%',
        maxHeight:150,
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
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#00BFFF',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        width:'100%',
        height:45,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
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

    textInputStyle: {
        color: 'green',
        flex: 1
    },

    whiteOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
     }

})

export default LoginScreen;