
import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View,Image, Alert, TouchableOpacity} from 'react-native';
const URL = require("../../components/server");
import Rave from 'react-native-rave';
import { Card, Icon,SocialIcon} from 'react-native-elements'

export default class Pay extends Component{

    constructor(props) {
        super(props);
        this.state = {
            auth:"",
            fname:"",
            lname:"",
            email:"",
            id:""
      
          };
          this.onSuccess = this.onSuccess.bind(this);
          this.onFailure = this.onFailure.bind(this);
      }
    
      onSuccess(data) {
        this.props.navigation.navigate('Confirm', 
        {
          s_id: this.state.id,
        })
    
      }
    
      onFailure(data) {
        console.log("error", data);
      }
      onClose(data) {
        console.log("error", data);
      }


      componentWillMount() {
        this.setState({
          id:this.props.navigation.getParam("s_id", "defaultValue")
        })
        AsyncStorage.getItem('email').then((value) => this.setState({ email: value.toString()}))
        AsyncStorage.getItem('first').then((value) => this.setState({ fname: value.toString()}))
        AsyncStorage.getItem('last').then((value) => this.setState({ lname: value.toString()}))
       
         }


    render() {
    if (this.state.email != "" || this.state.fname != "" || this.state.lname != "") {
      return (
        <Rave 
        amount="1000" 
        country="NG" 
        currency="NGN" 
        email={this.state.email} 
        firstname={this.state.fname} 
        lastname={this.state.lname} 
        publickey="FLWPUBK_TEST-22d34551ee18e239ebc5352e72aee939-X" 
        secretkey="FLWSECK_TEST-f485459a1cd272596d0d303039e43367-X" 
        encryptionkey="FLWSECK_TEST617e95564acd"
        meta={[{ metaname: "color", metavalue: "red" }, { metaname: "storelocation", metavalue: "ikeja" }]}
        production={false} 
        onSuccess={res => this.onSuccess(res)} 
        onFailure={e => this.onFailure(e)}
        onClose={e => this.onClose(e)}
        />
    );
    }else{
      return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color:URL.bgcolor, fontWeight: '900',  fontSize:16,}}>Loading...</Text>
    </View>
    );
    }
  };
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: URL.bgcolor,
  },
 
    
});

