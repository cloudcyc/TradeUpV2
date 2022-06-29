import React, { useState,useEffect } from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
Ionicons.loadFont();

function ManageMarketplace({ navigation }){
  const isFocused = useIsFocused(); //used to refresh upon entering new screen
  const [itemList, setitemList] = React.useState([]);
  const [search, setNewSearch] = React.useState("");
  const [userID,setuserID] = useState('');
  const retrieveUserID  = async () =>{
    try {
      const value = await AsyncStorage.getItem('userID')
      if(value != null) {
        // value previously stored
        console.log(value);
        getitemList(value);
        
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }
  const getitemList = (inputuserID) => {
    const getItemAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items?inputUserID='+inputuserID; //update this when logging
    console.log(getItemAPI);
      fetch(getItemAPI).then((response) => response.json()).then((json) => { 
        setitemList(json);
      }).catch((error) => {
          console.error(error);
      });
  }

  const handleSearchChange = (text) => {
      setNewSearch(text)
      
    };
  const filteredItem = !search
  ? itemList
  : itemList.filter((filteredItem) =>
  filteredItem.itemName.toLowerCase().includes(search.toLowerCase())
    );

  useEffect(() => {
      if(isFocused){ 
          retrieveUserID();
          
          
        }
      
  },[navigation, isFocused]);


  const ModeHandle = (inputItemMode) => {
    if (inputItemMode == "Trade"){
      return (
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate( 'ManageMarketplaceDetails', item)}>
                                      <Image style={styles.userImage} source={{uri: 'https://tradeups3.s3.ap-southeast-1.amazonaws.com/ItemAsset/' +item.itemID +'.jpg'}}/>
                                      <View style={styles.cardFooter}>
                                          <View style={{alignItems:"center", justifyContent:"center"}}>
                                          <Text style={styles.name}>{item.itemName}</Text>
                                          <Text style={styles.name}>{item.itemMode}</Text>
                                          <Text style={styles.name}>{item.userID}</Text>
                                          {/* <TouchableOpacity style={styles.followButton}>
                                              <Text style={styles.followButtonText}>View</Text>  
                                          </TouchableOpacity> */}
                                        </View>
                                      </View>
              </TouchableOpacity>
            )
          }
    else if (inputItemMode == "Sell"){
      return (
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate( 'ManageMarketplaceDetails', item)}>
                              <Image style={styles.userImage} source={{uri: 'https://tradeups3.s3.ap-southeast-1.amazonaws.com/ItemAsset/' +item.itemID +'.jpg'}}/>
                              <View style={styles.cardFooter}>
                                  <View style={{alignItems:"center", justifyContent:"center"}}>
                                  <Text style={styles.name}>{item.itemName}</Text>
                                  <Text style={styles.name}>{item.itemMode}</Text>
                                  <Text style={styles.name}>{item.userID}</Text>
                                  {/* <TouchableOpacity style={styles.followButton}>
                                      <Text style={styles.followButtonText}>View</Text>  
                                  </TouchableOpacity> */}
                                </View>
                              </View>
              </TouchableOpacity>
              
            )
    }
  }

  const Statuscolor = (inputStatus) => {
    if (inputStatus == "Active"){
      return(
        <Text style={styles.GreenStatus}>{inputStatus}</Text>
      )
    }
    else
    {
      return(
        <Text style={styles.RedStatus}>{inputStatus}</Text>
      )
    }
  }

    return(
        <SafeAreaView style={styles.root}>

            <View style={styles.row}>
                
                <View style={styles.containerSearch}>
                    <Ionicons name='search-outline' size={25} color='grey' style={{paddingLeft:5,paddingRight:5}} />
                    <TextInput placeholder='Search Product Name'
                      onChangeText ={(text) => handleSearchChange(text)}
                    />
                </View>

            </View>

            <FlatList
            data={filteredItem}
            style={styles.list}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            renderItem={({item}) => {
                return (
                  
                  <TouchableOpacity style={styles.card} onPress={() => navigation.navigate( 'ManageMarketplaceDetails', item)}>
                                      <Image style={styles.userImage} source={{uri: 'https://tradeups3.s3.ap-southeast-1.amazonaws.com/ItemAsset/' +item.itemID +'.jpg'}}/>
                                      <View style={styles.cardFooter}>
                                          <View style={{alignItems:"center", justifyContent:"center"}}>
                                          <Text style={styles.name}>{item.itemName}</Text>
                                          <Text style={styles.name}>Mode: {item.itemMode}</Text>
                                          {Statuscolor(item.itemStatus)}
                                        </View>
                                      </View>
                  </TouchableOpacity>

                    )
                }}
            
            />

            <TouchableOpacity
                onPress={() => navigation.navigate('AddMarketplaceProduct')}
                style={styles.roundButton2}>
                <Text style={styles.addtext}>+</Text>
            </TouchableOpacity>     
            </SafeAreaView>

    );
}

const styles = StyleSheet.create({

    root:{
        marginTop:20,
        height:'100%',
    },

    containerSearch:{
        flexDirection: 'row',
        width: '100%',
        height: 35,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent:'flex-start',
        borderWidth: 1,
        borderColor:'grey',
        alignItems:'center',
    },

    row:{
        flexDirection: 'row',
        alignItems:'center',
        marginLeft:20,
        marginRight:20,
    },

    section:{
        paddingTop:20,
        marginLeft:20,
        marginRight:20,
        
    },

    roundButton1: {
        maxWidth:120,
        minWidth:80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        alignItems:'center'
    },

    icon: {
        width:40,
        height:40,
    },

    listContainer:{
        alignItems:'center'
    },

    list: {
        paddingTop:20,
        paddingHorizontal: 20,
        paddingBottom:20,
        height:'100%'
    },

    card:{
        shadowColor: '#00000021',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    
        marginVertical: 5,
        backgroundColor:"white",
        flexBasis: '46%',
        marginHorizontal: 10,
        borderRadius:15,
      },

      cardFooter: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems:"center", 
        justifyContent:"center"
      },

      cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
      },

      cardHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
      },

      userImage:{
        height: 120,
        width: "100%",
        alignSelf:'center',
      },

      name:{
        fontSize:18,
        flex:1,
        alignSelf:'center',
        color:"#008080",
        fontWeight:'bold'
      },
      RedStatus:{
        fontSize:18,
        flex:1,
        alignSelf:'center',
        color:"#dc2f02",
        fontWeight:'bold'
      },
      GreenStatus:{
        fontSize:18,
        flex:1,
        alignSelf:'center',
        color:"#02DC13",
        fontWeight:'bold'
      },

      position:{
        fontSize:14,
        flex:1,
        alignSelf:'center',
        color:"#696969"
      },

      followButton: {
        marginTop:10,
        height:35,
        width:100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "#00BFFF",
      },

      followButtonText:{
        color: "#FFFFFF",
      },

      roundButton2: {
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

})

export default ManageMarketplace