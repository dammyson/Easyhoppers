
import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Alert, Text, Image, Linking, ScrollView, Dimensions, ImageBackground, View,TouchableOpacity} from 'react-native';
const URL = require("../../components/server");
import CheckBox from 'react-native-check-box'
export default class Welcome extends Component{

  constructor(props) 
  {
      super(props);
      this.emailRef = React.createRef();
      this.state = {
        loading: false,
        email: "", 
        isChecked:false,


       }

  }

  checkForgotpassword(){
    const {isChecked} = this.state
   

    if(isChecked){
      AsyncStorage.setItem('rem', "tin");
    this.props.navigation.navigate('Login');
    }else{
      Alert.alert('Alert', "You need to check the agree box to continue", [{text: 'Okay'}])
    }
    }








  render() {
    return (
      <ImageBackground
      source={require('../../images/ezbg.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
      >

      <ScrollView>
      <View style={styles.container}>

        <View>
        <Text style={styles.headText} >Introduction</Text>


        </View>


         <View> 
     
          <Image style={styles.image} source={require('../../images/live.png')} />

          <Text style={styles.ext} >Live Flight Status / Update</Text>
          <Text   style={styles.wext} >Provides real-time flight status and current updates on in-bound and out-bound flights.</Text>

         <Image style={styles.image} source={require('../../images/bell.png')} />

          <Text style={styles.ext} >Alerts</Text>
          <Text   style={styles.wext} >Provides electronic prompts for every circumstance that could have a possible impact on travel – boarding, delays, cancellations, gate changes, severe weather, traffic, airport situation, etc.</Text>

          <Image style={styles.image} source={require('../../images/osci.png')} />

          <Text style={styles.ext} >Analytics</Text>
          <Text   style={styles.wext} >Provides consolidated analysis on three major travel decision matrices – Performance, Safety & Customer Satisfaction – for specified routes and selected time periods.</Text>


          <Image style={styles.image} source={require('../../images/plane.png')} />

          <Text style={styles.ext} >Travel Expense Assistant</Text>
          <Text   style={styles.wext} >Helps track and manage travel expenses, either against a budget or just as a stand-alone. Provides integration of electronic expense receipts and spend distributions for possible travel expense claims & refund purposes.</Text>

        </View>

        <View style={styles.Linkcontainer}>
         <TouchableOpacity style={styles.link} onPress={ ()=>{ Linking.openURL('https://easyhoppers.co/tc/')}} >
          <Text  style={styles.linkText} >Terms and condition</Text>
          </TouchableOpacity>
          </View>
          <View style= {{flexDirection: "row", alignItems:"center", marginLeft:45, marginBottom:4,}}> 
                   <Text  style={styles.linkText} >I agree</Text>
                   <CheckBox
                      style={{flex: 1, padding: 10, marginRight:10}}
                      onClick={()=>{
                        this.setState({
                            isChecked:!this.state.isChecked
                        })
                      }}
                      isChecked={this.state.isChecked}
                  />
                    </View>

           <View style={styles.Linkcontainer}>
                <TouchableOpacity style={styles.buttonContainer} >
                    <Text style={styles.buttonText}
                     onPress ={() => this.checkForgotpassword()} >Continue</Text>

                </TouchableOpacity>
          </View>   
      </View>
      </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  welcomecontainer:{
    flex: 2,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop:100
  },
  textInputcontainer: {
    flex: 2,
    justifyContent: 'flex-end',
  },
  Linkcontainer: {
    flex: 3,
  },
    buttonContainer:{
      height:50,
      backgroundColor: URL.bgcolor,
      borderTopRightRadius: 30,
      justifyContent: 'center',
      borderBottomRightRadius: 30,
      width:150,
      marginBottom: 50,
      },
      buttonText:{
        textAlign:'center',
        color: "#FFFFFF",
        fontWeight: '900',
        fontSize:18,
      },
      cancleText:{
        textAlign:'center',
        color: "#AFC1F2",
        fontWeight: '900',
        fontSize:18,
      },
      headText:{
        color: "#000",
        fontWeight: '900',
        fontSize:25,
        textAlign:'left',
        marginLeft: 50
      },

      ext:{
        color: "#000",
        fontWeight: '900',
        fontSize:20,
        textAlign:'left',
        marginLeft: 20
      },
      wext:{
        color: "#000",
        fontWeight: '500',
        fontSize:16,
        textAlign:'left',
        marginLeft: 20
      },

      linkText:{
        flex: 1,
        color: "#000",
        fontWeight: '700',
        fontSize:15,
        textAlign:'center',
      },
      link:{
        color: "#000",
        fontWeight: '700',
        fontSize:15,
        textAlign:'center',
        marginLeft: 10,
        margin: 20
      },
      image:{
        marginLeft: 10,
    }
      
});
