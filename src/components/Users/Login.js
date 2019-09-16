
import React, {Component} from 'react';
import {TextInput, StyleSheet, ScrollView, ImageBackground,Dimensions, Text, View,TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Alert, AsyncStorage} from 'react-native';
const URL = require("../../components/server");
import RadioGroup from 'react-native-radio-buttons-group';
import CheckBox from 'react-native-check-box'
import firebase from 'react-native-firebase';


export default class Login extends Component{

  constructor(props) 
  {
      super(props);
      this.emailRef = React.createRef();
      this.state = {
        loading: false,
        email: "", 
        password: "",
        demail: "", 
        token: "", 
        isChecked:false,

        data: [
            
          {
              label: 'Remember Me',
              size: 22,
              color: '#01215B',
              
          }
      ],

                  }

  }
  componentDidMount() {
        this.checkPermission();   
        AsyncStorage.getItem('email').then((value) => {
          if(value.toString()==''){
            this.setState({ 'demail': ""})
          }else{

            this.setState({ 'demail': value.toString()})
          }
        
        })


  }


  checkLogin(){
   
   let mail = "";
         const {email, demail,isChecked, token, password} = this.state
          if(email == "" ){
          
          if(demail == "" ){
            Alert.alert('Validation failed', 'Email field cannot be empty', [{text: 'Okay'}])
            return
          }else{
            mail = demail;
          }
         
        }else{
          mail = email;
        }

          if(password == "" ){
            Alert.alert('Validation failed', 'Password field cannot be empty', [{text: 'Okay'}])
            return
          }
        this.setState({ loading: true})
        fetch(URL.url+'/api/login', { method: 'POST',  headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }, body: JSON.stringify({
          email: mail,
          mobile_token: token,
          password: password,
        }),  })
        .then(res => res.json())
        .then(res => {
          if(res.status){
          AsyncStorage.setItem('auth', res.token.toString());
          AsyncStorage.setItem('role', res.Role);
          AsyncStorage.setItem('email', email);
          if(isChecked){
            AsyncStorage.setItem('rem', "yes");
          }else{
            AsyncStorage.setItem('rem', "no");
          }
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


//1
async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
 // firebase.messaging().subscribeToTopic("global");
}
async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  this.setState({token: fcmToken})
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.log(fcmToken);
      if (fcmToken) {
          // user has a device token
          await AsyncStorage.setItem('fcmToken', fcmToken);
          this.setState({token: fcmToken})
      }
  }
}

  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}


  render() {

    selectedButton = this.state.data.find(e => e.selected == true);
    selectedButton = selectedButton
        ? selectedButton.value
        : this.state.data[0].label;


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
      <View behavior="padding" style={styles.container}>
         
         <KeyboardAvoidingView style={styles.textInputcontainer}>
         <ScrollView >
                      <View style={{paddingBottom:200}}>
                      <View style={styles.welcomecontainer}> 
          <Text style={styles.headText}
                        > Welcome back</Text>
          </View>
       
         <View>
        <Text style={styles.headText}
                        >Sign In</Text>
         </View>
                      <TextInput
                        placeholder= "Email"
                        placeholderTextColor= '#55575b'
                        defaultValue={this.state.demail}
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

                   <View style= {{flexDirection: "row", alignItems:"center", marginLeft:45, marginBottom:4,}}> 
                   <Text  style={styles.linkText} >Remember me</Text>
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
                     onPress ={() => this.checkLogin()}  >SIGN IN</Text>

                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelContainer} 
               >
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
          <Text  style={styles.linkText}>New User</Text>
          </TouchableOpacity>

        </View>

               </View>
                </ScrollView>
           </KeyboardAvoidingView>    
      </View>
    
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
  welcomecontainer:{
    flex: 2,
  },
  textInputcontainer: {
    flex: 2,
    justifyContent: 'flex-end',
  },
  Linkcontainer: {
    flex: 3,
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
        marginLeft: 50,
        marginBottom:30
      },
      bottom:{
        height:30,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:70
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
