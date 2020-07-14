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
import ForgotPassword from '../Users/ForgotPassword';
import ChangePassword from '../Users/ChangePassword';
import Home from '../Users/Home';
import Intro from '../Splash/Intro';
import Airlines from '../Airlines/Airlines';
import Airline from '../Airlines/Airline';
import Graph from '../Airlines/Graph';



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
            <Scene key="intro" component={Intro} hideNavBar />

            <Scene key="login" component={Login} hideNavBar />
            <Scene key="reg" component={Register} hideNavBar />
            <Scene key="regtwo" component={RegisterTwo} hideNavBar />
            <Scene key="forgot" component={ForgotPassword} hideNavBar />
            <Scene key="changepassword" component={ChangePassword} hideNavBar />
            <Scene key="home" component={Home} hideNavBar />
            <Scene key="airlines" component={Airlines} hideNavBar />
            <Scene key="airline" component={Airline} hideNavBar />
            <Scene key="graph" component={Graph} hideNavBar />
            



     
          </Scene>
        </Router>
      </Root>
    );
  }

}
