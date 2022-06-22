import React from 'react'

import AdminDashboard from './AdminScreen/AdminDashboard';
import AdminLocation from './AdminScreen/AdminLocation';
import AdminMarketplace from './AdminScreen/AdminMarketplace';
import AdminProfile from './AdminScreen/AdminProfile';
import AdminShop from './AdminScreen/AdminShop';
import AdminMarketplaceProduct from './AdminScreen/AdminMarketplaceProduct';
import AdminEditMarketplaceProduct from './AdminScreen/AdminEditMarketplaceProduct';
import AdminShopProduct from './AdminScreen/AdminShopProduct';
import AdminEditShopProduct from './AdminScreen/AdminEditShopProduct';
import AdminLocationDetails from './AdminScreen/AdminLocationDetails';
import AdminAddLocation from './AdminScreen/AdminAddLocation';
import AdminEditLocation from './AdminScreen/AdminEditLocation';
import AdminEditProfile from './AdminScreen/AdminEditProfile';
import AdminTradeRequest from './AdminScreen/AdminTradeRequest';
import AdminTradeRequestDetails from './AdminScreen/AdminTradeRequestDetails';
import AdminPurchaseHistory from './AdminScreen/AdminPurchaseHistory';
import AdminPurchaseHistoryDetails from './AdminScreen/AdminPurchaseHistoryDetails';
import AdminManageUserScreen from './AdminScreen/AdminManageUsers';
import AdminEditUser from './AdminScreen/AdminEditUser';
import AdminAddUser from './AdminScreen/AdminAddUser';
import RequestScreen from './AdminScreen/AdminLocationRequestscreen';
import RequestDetailScreen from './AdminScreen/AdminLocationRequestDetailScreen';

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
import ManageMarketplace from './Userscreen/ManageMarketplace';
import EditMarketplaceDetails from './Userscreen/EditMarketplaceDetails';
import ManageMarketplaceDetails from './Userscreen/ManageMarketplaceDetails';
import AddMarketplaceProduct from './Userscreen/AddMarketplaceProduct';
import ManageShop from './Userscreen/ManageShop';
import AddShopProduct from './Userscreen/AddShopProduct';
import ManageShopDetails from './Userscreen/ManageShopDetails';
import EditShopProductDetails from './Userscreen/EditShopProductDetails';
import Signupscreen from './Userscreen/Signupscreen';
import AddNewRequest from './Userscreen/AddNewRequest';

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
        {/* <Tab.Screen name={ProfileScreenName} component={LoginScreen} options={{headerShown: false,}}/> */}

        
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
        <Stack.Screen name="AdminTabs" component={AdminTabs} options={{headerShown: false,}}/>
        <Stack.Screen name="MarketplaceDetails" component={MarketplaceDetails} options={{title: 'Marketplace Details'}}/>
        <Stack.Screen name="MarketplaceProduct" component={MarketplaceProduct} options={{title: 'Marketplace'}}/>
        <Stack.Screen name="MarketplaceRequest" component={MarketplaceRequest} options={{title: 'Marketplace Request'}}/>
        <Stack.Screen name="ShopProduct" component={ShopProduct} options={{title: 'Shop'}}/>
        <Stack.Screen name="ShopProductDetails" component={ShopProductDetails} options={{title: 'Product Details'}}/>
        <Stack.Screen name="BuyNow" component={BuyNow} options={{title: 'Checkout'}}/>
        <Stack.Screen name="LocationDetails" component={LocationDetails} options={{title: 'Location Details'}}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{title: 'Edit Profile'}}/>
        <Stack.Screen name="MyTradeRequest" component={MyTradeRequest} options={{title: 'Trade Request'}}/>
        <Stack.Screen name="TradeDetailScreen" component={TradeDetailScreen} options={{title: 'Request Details'}}/>
        <Stack.Screen name="EditTradeRequest" component={EditTradeRequest} options={{title: 'Edit Request'}}/>
        <Stack.Screen name="PurchaseHistory" component={PurchaseHistory} options={{title: 'Purchase History'}}/>
        <Stack.Screen name="PurchaseHistoryDetails" component={PurchaseHistoryDetails} options={{title: 'History Details'}}/>
        <Stack.Screen name="ManageMarketplace" component={ManageMarketplace} options={{title: ' Manage Marketplace'}}/>
        <Stack.Screen name="EditMarketplaceDetails" component={EditMarketplaceDetails} options={{title: 'Edit Details'}}/>
        <Stack.Screen name="ManageMarketplaceDetails" component={ManageMarketplaceDetails} options={{title: 'Edit Details'}}/>
        <Stack.Screen name="AddMarketplaceProduct" component={AddMarketplaceProduct} options={{title: 'Add Product'}} />
        <Stack.Screen name="ManageShop" component={ManageShop} options={{title: 'Shop'}}/>
        <Stack.Screen name="AddShopProduct" component={AddShopProduct} options={{title: 'Add New Product'}}/>
        <Stack.Screen name="ManageShopDetails" component={ManageShopDetails} options={{title: 'Product Details'}}/>
        <Stack.Screen name="EditShopProductDetails" component={EditShopProductDetails} options={{title: 'Edit Details'}}/>
        <Stack.Screen name="Signupscreen" component={Signupscreen} options={{title: 'Sign Up'}}/>
        <Stack.Screen name="AddNewRequest" component={AddNewRequest} options={{title: 'Request Location'}}/>

        <Stack.Screen name="AdminMarketplaceProduct" component={AdminMarketplaceProduct} options={{title: 'Marketplace Product'}}/>
        <Stack.Screen name="AdminEditMarketplaceProduct" component={AdminEditMarketplaceProduct} options={{title: 'Edit Details'}}/>
        <Stack.Screen name="AdminShopProduct" component={AdminShopProduct} options={{title: 'Product'}}/>
        <Stack.Screen name="AdminEditShopProduct" component={AdminEditShopProduct} options={{title: 'Edit Details'}}/>
        <Stack.Screen name="AdminLocationDetails" component={AdminLocationDetails} options={{title: 'Location'}}/>
        <Stack.Screen name="AdminAddLocation" component={AdminAddLocation} options={{title: 'Add New Location'}}/>
        <Stack.Screen name="AdminEditLocation" component={AdminEditLocation} options={{title: 'Edit Location'}}/>
        <Stack.Screen name="AdminEditProfile" component={AdminEditProfile} options={{title: 'Edit Profile'}}/>
        <Stack.Screen name="AdminTradeRequest" component={AdminTradeRequest} options={{title: 'Trade Request'}}/>
        <Stack.Screen name="AdminTradeRequestDetails" component={AdminTradeRequestDetails} options={{title: 'Request Details'}}/>
        <Stack.Screen name="AdminPurchaseHistory" component={AdminPurchaseHistory} options={{title: 'Purchase History'}}/>
        <Stack.Screen name="AdminPurchaseHistoryDetails" component={AdminPurchaseHistoryDetails} options={{title: 'Purchase History'}}/>
        <Stack.Screen name="AdminManageUserScreen" component={AdminManageUserScreen} options={{title: 'Manage Users'}}/>
        <Stack.Screen name="AdminEditUser" component={AdminEditUser} options={{title: 'Manage User'}}/>
        <Stack.Screen name="AdminAddUser" component={AdminAddUser} options={{title: 'Add New User'}}/>
        <Stack.Screen name="AdminProfile" component={AdminProfile} options={{title: 'Profile'}}/>
        <Stack.Screen name="RequestScreen" component={RequestScreen} options={{title: 'Location Request'}}/>
        <Stack.Screen name="RequestDetailScreen" component={RequestDetailScreen} options={{title: 'Request Detail'}}/>


      </Stack.Navigator>
      
    );
  }