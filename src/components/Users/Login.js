
import React, {Component} from 'react';
import {TextInput, StyleSheet,ScrollView, Text, View,TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Alert, AsyncStorage} from 'react-native';
const URL = require("../../components/server");
export default class Login extends Component{

  constructor(props) 
  {
      super(props);
      this.state = {
        loading: false,
        email: "", 
        password: "",
        demail: "", 

                  }

  }


  componentDidMount() {
  
    AsyncStorage.getItem('email').then((value) => this.setState({ 'demail': value.toString()}))
  }


  checkLogin()
  {
    
        const {email, password} = this.state

          if(email == "" || password == "" ){
            Alert.alert('Validation failed', 'Email and password field cannot be empty', [{text: 'Okay'}])
            return
          }
        this.setState({ loading: true})
        fetch(URL.url+'/api/login', { method: 'POST',  headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }, body: JSON.stringify({
          email: email,
          password: password,
        }),  })
        .then(res => res.json())
        .then(res => {

          if(res.status){
          AsyncStorage.setItem('auth', res.token.toString());
          AsyncStorage.setItem('role', res.Role);
          AsyncStorage.setItem('email', email);
          this.setState({ loading: false})

              if(res.Role=="customer"){
                this.props.navigation.navigate('UserLanding')
              }else{
                this.props.navigation.navigate('AgentLanding')
              }

         

          }else{

        Alert.alert('Login failed', "Check your email and password", [{text: 'Okay'}])
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
          <Text>Processing</Text>
        </View>
      );
    }
    return (
      <View behavior="padding" style={styles.container}>

       
         <KeyboardAvoidingView style={styles.textInputcontainer}>
         <View>
        <Text style={styles.headText}
                        >Sign In</Text>
        </View>
                    <TextInput
                        placeholder= "Email"
                        placeholderTextColor= '#55575b'
                        returnKeyType = "next"
                        text= {this.state.demail}
                        onSubmitEditing = {() => this.passwordInput.focus()}
                        keyboardType = "email-address"
                        autoCapitalize= "none"
                        autoCorrect = {false}
                        style = {styles.input}
                        onChangeText = {text => this.setState({email: text})}
                       
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

           </KeyboardAvoidingView>    
           <View style={styles.Linkcontainer}>
                <TouchableOpacity style={styles.buttonContainer} >
                    <Text style={styles.buttonText}
                     onPress ={() => this.checkLogin()}  >SIGN IN</Text>

                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelContainer} >
                     <Text style={styles.cancleText}
                     >X</Text>

                </TouchableOpacity>

          </View>   
          <View style={styles.bottom}>
          <TouchableOpacity style={styles.link}
           onPress={() => this.props.navigation.navigate('ForgotPassword')}>
          <Text  style={styles.linkText} >Forgot Password</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.link} 
            onPress={() => this.props.navigation.navigate('Register')}>
          <Text  style={styles.linkText} >New User</Text>
          </TouchableOpacity>

        </View>
      </View>
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
    height:45,
    backgroundColor: '#d2e0f7',
    marginBottom:15,
    color: '#000000',
    paddingHorizontal: 10,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    marginLeft:40,
    fontWeight: '600',
    },
    buttonContainer:{
        height:50,
        backgroundColor: "#7892FB",
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
        marginLeft: 50,
        marginBottom:30
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
        flex: 1,
        color: "#000",
        fontWeight: '700',
        fontSize:15,
        textAlign:'center',
      },
});
