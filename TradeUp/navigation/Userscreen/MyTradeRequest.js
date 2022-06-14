import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';

function MyTradeRequest ({navigation}) {
    return(
        <ScrollView style={styles.root}>
            
            <TouchableOpacity style={styles.container}                            
            onPress={() => navigation.navigate('TradeDetailScreen')}>
                <View style={styles.row}>
                    <Text style={styles.title}>iPhone 13</Text>
                    <Text style={styles.success}> Success </Text>
                </View>
                <View style={styles.end}>
                    <Text style={styles.time}>18 April 2022 12:00 pm</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.title}>iPhone 14</Text>
                    <Text style={styles.pending}> Pending </Text>
                </View>
                <View style={styles.end}>
                    <Text style={styles.time}>18 April 2022 12:00 pm</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.title}>iPhone 20</Text>
                    <Text style={styles.canceled}> Canceled </Text>
                </View>
                <View style={styles.end}>
                    <Text style={styles.time}>18 April 2022 12:00 pm</Text>
                </View>
            </TouchableOpacity>
            
        </ScrollView>
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