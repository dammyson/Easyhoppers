
import React, {Component} from 'react';
import {Platform, StyleSheet, AsyncStorage, View, Image} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';




export default class Splash extends Component{

    performinTimeConsumingTask = async()=> {
      return new Promise((resolve) => {
          setTimeout(
            ()=> {resolve('result')},
            3000
          )
        })
    }

  async componentDidMount(){
    const data = await this.performinTimeConsumingTask();
   
    AsyncStorage.getItem('rem').then((value) => {
      console.warn(value)
      if(value=='yes'){
        this.props.navigation.navigate('UserLanding');
      }else if(value==null){
        this.props.navigation.navigate('Welcome');
      }else if(value=="no"){
        this.props.navigation.navigate('Login');
      }else if(value=="tin"){
        this.props.navigation.navigate('Login');
      }
      else{
        this.props.navigation.navigate('Welcome'); 
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
