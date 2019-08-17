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

export default class ForgetPassword extends Component {

    static navigationOptions = {
        // header: null,
        headerStyle: {
            backgroundColor: '#DCDCDC',
        },
    };

    constructor(props) {
        super(props)
        this.state = {
            email   : '',
            password: '',
            emailicon:"account-circle",
            passwordicon:"vpn-key",
        }
    }

    sendForgetpassword = async () => {

        let email = this.state.email;
        await Auth.forgotPassword(email)
            .then(data => {
                // this.setState({buttonLoading: false});
                Alert.alert('Succeed','please check your email');
                // message.success("Please check your email for your verification code!", 3);
                // setTimeout(() => this.props.changeForm(3), 1);
            })
            .catch(err => {
                // this.setState({buttonLoading: false});
                Alert.alert('Error',err.message);
                // message.error(err.message, 2.5)
            });

    }



    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.buttonContainer} >
                    <Text>Enter your email address</Text>
                </TouchableHighlight>
                <View style={styles.inputContainer}>
                    <Icon name={this.state.emailicon} color = "lightskyblue" size = {35}/>
                    <TextInput style={styles.inputs}
                               placeholder="Email"
                               keyboardType="email-address"
                               underlineColorAndroid='transparent'
                               onChangeText={(email) => this.setState({email})}/>
                </View>



                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.sendForgetpassword}>
                    <Text style={styles.loginText}>Send</Text>
                </TouchableHighlight>


            </View>
        );
    }
}

