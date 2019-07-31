
import React, {Component} from 'react';
import {Image, ActivityIndicator, StyleSheet, Text, Alert, View,TouchableOpacity, AsyncStorage} from 'react-native';
const URL = require("../../components/server");
import Icon from 'react-native-vector-icons/FontAwesome';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';


export default class UserLanding extends Component{

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
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
    this.props.navigation.addListener(
      'didFocus',
      payload => {
       this.makeRemoteRequest();
      }
    );

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
        console.warn(res)
        if(res.status){
          AsyncStorage.setItem('email', res.user.email);
          AsyncStorage.setItem('first', res.user.firstname);
          AsyncStorage.setItem('last', res.user.lastname);
          AsyncStorage.setItem('eid', "233");
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

  logout = () => {
    AsyncStorage.setItem('rem', "no");  
    AsyncStorage.setItem('auth', "null");
    this.props.navigation.navigate('Login')
  }


  _menu = null;
 
   setMenuRef = ref => {
     this._menu = ref;
   };
  
   hideMenu = () => {
     this._menu.hide();
   };
  
   showMenu = () => {
     this._menu.show();
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
                      <Text style={styles.headTextW}>{this.state.name}</Text>

                      <TouchableOpacity style={styles.button}  onPress={() => this.props.navigation.navigate('Edit')}> 
                      <Icon
                          name="pencil"
                          size={20}
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
                    <Menu
     ref={this.setMenuRef}
     button={<TouchableOpacity style={styles.circle } onPress={this.showMenu} >

     <Icon
       name="bars"
       style={{marginRight:10}} name="bars" size={20}
       type="font-awesome"
       color="#000"
       />
</TouchableOpacity>}
   >
     <MenuItem>Feed back</MenuItem>
   </Menu>
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
                        <TouchableOpacity style={styles.items}  onPress={() => this.props.navigation.navigate('PerfomanceRouteListing')}>
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
    flex: 3,
    backgroundColor: URL.bgcolor,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  foother: {
    flex: 5,
    padding:2
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

  headTextWt:{
    color: "#FFF",
    fontWeight: '900',
    fontSize:15,
    textAlign:'left',
  },
  menu:{
    height:30,
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
    marginBottom:20,
  },
body:{
    flex:1,
  }
  ,
    circle: {
     width: 40,
     height: 40,
     backgroundColor: '#fff',
     borderRadius: 10,
     justifyContent: 'center',
     alignItems: 'center',
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.5,
     shadowRadius: 2,
     elevation: 2,
     marginRight:30
  },
});
