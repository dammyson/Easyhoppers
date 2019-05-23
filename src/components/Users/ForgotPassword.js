
import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, View,TouchableOpacity, KeyboardAvoidingView} from 'react-native';

export default class ForgotPassword extends Component{
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <View>
        <Text style={styles.headText}
                        >Sign In</Text>
        </View>
         <View style={styles.textInputcontainer}>
                      
                    <TextInput
                        placeholder= "Email / Phone"
                        placeholderTextColor= '#55575b'
                        returnKeyType = "next"
                        onSubmitEditing = {() => this.passwordInput.focus()}
                        keyboardType = "email-address"
                        autoCapitalize= "none"
                        autoCorrect = {false}
                        style = {styles.input}
                       
                />

           </View>    
           <View style={styles.Linkcontainer}>
                <TouchableOpacity style={styles.buttonContainer} >
                    <Text style={styles.buttonText}
                     onPress ={() => this.checkLogin()} >Update</Text>

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
        height:60,
        backgroundColor: "#AFC1F2",
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
        height:60,
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
