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
import styles from './src/Profile/Profile.style.js';
import awsmobile from './aws-exports';
import Amplify, { API, Auth } from 'aws-amplify';
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
            user:{
                username:'',
                email:'',
                height_ft:0,
                height_in:0,
                weight:0,
                bmi:0,
            },
            edit:false,
            unedit:true,
        };
        // this.editShouldshow = this.editShouldshow.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updateHeight_ft = this.updateHeight_ft.bind(this);
        this.updateHeight_in = this.updateHeight_in.bind(this);
        this.updateWeight = this.updateWeight.bind(this);
        this.updateBMI = this.updateBMI.bind(this);
    }

    async componentDidMount() {
        await Auth.currentAuthenticatedUser({
            bypassCache:true
        }).then(user => this.setState({
            user:{
                username:user.attributes.nickname,
                email:user.attributes.email,
                height_ft:user.attributes['custom:height'],
                height_in:user.attributes['custom:height-in'],
                weight:user.attributes['custom:weight'],
                bmi:user.attributes['custom:bmi']
            }
        }))
            .catch(err => console.log(err));
        // console.log(user);
    }


    updateUsername = async (e) =>{
        console.log(e);
        let user = await Auth.currentAuthenticatedUser();
        let result = await Auth.updateUserAttributes(user, {
            'nickname': e
        });
        this.setState({
            user:{
                ...this.state.user,
                nickname:e,
            }
        })
        // console.log(user);
    }

    updateHeight_ft = async (e) =>{
        console.log(e);
        let user = await Auth.currentAuthenticatedUser();
        let result = await Auth.updateUserAttributes(user, {
            'custom:height': e
        });
        this.setState({
            user:{
                ...this.state.user,
                height_ft:e,
            }
        })
        // this.updateBMI();
    }

    updateHeight_in = async (e) =>{
        console.log(e);
        let user = await Auth.currentAuthenticatedUser();
        let result = await Auth.updateUserAttributes(user, {
            'custom:height-in': e
        });
        this.setState({
            user:{
                ...this.state.user,
                height_in:e,
            }
        })
        this.updateBMI();
    }

    updateWeight = async (e) =>{
        console.log(e);
        let user = await Auth.currentAuthenticatedUser();
        let result = await Auth.updateUserAttributes(user, {
            'custom:weight': e
        });
        this.setState({
            user:{
                ...this.state.user,
                weight:e,
            }
        })
        this.updateBMI();
    }

    updateBMI = async () =>{
        let weight = this.state.user.weight;
        let height_ft = this.state.user.height_ft;
        let height_in = this.state.user.height_in;
        let bmi_decimal = ( weight * 703 ) / (((height_ft*12)+height_in) * ((height_ft*12)+height_in));
        let bmi = (bmi_decimal*100).toPrecision(4);
        let user = await Auth.currentAuthenticatedUser();
        let result = await Auth.updateUserAttributes(user, {
            'custom:bmi': bmi.toString(),
        });
        this.setState({
            user:{
                ...this.state.user,
                bmi:bmi,
            }
        })

    }

    render() {
        return (
            <View style={styles.container} >
                <Grid style = {styles.background} >
                    <Row size = {4.5} backgroundColor = {'#DCDCDC'}>
                        <View style={{top: 90, justifySelf: 'flex-end'}}>
                            <Icon
                                name='edit'
                                size={30}
                                style={{right: 5}}
                                color={'#DCDCDC'}
                            />
                        </View>
                        <View style={styles.avatar}>
                            <Avatar size = 'xlarge' overlayContainerStyle={{backgroundColor: '#87CEFA'}} borderColor ={'white'} borderWidth = {4} icon ={{name:'account-box',color:'white'}} />
                        </View>
                        <View style={{top:50, justifySelf: 'flex-end',right:30}}>
                            {this.state.unedit?
                                <Icon
                                    name='edit'
                                    size={30}
                                    style={{right: 5}}
                                    onPress={()=>this.setState({edit:true,unedit:false})}
                                />
                                :null}
                            {this.state.edit?
                                <Icon
                                    name='save'
                                    size={30}
                                    style={{right: 5}}
                                    onPress={()=>this.setState({edit:false,unedit:true})}
                                />
                                :null}
                        </View>
                    </Row>
                    <Row style={styles.row} marginTop ={36}>
                        <View marginLeft= {15} marginTop = {30} marginRight={15} flexDirection={'row'} flex={1} justifyContent={'space-between'}>
                            <View style={{flex:1, textAlign:'right'}}>
                                <Text style={{color:'#C0C0C0'}}>
                                    Username
                                </Text>
                            </View>
                            {this.state.edit?
                                <View style={{flex:1,textAlign:'right'}}>
                                    <TextInput
                                        placeholder="username"
                                        placeholderTextColor="red"
                                        style={{textAlign: 'right'}}
                                        onChangeText={this.updateUsername}>
                                    </TextInput>
                                </View>
                                :null}
                            {this.state.unedit?
                                <View style={{flex: 1, textAlign: 'right'}}>
                                    <Text style={{textAlign: 'right'}}>
                                        {this.state.user.username}
                                    </Text>
                                </View>
                                :null}
                        </View>
                    </Row>
                    <Row style={styles.row} marginTop = {10}>
                        <View marginLeft= {15} marginTop = {30} marginRight={15} flexDirection={'row'} flex={1} justifyContent={'space-between'}>
                            <View style={{flex:1, textAlign:'right'}}>
                                <Text style={{color:'#C0C0C0'}}>
                                    Email
                                </Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{textAlign:'right'}}>
                                    {this.state.user.email}
                                </Text>
                            </View>
                        </View>
                    </Row>
                    <Row style={styles.row} marginTop = {10}>
                        <View marginLeft= {15} marginTop = {30} marginRight={15} flexDirection={'row'} flex={1} justifyContent={'space-between'}>
                            <View style={{flex:1, textAlign:'right'}}>
                                <Text style={{color:'#C0C0C0'}}>
                                    Height
                                </Text>
                            </View>
                            {this.state.edit?
                                <View style={{flex:1,textAlignVertical:'top',flexDirection:'row-reverse',marginBottom:30}}>
                                    <TextInput
                                        placeholder="in"
                                        placeholderTextColor="black"
                                        marginLeft={10}>
                                    </TextInput>
                                    <TextInput
                                        placeholder="Height"
                                        placeholderTextColor="red"
                                        marginLeft={10}
                                        onChangeText={this.updateHeight_in}>
                                    </TextInput>
                                    <TextInput
                                        placeholder="ft"
                                        placeholderTextColor="black"
                                        marginLeft={10}>
                                    </TextInput>
                                    <TextInput
                                        placeholder="Height"
                                        placeholderTextColor="red"
                                        onChangeText={this.updateHeight_ft}>
                                    </TextInput>

                                </View>
                                :null}
                            {this.state.unedit?
                                <View style={{flex: 1, textAlign: 'right',flexDirection:'row-reverse'}}>
                                    <Text style={{textAlign: 'right',marginLeft:5}}>
                                        in
                                    </Text>
                                    <Text style={{textAlign: 'right',marginLeft:5}}>
                                        {this.state.user.height_in}
                                    </Text>
                                    <Text style={{textAlign: 'right',marginLeft:5}}>
                                        ft
                                    </Text>
                                    <Text style={{textAlign: 'right',marginLeft:5}}>
                                        {this.state.user.height_ft}
                                    </Text>
                                </View>
                                :null}
                        </View>
                    </Row>
                    <Row style={styles.row} marginTop = {10}>
                        <View marginLeft= {15} marginTop = {30} marginRight={15} flexDirection={'row'} flex={1} justifyContent={'space-between'}>
                            <View style={{flex:1, textAlign:'right'}}>
                                <Text style={{color:'#C0C0C0'}}>
                                    Weight
                                </Text>
                            </View>
                            {this.state.edit?
                                <View style={{flex:1,textAlign:'right'}}>
                                    <TextInput
                                        placeholder="Weight"
                                        placeholderTextColor="red"
                                        style={{textAlign: 'right'}}
                                        onChangeText={this.updateWeight}>
                                    </TextInput>
                                </View>
                                :null}
                            {this.state.unedit?
                                <View style={{flex: 1, textAlign: 'right'}}>
                                    <Text style={{textAlign: 'right'}}>
                                        {this.state.user.weight}
                                    </Text>
                                </View>
                                :null}
                        </View>
                    </Row>
                    <Row size = {1} marginTop = {10}>
                        <View marginLeft= {15} marginTop = {30} marginRight={15} flexDirection={'row'} flex={1} justifyContent={'space-between'}>
                            <View style={{flex:1, textAlign:'right'}}>
                                <Text style={{color:'#C0C0C0'}}>
                                    BMI
                                </Text>
                            </View>
                            <View style={{flex:1,}}>
                                <Text style={{textAlign:'right'}}>
                                    {this.state.user.bmi}
                                </Text>
                            </View>
                        </View>
                    </Row>
                </Grid>


            </View>
        );
    }
}

