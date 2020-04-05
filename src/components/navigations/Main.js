/**
* This is the Main file
* This file contains the routes of all the pages
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Root } from 'native-base';
import { Scene, Router, Actions } from 'react-native-router-flux';




import Splash from '../Splash/Splash';
import Login from '../Users/Login';
import Register from '../Users/Register';
import RegisterTwo from '../Users/RegisterTwo';



''
export default class Main extends Component {
 
  componentDidMount () {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    switch (Actions.currentScene) {
      case 'home':
        BackHandler.exitApp()
        break

      default: Actions.pop()
    }

    return true
  }

  render() {
    return(
      <Root>
        <Router>
          <Scene key="root">
            <Scene initial key="splash" component={Splash} hideNavBar />
            <Scene key="login" component={Login} hideNavBar />
            <Scene key="reg" component={Register} hideNavBar />
            <Scene key="regtwo" component={RegisterTwo} hideNavBar />

     
          </Scene>
        </Router>
      </Root>
    );
  }

}
