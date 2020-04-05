// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, TextInput, ImageBackground, View, Dimensions, TouchableOpacity, Image, ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, Text, Button, Left, } from 'native-base';
import { Avatar, Icon, } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import {
    BarIndicator,
}
    from 'react-native-indicators';

const URL = require("../../components/server");

import color from '../../components/color';



export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: false,
            email: '',
            password: '',
            userInfo: {},
            remember: true,
        };
    }

    componentDidMount() {


    }


    render() {

        return (
            <ImageBackground
                source={require('../../images/login_bg.png')}
                style={styles.mainsection}
                resizeMode="cover"
            >
                <Container style={{ backgroundColor: 'transparent' }}>
                    <Content>
                        <View style={styles.body}>
                                <View style={{ flex: 1, marginTop: 6, marginLeft: 40, marginRight: 40, paddingTop: 40,  justifyContent:'center' }}>

                                    <Text style={{ color: '#fff', marginBottom: 7, marginTop: 10, fontWeight: '400', fontSize: 13, }}> Email</Text>
                                    <View style={styles.oneRowTextInput}>
                                        <View style={styles.textInputIconContainer}>
                                            <Icon type='antdesign' name='user' size={30} color='#fff' />
                                        </View>
                                        <View style={styles.textInputContainer}>
                                            <TextInput
                                                placeholder={"First name"}
                                                placeholderTextColor={'#403C3B'}
                                                returnKeyType="next"
                                                onSubmitEditing={() => this.passwordInput.focus()}
                                                keyboardType='email-address'
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                inlineImageLeft='ios-call'
                                                style={{ flex: 1, fontSize: 13 }}

                                            />

                                        </View>

                                    </View>


                                    <Text style={{ color: '#fff', marginBottom: 7, marginTop: 10, fontWeight: '400', fontSize: 13, }}> Password</Text>
                                    <View style={styles.oneRowTextInput}>
                                        <View style={styles.textInputIconContainer}>
                                            <View style={{ transform: [{ rotateX: "180deg" }] }}>
                                                <Icon type='foundation' name='key' size={30} color='#fff' />
                                            </View>
                                        </View>
                                        <View style={styles.textInputContainer}>
                                            <TextInput
                                                placeholder={"******"}
                                                placeholderTextColor={'#403C3B'}
                                                secureTextEntry
                                                returnKeyType="next"
                                                onSubmitEditing={() => this.passwordInput.focus()}
                                                keyboardType='password'
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                inlineImageLeft='ios-call'
                                                style={{ flex: 1, fontSize: 13 }}

                                            />

                                        </View>

                                    </View>


                                    <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, backgroundColor: '#01215B', justifyContent: 'flex-end', borderRadius: 10, padding: 12 }}>

                                        <View style={{ marginLeft: 20, }}>
                                            <Icon type='ionicon' name='ios-airplane' size={30} color='#01215B' />
                                        </View>

                                        <View  style={styles.actionButton}>
                                            <Text style={{ color: '#FFF', fontWeight: '900', fontSize: 16, }}>Log In </Text>

                                        </View>


                                        <View style={{ marginLeft: 20, }}>
                                            <Icon type='ionicon' name='ios-airplane' size={30} color='#fff' />
                                        </View>

                                    </TouchableOpacity>

                                    <View style={{ flexDirection: 'row', marginTop: 20, }}>
                                    <TouchableOpacity onPress={()=> Actions.reg({type: 'replace'})}>
                                        <Text style={{ color: '#FFF', fontWeight: '600', fontSize: 12, }}>Create New Account  </Text>
                                        </TouchableOpacity>    
                                        <View style={{ flex: 1, justifyContent: 'center', }} />



                                        <View style={{ width: 1, backgroundColor: '#fff' }} />

                                        <View style={{ flex: 1, justifyContent: 'center', }} />



                                        <TouchableOpacity onPress={()=> Actions.login({type: 'replace'})}>
                                        <Text style={{ color: '#FFF', fontWeight: '400', fontSize: 12, }}>Forgot Password </Text>
                                        </TouchableOpacity>
                                    </View>


                                    <View style={{ flexDirection: 'row', marginTop: 20, }}>
                                        <TouchableOpacity onPress={() => this.rememberMe()} style={[{
                                            height: 18,
                                            width: 18,
                                            borderRadius: 9,
                                            borderWidth: 1,
                                            borderColor: '#8D8D8D',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: 10,
                                            backgroundColor: '#fff',
                                        }]}>
                                            {this.state.remember ?


                                                <View style={{
                                                    height: 10,
                                                    width: 10,
                                                    borderRadius: 5,
                                                    backgroundColor: '#8D8D8D',
                                                }} />

                                                :
                                                null


                                            }



                                        </TouchableOpacity>
                                        <Text style={{ color: '#FFF', fontWeight: '400', fontSize: 12, }}>Remember Me</Text>
                                    </View>


                                </View>
                        </View>
                    </Content>
                </Container>
            </ImageBackground>

        );
    }



    itemClicked(item) {
        Actions.product();
    }



}
const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    body: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
       paddingBottom:30

    },

    header: {
        flex: 1,
    },
    headerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    mainsection: {
        flex: 4
    },
    oneRowTextInput: {
        flexDirection: 'row',
    },

    textInputIconContainer: {
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        marginRight: 7,
        height: 45,
        width: 45,
        backgroundColor: '#3B424E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputContainer: {
        flex: 1,
        paddingLeft: 7,
        backgroundColor: '#fff',
        borderColor: '#B8B8B8',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
        height: 45
    },
    actionButton:{ 
        flexDirection: 'row',
        marginTop:20, 
        backgroundColor:'#01215B', 
        justifyContent:'flex-end', 
        borderRadius:10, 
        padding:15 ,
        shadowColor: '#1044A4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
    }

});

