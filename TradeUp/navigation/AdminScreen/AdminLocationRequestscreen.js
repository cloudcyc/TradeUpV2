import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable,FlatList} from 'react-native';
import { useIsFocused } from "@react-navigation/native";
function RequestScreen ({navigation}) {
    const isFocused = useIsFocused(); //used to refresh upon entering new screen
    const [RequestList, setRequestList] = React.useState([]);
    const getPendingRequestAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/centres?inputCentreStatus=Pending';

    const getRequestList = () => {
        fetch(getPendingRequestAPI).then((response) => response.json()).then((json) => { 
            setRequestList(json);
        }).catch((error) => {
            console.error(error);
        });
    }

    React.useEffect(() => {
        getRequestList();
        
    },[isFocused]);
    return(
        // <ScrollView style={styles.root}>
        <View style={styles.root}>
            <FlatList 
                        data={RequestList}
                        keyExtractor= {(key) => {
                            return key.centreID;
                        }}
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={styles.separator}/>
                            )
                        }}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity 
                                    style={styles.container}                            
                                    onPress={() => navigation.navigate('RequestDetailScreen',item)}>

                                    <View style={styles.row}>
                                        <Text style={styles.title}>{item.centreName}</Text>
                                        <Text style={styles.pending}> {item.centreStatus} </Text>
                                    </View>

                                    <View style={styles.end}>
                                        <Text style={styles.time}>{item.createdTime}</Text>
                                    </View>
                                </TouchableOpacity>
                                )
                        }}
            >
            </FlatList> 
            {/* <TouchableOpacity style={styles.container}                            
            onPress={() => navigation.navigate('RequestDetailScreen')}>
                <View style={styles.row}>
                    <Text style={styles.title}>Donate Clothes</Text>
                    <Text style={styles.success}> Approved </Text>
                </View>
                <View style={styles.end}>
                    <Text style={styles.time}>18 April 2022 12:00 pm</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.title}>Donate Clothes</Text>
                    <Text style={styles.pending}> Pending </Text>
                </View>
                <View style={styles.end}>
                    <Text style={styles.time}>18 April 2022 12:00 pm</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.title}>Donate Clothes</Text>
                    <Text style={styles.canceled}> Declined </Text>
                </View>
                <View style={styles.end}>
                    <Text style={styles.time}>18 April 2022 12:00 pm</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.title}>Donate Clothes</Text>
                    <Text style={styles.success}> Approved </Text>
                </View>
                <View style={styles.end}>
                    <Text style={styles.time}>18 April 2022 12:00 pm</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.title}>Donate Clothes</Text>
                    <Text style={styles.pending}> Pending </Text>
                </View>
                <View style={styles.end}>
                    <Text style={styles.time}>18 April 2022 12:00 pm</Text>
                </View>
            </TouchableOpacity> */}
            </View>
        // </ScrollView>
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

export default RequestScreen