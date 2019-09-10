
import React, {Component} from 'react';
import {AsyncStorage, ActivityIndicator, Platform, StyleSheet, Text, View,Image, Alert, TouchableOpacity} from 'react-native';
const URL = require("../server");

export default class Confirm extends Component{

    constructor(props) {
        super(props);
        this.state = {
           loading: true,
            status: false,
            auth:"",
            email:"",
            id:""
      
          };

      }
   
      componentDidMount() {
          this.setState({
            id:this.props.navigation.getParam("s_id", "defaultValue")
          })
          AsyncStorage.getItem('email').then((value) => this.setState({ email: value.toString()}))
          AsyncStorage.getItem('auth').then((value) => {
            if(value==''){
              
            }else{
              this.setState({auth: value})
            }
            this.checkUpdate();
          })
       
         }

         checkUpdate()
         {
           
               const {id, auth, email} = this.state
              
                if(id == ""){
                   Alert.alert('Process failed', 'Select a statuse', [{text: 'Okay'}])
                   return
                 }
               this.setState({ loading: true})
               fetch(URL.url+'/api/subscribe', { method: 'POST',  headers: {
                 Accept: 'application/json',
                 'Authorization': 'Bearer ' + auth,
                 'Content-Type': 'application/json',
               }, body: JSON.stringify({
                 email:email,  
                 schedule_id: id,
               }), 
              })
               .then(res => res.json())
               .then(res => {
       
                 if(res.status){ 
                 this.setState({ 
                   loading: false,
                   status: res.status,
                  })
       
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
          <Text>Processing</Text>
        </View>
      );
    }
    if (this.state.status) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{color:URL.bgcolor, margin:20, fontWeight: '900',  fontSize:16,}}>Subscription to boarding Alert was successful</Text>
        <TouchableOpacity style={styles.buttonContainer} >
          <Text style={styles.buttonText}
          onPress={() => this.props.navigation.navigate('Boarding')} >Bording Alert</Text>

          </TouchableOpacity>
      </View>
    );
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text style={{color:"red", fontWeight: '900',  fontSize:16,}}>Subscription to boarding Alert failed</Text>
        <TouchableOpacity style={styles.buttonContainer} >
          <Text style={styles.buttonText}
          onPress={() => this.props.navigation.navigate('Boarding')} >Bording Alert</Text>

          </TouchableOpacity>

      </View>
    );

  };
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: URL.bgcolor,
    paddingTop:Platform.OS === 'ios' ? 25 : 10,
  },

  buttonContainer:{
    backgroundColor: URL.bgcolor,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft:10,
    marginRight:10,
    marginTop:10,
    width:140,
  },
  buttonText:{
        textAlign:'center',
        color: "#FFFFFF",
        fontWeight: '700'
  },
 
    
});

