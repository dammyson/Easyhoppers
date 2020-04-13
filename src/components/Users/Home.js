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



export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: false,
            email: '',
            action_type: 'departure',
            userInfo: {},
            remember: true,
        };
    }

    componentDidMount() {


    }


    render() {

        return (
            <ImageBackground
                source={require('../../images/home_bg.png')}
                style={styles.mainsection}
                resizeMode="cover"
            >
                <Container style={{ backgroundColor: 'transparent' }}>
                    <Content>
                        <View style={styles.body}>
                            <View style={{ height: 70, marginTop: 20, marginLeft: 30, marginRight: 30, flexDirection: 'row' }}>
                                <View style={{ alignItems: 'center',  flexDirection: 'row', marginBottom: 10, marginTop: 10, flex: 1, }}>
                                    <Icon type='entypo' name='menu' size={30} color='#fff' />
                                </View>


                                <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 10, flex: 1, flexDirection: 'row', justifyContent:'flex-end' }}>
                                    <Text style={{ color: '#fff', marginBottom: 7, marginTop: 10, fontWeight: '900', fontSize: 16, }}> Ayobami  </Text>
                                    <Avatar
                                        rounded
                                        source={{
                                            uri:
                                                'https://api.adorable.io/avatars/285/abott@adorable.png',
                                        }}
                                    />
                                </View>


                            </View>

                            <View style={{ flex: 1, marginTop: 6, marginLeft: 30, marginRight: 30, justifyContent: 'flex-end' }}>
                                <Text style={{ color: '#fff', marginBottom: 7, marginTop: 10, fontWeight: '900', fontSize: 16, }}> Set Preference  </Text>

                                <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 10, }}>
                                    <Image
                                        style={styles.arc}
                                        source={require('../../images/plane_white_fly.png')} />
                                </View>

                                <View style={{ flexDirection: 'row' }}>

                                    <View style={[styles.textInputContainer, { marginRight: 10 }]}>
                                        <TextInput
                                            placeholder={"From"}
                                            placeholderTextColor={'#3B424E'}
                                            secureTextEntry
                                            returnKeyType="next"
                                            keyboardType='password'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            inlineImageLeft='ios-call'
                                            style={{ flex: 1, fontSize: 13 }}

                                        />

                                    </View>


                                    <View style={[styles.textInputContainer, { marginLeft: 10 }]}>
                                        <TextInput
                                            placeholder={"To"}
                                            placeholderTextColor={'#3B424E'}
                                            secureTextEntry
                                            returnKeyType="next"
                                            keyboardType='password'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            inlineImageLeft='ios-call'
                                            style={{ flex: 1, fontSize: 13 }}

                                        />

                                    </View>
                                </View>

                                <Text style={{ color: '#fff', marginBottom: 10, marginTop: 15, fontWeight: '500', fontSize: 12, }}> For detailed information on the flight routes, select.  </Text>
                                <View style={styles.SlideButtonContainer}>
                                    <TouchableOpacity onPress={() => this.setState({ action_type: 'departure' })} style={[styles.sliderTextContainer, this.state.action_type == 'departure' ? styles.sel : {}]}>
                                        <Text style={[styles.slideText, this.state.action_type == 'departure' ? styles.selText : {}]}> Departure </Text>

                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({ action_type: 'arrival' })} style={[styles.sliderTextContainer, this.state.action_type == 'arrival' ? styles.sel : {}]}>
                                        <Text style={[styles.slideText, this.state.action_type == 'arrival' ? styles.selText : {}]}> Arrival </Text>

                                    </TouchableOpacity>

                                </View>
                                <View style={styles.durationButtonContainer}>
                                    <Text style={[styles.slideText, styles.selText, { flex: 1 }]}>Duration </Text>
                                    <Icon type='ionicon' name='ios-airplane' size={30} color='#fff' />
                                </View>


                                <View style={{ flexDirection: 'row', height: 70, marginTop: 16 }}>

                                    <TouchableOpacity style={styles.searchButton}>
                                        <Icon type='feather' name='search' size={20} color='#F2582A' />
                                        <Text style={{ color: '#F2582A' }}> Search </Text>

                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.compareButton}>
                                        <Icon type='material' name='compare-arrows' size={20} color='#fff' />
                                        <Text style={{ color: '#fff' }}> Search </Text>

                                    </TouchableOpacity>



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

    body: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        paddingBottom: 30

    },
    arc: {
        width: Dimensions.get('window').width / 2,
        resizeMode: 'contain'
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
    textInputContainer: {
        flex: 1,
        paddingLeft: 7,
        backgroundColor: '#ffffff85',
        borderRadius: 10,
        height: 45
    },
    SlideButtonContainer: {
        paddingLeft: 7,
        backgroundColor: '#ffffff85',
        borderRadius: 10,
        marginBottom: 10,
        height: 45,
        flexDirection: 'row',
        padding: 5
    },
    slideText: {
        color: '#fff',
        marginBottom: 7,
        marginTop: 10,
        fontWeight: '500',
        fontSize: 13,
    },
    sliderTextContainer: {
        marginLeft: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sel: {
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    selText: {
        color: '#403C3B'
    },
    durationButtonContainer: {
        marginTop: 15,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#ffffff85',
        borderRadius: 10,
        marginBottom: 10,
        height: 45,
        flexDirection: 'row',
        padding: 5
    },
    searchButton: {
        height: 60,
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    compareButton: {
        height: 60,
        flexDirection: 'row',
        flex: 1,
        borderColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        marginLeft: 10
    }





});

