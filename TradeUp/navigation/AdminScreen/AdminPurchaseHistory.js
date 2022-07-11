import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, FlatList } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
function AdminPurchaseHistory ({navigation}) {
    const isFocused = useIsFocused(); //used to refresh upon entering new screen
    const [receiptList, setreceiptList] = useState([]);
    const getReceiptList = () => {
       
        const getReceiptListAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/receipts?decoyView=True';
        
        fetch(getReceiptListAPI).then((response) => response.json()).then((json) => { 
            setreceiptList(json);
            
        }).catch((error) => {
            console.error(error);
        });
    }
    
    const [tempName, settempName] = useState('');
    // var tempName = 'testing';
    const getitemList = (ItemID) => {
        
        const getItemAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items?inputItemID='+ItemID;
        
         fetch(getItemAPI).then((response) => response.json()).then((json) => { 
            
            // console.log(json[0].itemName);
            if(json.length >= 1){
                settempName(json[0].itemName);
                
                // temp = json[0].itemName;
                return json[0].itemName;
            }
            
        }).catch((error) => {
            console.error(error);
        });

        
        
    }
    const getItemName = (inputItemName) => {
        getitemList(inputItemName);
        let temp = tempName
        
        // {getitemList(item.itemID)}
        // console.log(getitemList(inputItemName).then(response => response.json()).then(data => {
        //     return data;
        // }))
        return temp
        // return (
        //     <Text style={styles.title}>{temp}</Text>
        // )
        
    }

    // const renderRow = ( receiptID,itemID,buyerID,sellerID, paymentMethod, meetLocation, deliverLocation, totalBill, createdTime, decoyView) => {
    //     console.log(receiptID);
    //     return (
    //         <TouchableOpacity style={styles.container}                            
    //         onPress={() => navigation.navigate('AdminPurchaseHistoryDetails')}>

    //                 <View style={styles.row}>
    //                     <Image style={styles.productImg} resizeMode="stretch" source={{uri:'https://tradeups3.s3.ap-southeast-1.amazonaws.com/ItemAsset/' +itemID+'.jpg'}}/>
    //                     <View>
                        
    //                     {getItemName(itemID)}
    //                     {/* <Text style={styles.title}>{item.itemID}</Text> */}
    //                         <Text style={styles.time}>{createdTime}</Text>
    //                     </View>
                        
    //                     <Text style={styles.success}>RM {totalBill} </Text>
    //                 </View>
                

    //         </TouchableOpacity>
    //     );
    //   };

    useEffect(() => {
        if(isFocused){ 
            getReceiptList();
        }
    },[navigation, isFocused]);
    return(
        <View style={styles.root}>
        <FlatList
            data={receiptList}
            keyExtractor= {(key) => {
                            return key.receiptID;
                        }}
            style={styles.list}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            renderItem={({item}) => {
                return (
                    
                    <TouchableOpacity style={styles.container}                            
                    onPress={() => navigation.navigate('AdminPurchaseHistoryDetails',item)}>

                            <View style={styles.row}>
                                <Image style={styles.productImg} resizeMode="contain" source={{uri:'https://tradeups3.s3.ap-southeast-1.amazonaws.com/ItemAsset/' +item.itemID +'.jpg'}}/>
                                <View>
                                
                                {/* {getItemName(item.itemID)} */}
                                {/* <Text style={styles.title}>{
                                    getItemName(item.itemID)
                                    
                                    }</Text> */}
                                    <Text style={styles.time}>{item.createdTime}</Text>
                                </View>
                                
                                {/* <Text style={styles.success}>RM {item.totalBill} </Text> */}
                            </View>
                        

                    </TouchableOpacity>
                    )
                }}
            
            //renderRow(item.receiptID, item.itemID, item.buyerID, item.sellerID, item.paymentMethod, item.meetLocation, item.deliverLocation, item.totalBill, item.createdTime, item.decoyView)}
            
            />
            </View>  
        // <ScrollView style={styles.root}>
            
        //     <TouchableOpacity style={styles.container}                            
        //     onPress={() => navigation.navigate('')}>

        //             <View style={styles.row}>
        //                 <Image style={styles.productImg} resizeMode="stretch" source={{uri:"https://i.ytimg.com/vi/vIRapJCr7kg/maxresdefault.jpg"}}/>
        //                 <View>
        //                     <Text style={styles.title}>iPhone 13</Text>
        //                     <Text style={styles.time}>18 April 2022 12:00 pm</Text>
        //                 </View>
        //                 <Text style={styles.success}> Delivered </Text>
        //             </View>
                   

        //     </TouchableOpacity>

        //     <TouchableOpacity style={styles.container}                            
        //     onPress={() => navigation.navigate('AdminPurchaseHistoryDetails')}>
                
        //             <View style={styles.row}>
        //                 <Image style={styles.productImg} resizeMode="stretch" source={{uri:"https://i.ytimg.com/vi/vIRapJCr7kg/maxresdefault.jpg"}}/>
        //                 <View>
        //                     <Text style={styles.title}>iPhone 13</Text>
        //                     <Text style={styles.time}>18 April 2022 12:00 pm</Text>
        //                 </View>
        //                 <Text style={styles.pending}> Pending </Text>
        //             </View>
                   

        //     </TouchableOpacity>

        //     <TouchableOpacity style={styles.container}                            
        //     onPress={() => navigation.navigate('PurchaseHistoryDetails')}>
                
        //             <View style={styles.row}>
        //                 <Image style={styles.productImg} resizeMode="stretch" source={{uri:"https://i.ytimg.com/vi/vIRapJCr7kg/maxresdefault.jpg"}}/>
        //                 <View>
        //                     <Text style={styles.title}>iPhone 13</Text>
        //                     <Text style={styles.time}>18 April 2022 12:00 pm</Text>
        //                 </View>
        //                 <Text style={styles.canceled}> Canceled </Text>
        //             </View>
                   

        //     </TouchableOpacity>
            
        // </ScrollView>
    )
}

const styles = StyleSheet.create({

root:{
    height:'100%',
    paddingRight:10
},

container:{
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

row:{
    //flexDirection: 'row',
    backgroundColor:'white',
},


title:{
    padding:10,
    paddingTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
},

time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 15,
    paddingBottom:25,
    paddingTop:30,
    alignSelf:'center'
},

success:{
    fontSize: 15,
    color: 'green',
    paddingBottom:25,
    alignSelf:'flex-end',
    paddingLeft:50
},

pending:{
    fontSize: 15,
    color: '#fb8500',
    paddingBottom:25,
    alignSelf:'flex-end',
    paddingLeft:50
},

productImg:{
    height: 120,
    width: "100%",
    alignSelf:'center',
  },

canceled:{
    fontSize: 15,
    color: '#d62828',
    paddingBottom:25,
    alignSelf:'flex-end',
    paddingLeft:50
},

end: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:90
},


});

export default AdminPurchaseHistory