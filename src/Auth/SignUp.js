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
export default class SignUp extends Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#DCDCDC',
        },
    }

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            confirmpassword:'',
            username:'',
            emailicon:"account-circle",
            passwordicon:"vpn-key",
            usericon:"face",
        }
    }

    signUp = () => {

        // console.log('Email:',this.state.email)

        let username = this.state.email;
        let nickname= this.state.username;
        let password = this.state.password;
        let weight = '';
        let height_ft= '';
        let height_in= '';
        let bmi = '';
        // console.log(major);
        Auth.signUp({
            username,
            password,
            attributes: {
                'nickname':nickname,
                'custom:height':height_ft,
                'custom:height-in':height_in,
                'custom:weight':weight,
                'custom:bmi':bmi,

            },
            // validationData: []  //optional
        })
            .then(data => {
                Alert.alert('Thanks for signing up!','Please check your inbox to confirm your email address.');
                // setTimeout(() => this.props.navigation.navigate('SignIn'),3000);
            })
            .catch(err => {
                Alert.alert('Error',err.message);
            });


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
                               onChangeText={(email) => this.setState(({email}))}/>
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={this.state.passwordicon} color = "lightskyblue" size = {35}/>
                    <TextInput style={styles.inputs}
                               placeholder="Password"
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(password) => this.setState({password})}/>
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={this.state.passwordicon} color = "lightskyblue" size = {35}/>
                    <TextInput style={styles.inputs}
                               placeholder="Confirm Password"
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(confirmpassword) => this.setState({confirmpassword})}/>
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={this.state.usericon} color = "lightskyblue" size = {35}/>
                    <TextInput style={styles.inputs}
                               placeholder="UserName"
                        // secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(username) => this.setState({username})}/>
                </View>


                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.signUp}>
                    <Text style={styles.loginText}>Sign Up</Text>
                </TouchableHighlight>


            </View>
        );
    }
}


