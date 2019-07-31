
import React, {Component} from 'react';
import {Image, Alert, StyleSheet, Text, View,TouchableOpacity, KeyboardAvoidingView} from 'react-native';
const URL = require("../../components/server");
import Icon from 'react-native-vector-icons/FontAwesome';


export default class AgentLanding extends Component{


  logout = () => {
    AsyncStorage.setItem('rem', "no");  
    AsyncStorage.setItem('auth', "null");
    this.props.navigation.navigate('Login')
  }
  render() {
    return (
      <View style={styles.container}>

   
           <View style={styles.Headercontainer}>
               
           <View style={styles.header}> 
                      
                      <TouchableOpacity
                      style={styles.button} 
                      
                      onPress={() => Alert.alert(
                        'Login Out',
                        'Are you sure you want to log out',
                        [
                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                          {text: 'OK', onPress: () => this.logout()},
                        ],
                        { cancelable: false }
                      )}
                      
                      > 
                      <Icon
                          name="lock"
                          size={20}
                          color="white"
                          type="font-awesome"
                          />
                      </TouchableOpacity> 
                      <Text style={styles.headTextW}>Agents</Text>

                      <TouchableOpacity style={styles.button}> 
                      <Icon
                          name="pencil"
                          size={20}
                          color={URL.bgcolor}
                          />
                      </TouchableOpacity> 
                </View>


                 <Image
          style={styles.headimage}
          source={require('../../images/user.png')} />
          </View>   
          <View style={styles.foother}>

                <View style={styles.body}>
                    
                    <View style={styles.menu}> 
                    <Icon
                    name="bars"
                    style={{marginRight:10}} name="bars" size={20}
                    color="#d0e1fe"
                    />
                    <Text style={styles.headText}>Menu</Text>
                    </View>
                 
                <View style={styles.scrollView}>
                      <View style={styles.row}>
                      <View style={styles.rowchild}>
                        
                        </View>
                        <View style={styles.rowchild}>
                        
                        </View>
                        <View style={styles.rowchild}>
                        
                        </View>
                      </View>
    
    
                     <View style={styles.row}>
                     <View style={styles.rowchild}>
                     <TouchableOpacity style={styles.items}
                             onPress={() => this.props.navigation.navigate('AgentSheduleListing')}>
                                    <Image
                                    style={styles.image}
                                    source={require('../../images/live.png')} />
                                      <Text style={styles.headText}>Update</Text>
                                      <Text style={styles.headText}>Status</Text>
                                    <Text style={styles.headlink}>Update Now</Text>
                                </TouchableOpacity>

                        </View>
                        <View style={styles.rowchildsm}>
                        
                        </View>
                        <View style={styles.rowchild}>
                        <TouchableOpacity style={styles.items}  onPress={() => this.props.navigation.navigate('AirLinePerfomance')}>
                                    <Image
                                        style={styles.image}
                                        source={require('../../images/osci.png')} />
                                         <Text style={styles.headText}>Live</Text>
                                      <Text style={styles.headText}>Performance</Text>
                                    <Text style={styles.headlink}>Check Now</Text>
                            </TouchableOpacity>
                        </View>
                     </View>
                     <View style={styles.row}>
                        <View style={styles.rowchild}>
                        
                        </View>
                        <View style={styles.rowchild}>
                      
                        </View>
                        <View style={styles.rowchild}>
                        
                        </View>
                     </View>
    
                 

                </View>
                </View>


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
    
  },
  Headercontainer: {
    flex: 4,
    backgroundColor: URL.bgcolor,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  foother: {
    flex: 5,
    padding:2
  },
  headText:{
    color: "#000",
    fontWeight: '900',
    fontSize:15,
    textAlign:'left',
  },
  headText:{
    color: "#000",
    fontWeight: '700',
    fontSize:14,
    textAlign:'left',
  },
  headlink:{
    color: URL.bgcolor,
    fontWeight: '500',
    fontSize:12,
    textAlign:'left',
  },
  items: {
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headimage: {
    alignItems: 'center',
    marginBottom: 25,
  },
  headTextW:{
    color: "#FFF",
    flex: 1,
    fontWeight: '900',
    fontSize:15,
    textAlign:'left',
  },
  menu:{
    height:30,
    flexDirection: "row",
    marginLeft:20,
    marginTop:10
  },

  row:{
    flex:1,
    flexDirection: "row",
   
  },
  rowchild:{
     flex:2,
     margin:5,
   },

   rowchildsm:{
    flex:1,
    margin:5,
  },
  scrollView:{
    flex:1,
    marginBottom:40,
  },
body:{
    flex:1,
  },
  header:{
    height:40,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    marginRight:15,
    marginLeft:15,
    marginTop:10
  },
  headText:{
    color: URL.bgcolor,
    fontWeight: '900',
    fontSize:15,
    textAlign:'left',
  },
  headText:{
    color: "#000",
    fontWeight: '700',
    fontSize:14,
    textAlign:'left',
  },
  headlink:{
    color: URL.homelinkcolor,
    fontWeight: '500',
    fontSize:12,
    textAlign:'left',
  },
  items: {
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headimage: {
    alignItems: 'center',
    marginBottom: 25,
  },
  headTextW:{
    color: "#FFF",
    flex:1,
    fontWeight: '900',
    fontSize:15,
    textAlign:'center',
    alignItems: 'center',
  },

});
