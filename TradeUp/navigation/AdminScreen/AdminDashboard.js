import * as React from 'react';
import { View, Text } from 'react-native';

export default function AdminDashboard({ navigation }){
    return(
        <View style = {{flex: 1, alignItems: 'center', justifyContent:'center'}}>
            <Text>This is AdminDashboardScreen.</Text>
        </View>
    );
}