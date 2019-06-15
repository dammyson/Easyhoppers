
import React, {Component} from 'react';
import {TextInput, StyleSheet,ScrollView, Text, View,TouchableOpacity, KeyboardAvoidingView, ActivityIndicator,AsyncStorage, Alert} from 'react-native';
const URL = require("../../components/server");
import RadioGroup from 'react-native-radio-buttons-group';
import DatePicker from 'react-native-datepicker'
export default class Edit extends Component{
  constructor(props) 
  {
      super(props);
      this.state = {
        loading: false,
        email: "", 
        phone: "", 
        name: "", 
        password: "",

        data: [
            
            {
                label: 'Male',
                size: 32,
            },
            {
                label: 'Female',
                size: 32,
            },
        ],
                  }

  }

  checkReg()
    {
    
        const {email,phone, name, password} = this.state

          if(email == "" || password == "" || name == "" || phone == "" ){
            Alert.alert('Validation failed', 'field(s) cannot be empty', [{text: 'Okay'}])
            return
          }
        this.setState({ loading: true})
        fetch(URL.url+'/api/register', { method: 'POST',  headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }, body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          state: "Nig",
          city: "Nig"
        }),  })
        .then(res => res.json())
        .then(res => {
          console.warn(res);
          if(res.status){
          this.setState({ loading: false})
          this.props.navigation.navigate('Login')

          }else{
        Alert.alert('Login failed', "Check your email and password", [{text: 'Okay'}])
        this.setState({ loading: false})
          }
        }).catch((error)=>{
          console.log("Api call error");
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
      <ScrollView behavior="padding" style={styles.container}>

       
         <KeyboardAvoidingView style={styles.textInputcontainer}>
                      <View>
                      <Text style={styles.headText}
                                      >Edit Profile</Text>
                      </View>
                   
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
                    placeholder= "Occupation"
                    placeholderTextColor= '#55575b'
                    returnKeyType = "next"
                    onSubmitEditing = {() => this.passwordInput.focus()}
                    keyboardType = "email-address"
                    autoCapitalize= "none"
                    autoCorrect = {false}
                    style = {styles.input}
                    onChangeText = {text => this.setState({occupation: text})}
               
                 />
                    <View style= {{flexDirection: "row",  alignItems: 'center', marginLeft:45, marginBottom:4,}}> 
                    <Text style={{color:"#7892FB", fontWeight: '900',  fontSize:16,}}>Gender</Text>
                    <RadioGroup radioButtons={this.state.data} 
                    onPress={this.onPress} 
                    flexDirection='row'/>
                    </View>
                  
                    <View style= {{flexDirection: "row",  alignItems: 'center', marginLeft:45, marginBottom:24,}}> 
                    <Text style={{color:"#7892FB", fontWeight: '900',  fontSize:16,}}>DOB</Text>
                     <DatePicker
                                style={{width: 250}}
                                date={this.state.fromdate}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD hh:ss"
                                minDate="2019-06-01 00:00"
                                maxDate={this.state.today}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                  dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                  },
                                  dateInput: {
                                    marginLeft: 36
                                  }
                                  // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({fromdate: date})}}
                              />
                        </View>
               

           </KeyboardAvoidingView>    
           <View style={styles.Linkcontainer}>
                <TouchableOpacity style={styles.buttonContainer} >
                    <Text style={styles.buttonText}
                     onPress ={() => this.checkReg()} >Update</Text>

                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelContainer} >
                     <Text style={styles.cancleText}
                        onPress ={() => this.checkLogin()} >X</Text>

                </TouchableOpacity>

          </View>   
          <View style={styles.bottom}>
         
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop:70
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
