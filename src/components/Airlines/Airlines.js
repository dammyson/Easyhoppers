// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, TextInput, ImageBackground, View, Dimensions, FlatList, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Button, Left, } from 'native-base';
import { Avatar, Icon, } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {
    BarIndicator,
}
    from 'react-native-indicators';

const URL = require("../../components/server");

import color from '../../components/color';

export default class Airlines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [8, 9, 0, 9, 7, 9, 9, 7, 9,],
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
            <View style={styles.body}>
                <ImageBackground
                    style={{ borderRadius: 12, flex: 1 }}
                    source={require('../../images/airlines.png')}
                    imageStyle={{ backgroundColor: '#1B3B76' }}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', marginLeft: 30, marginRight: 30, marginTop: 20 }}>
                            <Icon type='antdesign' name='arrowleft' size={30} color='#fff' />
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={{ fontSize: 22, color: '#fff', fontFamily: 'Poppins-SemiBold', }}>LOS - KAD</Text>
                                <Text style={{ fontSize: 8, color: '#fff', fontFamily: 'Poppins-Regular', }}>Lagos          Kaduna</Text>
                            </View>
                            <Icon type='material' name='search' size={30} color='#fff' />


                        </View>

                        <View style={{  alignItems: 'center', marginTop:15 }}>
                        <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Poppins-Regular', }}>22nd sept,2019 - 25th sept,2019 </Text>
                        </View>

                        <View style={{ marginLeft: 30, alignItems: 'flex-start', marginTop:15 }}>
                        <Text style={{ fontSize: 15, color: '#fff', fontFamily: 'Poppins-SemiBold', }}>Choose Airline  </Text>
                        </View>

                    </View>
                </ImageBackground>



                <View style={{ flex: 3 }}>
                    <FlatList
                        style={{ paddingBottom: 5 }}
                        data={this.state.items}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListHeaderComponent={this.renderHeader}
                    />

                </View>
            </View>
        );
    }



    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={()=> Actions.airline({type: 'replace'})}  style={{}}>
                <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, borderBottomColor: '#707070', borderBottomWidth: 0.5 }}>
                    <View style={styles.logo_container}>
                        <Avatar
                            rounded
                            size='medium'
                            source={{
                                uri: 'https://d3re0f381bckq9.cloudfront.net/48132290_img-20200707-wa0005_620x465.webp'
                            }}
                            overlayContainerStyle={{ backgroundColor: 'white', borderColor: '#000', borderWidth: 2 }}
                        />
                    </View>
                    <View style={styles.name_container}>
                        <Text style={{ fontSize: 12, fontWeight: '200', color: '#403C3B', fontFamily: 'Poppins-Medium', }}>Luftansa Airlines </Text>
                    </View>
                    <View style={styles.perfomance_container}>
                        <Text style={{ fontSize: 12, fontWeight: '200', color: '#8496B8', fontFamily: 'Poppins-Light', }}>On time: </Text>
                        <View style={{ flexDirection: 'row', }}>
                            <Icon type='entypo' name='aircraft-take-off' size={15} color='#F2582A' />
                            <Text style={{ fontSize: 12, fontWeight: '200', color: '#403C3B', fontFamily: 'Poppins-SemiBold', marginLeft: 5 }}>82,116 </Text>
                        </View>
                    </View>
                    <View style={styles.graph_container}>

                        <AnimatedCircularProgress
                            size={34}
                            width={4}
                            fill={50}
                            tintColor="#F2582A"
                            rotation={0}
                            backgroundColor="#C9C9C9">
                        </AnimatedCircularProgress>
                        <Text style={{ fontSize: 12, fontWeight: '200', color: '#403C3B', fontFamily: 'Poppins-Light', marginLeft: 5 }}>40%</Text>

                    </View>
                </View>
            </TouchableOpacity>
        );
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

    },
    logo_container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    name_container: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 10,
        flex: 1
    },
    perfomance_container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    graph_container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        flexDirection: 'row'
    }




});

