import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Avatar } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from './Filter.style.js';
import awsmobile from './aws-exports';
import Amplify, { API, Auth } from 'aws-amplify';
import AwesomeButton from "react-native-really-awesome-button";
import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure(awsmobile);
// const {height,width} = Dimensions.get('window');

export default class Profile extends Component {

    static navigationOptions = {
        title:'Profile',

        headerTitleStyle:{
            fontSize:22,
        },
        headerStyle: {
            backgroundColor: '#DCDCDC',
        },
    };
    constructor(props) {
        super(props)
        this.state = {
            chineseColor:'#C0C0C0',
            chineseDarkColor:'#9F9F9F',
        };

    }

    changeColor = (e) =>{
        // console.log(e);
        if (this.state.chineseColor=='#C0C0C0')
        {
            this.setState({
                chineseColor:'#B0C4DE',
                chineseDarkColor:'#6495ED',
            })
        }
        else
        {
            this.setState({
                chineseColor:'#C0C0C0',
                chineseDarkColor:'#9F9F9F',
            })
        }

    }




    render() {
        return (
            <View style={styles.container} >
                <Grid marginTop={100}>
                    <Row size={1} style={styles.grid_row}>
                        <Text style={styles.text}>Restaurant</Text>
                        <Row size={1}>
                            <AwesomeButton style={styles.awesomebutton} onPress={()=>this.changeColor('chinese')} backgroundColor={this.state.chineseColor} backgroundShadow={this.state.chineseColor} backgroundDarker={this.state.chineseDarkColor} >Chinese</AwesomeButton>
                            <AwesomeButton style={styles.awesomebutton}>Korean</AwesomeButton>
                            <AwesomeButton style={styles.awesomebutton}>Vietnamese</AwesomeButton>
                            <AwesomeButton style={styles.awesomebutton}>American</AwesomeButton>
                        </Row>
                        <Row size={1}>
                            <AwesomeButton style={styles.awesomebutton}>Other</AwesomeButton>
                        </Row>

                    </Row>
                    <Row size={1} style={styles.grid_row}>
                        <Text style={styles.text}>Protein</Text>
                        <Row size={1}>
                            <AwesomeButton style={styles.awesomebutton}>Chicken</AwesomeButton>
                            <AwesomeButton style={styles.awesomebutton}>Beef</AwesomeButton>
                            <AwesomeButton style={styles.awesomebutton}>Pork</AwesomeButton>
                            <AwesomeButton style={styles.awesomebutton}>Fish</AwesomeButton>
                            <AwesomeButton style={styles.awesomebutton}>Other</AwesomeButton>
                        </Row>
                    </Row>
                    <Row size={1} style={styles.grid_row}>
                        <Text style={styles.text}>Carbohydrate</Text>
                        <Row size={1}>
                            <AwesomeButton style={styles.awesomebutton}>Rice</AwesomeButton>
                            <AwesomeButton style={styles.awesomebutton}>Noodle</AwesomeButton>
                            <AwesomeButton style={styles.awesomebutton}>Potato</AwesomeButton>
                            <AwesomeButton style={styles.awesomebutton}>Fruit</AwesomeButton>
                            <AwesomeButton style={styles.awesomebutton}>Other</AwesomeButton>
                        </Row>
                    </Row>
                    <Row size={1} style={styles.grid_row}>
                        <Text style={styles.text}>Fat</Text>
                        <Row size={1}>
                        <AwesomeButton style={styles.awesomebutton}>Avocado</AwesomeButton>
                        <AwesomeButton style={styles.awesomebutton}>Cheese</AwesomeButton>
                        <AwesomeButton style={styles.awesomebutton}>Nut</AwesomeButton>
                        <AwesomeButton style={styles.awesomebutton}>Egg</AwesomeButton>
                        <AwesomeButton style={styles.awesomebutton}>Other</AwesomeButton>
                        </Row>
                    </Row>

                </Grid>
            </View>
        );
    }
}

