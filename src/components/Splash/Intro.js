
import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Dimensions, ImageBackground, Image, StatusBar} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AppIntroSlider from 'react-native-app-intro-slider';
import color from '../../components/color'


const data = [
  {
    title: 'Dont be on the ground',
    head: 'While your plane is air bound',
    text: 'Never run out of money. Fund your wallet from a bank, a friend or a paychange merchant near you anytime.',
    image: require('../../images/one.png'),
    
  },
  {
    title: 'Sleep on Your Bed',
    head: 'Not on Crappy airport Benches',
    text: 'Make express payment with just a scan. Spending and receiving money has never been this seamless',
    image: require('../../images/two.png'),
    
  },
  {
    title: 'Stay On Top ',
    head: 'of Your flights weather reports ',
    text: 'Step into a new world of stress-free money transactions now',
    image: require('../../images/three.png'),
    
  }
];

export default class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: true
    };
  }

  async componentDidMount() {

  }
  _renderItem = (item) => {
    return (
      
      <ImageBackground  source={item.item.image}
        style={styles.mainContent}>
           <View style={{flex: 1,}}>

           </View>
        <View style={{  alignItems: 'center', justifyContent: 'center',marginBottom:70}}>
          <Text style={styles.title}>{item.item.title}</Text>
          <Text style={styles.head}>{item.item.head}</Text>
          <Text style={styles.maintext}>{item.item.text}</Text>
          <Text style={styles.text}></Text>
          <TouchableOpacity  onPress={() => Actions.login()}  style={{ backgroundColor: '#01215B', justifyContent: 'center', borderRadius: 10, marginTop: 13, }}>
         <Text style={styles.actionbutton}>Sign In</Text>
         </TouchableOpacity>
         </View>
        </ImageBackground>
  

    );
  }

  render() {
    return ( <View style={{flex: 1, backgroundColor:'red'}}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          data={data}
          activeDotStyle={{ backgroundColor: '#F2582A' }}
        />
     
</View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'

  },
  imagContainer:{
    height: 400,
    width: Dimensions.get('window').width,

    alignItems:'flex-end',
    marginBottom:30
  },
  image: {
    resizeMode:'cover'
    
  },
  text: {
    color: '#5D5D5D',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 12,
    marginLeft: 20,
    fontFamily: 'Montserrat-Light',
  },
  title: {
    marginTop: 10,
    fontSize: 17,
    color: '#0F0E43',
    fontWeight:'900',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: 'Montserrat-ExtraBold',
  },
  head: {
    marginTop: 10,
    fontSize: 16,
    color: '#0F0E43',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: 'Montserrat-ExtraBold',
  },
  maintext: {
    fontFamily: 'Montserrat-Light',
    textAlign: 'center',
    color: '#5D5D5D',
    fontSize: 12,
    marginLeft: 20,
    marginRight: 20,
    fontWeight: '400'
  },
  actionbutton: {
    marginTop: 8,
    marginBottom: 8,
    marginRight: 33,
    marginLeft: 33,
    fontSize: 15,
    color: color.white,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontWeight: '600'
  },

});
