import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, FlatList, SafeAreaView } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
function MyTradeRequest ({navigation}) {
    const route = useRoute();
    const isFocused = useIsFocused(); //used to refresh upon entering new screen
    const [requestList, setrequestList] = React.useState([]);
    const [search, setNewSearch] = React.useState("");
    const getRequestList = () => {
        // const getAllRequestAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/requests?inputRequestTradeFromID='+ route.params.userID; //remember to update
        const getAllRequestAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/requests?inputRequestTradeFromID=uid0002'; //remember to update
    
        fetch(getAllRequestAPI).then((response) => response.json()).then((json) => { 
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

    useEffect(() => {
        if(isFocused){ 
            getRequestList();
        }
    },[navigation, isFocused]);
    return(
        // <ScrollView style={styles.root}>
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
                    onPress={() => navigation.navigate('TradeDetailScreen', item)}>
                        <View style={styles.row}>
                            <Text style={styles.title}>{item.requestTradeItemName}</Text>
                            <Text style={styles.success}> {item.requestTradeStatus} </Text>
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

export default MyTradeRequest