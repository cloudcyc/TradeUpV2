import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';
import { useRoute } from "@react-navigation/native";

function RequestDetailScreen ({navigation}) {

    const {height} = useWindowDimensions();
    const route = useRoute();
    var postUpdateCentreAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/centres?';

    const acceptRequest = async () => {
        postUpdateCentreAPI = postUpdateCentreAPI+'inputCurrentCentreStatus='+ route.params.centreStatus +'&inputNewCentreStatus=Active&inputCentreID='+route.params.centreID;
        
        var data = {
            centreID: route.params.centreID,
            centreName: route.params.centreName,
            centreAddress: route.params.centreAddress,
            centreCoordinate: [ route.params.centreCoordinate[1], route.params.centreCoordinate[0] ],
            centreDescription: route.params.centreDescription,
            centreStatus: 'Active',
            createdTime: route.params.createdTime
        }

        let res = await fetch(postUpdateCentreAPI, {
            method: "POST",
            body: JSON.stringify(data),
          }).then((res) => {
            if (res.status == 200) {
                    alert("Request Approved successfully and activated.")
                    console.log("Item created successfully");
                    navigation.navigate('RequestScreen')
                  } else {
                    alert("Centre update failed. Error:" + res.status)
                    console.log("Some error occured: ");
                    console.log(res.status)
                    console.log(res)
                  }
          });
    }
    const declineRequest = async () => {

        postUpdateCentreAPI = postUpdateCentreAPI+'inputCurrentCentreStatus='+ route.params.centreStatus +'&inputNewCentreStatus=Active&inputCentreID='+route.params.centreID;
        
        var data = {
            centreID: route.params.centreID,
            centreName: route.params.centreName,
            centreAddress: route.params.centreAddress,
            centreCoordinate: [ route.params.centreCoordinate[1], route.params.centreCoordinate[0] ],
            centreDescription: route.params.centreDescription,
            centreStatus: 'Decline',
            createdTime: route.params.createdTime
        }

        let res = await fetch(postUpdateCentreAPI, {
            method: "POST",
            body: JSON.stringify(data),
          }).then((res) => {
            if (res.status == 200) {
                    alert("Request declined successfully")
                    console.log("Item created successfully");
                    navigation.navigate('RequestScreen')
                  } else {
                    alert("Centre update failed. Error:" + res.status)
                    console.log("Some error occured: ");
                    console.log(res.status)
                    console.log(res)
                  }
          });
    }

    return(
        <View>

            <View style={styles.root}>
                <Image  source={{uri: 'https://tradeups3.s3.ap-southeast-1.amazonaws.com/DonationCentreAsset/'+[route.params.centreID]+'.jpg'}}
                        style={{width: 400, height: 250}}
                        resizeMode='stretch' />        
            </View>

            <ScrollView style={[styles.container]}>

                <View style={styles.container2}>
                    <Text style={styles.title}>Centre Name:</Text>
                    <Text style={styles.Desc}>{route.params.centreName}</Text>
                </View>

                <View style={styles.container2}>
                    <Text style={styles.title}>Centre Address:</Text>
                    <Text style={styles.Desc}>{route.params.centreAddress}</Text>
                </View>

                <View style={styles.container2}>
                    <Text style={styles.title}>Centre Description</Text>
                    <Text style={styles.Desc}>{route.params.centreDescription}</Text>
                </View>

            </ScrollView>

            <View style={[styles.bottomView]}>

                <TouchableOpacity
                    style={styles.CancelButton}
                    onPress={() => declineRequest()}
                    underlayColor='#fff'>
                    <Text style={styles.buttonText}>Decline</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => acceptRequest()}
                    underlayColor='#fff'>
                    <Text style={styles.buttonText}>Approve</Text>
                </TouchableOpacity>

            </View>

            
            
        </View>

        
    )
}

const styles = StyleSheet.create({

    root:{
        flex: 1, 
        alignItems: "center"
    },

    container:{
        paddingTop:265,
        paddingLeft:20,
        paddingRight:20,
        height:'100%',
   },

    container2:{
        paddingTop:10,
        paddingBottom:10,
        borderBottomColor:'#b6b6b8',
        borderBottomWidth:1,
    },

    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fb5607',
    },

    Desc:{
        fontSize: 15,
        paddingTop:10,
    },

    image:{
        width:'100%',
        maxHeight:300,
    },

    row:{
        flexDirection: 'row',
        justifyContent:'center',
        height:80,
        paddingBottom:10,
    },

    backButton:{
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#FF9100',
        width:'50%',
        justifyContent:'center'
    },

    CancelButton:{
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#e63946',
        width:'50%',
        justifyContent:'center'

      },

    buttonText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10,
          fontSize: 18,
          paddingBottom:10
    },

    SignoutText:{
        paddingLeft:15,
        fontSize: 18,
        fontWeight:'400',
        color: '#FFF',
    },

    bottomView:{
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },

});


export default RequestDetailScreen;