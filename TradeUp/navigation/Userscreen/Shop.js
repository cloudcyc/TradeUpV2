import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform, SafeAreaView, LogBox, YellowBox } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SliderBox } from "react-native-image-slider-box";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ignoreWarnings from 'ignore-warnings';
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
Ionicons.loadFont();



function Shop({ navigation }){
    const isFocused = useIsFocused(); //used to refresh upon entering new screen
    const [sellList, setsellList] = React.useState([]);
    const [search, setNewSearch] = React.useState("");

    const retrieveUserID  = async () =>{
        try {
          const value = await AsyncStorage.getItem('userID')
          if(value != null) {
            // value previously stored
            console.log(value);
          //   setuserID(value);
            getSellList(value);
          }
          else
          {
            getSellList(null);
          }
        } catch(e) {
          // error reading value
          console.log(e);
        }
      }
    const getSellList = (inputUserID) => {
        if (inputUserID == null){
            const getActiveItemAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items?inputItemMode=Sell&inputUserRole=';
            fetch(getActiveItemAPI).then((response) => response.json()).then((json) => { 
                setsellList(json);
            }).catch((error) => {
                console.error(error);
            });
        }else{
            const getActiveItemAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items?inputItemMode=Sell&inputUserID='+inputUserID;
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
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        if(isFocused){ 
            retrieveUserID();
          }
          
          
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
                    onPress={() => navigation.navigate('ShopProduct',{itemCategory: 'MobileAndAccessories'})}
                    style={styles.roundButton1}>
                    <Image style={styles.icon} source={{
                    uri:
                        'https://cdn-icons.flaticon.com/png/512/4681/premium/4681177.png?token=exp=1657465559~hmac=2eed2023175f71846c74ac9b97354ef6',
                    }}/>
                    <Text>Mobile & Accessories</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('ShopProduct',{itemCategory: 'Automotive'})}
                    style={styles.roundButton1}>
                    <Image style={styles.icon} source={{
                    uri:
                        'https://cdn-icons-png.flaticon.com/512/741/741407.png',
                    }}/>
                    <Text>Automotive</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('ShopProduct',{itemCategory: 'HealthAndBeauty'})}
                    style={styles.roundButton1}>
                    <Image style={styles.icon} source={{
                    uri:
                        'https://cdn-icons.flaticon.com/png/512/1807/premium/1807392.png?token=exp=1657465732~hmac=f37db411c5facff2f78c72e391d55340',
                    }}/>
                    <Text>Health & Beauty</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('ShopProduct',{itemCategory: 'ComputerAndAccessories'})}
                    style={styles.roundButton1}>
                    <Image style={styles.icon} source={{
                    uri:
                        'https://cdn-icons.flaticon.com/png/512/2704/premium/2704234.png?token=exp=1657465499~hmac=aeb717aeeef367c6e70979660fbd87c9',
                    }}/>
                    <Text>Computer & Accessories</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('ShopProduct',{itemCategory: 'Clothes'})}
                    style={styles.roundButton1}>
                    <Image style={styles.icon} source={{
                    uri:
                        'https://cdn-icons-png.flaticon.com/512/2934/2934972.png',
                    }}/>
                    <Text>Clothes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('ShopProduct',{itemCategory: 'HomeAndLiving'})}
                    style={styles.roundButton1}>
                    <Image style={styles.icon} source={{
                    uri:
                        'https://cdn-icons.flaticon.com/png/512/3659/premium/3659944.png?token=exp=1657465359~hmac=e9a3c9ba9a8b2a990ea1abdf9c3d8864',
                    }}/>
                    <Text>Home & Living</Text>
                </TouchableOpacity>

               </ScrollView>
            
            </View>

            <SafeAreaView>
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
        maxWidth:100,
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
        width: "100%",
        
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

export default Shop;

