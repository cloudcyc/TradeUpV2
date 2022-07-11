import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from "@react-navigation/native";
Ionicons.loadFont();


function AdminDashboard ({navigation}) {
    const isFocused = useIsFocused(); //used to refresh upon entering new screen

    const [tradeList, settradeList] = React.useState([]);
    const [sellList, setsellList] = React.useState([]);
    const [centreList, setcentreList] = React.useState([]);
    const [RequestList, setRequestList] = React.useState([]);
    const [tradeRequestPendingList, settradeRequestPendingList] = React.useState([]);
    const [receiptList, setreceiptList] = React.useState([]);
    const getSellList = () => {
        const getActiveItemAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items?inputItemMode=Sell&inputUserRole=Admin';
        fetch(getActiveItemAPI).then((response) => response.json()).then((json) => { 
          setsellList(json);
        }).catch((error) => {
            console.error(error);
        });
    }

    
    const gettradeList = () => {
        const getActiveItemAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/items?inputItemMode=Trade&inputUserRole=Admin';
        fetch(getActiveItemAPI).then((response) => response.json()).then((json) => { 
            settradeList(json);
        }).catch((error) => {
            console.error(error);
        });
    }
    const gettradeRequestPendingList = () => {
        const getActiveItemAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/requests?GetByAdmin=True&inputrequestTradeStatus=Pending';
        fetch(getActiveItemAPI).then((response) => response.json()).then((json) => { 
            settradeRequestPendingList(json);
        }).catch((error) => {
            console.error(error);
        });
    }
    const getreceiptList = () => {
       
        const getReceiptListAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/receipts?decoyView=True';
        
        fetch(getReceiptListAPI).then((response) => response.json()).then((json) => { 
            setreceiptList(json);
            
        }).catch((error) => {
            console.error(error);
        });
    }

    

    
    const getCentreList = () => {
        const getActiveCentreAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/centres';
        fetch(getActiveCentreAPI).then((response) => response.json()).then((json) => { 
            setcentreList(json);
        }).catch((error) => {
            console.error(error);
        });
    }

    

    const getRequestList = () => {
        const getPendingRequestAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/centres?inputCentreStatus=Pending';
        fetch(getPendingRequestAPI).then((response) => response.json()).then((json) => { 
            setRequestList(json);
        }).catch((error) => {
            console.error(error);
        });
    }


  React.useEffect(() => {
    if(isFocused){ 
      gettradeList();
      getSellList();
      getCentreList();
      getRequestList();
      gettradeRequestPendingList();
      getreceiptList();
    }
    
    
},[navigation, isFocused]);
   
    return(

        <ScrollView style={styles.root}>

            <Text style={styles.title}>Your Dashboard</Text>
            <Text style={styles.title2}>Monitor Your App Here In Simple View</Text>

            <View style={styles.container}>

                <View style={styles.root2}>

                <View style={{backgroundColor:'white', borderRadius:15}}>
                <Text style={styles.title3}>Marketplace:</Text>

                <View style={styles.separator}></View>

                    <View style={styles.row}>
                    {/* onPress={() => navigation.navigate('AdminPurchaseHistory')} */}
                        <TouchableOpacity style={styles.roundcard} >

                            <Text style={styles.totalrequest}>Total Item:</Text>
                            <Text style={styles.cardnumber}> {tradeList.length}</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.roundcard} >

                            <Text style={styles.pendingrequest}>Request Pending:</Text>
                            <Text style={styles.cardnumber}>{tradeRequestPendingList.length}</Text>

                        </TouchableOpacity>

                    </View>
                    </View>

                    <View style={{backgroundColor:'white', borderRadius:15, marginTop:10}}>

                    <Text style={styles.title3}>Shop:</Text>

                    <View style={styles.separator}></View>

                        <View style={styles.row}>
                            <TouchableOpacity style={styles.roundcard} >

                                <Text style={styles.totalrequest}>Total Purchase:</Text>
                                <Text style={styles.cardnumber}> {sellList.length}</Text>

                            </TouchableOpacity>

                            <TouchableOpacity style={styles.roundcard} >

                                <Text style={styles.pendingrequest}>Purchase Pending:</Text>
                                <Text style={styles.cardnumber}>{receiptList.length}</Text>

                            </TouchableOpacity>

                        </View>
                        </View>

                        <View style={{backgroundColor:'white', borderRadius:15, marginTop:10, marginBottom:25}}>

                        <Text style={styles.title3}>Centres:</Text>

                        <View style={styles.separator}></View>

                        <View style={styles.row}>

                            <TouchableOpacity style={styles.roundcard} >

                                <Text style={styles.totalrequest}>Total Centre:</Text>
                                <Text style={styles.cardnumber}> {centreList.length}</Text>

                            </TouchableOpacity>
                            <TouchableOpacity style={styles.roundcard} >

                                <Text style={styles.totalrequest}>Centre Request:</Text>
                                <Text style={styles.cardnumber}> {RequestList.length}</Text>

                            </TouchableOpacity>

                        </View>
                        
                        </View>

                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({

    root:{
        backgroundColor: '#dff0fb',
        //paddingTop: 50,
    },

    row3:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight:20,
    },

    separator:{
        height:2,
        backgroundColor:"#ced4da",
        marginTop:10,
        marginBottom:20,
        width:'80%',
        marginLeft:5
    },

    title:{
        marginLeft:20,
        fontSize:25,
        fontWeight:'500',
        paddingTop:10,
        color:'#6c757d'
    },

    title2:{
        marginLeft:20,
        fontSize:15,
        fontWeight:'500',
        paddingTop:10,
        color:'#6c757d'
    },


    title3:{
        marginLeft:10,
        fontSize:18,
        fontWeight:'500',
        paddingTop:10
    },

    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 270,
    },

    container:{
        backgroundColor: '#dff0fb',
        paddingLeft:20,
        paddingRight:30,
        height: '1000%',
    },

    end: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    root2:{
        height:'100%',
        paddingTop:20,
    },

    row:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    row2:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft:15
    },

    roundcard: {
        width: 145,
        height: 90,
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#f2f6f9',
        marginBottom: 10,
    },

    totalrequest:{
        color:'green',
        fontSize:18,
        paddingBottom:10,
        fontWeight:'bold',
        alignSelf:'center',
    },

    pendingrequest:{
        color:'orange',
        fontSize:18,
        paddingBottom:10,
        fontWeight:'bold',
        alignSelf:'center',
    },

    cardnumber:{
        fontSize:18,
        alignSelf:'flex-end',
        paddingRight:25,
        fontWeight:'600',
    },

    PieCard:{
        width: '100%',
        height: 300,
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        marginTop:10,
        marginLeft: 5,
        marginRight: 5,
    },

    updateButton:{
        backgroundColor:'#248277',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        height:45,
        width:'50%',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:10,
    },

    updateText:{
        color:'#fff',
        textAlign:'center',
    },

});

export default AdminDashboard;