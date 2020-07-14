// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, Image, ImageBackground, View, Dimensions, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, Text, Button, Left, } from 'native-base';
import { Avatar, Icon, } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { BarIndicator, } from 'react-native-indicators';
import { Pie } from 'react-native-pathjs-charts'

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

        let data = [{
            "name": "30%",
            "population": 7694980,
        }, {
            "name": "25%",
            "population": 2584160
        }, {
            "name": "25%",
            "population": 6590667
        }, {
            "name": "20%",
            "population": 7284698
        }]
      
        let options = {
            width: 200,
            height: 200,
            color: ['#F29F87', '#F2582A', '#4D6FAC', '#01215B'],
            r: 50,
            R: 100,
            legendPosition: 'topLeft',
            animate: {
                type: 'oneByOne',
                duration: 2000,
                fillTransition: 1
            },
            label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                color: '#ECF0F1'
            }
        }


        return (
            <View style={styles.body}>
                <ImageBackground
                    style={{ borderRadius: 12, flex: 1 }}
                    source={require('../../images/airlines.png')}
                    imageStyle={{ backgroundColor: '#1B3B76' }}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', marginLeft: 30, marginRight: 30, marginTop: 10 }}>
                            <Icon type='antdesign' name='arrowleft' size={30} color='#fff' />

                            <View style={{ flex: 1, }}>
                                <View style={{ alignItems: 'center', marginBottom: 1, marginTop: 10, }}>
                                    <Image
                                        style={styles.arc}
                                        source={require('../../images/plane_white_fly.png')} />
                                </View>
                                <View style={{ alignItems: 'center', flexDirection: 'row', }}>
                                    <View style={{ alignItems: 'flex-start' }}>

                                        <Text style={{ fontSize: 22, color: '#fff', fontFamily: 'Poppins-SemiBold', }}>LOS </Text>
                                        <Text style={{ fontSize: 8, color: '#fff', fontFamily: 'Poppins-Regular', }}>Lagos</Text>
                                    </View>

                                    <View style={{ flex: 1, alignItems: 'center' }}>


                                    </View>

                                    <View style={{ alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 22, color: '#fff', fontFamily: 'Poppins-SemiBold', }}> KAD</Text>
                                        <Text style={{ fontSize: 8, color: '#fff', fontFamily: 'Poppins-Regular', }}> Kaduna</Text>

                                    </View>

                                </View>

                            </View>

                            <View style={{ width: 30 }} />


                        </View>

                        <View style={{ alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 11, color: '#fff', fontFamily: 'Poppins-SemiBold', }}>22nd sept,2019 - 25th sept,2019 </Text>
                        </View>

                        <View style={{ marginLeft: 50, marginRight: 50, alignItems: 'center', flexDirection: 'row', }}>
                            <View style={{ alignItems: 'flex-start' }}>

                                <Text style={{ fontSize: 11, color: '#fff', fontFamily: 'Poppins-Medium', }}>Arik </Text>

                            </View>

                            <View style={{ flex: 1, alignItems: 'center' }}>


                            </View>

                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 11, color: '#fff', fontFamily: 'Poppins-Medium', }}> Departures</Text>

                            </View>

                        </View>

                    </View>
                </ImageBackground>



                <View style={{ flex: 3 }}>
                    <View style={{}}>
                        <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20, marginRight: 20, borderColor: '#707070', borderBottomWidth: 0.5, borderTopWidth: 0.5 }}>
                            <View style={styles.logo_container}>
                                <Text style={{ fontSize: 14, fontWeight: '200', color: '#01215B', fontFamily: 'Poppins-SemiBold', marginLeft: 5 }}>All Flights  </Text>
                            </View>
                            <View style={styles.name_container}>

                            </View>
                            <View style={styles.perfomance_container}>


                            </View>
                            <View style={styles.graph_container}>

                                <Text style={{ fontSize: 12, fontWeight: '200', color: '#01215B', fontFamily: 'Poppins-SemiBold', marginLeft: 5 }}>52,086  </Text>

                            </View>
                        </View>
                    </View>
                    {this.renderItem('#F29F87', 'Early', '60%', '52,086')}
                    {this.renderItem('#F2582A', 'Late', '60%', '52,086')}
                    {this.renderItem('#4D6FAC', 'On time ', '60%', '52,086')}
                    {this.renderItem('#01215B', 'Cancelled ', '60%', '52,086')}




                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <TouchableOpacity onPress={()=> Actions.graph({type: 'replace'})}  style={{ borderWidth: 3, borderRadius: 10, borderColor: '#01215B' }}>
                            <Text style={{ fontSize: 12, color: '#01215B', fontFamily: 'Poppins-SemiBold', marginLeft: 15, marginRight: 15, marginTop: 5, marginBottom: 5 }}> MORE ANALYSIS </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', marginTop:10 }}>
                        <Pie
                            data={data}
                            options={options}
                            accessorKey="population"
                            label={{
                                fontFamily: 'Arial',
                                fontSize: 12,
                                fontWeight: true,
                                color: '#ECF0F1'
                            }} />
                    </View>


                </View>
            </View>
        );
    }



    renderItem(color, mode, percentage, number) {
        return (
            <View style={{}}>
                <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, borderBottomColor: '#707070', borderBottomWidth: 0.5 }}>
                    <View style={styles.logo_container}>
                        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: color }} />
                    </View>
                    <View style={styles.name_container}>
                        <Text style={{ fontSize: 12, fontWeight: '200', color: '#403C3B', fontFamily: 'Poppins-Medium', }}>{mode} </Text>
                    </View>
                    <View style={styles.perfomance_container}>
                        <Text style={{ fontSize: 12, fontWeight: '200', color: '#403C3B', fontFamily: 'Poppins-Light', }}>{percentage} </Text>

                    </View>
                    <View style={styles.graph_container}>

                        <Text style={{ fontSize: 12, fontWeight: '200', color: '#403C3B', fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{number} </Text>

                    </View>
                </View>
            </View>
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
        marginLeft: 15,
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
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row'
    }




});

