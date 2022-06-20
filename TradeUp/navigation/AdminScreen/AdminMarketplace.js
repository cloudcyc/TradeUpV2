import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';

Ionicons.loadFont();

function AdminMarketplace({ navigation }){
  const isFocused = useIsFocused(); //used to refresh upon entering new screen
  const [tradeList, settradeList] = React.useState([]);
  const [search, setNewSearch] = React.useState("");
  const getActiveItemAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items?inputItemMode=Trade';
  const gettradeList = () => {
      fetch(getActiveItemAPI).then((response) => response.json()).then((json) => { 
        settradeList(json);
      }).catch((error) => {
          console.error(error);
      });
  }

  const handleSearchChange = (text) => {
      setNewSearch(text)
      
    };
  const filteredTrade = !search
  ? tradeList
  : tradeList.filter((filteredTrade) =>
  filteredTrade.centreAddress.toLowerCase().includes(search.toLowerCase())
    );

  React.useEffect(() => {
      if(isFocused){ 
        gettradeList();
      }
      
      
  },[navigation, isFocused]);

  const Statuscolor = (inputStatus) => {
    if (inputStatus == "Active"){
      return(
        <Text style={styles.greenText}>{inputStatus}</Text>
      )
    }
    else
    {
      return(
        <Text style={styles.redText}>{inputStatus}</Text>
      )
    }
  }

    return(
        <SafeAreaView style={styles.root}>

            <View style={styles.row}>
                
                <View style={styles.containerSearch}>
                    <Ionicons name='search-outline' size={25} color='grey' style={{paddingLeft:5,paddingRight:5}} />
                    <TextInput placeholder='Search Product Name'/>
                </View>

            </View>

            <FlatList
            data={filteredTrade}
            keyExtractor= {(key) => {
                            return key.itemID;
                        }}
            style={styles.list}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            renderItem={({item}) => {
                return (

                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate( 'AdminMarketplaceProduct', item)}>
                        <Image style={styles.userImage} source={{uri: 'https://tradeups3.s3.ap-southeast-1.amazonaws.com/ItemAsset/' +item.itemID +'.jpg'}}/>
                        <View style={styles.cardFooter}>
                            <View style={{alignItems:"center", justifyContent:"center"}}>
                            <Text style={styles.name}>{item.itemName}</Text>
                            {
                              Statuscolor(item.itemStatus)  
                            }
                            {/* <TouchableOpacity style={styles.followButton}>
                                <Text style={styles.followButtonText}>View</Text>  
                            </TouchableOpacity> */}
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
        width: '100%',
        // borderRadius:60,
        alignSelf:'center',
      },

      name:{
        fontSize:18,
        flex:1,
        alignSelf:'center',
        color:"#008080",
        fontWeight:'bold'
      },

      position:{
        fontSize:14,
        flex:1,
        alignSelf:'center',
        color:"#696969"
      },
      redText:{
        fontSize:14,
        flex:1,
        alignSelf:'center',
        paddingTop:5,
        fontWeight:'500',
        color:"#dc2f02"
      },

      greenText:{
        fontSize:14,
        flex:1,
        alignSelf:'center',
        paddingTop:5,
        fontWeight:'500',
        color:"#02DC13"
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

export default AdminMarketplace