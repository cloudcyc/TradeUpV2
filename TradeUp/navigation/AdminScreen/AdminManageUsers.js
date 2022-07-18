import React,{useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View,TouchableHighlight, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, FlatList, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
Ionicons.loadFont();

function AdminManageUserScreen ({navigation}) {

  const isFocused = useIsFocused(); //used to refresh upon entering new screen
  const route = useRoute();
  
  const [adminList, setadminList] = useState([]);

  const getAdminsFunction = async() => {
    var getOtherAdminsAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/users?inputUserRole=Admin&inputUserID='+ route.params.userID;
    console.log(getOtherAdminsAPI);
    fetch(getOtherAdminsAPI).then((response) => response.json()).then((json) => {
      setadminList(json);
    }).catch((error) => {
      console.error(error);
    });

  };

  const deleteUserFunction = async(inputUserEmail, inputUserID) => {
    var deleteUserAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/users?inputUserEmail='+ inputUserEmail + '&inputUserID='+ inputUserID;
    console.log(deleteUserAPI);
    let res = await fetch(deleteUserAPI, {
      method: "DELETE"
    }).then((res) => {
      if (res.status == 200) {
              alert("User deleted successfully.")
              getAdminsFunction();
            } else {
              alert("User delete failed. Error:" + res.status)
              console.log("Some error occured: ");
              console.log(res.status)
              console.log(res)
            }
    });
  };

  const showAlertBox = (inputUserEmail, inputUserID) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to delete this user: " + inputUserEmail +" ?" ,
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            deleteUserFunction(inputUserEmail,inputUserID);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  useEffect(() => {
    getAdminsFunction();
  }, [navigation, isFocused]);
  
 
    return(
        <View style={styles.root}>
            <FlatList 
                        data={adminList}
                        keyExtractor= {(key) => {
                            return key.userID;
                        }}
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={styles.separator}/>
                            )
                        }}
                        renderItem={({item}) => {
                            return (
                                <View style={styles.box}>
                                  <Image style={styles.image} source={{uri: "https://tradeups3.s3.ap-southeast-1.amazonaws.com/asset/admin.png"}} />
                                  <View style={styles.boxContent}>
                                    <Text style={styles.title}>{item.userFullname}</Text>
                                    <Text style={styles.description}>{item.userEmail}</Text>
                                    <Text style={styles.description}>{item.userRole}</Text>
                                    <View style={styles.buttons}>
                                      <TouchableOpacity style={[styles.button, styles.view]} onPress={() => navigation.navigate('AdminEditUser',item)}>
                                        <Ionicons name='create-outline' size={25} />
                                      </TouchableOpacity>

                                      <TouchableOpacity style={[styles.button, styles.profile]} onPress={() => showAlertBox(item.userEmail, item.userID)}>
                                          <Ionicons name='trash-outline' size={25} style={{color:'white'}} />
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                </View>
                                )
                        }}
            >
            </FlatList>

            <TouchableOpacity
                onPress={() => navigation.navigate('AdminAddUser')}
                style={styles.roundButton1}>
                <Text style={styles.addtext}>+</Text>
            </TouchableOpacity> 

            
      </View>

      
    )
}

const styles = StyleSheet.create({

    root:{
        height:'100%'
    },

    image: {
        width: 100,
        height:100,
      },
      box: {
        padding:20,
        marginTop:5,
        backgroundColor: 'white',
        flexDirection: 'row',

      },
      boxContent: {
        flex:1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft:10,
      },
      title:{
        fontSize:18,
        color:"#151515",
      },
      description:{
        fontSize:15,
        color: "#646464",
      },
      buttons:{
        flexDirection: 'row',
      },
      button: {
        height:35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
        width:50,
        marginRight:5,
        marginTop:5,
      },
      icon:{
        width:20,
        height:20,
      },
      view: {
        backgroundColor: "#eee",
      },
      profile: {
        backgroundColor: "#1E90FF",
      },
      message: {
        backgroundColor: "#228B22",
      },
      roundButton1: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#00BFFF',
        position:'absolute',
        alignSelf:'flex-end',
        bottom:50,
        right:20,
    },

    addtext:{
        color:'white',
        fontSize:30
    }

});

export default AdminManageUserScreen;