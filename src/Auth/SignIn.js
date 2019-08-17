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
import { Icon } from 'react-native-elements';
import styles from './Login.style.js';
import awsmobile from '../../aws-exports';
import Amplify, { API, Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure(awsmobile);

export default class SignIn extends Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#DCDCDC',
        },
    }

    constructor(props) {
        super(props)
        this.state = {
            email   : '',
            password: '',
            errormessage:'',
            emailicon:"account-circle",
            passwordicon:"vpn-key",
        }
    }




    logIn = async () => {
        // console.log(this.state.email)
        let email = this.state.email;
        let password = this.state.password;

        await Auth.signIn(email, password)
            .then(data => {
                this.props.navigation.navigate('Profile');
                // console.log(data);
                console.log('Sign in Succeed')

            })
            .catch(err => {
                this.loginError(err.message);
            });
        // console.log(this.state.errormessage);
    }

    loginError = (error) => {
        Alert.alert("Error" , error);
    }


    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Icon name={this.state.emailicon} color = "lightskyblue" size = {35}/>
                    <TextInput style={styles.inputs}
                               placeholder="Email"
                               keyboardType="email-address"
                               underlineColorAndroid='transparent'
                               onChangeText={(email) => this.setState({email})}/>
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={this.state.passwordicon} color = "lightskyblue" size = {35}/>
                    <TextInput style={styles.inputs}
                               placeholder="Password"
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(password) => this.setState({password})}/>
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.logIn}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('ForgetPassword')}>
                    <Text>Forgot your password?</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('SignUp')}>
                    <Text>Sign Up</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

