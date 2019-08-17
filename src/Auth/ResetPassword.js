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

export default class ResetPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email:'',
            newpassword: '',
            confirmpassword: '',
            verifycode:'',
            emailicon:"account-circle",
            passwordicon:"vpn-key",
            verifycodeicon:'lock',
        }
    }



    resetPassword = async () => {
        let email = this.state.email;
        let verifycode = this.state.verifycode;
        let newpassword = this.state.newpassword;
        await Auth.forgotPasswordSubmit(email, verifycode, newpassword)
            .then(data => {
                // this.setState({buttonLoading: false});
                // console.log('Reset succeed!',data);
                Alert.alert('Succeed', 'password already reset');
                // message.success("Password changed!", 2.5);
                // setTimeout(() => this.props.changeForm(0), 500);
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
                               underlineColorAndroid='transparent'
                               onChangeText={(email) => this.setState({email})}/>
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={this.state.verifycodeicon} color = "lightskyblue" size = {35}/>
                    <TextInput style={styles.inputs}
                               placeholder="VerifyCode"
                               underlineColorAndroid='transparent'
                               onChangeText={(verifycode) => this.setState({verifycode})}/>
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={this.state.passwordicon} color = "lightskyblue" size = {35}/>
                    <TextInput style={styles.inputs}
                               placeholder="NewPassword"
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(newpassword) => this.setState({newpassword})}/>
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={this.state.passwordicon} color = "lightskyblue" size = {35}/>
                    <TextInput style={styles.inputs}
                               placeholder="ConfirmPassword"
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(confirmpassword) => this.setState({confirmpassword})}/>
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.resetPassword}>
                    <Text style={styles.loginText}>Reset</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

