import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';
import SignUp from './src/Auth/SignUp';
import SignIn from './src/Auth/SignIn';
import ForgetPassword from './src/Auth/ForgetPassword';
import ResetPassword from "./src/Auth/ResetPassword";
import Profile from './src/Profile/Profile';
import { Icon } from 'react-native-elements';
import styles from './src/Auth/Login.style.js';
import awsmobile from './aws-exports';
import Amplify, { API, Auth } from 'aws-amplify';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { withAuthenticator } from 'aws-amplify-react-native';


Amplify.configure(awsmobile);



const MainNavigator = createStackNavigator(
    {
        SignIn: {screen: SignIn},
        SignUp: {screen: SignUp},
        ForgetPassword:{screen :ForgetPassword},
        ResetPassword:{screen: ResetPassword},
        Profile:{screen: Profile},
    },
    {
        initialRouteName: 'SignIn',
        // headerMode:'none',
    }
);

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;



