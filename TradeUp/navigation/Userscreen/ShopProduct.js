import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from "@react-navigation/native";
Ionicons.loadFont();

function ShopProduct({ navigation }){
    const route = useRoute();
    const isFocused = useIsFocused(); //used to refresh upon entering new screen
    const [sellList, setsellList] = React.useState([]);
    const [search, setNewSearch] = React.useState("");
    const [selectedItemCategory, setselectedItemCategory] = React.useState(route.params.itemCategory);

    const retrieveUserID  = async () =>{
      console.log(selectedItemCategory);
      try {
        const value = await AsyncStorage.getItem('userID')
        if(value != null) {
          // value previously stored
          console.log(value);
        //   setuserID(value);
          getSellList(value, selectedItemCategory);
        }
        else
        {
          getSellList(null, selectedItemCategory);
        }
      } catch(e) {
        // error reading value
        console.log(e);
      }
    }
  const getSellList = (inputUserID, inputItemCategory) => {
      if (inputUserID == null){
          const getActiveItemAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items?inputItemMode=Sell&inputItemCategory='+inputItemCategory;
          console.log(getActiveItemAPI);
          fetch(getActiveItemAPI).then((response) => response.json()).then((json) => { 
              setsellList(json);
          }).catch((error) => {
              console.error(error);
          });
      }else{
          const getActiveItemAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items?inputItemMode=Sell&inputItemCategory='+inputItemCategory+'&inputUserID='+inputUserID;
          console.log(getActiveItemAPI);
          fetch(getActiveItemAPI).then((response) => response.json()).then((json) => { 
              setsellList(json);
          }).catch((error) => {
              console.error(error);
          });
      }
      
  }

  const handleSearchChange = (text) => {
      setNewSearch(text)
      
      };
  const filteredSell = !search
  ? sellList
  : sellList.filter((filteredSell) =>
      filteredSell.itemName.toLowerCase().includes(search.toLowerCase())
      );

  useEffect(() => {
      
      if(isFocused){ 
          retrieveUserID();
        }
        
        
    },[navigation, isFocused]);

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
            data={filteredSell}
            keyExtractor= {(key) => {
                            return key.itemID;
                        }}
            style={styles.list}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            renderItem={({item}) => {
                return (

                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate( 'ShopProductDetails', item)}>
                        <Image style={styles.userImage} source={{uri: 'https://tradeups3.s3.ap-southeast-1.amazonaws.com/ItemAsset/' +item.itemID +'.jpg'}}/>
                        <View style={styles.cardFooter}>
                            <View style={{alignItems:"center", justifyContent:"center"}}>
                            <Text style={styles.name}>{item.itemName}</Text>
                            <Text style={styles.position}>RM {item.itemPrice}</Text>
                            {/* <Text style={styles.name}>{item.userID}</Text> */}

                        </View>
                        </View>
                    </TouchableOpacity>

                    )
                }}
            
            />
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
        paddingBottom:20,
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
        paddingHorizontal: 20,
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
        borderRadius:15
      },

      cardFooter: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems:"center", 
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
        width: 120,
        borderRadius:60,
        alignSelf:'center',
      },

      name:{
        fontSize:16,
        flex:1,
        alignSelf:'center',
        fontWeight:'600'
      },

      position:{
        fontSize:14,
        flex:1,
        alignSelf:'flex-start',
        paddingTop:5,
        fontWeight:'500'
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

    


})

export default ShopProduct