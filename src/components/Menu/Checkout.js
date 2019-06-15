
import React, {Component} from 'react';
import {ActivityIndicator, Picker,AsyncStorage, StyleSheet, Text, View,Image, Alert, TouchableOpacity} from 'react-native';
const URL = require("../../components/server");

export default class Checkout extends Component{

    static navigationOptions = {
        title: 'Update Status',
        headerStyle: {
            backgroundColor: '#7892FB',
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

    AsyncStorage.getItem('email').then((value) => this.setState({ 'email': value.toString()}))
    AsyncStorage.getItem('email').then((value) => {
      if(value==''){
       
      }else{
        this.setState({email: value})
      }
     
    })



     }
     makeRemoteRequest = () => {
      const {auth, id} = this.state
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
          this.setState({ loading: false})
          Alert.alert('Operation Successful', res.message, [{text: 'Okay'}])

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

    return (
       
      <View style = {styles.container}>
       <View style={{alignItems: 'center', justifyContent: 'center',paddingTop:8, paddingBottom:10, color:"#fff", fontWeight: '900',  fontSize:13,}}>
          <Text style={{color:"#fff", fontWeight: '900',  fontSize:16,}}>Subscribe</Text>
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
                                      <Text style={{fontSize: 12, fontWeight: '200',  color: '#7892FB',}}>Flight</Text>
                                      <Text style={{marginTop:7, fontSize: 18, fontWeight: '600',  color: '#5b97dc',}}>{this.state.name.name}</Text>
                                      </View>

                              </View>
                          </View>
                          <TouchableOpacity style={styles.listItemWhite }  >
                                        <Text style={{margin:10, fontSize: 18, fontWeight: '600',  color: '#5b97dc',}}>{this.state.name.departure_port + " - " + this.state.name.arrival_port }</Text>
                         </TouchableOpacity>

                            <View style = {styles.menudetailsTop}>

                            <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#7892FB',}}>Details</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#7892FB',}}>{this.state.name.description}</Text>
                        </View>


                         <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#7892FB',}}>Depature</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>{this.state.name.scheduled_departure_time}</Text>
                        </View>

                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#7892FB',}}>Arival</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>{this.state.name.scheduled_arrival_time}</Text>
                        </View>
                
                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#7892FB',}}>Status</Text>
                        <Text style={{marginTop:7, fontSize: 16, fontWeight: '500',  color: '#000',}}>{ this.state.name.status == 0 ? "Not Time" :"djdjd"}</Text>
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
                     onPress ={() => this.checkUpdate()}
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
    backgroundColor: '#7892FB',
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
        borderColor:'#7892FB',
        borderWidth: 2,
        marginTop: 10
      },
      cancleText:{
        textAlign:'center',
        color: "#7892FB",
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

