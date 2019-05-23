
import React, {Component} from 'react';
import {Image, ActivityIndicator, StyleSheet, Text, Alert, View,TouchableOpacity, AsyncStorage} from 'react-native';
const URL = require("../../components/server");
import Icon from 'react-native-vector-icons/FontAwesome';


export default class UserLanding extends Component{

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      status: false,
      auth:"",
      name:""

    };
  }

  componentDidMount() {
  
    AsyncStorage.getItem('auth').then((value) => this.setState({ 'auth': value.toString()}))
    AsyncStorage.getItem('auth').then((value) => {
      if(value==''){
       
      }else{
        this.setState({auth: value})
      }
      this.makeRemoteRequest();
    })
    

  }

  makeRemoteRequest = () => {


    const {auth} = this.state
  this.setState({ loading: true });

   fetch(URL.url+'/api/user', { method: 'GET',  headers: {
       Accept: 'application/json',
       'Authorization': 'Bearer ' + auth,
       'Content-Type': 'application/json',
      }
      })

      .then(res => res.json())
      .then(res => {
        if(res.status){
        this.setState({
          name: res.user.name,
          loading: false,
          
          
        });
       
      }else{

        Alert.alert('Login failed', "Check your email and password", [{text: 'Okay'}])
        this.setState({ loading: false})
          }
      })
      .catch(error => {
        alert(error.message);
          this.setState({ loading: false})
      }); 


  };









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
      <View style={styles.container}>

   
           <View style={styles.Headercontainer}>
               
                <View style={styles.header}> 
                
                <Text style={styles.headTextWt}>Log Out</Text>
                <Text style={styles.headTextW}>Welcome {this.state.name}</Text>

                <TouchableOpacity style={styles.button} onPress={this.showDialog}> 
                <Icon
                    name="pencil"
                    size={15}
                    color="white"
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
                        <TouchableOpacity style={styles.items}
                             onPress={() => this.props.navigation.navigate('LiveUpdate')}>
                                    <Image
                                    style={styles.image}
                                    source={require('../../images/live.png')} />
                                      <Text style={styles.headText}>Live</Text>
                                      <Text style={styles.headText}>Status</Text>
                                    <Text style={styles.headlink}>View Now</Text>
                                </TouchableOpacity>
                        </View>
                        <View style={styles.rowchild}>
                        
                        </View>
                      </View>
    
    
                     <View style={styles.row}>
                     <View style={styles.rowchild}>
                     <TouchableOpacity style={styles.items}
                            onPress={() => this.props.navigation.navigate('Boarding')}>
                                    <Image
                                    style={styles.image}
                                    source={require('../../images/bell.png')} />
                                   <Text style={styles.headText}>Boarding</Text>
                                      <Text style={styles.headText}>Alert</Text>
                                    <Text style={styles.headlink}>Get Alert</Text>
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
                        <TouchableOpacity style={styles.items}
                        onPress={() => this.props.navigation.navigate('Expense')}>
                        
                                    <Image
                                        style={styles.image}
                                        source={require('../../images/plane.png')} />
                                        <Text style={styles.headText}> Travel</Text>
                                      <Text style={styles.headText}>Expenses</Text>
                                    <Text style={styles.headlink}>Track Now</Text>
                            </TouchableOpacity>
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
    backgroundColor: '#8694f4',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  foother: {
    flex: 5,
    padding:2
  },
  header:{
    height:100,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    marginRight:15,
    marginLeft:15,
    marginTop:20
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
    color: "#8694f4",
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

  headTextWt:{
    color: "#FFF",
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
  }
});
