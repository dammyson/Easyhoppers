
import React, {Component} from 'react';
import {TextInput, StyleSheet, Alert, Text, ActivityIndicator, View,TouchableOpacity, KeyboardAvoidingView} from 'react-native';
const URL = require("../../components/server");
export default class ForgotPassword extends Component{

  constructor(props) 
  {
      super(props);
      this.emailRef = React.createRef();
      this.state = {
        loading: false,
        email: "", 


       }

  }


  performinTimeConsumingTask = async()=> {
    return new Promise((resolve) => {
        setTimeout(
          ()=> {resolve('result')},
          3000
        )
      })
  }

  checkForgotpassword(){
   
  
          const {email} = this.state
 
           if(email == "" ){
            Alert.alert('Validation failed', 'Email field cannot be empty', [{text: 'Okay'}])
            return
           }

         this.setState({ loading: true})
         fetch(URL.url+'/api/reset_password', { method: 'POST',  headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         }, body: JSON.stringify({
           email: email,
         }),  })
         .then(res => res.json())
         .then(res => {
           if(res.status){
           this.setState({ loading: false})
           Alert.alert('Success', "Check your mail for the new password", [{text: 'Okay'}])
            this.props.navigation.navigate('Login');
          
           }else{
 
         Alert.alert('Operation failed', res.message, [{text: 'Okay'}])
         this.setState({ loading: false})
           }
         }).catch((error)=>{
           console.log("Api call error");
           alert(error.message);
           this.setState({ loading: false})
        }); 
    }








  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
          <Text>Login in</Text>
        </View>
      );
    }
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <View>
        <Text style={styles.headText}
                        >Forgot Password </Text>
        </View>
         <View style={styles.textInputcontainer}>
                      
                    <TextInput
                        placeholder= "Email"
                        placeholderTextColor= '#55575b'
                        returnKeyType = "next"
                        onSubmitEditing = {() => this.passwordInput.focus()}
                        keyboardType = "email-address"
                        autoCapitalize= "none"
                        autoCorrect = {false}
                        onChangeText = {text => this.setState({email: text})}
                        style = {styles.input}
                       
                />

           </View>    
           <View style={styles.Linkcontainer}>
                <TouchableOpacity style={styles.buttonContainer} >
                    <Text style={styles.buttonText}
                     onPress ={() => this.checkForgotpassword()} >Update</Text>

                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelContainer}
                 onPress={() => this.props.navigation.navigate('Login')}
                >
                     <Text style={styles.cancleText}>X</Text>

                </TouchableOpacity>

          </View>   
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingTop:100
  },
  textInputcontainer: {
    flex: 2,
    justifyContent: 'flex-end',
  },
  Linkcontainer: {
    flex: 3,
    justifyContent: 'center',
  },
  input:{
    height:50,
    backgroundColor: '#d2e0f7',
    marginBottom:15,
    color: '#000000',
    paddingHorizontal: 10,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    marginLeft:40,
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
        marginTop: 10
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
      
});
