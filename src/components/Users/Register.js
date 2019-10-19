
import React, {Component} from 'react';
import {TextInput, Button, ScrollView,Dimensions,Linking, StyleSheet,ImageBackground, Text, View,TouchableOpacity, KeyboardAvoidingView, ActivityIndicator,AsyncStorage, Alert} from 'react-native';
const URL = require("../../components/server");
export default class Register extends Component{
  constructor(props) 
  {
      super(props);
      this.state = {
        loading: false,
        email: "", 
        phone: "", 
        fname: "", 
        lname: "", 
        password: ""        
      }

  }

  checkReg()
    {
    
        const {email,phone, fname, lname,password} = this.state

          if(email == "" || password == "" || phone == "" ){
            Alert.alert('Validation failed', 'field(s) cannot be empty', [{text: 'Okay'}])
            return
          }
        this.setState({ loading: true})
        fetch(URL.url+'/api/register', { method: 'POST',  headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }, body: JSON.stringify({
          firstname: fname,
          name: fname,
          lastname: lname,
          email: email,
          phone:phone,
          password: password,
          state: "Nig",
          city: "Nig"
        }),  })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if(res.status){
          this.setState({ loading: false})

          Alert.alert(
            'Registration successful',
            'Please check your mail to activate your account so you can log in to the application',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'OK', onPress: () =>  this.props.navigation.navigate('Login')},
            ],
            { cancelable: false }
          )
          }else{
        Alert.alert('Registration failed', res.message, [{text: 'Okay'}])
        this.setState({ loading: false})
          }
        }).catch((error)=>{
          console.log(error);
          alert(error.message);
       });
   }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
          <Text>Processing</Text>
        </View>
      );
    }
  
    return (
      <ImageBackground
      source={require('../../images/ezbg.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
      >
      <ScrollView behavior="padding" style={styles.container}>
      <View style={styles.welcomecontainer}> 
          <Text style={styles.headText}>Getting started</Text>
          </View>
       
         <KeyboardAvoidingView style={styles.textInputcontainer}>
         <ScrollView >
                      <View style={{paddingBottom:200}}>
                      <View>
                      <Text style={styles.headText}
                                      >Sign Up</Text>
                      </View>
                    <TextInput
                        placeholder= "Email"
                        placeholderTextColor= '#55575b'
                        returnKeyType = "next"
                        onSubmitEditing = {() => this.passwordInput.focus()}
                        keyboardType = "email-address"
                        autoCapitalize= "none"
                        autoCorrect = {false}
                        style = {styles.input}
                        onChangeText = {text => this.setState({email: text})}
                       
                    />
                    <TextInput
                        placeholder= "Phone"
                        placeholderTextColor= '#55575b'
                        returnKeyType = "next"
                        onSubmitEditing = {() => this.passwordInput.focus()}
                        keyboardType = "numeric"
                        autoCapitalize= "none"
                        autoCorrect = {false}
                        style = {styles.input}
                        onChangeText = {text => this.setState({phone: text})}
                       
                    />
                    <TextInput
                        placeholder= "First Name"
                        placeholderTextColor= '#55575b'
                        returnKeyType = "next"
                        onSubmitEditing = {() => this.passwordInput.focus()}
                        keyboardType = "email-address"
                        autoCapitalize= "none"
                        autoCorrect = {false}
                        style = {styles.input}
                        onChangeText = {text => this.setState({fname: text})}
                       
                     />

                    <TextInput
                        placeholder= "Last Name"
                        placeholderTextColor= '#55575b'
                        returnKeyType = "next"
                        onSubmitEditing = {() => this.passwordInput.focus()}
                        keyboardType = "email-address"
                        autoCapitalize= "none"
                        autoCorrect = {false}
                        style = {styles.input}
                        onChangeText = {text => this.setState({lname: text})}
                       
                     />

                    <TextInput
                        placeholder= "Password"
                        secureTextEntry
                        keyboardType = "default"
                        maxLength={16}
                        placeholderTextColor= '#55575b'
                        returnKeyType= "go"
                        style = {styles.input}
                        ref={(input)=> this.passwordInput = input}
                        onChangeText = {text => this.setState({password: text})}
                     />

                       <View style={styles.Linkcontainer}>
                <TouchableOpacity style={styles.buttonContainer} >
                    <Text style={styles.buttonText}
                     onPress ={() => this.checkReg()} >SIGN UP</Text>

                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelContainer} >
                     <Text style={styles.cancleText}
                         onPress={() => this.props.navigation.navigate('Login')} >X</Text>

                </TouchableOpacity>

          </View>   
          <View style={styles.bottom}>
          <TouchableOpacity style={styles.link} >
          <Text  style={styles.linkText} >Alread have an account?</Text>
          </TouchableOpacity>
         
        <TouchableOpacity style={styles.link} 
        onPress={() => this.props.navigation.navigate('Login')}>
          <Text  style={styles.linkText} >Sign In</Text>
          </TouchableOpacity>

        </View>
        <TouchableOpacity style={styles.link} onPress={ ()=>{ Linking.openURL('https://easyhoppers.co/privacy-policy/')}} >
          <Text  style={styles.linkText} >Privacy Policy</Text>
          </TouchableOpacity>
   </View>
                </ScrollView>
           </KeyboardAvoidingView>    
         
     
      </ScrollView>
      </ImageBackground >
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
    paddingTop:70,
  },
  textInputcontainer: {
    flex: 6,
    justifyContent: 'flex-end',
  },
  Linkcontainer: {
    flex: 4,
    justifyContent: 'center',
  },
  input:{
    height:45,
    backgroundColor: '#d2e0f7',
    marginBottom:15,
    color: '#000000',
    paddingHorizontal: 10,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    marginLeft:40,
    fontWeight: '600',
    },
    buttonContainer:{
        height:50,
        backgroundColor: URL.bgcolor,
        borderTopRightRadius: 30,
        justifyContent: 'center',
        borderBottomRightRadius: 30,
        width:150,
      },
      buttonText:{
        textAlign:'center',
        color: "#FFFFFF",
        fontWeight: '900',
        fontSize:18,
      },
      cancelContainer:{
        height:50,
        backgroundColor: "#FFFFFF",
        borderTopRightRadius: 30,
        justifyContent: 'center',
        borderBottomRightRadius: 30,
        width:100,
        elevation: 5,
        borderColor:'#AFC1F2',
        borderWidth: 2,
        marginTop: 10,
        marginBottom:70
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
        marginLeft: 50,
        marginBottom: 30
      },
      bottom:{
        height:30,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:1
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
        marginLeft: 10
      },
});
