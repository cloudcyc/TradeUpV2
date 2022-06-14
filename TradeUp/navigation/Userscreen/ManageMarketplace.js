import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

Ionicons.loadFont();

function ManageMarketplace({ navigation }){

    const SampleProduct = [{
        ProductName: "Iphone 13", Name: "John Sandford", product_image:
        "https://www.igeeksblog.com/wp-content/uploads/2021/08/black-wallpaper-for-iphone-10-675x450.jpg", product_desc:"This is brand new iPhone 13. Condition like 10/10 exactly new"
      }, {
        ProductName: "Iphone 14", Name: "John Sandford", product_image:
        "https://img1.ibay.com.mv/is1/full/2022/04/item_3928693_147.jpg", product_desc:"This is brand new iPhone 13. Condition like 10/10 exactly new"
      }, {
        ProductName: "Iphone 15", Name: "John Sandford", product_image:
        "https://img1.ibay.com.mv/is1/full/2022/04/item_3928693_147.jpg", product_desc:"This is brand new iPhone 13. Condition like 10/10 exactly new"
      }, {
        ProductName: "Iphone 16", Name: "John Sandford", product_image:
        "https://img1.ibay.com.mv/is1/full/2022/04/item_3928693_147.jpg", product_desc:"This is brand new iPhone 13. Condition like 10/10 exactly new"
      }, {
        ProductName: "Iphone 15", Name: "John Sandford", product_image:
        "https://img1.ibay.com.mv/is1/full/2022/04/item_3928693_147.jpg", product_desc:"This is brand new iPhone 13. Condition like 10/10 exactly new"
      }, {
        ProductName: "Iphone 16", Name: "John Sandford", product_image:
        "https://img1.ibay.com.mv/is1/full/2022/04/item_3928693_147.jpg", product_desc:"This is brand new iPhone 13. Condition like 10/10 exactly new"
      }, {
        ProductName: "Iphone 15", Name: "John Sandford", product_image:
        "https://img1.ibay.com.mv/is1/full/2022/04/item_3928693_147.jpg", product_desc:"This is brand new iPhone 13. Condition like 10/10 exactly new"
      }, {
        ProductName: "Iphone 16", Name: "John Sandford", product_image:
        "https://img1.ibay.com.mv/is1/full/2022/04/item_3928693_147.jpg", product_desc:"This is brand new iPhone 13. Condition like 10/10 exactly new"
      }];

    return(
        <SafeAreaView style={styles.root}>

            <View style={styles.row}>
                
                <View style={styles.containerSearch}>
                    <Ionicons name='search-outline' size={25} color='grey' style={{paddingLeft:5,paddingRight:5}} />
                    <TextInput placeholder='Search Product Name'/>
                </View>

            </View>

            <FlatList
            data={SampleProduct}
            style={styles.list}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            renderItem={({item}) => {
                return (

                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate( 'ManageMarketplaceDetails', item)}>
                        <Image style={styles.userImage} source={{uri:item.product_image}}/>
                        <View style={styles.cardFooter}>
                            <View style={{alignItems:"center", justifyContent:"center"}}>
                            <Text style={styles.name}>{item.ProductName}</Text>
                            <Text style={styles.position}>{item.Name}</Text>
                            {/* <TouchableOpacity style={styles.followButton}>
                                <Text style={styles.followButtonText}>View</Text>  
                            </TouchableOpacity> */}
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
        width: 120,
        borderRadius:60,
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