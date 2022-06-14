import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';

function AdminPurchaseHistory ({navigation}) {
    return(
        <ScrollView style={styles.root}>
            
            <TouchableOpacity style={styles.container}                            
            onPress={() => navigation.navigate('AdminPurchaseHistoryDetails')}>

                    <View style={styles.row}>
                        <Image style={styles.productImg} resizeMode="stretch" source={{uri:"https://i.ytimg.com/vi/vIRapJCr7kg/maxresdefault.jpg"}}/>
                        <View>
                            <Text style={styles.title}>iPhone 13</Text>
                            <Text style={styles.time}>18 April 2022 12:00 pm</Text>
                        </View>
                        <Text style={styles.success}> Delivered </Text>
                    </View>
                   

            </TouchableOpacity>

            <TouchableOpacity style={styles.container}                            
            onPress={() => navigation.navigate('AdminPurchaseHistoryDetails')}>
                
                    <View style={styles.row}>
                        <Image style={styles.productImg} resizeMode="stretch" source={{uri:"https://i.ytimg.com/vi/vIRapJCr7kg/maxresdefault.jpg"}}/>
                        <View>
                            <Text style={styles.title}>iPhone 13</Text>
                            <Text style={styles.time}>18 April 2022 12:00 pm</Text>
                        </View>
                        <Text style={styles.pending}> Pending </Text>
                    </View>
                   

            </TouchableOpacity>

            <TouchableOpacity style={styles.container}                            
            onPress={() => navigation.navigate('PurchaseHistoryDetails')}>
                
                    <View style={styles.row}>
                        <Image style={styles.productImg} resizeMode="stretch" source={{uri:"https://i.ytimg.com/vi/vIRapJCr7kg/maxresdefault.jpg"}}/>
                        <View>
                            <Text style={styles.title}>iPhone 13</Text>
                            <Text style={styles.time}>18 April 2022 12:00 pm</Text>
                        </View>
                        <Text style={styles.canceled}> Canceled </Text>
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
    fontSize: 12,
    marginLeft:10,
    paddingBottom:25,
    paddingTop:30
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
    width: 80,
    height:80,
    margin:10
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