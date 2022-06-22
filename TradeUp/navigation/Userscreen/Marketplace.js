import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform, SafeAreaView, LogBox, YellowBox } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SliderBox } from "react-native-image-slider-box";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ignoreWarnings from 'ignore-warnings';
import { useIsFocused } from "@react-navigation/native";
Ionicons.loadFont();



function Marketplace({ navigation }){
    const isFocused = useIsFocused(); //used to refresh upon entering new screen
    const [tradeList, settradeList] = React.useState([]);
    const [search, setNewSearch] = React.useState("");
    const getActiveItemAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items?inputItemMode=Trade&inputUserRole=';
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
  filteredTrade.itemName.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        if(isFocused){ 
            gettradeList();
          }
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    },[navigation, isFocused]);

    ignoreWarnings('warn',['ViewPropTypes','[react-native-gesture-handler]'])

    LogBox.ignoreLogs([
        'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
        'NativeBase: The contrast ratio of',
        "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    ])


    const images = [
        "https://i.ytimg.com/vi/vIRapJCr7kg/maxresdefault.jpg",
        "https://blog.ugreen.com/wp-content/uploads/2021/04/iPad-Pro-2021.png",
        "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&w=1000&q=80",
        "https://www.teahub.io/photos/full/89-895046_wallpaper-and-selling-your-home-houses-for-sale.jpg"
    ]

    return(
        <ScrollView style={styles.root}>

            <View style={styles.row}>
                
                <View style={styles.containerSearch}>
                    <Ionicons name='search-outline' size={25} color='grey' style={{paddingLeft:5,paddingRight:5}} />
                    <TextInput placeholder='Search Product Name'
                        onChangeText ={(text) => handleSearchChange(text)}
                    />
                </View>

                <Ionicons name='person-circle-outline' size={40} color='#00b4d8' style={{paddingLeft:5}} onPress={() => navigation.navigate('Profile')}/>

            </View>

            <SliderBox 
            images={images} 
            disableOnPress
            sliderBoxHeight={200}
            circleLoop 
            autoplay
            activeOpacity={0.5}
            resizeMethod={'resize'}
            resizeMode={'cover'}
            ImageComponentStyle={{borderRadius: 15, width: '90%', marginTop: 10}}
            />

            <View style={styles.section}>

               <ScrollView  horizontal={true}>

                <TouchableOpacity
                    onPress={() => navigation.navigate('MarketplaceProduct')}
                    style={styles.roundButton1}>
                    <Image style={styles.icon} source={{
                    uri:
                        'https://cdn-icons-png.flaticon.com/512/644/644458.png',
                    }}/>
                    <Text>Electronics</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('MarketplaceProduct')}
                    style={styles.roundButton1}>
                    <Image style={styles.icon} source={{
                    uri:
                        'https://cdn-icons.flaticon.com/png/512/1867/premium/1867682.png?token=exp=1655051547~hmac=bc825fcbac8d07f32ce7674e37c40e77',
                    }}/>
                    <Text>Clothes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('MarketplaceProduct')}
                    style={styles.roundButton1}>
                    <Image style={styles.icon} source={{
                    uri:
                        'https://cdn-icons.flaticon.com/png/512/5074/premium/5074541.png?token=exp=1655051716~hmac=8d75192e9d4be22a0d13f25e293042b9',
                    }}/>
                    <Text>Deals</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('MarketplaceProduct')}
                    style={styles.roundButton1}>
                    <Image style={styles.icon} source={{
                    uri:
                        'https://cdn-icons.flaticon.com/png/512/3097/premium/3097180.png?token=exp=1655051857~hmac=34f9a0fa30dc4a51a7acd25f470b0bf3',
                    }}/>
                    <Text>Vehicles</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('MarketplaceProduct')}
                    style={styles.roundButton1}>
                    <Image style={styles.icon} source={{
                    uri:
                        'https://cdn-icons-png.flaticon.com/512/2991/2991552.png',
                    }}/>
                    <Text>Entertainment</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('MarketplaceProduct')}
                    style={styles.roundButton1}>
                    <Image style={styles.icon} source={{
                    uri:
                        'https://cdn-icons.flaticon.com/png/512/3458/premium/3458061.png?token=exp=1655052199~hmac=389fe7588e70d13c084baa1ff71013a4',
                    }}/>
                    <Text>Home & Garden</Text>
                </TouchableOpacity>

               </ScrollView>
            
            </View>

            <SafeAreaView>
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

                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate( 'MarketplaceDetails', item)}>
                        <Image style={styles.userImage} source={{uri: 'https://tradeups3.s3.ap-southeast-1.amazonaws.com/ItemAsset/' +item.itemID +'.jpg'}}/>
                        <View style={styles.cardFooter}>
                            <View style={{alignItems:"center", justifyContent:"center"}}>
                            <Text style={styles.name}>{item.itemName}</Text>
                            <Text style={styles.name}>{item.userID}</Text>
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

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    root:{
        marginTop:50,
        height:'100%',

    },

    containerSearch:{
        flexDirection: 'row',
        width: '88%',
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

    


})

export default Marketplace;

