import React from 'react'

import AdminDashboard from './AdminScreen/AdminDashboard';
import AdminLocation from './AdminScreen/AdminLocation';
import AdminMarketplace from './AdminScreen/AdminMarketplace';
import AdminProfile from './AdminScreen/AdminProfile';
import AdminShop from './AdminScreen/AdminShop';

import Location from './Userscreen/Location';
import LoginScreen from './Userscreen/Loginscreen';
import Marketplace from './Userscreen/Marketplace';
import Profile from './Userscreen/Profile';
import Shop from './Userscreen/Shop';
import MarketplaceDetails from './Userscreen/MarketplaceDetails';
import MarketplaceProduct from './Userscreen/MarketplaceProduct';
import MarketplaceRequest from './Userscreen/MarketplaceRequest';
import ShopProduct from './Userscreen/ShopProduct';
import ShopProductDetails from './Userscreen/ShopProductDetails';
import BuyNow from './Userscreen/BuyNow';
import LocationDetails from './Userscreen/LocationDetails';
import EditProfile from './Userscreen/EditProfile';
import MyTradeRequest from './Userscreen/MyTradeRequest';
import TradeDetailScreen from './Userscreen/TradeDetails';
import EditTradeRequest from './Userscreen/EditTradeRequest';
import PurchaseHistory from './Userscreen/PurchaseHistory';
import PurchaseHistoryDetails from './Userscreen/PurchaseHistoryDetails';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();
Ionicons.loadFont();


// Screen name for tabs
const Dashboard = 'Dashboard';
const MarketplaceScreenName = 'Marketplace';
const ShopScreenName = 'Shop';
const LocationScreenName = 'Locations';
const ProfileScreenName = 'Profile';

function HomeTabs() {
    return (
      <Tab.Navigator
      screenOptions={({route}) => ({
               tabBarIcon: ({focused, color, size}) =>{
                   let iconName;
                   let rn = route.name;

                   if (rn === LocationScreenName){
                       iconName = focused ? 'location' : 'location-outline'
                   } else if (rn === MarketplaceScreenName){
                        iconName = focused ? 'home' : 'home-outline'
                   } else if (rn === ShopScreenName){
                        iconName = focused ? 'cart' : 'cart-outline'
                   } else if (rn === ProfileScreenName){
                        iconName = focused ? 'person' : 'person-outline'
                   }

                   return <Ionicons name = {iconName} size = {size} color = {color}></Ionicons>

               }
           })}>

           

        <Tab.Screen name={MarketplaceScreenName} component={Marketplace} options={{headerShown: false,}}/>
        <Tab.Screen name={ShopScreenName} component={Shop} options={{headerShown: false,}}/>
        <Tab.Screen name={LocationScreenName} component={Location} options={{headerShown: false,}}/>        
        <Tab.Screen name={ProfileScreenName} component={Profile} options={{headerShown: false,}}/>
        
      </Tab.Navigator>
    );
  }

  function AdminTabs() {
    return (
      <Tab.Navigator
      screenOptions={({route}) => ({
               tabBarIcon: ({focused, color, size}) =>{
                   let iconName;
                   let rn = route.name;

                   if (rn === LocationScreenName){
                       iconName = focused ? 'location' : 'location-outline'
                   } else if (rn === MarketplaceScreenName){
                        iconName = focused ? 'home' : 'home-outline'
                   } else if (rn === ShopScreenName){
                        iconName = focused ? 'cart' : 'cart-outline'
                   } else if (rn === ProfileScreenName){
                        iconName = focused ? 'person' : 'person-outline'
                   } else if (rn === Dashboard){
                    iconName = focused ? 'stats-chart' : 'stats-chart-outline'
                   }

                   return <Ionicons name = {iconName} size = {size} color = {color}></Ionicons>

               }
           })}>

           
        <Tab.Screen name={Dashboard} component={AdminDashboard} options={{headerShown: false,}}/>
        <Tab.Screen name={MarketplaceScreenName} component={AdminMarketplace} options={{headerShown: false,}}/>
        <Tab.Screen name={ShopScreenName} component={AdminShop} options={{headerShown: false,}}/>
        <Tab.Screen name={LocationScreenName} component={AdminLocation} options={{headerShown: false,}}/>        
        <Tab.Screen name={ProfileScreenName} component={AdminProfile} options={{headerShown: false,}}/>
        
      </Tab.Navigator>
    );
  }
  
  export default function Maincontainer() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{headerShown: false,title: 'Back'}}/>
        <Stack.Screen name="Dashboard" component={AdminDashboard} options={{headerShown: false,}}/>
        <Stack.Screen name="MarketplaceDetails" component={MarketplaceDetails} />
        <Stack.Screen name="MarketplaceProduct" component={MarketplaceProduct} />
        <Stack.Screen name="MarketplaceRequest" component={MarketplaceRequest} />
        <Stack.Screen name="ShopProduct" component={ShopProduct} />
        <Stack.Screen name="ShopProductDetails" component={ShopProductDetails} />
        <Stack.Screen name="BuyNow" component={BuyNow} />
        <Stack.Screen name="LocationDetails" component={LocationDetails} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="MyTradeRequest" component={MyTradeRequest} />
        <Stack.Screen name="TradeDetailScreen" component={TradeDetailScreen} />
        <Stack.Screen name="EditTradeRequest" component={EditTradeRequest} />
        <Stack.Screen name="PurchaseHistory" component={PurchaseHistory} />
        <Stack.Screen name="PurchaseHistoryDetails" component={PurchaseHistoryDetails} />

      </Stack.Navigator>
      
    );
  }