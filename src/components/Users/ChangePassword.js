
import React, {Component} from 'react';
import {TextInput, StyleSheet, ActivityIndicator,Dimensions, ImageBackground,  Alert, Text,AsyncStorage, View,TouchableOpacity, KeyboardAvoidingView} from 'react-native';
const URL = require("../../components/server");

export default class ChangePassword extends Component{
  constructor(props) 
  {
      super(props);
      this.emailRef = React.createRef();
      this.state = {
        loading: false,
        password: "",
        cpassword: "",
        opassword: "" 
      
    

                  }

  }
  componentDidMount() {
  
    AsyncStorage.getItem('auth').then((value) => this.setState({ 'auth': value.toString()}))
    AsyncStorage.getItem('auth').then((value) => {
      if(value==''){
       
      }else{
        this.setState({auth: value})
      }

    })
   

  }


  checkForgotpassword(){
   
  
    const {password, opassword, auth, cpassword} = this.state
    if(cpassword == "" || password  == "" || opassword  == ""){
      Alert.alert('Validation failed', 'Fields cannot be empty', [{text: 'Okay'}])
      return
    }else{
      if(password != cpassword){
        Alert.alert('Validation failed', 'Passwords does not match', [{text: 'Okay'}])
        return
      }else{
        
      }
    }

   this.setState({ loading: true})
   fetch(URL.url+'/api/change_password', { method: 'POST',  headers: {
     Accept: 'application/json',
     'Authorization': 'Bearer ' + auth,
     'Content-Type': 'application/json',
   }, body: JSON.stringify({
     old_password:opassword,
     new_password: password,
     confirm_password: cpassword
   }),  })
   .then(res => res.json())
   .then(res => {
     console.warn(res);
     if(res.status){
     this.setState({ loading: false})

     Alert.alert('Success', res.message, [{text: 'Okay'}])

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
          <Text>Login in</Text>
        </View>
      );
    }
    return (
      <ImageBackground
      source={require('../../images/ezbg.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
      >
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <View>
        <Text style={styles.headText}
                        >Change Password</Text>
        </View>
         <View style={styles.textInputcontainer}>
               


    <TextInput
                      placeholder= "old password"
                      secureTextEntry
                        placeholderTextColor= '#55575b'
                        returnKeyType = "next"
                        onSubmitEditing = {() => this.passwordInput.focus()}
                        keyboardType = "email-address"
                        autoCapitalize= "none"
                        autoCorrect = {false}
                        style = {styles.input}
                        onChangeText = {text => this.setState({opassword: text})}
                       
                />
                    <TextInput
                      placeholder= "password"
                      secureTextEntry
                        placeholderTextColor= '#55575b'
                        returnKeyType = "next"
                        onSubmitEditing = {() => this.passwordInput.focus()}
                        keyboardType = "email-address"
                        autoCapitalize= "none"
                        autoCorrect = {false}
                        style = {styles.input}
                        onChangeText = {text => this.setState({password: text})}
                       
                />
                   <TextInput
                      placeholder= "confirm password"
                      secureTextEntry
                        placeholderTextColor= '#55575b'
                        returnKeyType = "next"
                        onSubmitEditing = {() => this.passwordInput.focus()}
                        keyboardType = "email-address"
                        autoCapitalize= "none"
                        autoCorrect = {false}
                        style = {styles.input}
                        onChangeText = {text => this.setState({cpassword: text})}
                       
                        />

           </View>    
           <View style={styles.Linkcontainer}>
                <TouchableOpacity style={styles.buttonContainer} >
                    <Text style={styles.buttonText}
                     onPress ={() => this.checkForgotpassword()} >Update</Text>

                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelContainer}
                 onPress={() => this.props.navigation.navigate('UserLanding')}
                >
                     <Text style={styles.cancleText}>X</Text>

                </TouchableOpacity>

          </View>   
      </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
