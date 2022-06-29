import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, FlatList, SafeAreaView } from 'react-native';
import { NavigationHelpersContext, useIsFocused, useRoute} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function ViewTradeRequest ({navigation}) {
    const route = useRoute();
    const isFocused = useIsFocused(); //used to refresh upon entering new screen
    const [requestList, setrequestList] = React.useState([]);
    const [search, setNewSearch] = React.useState("");

    const retrieveUserID  = async () =>{
        try {
          const value = await AsyncStorage.getItem('userID')
          if(value != null) {
            // value previously stored
            console.log(value);
          //   setuserID(value);
          getRequestList(value);
          }
        } catch(e) {
          // error reading value
          console.log(e);
        }
      }

    const getRequestList = (inputuserID) => {
        const getReceiveRequestAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/requests?RequestMode=Receive&inputRequestTradeFromID='+inputuserID; //remember to update
    console.log(getReceiveRequestAPI);
        fetch(getReceiveRequestAPI).then((response) => response.json()).then((json) => { 
            setrequestList(json);
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleSearchChange = (text) => {
        setNewSearch(text)
        
        };
    const filteredRequest = !search
    ? requestList
    : requestList.filter((filteredRequest) =>
    filteredRequest.requestTradeItemName.toLowerCase().includes(search.toLowerCase())
        );

        const Statuscolor = (inputStatus) => {
            if (inputStatus == "Accepted" ){
              return(
                <Text style={styles.success}>{inputStatus}</Text>
              )
            }
            else if (inputStatus == "Pending")
            {
              return(
                <Text style={styles.pending}>{inputStatus}</Text>
              )
            }
            else{
                return(
                    <Text style={styles.canceled}>{inputStatus}</Text>
                  )
            }
          }

    useEffect(() => {
        if(isFocused){ 
            retrieveUserID();
        }
    },[navigation, isFocused]);
    return(
        <View style={styles.root}>
        <FlatList
            data={filteredRequest}
            keyExtractor= {(key) => {
                            return key.requestID;
                        }}
            style={styles.list}
            numColumns={1}
            contentContainerStyle={styles.listContainer}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity style={styles.container}                            
                    onPress={() => navigation.navigate('ViewTradeRequestDetails', item)}>
                        <View style={styles.row}>
                            <Text style={styles.title}>{item.requestTradeItemName}</Text>
                            {Statuscolor(item.requestTradeStatus)}
                        </View>
                        <View style={styles.end}>
                            <Text style={styles.time}>{item.requestTradeDate}</Text>
                        </View>
                    </TouchableOpacity>
                    )
                }}
            />
            </View> 
    )
}

const styles = StyleSheet.create({

root:{
    height:'100%',
},

container:{
    backgroundColor:'white',
    borderBottomColor:'#DCDCDC',
    borderBottomWidth: 1,
},

row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'white',
},

title:{
    padding:20,
    paddingTop: 25,
    fontSize: 18,
    fontWeight: 'bold',
},

time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
    marginLeft:20,
    paddingBottom:25,
},

success:{
    padding:20,
    paddingTop: 25,
    fontSize: 15,
    color: 'green',
    alignSelf: 'flex-end',
},

pending:{
    padding:20,
    paddingTop: 25,
    fontSize: 15,
    color: '#fb8500',
    alignSelf: 'flex-end',
},

canceled:{
    padding:20,
    paddingTop: 25,
    fontSize: 15,
    color: '#d62828',
    alignSelf: 'flex-end',
},

end: {
    flexDirection: 'row',
    alignItems: 'center',
},


});

export default ViewTradeRequest