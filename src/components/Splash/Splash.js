
import React, {Component} from 'react';
import {Text, StyleSheet, AsyncStorage, View, Image} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Splash extends Component{

  async componentDidMount(){
   setTimeout(() => {
     this.initPage();
   }, 1000);
  }

  initPage = () => {
     
    AsyncStorage.getItem('rem').then((value) => {
      console.log(value)
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
           <Text style={styles.headText}
                        > Welcome To Easyhoppers</Text>
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
  headText:{
    color: "#000",
    fontWeight: '900',
    fontSize:25,
    textAlign:'center',
    marginLeft:1,
    marginBottom:30
  },
  logo:{
    width:200,
    height:200,
    justifyContent: 'center'
}
});
