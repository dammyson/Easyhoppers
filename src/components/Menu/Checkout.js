
import React, {Component} from 'react';
import {ActivityIndicator, Platform,AsyncStorage, StyleSheet, Text, View,Image, Alert, TouchableOpacity} from 'react-native';
const URL = require("../../components/server");
import { Card, Icon,SocialIcon} from 'react-native-elements'

export default class Checkout extends Component{

    static navigationOptions = {
        title: 'Update Status',
        headerStyle: {
            backgroundColor: URL.bgcolor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      };
      
      constructor(props) {
        super(props);
    
        this.state = {
          loading: true,
          status: false,
          data: [],
          search: '',
          transaction_id:'',
          id:0, 
          auth:"",
          email:"",
          first:"",
          name:"",
        };
    
       this.arrayholder = [];
    
    
       const actions = [{
        text: 'Accessibility',
        name: 'bt_accessibility',
        position: 2
      }];
    
      }      

         
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  componentDidMount() {
  AsyncStorage.getItem('first').then((value) => this.setState({first: value.toString()}))
    
    this.setState({
      id:this.props.navigation.getParam("s_id", "defaultValue")
    })
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
      const {auth, first, id} = this.state
      this.setState({ loading: true });
      fetch(URL.url+'/api/getSchedule/'+id, { method: 'GET',  headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth,
        'Content-Type': 'application/json',
       }
       })
  
        .then(res => res.json())
        .then(res => {
          this.setState({
            data: res.message,
            loading: false,
            status: res.status,
             name: res.message[0],
            
          });
        })
        .catch(error => {
          alert(error.message);
            this.setState({ loading: false})
        }); 
    };
    renderStatusSwitch(param) {
      switch(param) {
          case 1:
          return 'On Time Arrival';
          case 2:
          return 'On Time Departure';
          case 3:
          return 'Delayed Arrival';
          case 4:
          return ' Delayed Departure';
          case 5:
          return 'Cancelled';
          case 6:
          return 'Rescheduled';
          case 7:
          return 'On Ground';
          case 8:
          return 'Air Borne';
          case 9:
          return 'Taxiing';
          case 10:
          return 'Boarding ';
          case 11:
          return 'Early Arrival';
          case 12:
          return 'Early Departure';
        default:
          return 'ON TIME';
      }
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
       
      <View style = {styles.container}>
       <View style={{flexDirection: 'row',  alignItems: 'center', justifyContent: 'center',paddingTop:8, paddingBottom:10, color:"#fff", fontWeight: '900',  fontSize:13,}}>
       <TouchableOpacity onPress={() =>this.props.navigation.goBack() } style={{ marginLeft: 10 }}>
            <Icon
              name="angle-left"
              size={30}
              type='font-awesome'
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={{ color: "#fff", fontWeight: '900', fontSize: 16, flex:1, textAlign:'center' }}>Subscribe</Text>
        </View>
          <View style = {styles.main}>
            
            <View style = {styles.submain}>


                <View style = {styles.submainone}>
                        <View style = {styles.ariline}>
                              <Image
                              style={styles.image}
                              resizeMode='contain'
                            source={require('../../images/sn.png')} />
                            <View style = {styles.details} >
                                <View style = {styles.menudetailsTopchild}>
                                      <Text style={{fontSize: 12, fontWeight: '200',  color: URL.bgcolor,}}>Flight</Text>
                                      <Text style={{marginTop:7, fontSize: 18, fontWeight: '600',  color: '#5b97dc',}}>{this.state.name.name}</Text>
                                      </View>

                              </View>
                          </View>
                          <TouchableOpacity style={styles.listItemWhite }  >
                                        <Text style={{margin:10, fontSize: 18, fontWeight: '600',  color: '#5b97dc',}}>{this.state.name.departure_port + " - " + this.state.name.arrival_port }</Text>
                         </TouchableOpacity>

                            <View style = {styles.menudetailsTop}>

                            <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: URL.bgcolor,}}>Details</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: URL.bgcolor,}}>{this.state.name.description}</Text>
                        </View>


                         <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: URL.bgcolor,}}>Depature</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>{this.state.name.scheduled_departure_time}</Text>
                        </View>

                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: URL.bgcolor,}}>Arival</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>{this.state.name.scheduled_arrival_time}</Text>
                        </View>
                
                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: URL.bgcolor,}}>Status</Text>
                        <Text style={{marginTop:7, fontSize: 16, fontWeight: '500',  color: '#000',}}>{   this.renderStatusSwitch(this.state.name.status)}</Text>
                        </View>

                    
                    
                        </View>

               <View style = {styles.maintwo}>
               <TouchableOpacity style={styles.listItemWhite }  >
                                        <Text style={{margin:10, fontSize: 18, fontWeight: '600',  color: '#5b97dc',}}>N 1000.00</Text>
                         </TouchableOpacity>
             
                  </View>
             </View>

                <View style = {styles.submaintwo}>

                 <View style={styles.Linkcontainer}>
                <TouchableOpacity style={styles.buttonContainer} >
                    <Text style={styles.buttonText}
                     onPress={() => this.props.navigation.navigate('Pay', 
                     {
                       s_id: this.state.id,
                     
                     })}
                    > PAY</Text>

                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelContainer} 
                   onPress={() => this.props.navigation.navigate('Boarding')}>

                
                     <Text style={styles.cancleText}
                     >X</Text>

                </TouchableOpacity>

          </View>   
                </View>
          
          
            </View>
                
          </View>
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
  ariline: {
    flexDirection: "row",
    marginLeft:10,
    marginRight:10,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    paddingTop:14,
    paddingBottom:14,
    borderRadius: 20,
    marginBottom:20,
    marginLeft:10,
    marginRight:10,
    backgroundColor: '#fff',
  },
  submain: {
    flex: 1,
  },
  submainone: {
    flex: 2,
    
  },
  mainone: {
    flex: 2,
    
  },

  submaintwo: {
    flex: 1,
  },

  maintwo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input:{
    height:50,
    backgroundColor: '#eff3fd',
    marginBottom:15,
    color: '#fff',
    paddingHorizontal: 40,
    borderRadius: 25,
    marginLeft:40,
    marginRight:40,
    textAlign: 'center',
    fontWeight: '700',
    
    },
    menudetailsTopchild:{
      marginLeft:10,
    marginRight:10,
    },
    routmain: {
      flex: 1,
      flexDirection: "row",
    }, 
    listItemWhite: {
      backgroundColor: '#eff3fd',
      padding:5,
      marginTop:10,
      
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
        borderColor:URL.bgcolor,
        borderWidth: 2,
        marginTop: 10
      },
      cancleText:{
        textAlign:'center',
        color: URL.bgcolor,
        fontWeight: '900',
        fontSize:18,
      },

  menudetailsTop:{
    flexDirection: "row",
     marginBottom:9,
     marginLeft:10,
    marginRight:10,
  
  },
  menudetailsTopchild:{
    flex: 1,
  },
  inputpicker:{
    height: 50,
     width: 100,
    
    },
    
});

