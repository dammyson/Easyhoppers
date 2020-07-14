
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Splash extends Component{
      async componentDidMount() {
        setTimeout(() => {
    //this.initPage();
     Actions.intro();
          }, 3000);
    }

initPage = () => {
 
    AsyncStorage.getItem('login').then((value) => {
      if(value=='true'){
        Actions.graph({type: 'replace'});
      }else if(value==null){
        Actions.graph({type: 'replace'});
      }else{
        Actions.graph({type: 'replace'});
      } 
        
    })
   
  }

  render() {
    return (
      <View style={styles.container}>
       <Image
          style={styles.logo}
          source={require('../../images/logo.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  logo:{
    width:200,
    height:200,
    justifyContent: 'center'
}
});
