import * as React from 'react';
import { Image, StyleSheet, Text, View,TouchableHighlight, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

function AdminManageUserScreen ({navigation}) {
    return(
        <View>
            <ScrollView style={styles.root}>
                <View style={styles.box}>
                    <Image style={styles.image} source={{uri: "https://bootdey.com/img/Content/avatar/avatar1.png"}} />
                    <View style={styles.boxContent}>
                        <Text style={styles.title}>User 1</Text>
                        <Text style={styles.description}>Admin / Member</Text>
                        <View style={styles.buttons}>
                            
                            <TouchableOpacity style={[styles.button, styles.view]} onPress={() => navigation.navigate('AdminEditUser')}>
                                <Ionicons name='create-outline' size={25} />
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button, styles.profile]}>
                                <Ionicons name='trash-outline' size={25} style={{color:'white'}} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                
            </ScrollView>

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