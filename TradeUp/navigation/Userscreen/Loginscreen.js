import * as React from 'react';
import { View, Text } from 'react-native';

export default function LoginScreen({ navigation }){
    return(
        <View style = {{flex: 1, alignItems: 'center', justifyContent:'center'}}>
            <Text>This is LoginScreen.</Text>
        </View>
    );
}