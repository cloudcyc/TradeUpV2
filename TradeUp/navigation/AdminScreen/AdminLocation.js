import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable,FlatList } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

function AdminLocation({ navigation }){

    const isFocused = useIsFocused(); //used to refresh upon entering new screen
    const [centreList, setcentreList] = React.useState([]);
    const [search, setNewSearch] = React.useState("");
    const getActiveCentreAPI = 'https://kvih098pq8.execute-api.ap-southeast-1.amazonaws.com/dev/centres';
    const getCentreList = () => {
        fetch(getActiveCentreAPI).then((response) => response.json()).then((json) => { 
            setcentreList(json);
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleSearchChange = (text) => {
        setNewSearch(text)
        
      };
    const filteredCentre = !search
    ? centreList
    : centreList.filter((filterCentre) =>
        filterCentre.centreAddress.toLowerCase().includes(search.toLowerCase())
      );

    React.useEffect(() => {
        if(isFocused){ 
            getCentreList();
        }
        
        
    },[navigation, isFocused]);

    return(
        <View style={styles.root}>

            <View style={styles.row}>
                
                <View style={styles.containerSearch}>
                    <Ionicons name='search-outline' size={25} color='grey' style={{paddingLeft:5,paddingRight:5}} />
                    <TextInput placeholder='Search area'
                        onChangeText ={(text) => handleSearchChange(text)}
                    />
                </View>

                <Ionicons name='person-circle-outline' size={40} color='#00b4d8' style={{paddingLeft:5}} onPress={() => navigation.navigate('Profile')}/>

            </View>

        <View>
        <FlatList 
                        data={filteredCentre}
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
                                            onPress={() => navigation.navigate('AdminLocationDetails', item)}
                                            style={styles.roundButton}>
                                            <Image style={styles.icon} source={{
                                            uri:
                                                'https://tradeups3.s3.ap-southeast-1.amazonaws.com/DonationCentreAsset/'+[item.centreID]+'.jpg',
                                            }}/>
                                                <Text style={styles.locationtitle}>{item.centreName}</Text>
                                                <Text style={styles.locationtitle2}>Location:  {item.centreAddress}</Text>
                                                <Text style={styles.locationtitle2}>Status:  {item.centreStatus}</Text>


                                        </TouchableOpacity>
                                    )
                        }}
            >
            </FlatList> 

        </View>

        <TouchableOpacity
                onPress={() => navigation.navigate('AdminAddLocation')}
                style={styles.roundButton2}>
                <Text style={styles.addtext}>+</Text>
        </TouchableOpacity> 

    </View>
    );
}

const styles = StyleSheet.create({

    root:{
        padding:20,
        height:'100%',
        // paddingTop:40,
    },

    roundButton: {
        width: '100%',
        height: 270,
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        shadowColor: '#00000021',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },

    icon: {
        width:'100%',
        height:150,
        borderRadius:5,
        paddingBottom:5,
    },

    row:{
        flexDirection: 'row',
        alignItems:'center',
        marginBottom:20,

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

    locationtitle: {
        fontWeight:'500',
        padding:5,
        paddingTop: 8,
        fontSize:18,
        color:'#00a6fb'
    },

    locationtitle2: {
        fontWeight:'500',
        padding:5,
        paddingTop: 5,
        color:'grey'
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
        bottom:20,
        right:20,
    },

    addtext:{
        color:'white',
        fontSize:30
    }

});

export default AdminLocation