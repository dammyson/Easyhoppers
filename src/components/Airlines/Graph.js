// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, Image, ImageBackground, View, Dimensions, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, Text, Button, Left, } from 'native-base';
import { Avatar, Icon, } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { BarIndicator, } from 'react-native-indicators';
import { Pie } from 'react-native-pathjs-charts'
import { LineChart } from "react-native-chart-kit";
import { MultiLineChart } from 'react-native-d3multiline-chart';
const URL = require("../../components/server");

import color from '../../components/color';


const deviceWidth = Dimensions.get('window').width - 20;
const deviceHeight = Dimensions.get('window').height;
var dat = [
    [
        {
            y: 0,
            x: 0,
        },
        {
            y: 0,
            x: 2,
        },
        {
            y: 4,
            x: 4,
        },
        {
            y: 10,
            x: 6,
        },


    ],

    [{
        y: 0,
        x: 0,
    },
    {
        y: 4,
        x: 8,
    },
    {
        y: 6,
        x: 10,
    },
    {
        y: 10,
        x: 12,
    },
    ],
];

var dat1 = [
    [
        {
            y: 0,
            x: 0,
        },
        {
            y: 0,
            x: 7,
        },


    ],

    [{
        y: 0,
        x: 0,
    },
    {
        y: 4,
        x: 8,
    },
    {
        y: 6,
        x: 10,
    },
    {
        y: 10,
        x: 12,
    },
    ],
];

let leftAxis = [2, 4, 6, 8, 10, 12,];
let bottomAxisData = [2, 4, 6, 8, 10, 12,];
let minX = 0, maxX = 12;
let minY = 0, maxY = 12;

//since there are only two lines
var Color = ['#F2582A', '#1D2127'];
//general data to represent ticks in y-axis and it doesn't take part in calculation
let bottomAxisDataToShow = [2, 4, 6, 8, 10, 12, 14, 16];
let leftAxisDataToShow = [2, 4, 6, 8, 10, 12, 14, 16];
//general data to represent ticks in y-axis and it doesn't take part in calculation


export default class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            items: [8, 9, 0, 9, 7, 9, 9, 7, 9,],
            loading: false,
            email: '',
            action_type: 'departure',
            userInfo: {},
            remember: true,

        };
    }

    componentDidMount() {
        this.setState({
            data: dat
        })
    }

    headClicked = (index) => {
        this.setState({
            activeIndex: index,
            data: dat1
        })
    }

    render() {
        const {data} = this.state;



        return (
            <View style={styles.body}>
                <ImageBackground
                    style={{ borderRadius: 12, flex: 5 }}
                    source={require('../../images/main_bg.png')}
                    imageStyle={{ backgroundColor: '#1B3B76' }}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', marginLeft: 30, marginRight: 30, marginTop: 10 }}>
                            <Icon type='antdesign' name='arrowleft' size={30} color='#01215B' />

                            <View style={{ flex: 1, }}>
                                <View style={{ alignItems: 'center', marginBottom: 1, marginTop: 10, }}>
                                    <Image
                                        style={styles.arc}
                                        source={require('../../images/plane_blue_fly.png')} />
                                </View>
                                <View style={{ alignItems: 'center', flexDirection: 'row', }}>
                                    <View style={{ alignItems: 'flex-start' }}>

                                        <Text style={{ fontSize: 22, color: '#01215B', fontFamily: 'Poppins-SemiBold', }}>LOS </Text>
                                        <Text style={{ fontSize: 8, color: '#F2582A', fontFamily: 'Poppins-Regular', }}>Lagos</Text>
                                    </View>

                                    <View style={{ flex: 1, alignItems: 'center' }}>


                                    </View>

                                    <View style={{ alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 22, color: '#01215B', fontFamily: 'Poppins-SemiBold', }}> KAD</Text>
                                        <Text style={{ fontSize: 8, color: '#F2582A', fontFamily: 'Poppins-Regular', }}> Kaduna</Text>

                                    </View>

                                </View>

                            </View>

                            <View style={{ width: 30 }} />


                        </View>

                        <View style={{ alignItems: 'center', marginTop: 3 }}>
                            <Text style={{ fontSize: 11, color: '#01215B', fontFamily: 'Poppins-SemiBold', }}>22nd sept,2019 - 25th sept,2019 </Text>
                        </View>

                        <View style={{ alignItems: 'center', marginTop: 6 }}>
                            <Text style={{ fontSize: 14, color: '#01215B', fontFamily: 'Poppins-SemiBold', }}>Arik Airways & Luftansa Departures </Text>
                        </View>


                        <View style={{ height: 30, borderRadius: 10, backgroundColor: '#8496B850', marginTop: 6, marginLeft: 30, marginRight: 30, flexDirection: 'row' }}>
                            <TouchableOpacity style={[this.state.activeIndex == 0 ? styles.activeType : styles.inActiveType]}
                                onPress={() => this.headClicked(0)}>
                                <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Poppins-Medium', }}> KAD</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[this.state.activeIndex == 1 ? styles.activeType : styles.inActiveType]}
                                onPress={() => this.headClicked(1)}>
                                <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Poppins-Medium', }}> KAD</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[this.state.activeIndex == 2 ? styles.activeType : styles.inActiveType]}
                                onPress={() => this.headClicked(2)}>
                                <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Poppins-Medium', }}> KAD</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[this.state.activeIndex == 3 ? styles.activeType : styles.inActiveType]}
                                onPress={() => this.headClicked(3)}>
                                <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Poppins-Medium', }}> KAD</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[this.state.activeIndex == 4 ? styles.activeType : styles.inActiveType]}
                                onPress={() => this.headClicked(4)}>
                                <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Poppins-Medium', }}> KAD</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 20 }}>

                            <MultiLineChart
                                style={{ alignItems: 'center', }}
                                data={this.state.data}
                                leftAxisData={leftAxis}
                                bottomAxisData={bottomAxisData}
                                minX={minX}
                                maxX={maxX}
                                minY={minY}
                                maxY={maxY}
                                scatterPlotEnable={false}
                                dataPointsVisible={true}
                                Color={Color}
                                bottomAxisDataToShow={bottomAxisDataToShow}
                                leftAxisDataToShow={leftAxisDataToShow}
                                circleLegendType={false}
                                fillArea={true}
                                yAxisGrid={false}
                                xAxisGrid={false}
                                hideXAxis={false}
                                hideYAxis={false}
                                inclindTick={false}
                                pointDataToShowOnGraph=""
                                animation={true}
                                duration={1500}
                                delay={1000}
                                GraphHeight={230}
                                GraphWidth={deviceWidth}
                                chartWidth={deviceWidth - 50}
                                chartHeight={240}
                                staggerLength={220}
                                speed={50}
                            />
                        </View>



                    </View>
                </ImageBackground>

                <View style={{ flex: 2 }}>
                <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, }}>
                    <View style={{flexDirection: 'row', justifyContent:'center',flex: 1}}>
                        <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: '#F2582A' }} />
                        <Text style={{ fontSize: 12, fontWeight: '200', color: '#403C3B', fontFamily: 'Poppins-Medium', }}> Luftansa </Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'center',flex: 1}}>
                        <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: '#1D2127' }} />
                        <Text style={{ fontSize: 12, fontWeight: '200', color: '#403C3B', fontFamily: 'Poppins-Medium', }}> Arik </Text>
                    </View>
                 </View>



                 <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, }}>
                    <View style={{flexDirection: 'row', justifyContent:'center',flex: 1, marginTop:15}}>
                    <Avatar
                            rounded
                            size='medium'
                            source={{
                                uri: 'https://d3re0f381bckq9.cloudfront.net/48132290_img-20200707-wa0005_620x465.webp'
                            }}
                            overlayContainerStyle={{ backgroundColor: 'white', borderColor: '#000', borderWidth: 2 }}
                        />
                    </View>
                    <View style={{ justifyContent:'center',flex: 1, }}>
                    <Text style={{ fontSize: 12, fontWeight: '200', color: '#403C3B', fontFamily: 'Poppins-Regular', }}> TOTAL </Text>
                    <Text style={{ fontSize: 12, fontWeight: '200', color: '#403C3B', fontFamily: 'Poppins-SemiBold', }}> 356,689 </Text>
                    </View>
                    <View style={{ justifyContent:'center',flex: 1}}>
                    <Text style={{ fontSize: 12, fontWeight: '200', color: '#403C3B', fontFamily: 'Poppins-Regular', }}> EARLY </Text>
                    <Text style={{ fontSize: 12, fontWeight: '200', color: '#403C3B', fontFamily: 'Poppins-SemiBold', }}> 356,689 </Text>
                    </View>
                    <View style={{justifyContent:'center',flex: 1}}>
                    <Text style={{ fontSize: 12, fontWeight: '200', color: '#403C3B', fontFamily: 'Poppins-Regular', }}> PERCENTAGE  </Text>
                    <Text style={{ fontSize: 12, fontWeight: '200', color: '#F2582A', fontFamily: 'Poppins-SemiBold', }}>10% </Text>
                    </View>
                 </View>


                 <View style={{ height: 0.6, marginLeft: 15, marginRight: 15, marginTop:15, backgroundColor:'#3B424E'}}/>


                 <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, }}>
                    <View style={{flexDirection: 'row', justifyContent:'center',flex: 1, marginTop:15}}>
                    <Avatar
                            rounded
                            size='medium'
                            source={{
                                uri: 'https://d3re0f381bckq9.cloudfront.net/48132290_img-20200707-wa0005_620x465.webp'
                            }}
                            overlayContainerStyle={{ backgroundColor: 'white', borderColor: '#000', borderWidth: 2 }}
                        />
                    </View>
                    <View style={{ justifyContent:'center',flex: 1, }}>
                    <Text style={{ fontSize: 12, fontWeight: '200', color: '#403C3B', fontFamily: 'Poppins-Regular', }}> TOTAL </Text>
                    <Text style={{ fontSize: 12, fontWeight: '200', color: '#403C3B', fontFamily: 'Poppins-SemiBold', }}> 356,689 </Text>
                    </View>
                    <View style={{ justifyContent:'center',flex: 1}}>
                    <Text style={{ fontSize: 12, fontWeight: '200', color: '#403C3B', fontFamily: 'Poppins-Regular', }}> EARLY </Text>
                    <Text style={{ fontSize: 12, fontWeight: '200', color: '#403C3B', fontFamily: 'Poppins-SemiBold', }}> 356,689 </Text>
                    </View>
                    <View style={{justifyContent:'center',flex: 1}}>
                    <Text style={{ fontSize: 12, fontWeight: '200', color: '#403C3B', fontFamily: 'Poppins-Regular', }}> PERCENTAGE  </Text>
                    <Text style={{ fontSize: 12, fontWeight: '200', color: '#F2582A', fontFamily: 'Poppins-SemiBold', }}> 10% </Text>
                    </View>
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
    },
    activeType: {
        flex: 1.3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#01215B',
        flexDirection: 'row',
        borderRadius: 10,
        margin: 3
    },
    inActiveType: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,


    },




});

