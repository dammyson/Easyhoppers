
import React, {Component} from 'react';
import {ActivityIndicator, Picker, StyleSheet, Text, View,Image, Dimensions, TouchableOpacity} from 'react-native';
const URL = require("../../components/server");

export default class UpdateStatus extends Component{

    static navigationOptions = {
        title: 'Update Status',
        headerStyle: {
            backgroundColor: '#AFC1F2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      };
      
      constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          status: false,
          data: [],
          search: '',
          transaction_id:'',
          id:0, 
          auth:"",
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
    this.makeRemoteRequest();
     }
     makeRemoteRequest = () => {
      const {auth} = this.state
      this.setState({ loading: true });
      fetch(URL.url+'/api/schedules', { method: 'GET',  headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth,
        'Content-Type': 'application/json',
       }
       })
  
        .then(res => res.json())
        .then(res => {
          this.setState({
            data: res.data,
            loading: false,
            status: res.status,
            
          });
          this.arrayholder = res.data;
        })
        .catch(error => {
          alert(error.message);
            this.setState({ loading: false})
        }); 
    };

  checkUpdate()
  {
    
        const {id, auth} = this.state
        alert(id);
         /* if(id == ""){
            Alert.alert('Validation failed', 'Email and password field cannot be empty', [{text: 'Okay'}])
            return
          }
        this.setState({ loading: true})
        fetch(URL.url+'/api/schedule/update/'+id, { method: 'PUT',  headers: {
          Accept: 'application/json',
          'Authorization': 'Bearer ' + auth,
          'Content-Type': 'application/json',
        }, body: JSON.stringify({
          email: email,
          password: password,
        }),  })
        .then(res => res.json())
        .then(res => {

          if(res.status){ 
          this.setState({ loading: false})
          this.props.navigation.navigate('UserLanding')

          }else{

        Alert.alert('Operation failed', "Check your Network", [{text: 'Okay'}])
        this.setState({ loading: false})
          }
        }).catch((error)=>{
          console.log("Api call error");
          alert(error.message);
          this.setState({ loading: false})
       });
       */
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
                                      <Text style={{fontSize: 12, fontWeight: '200',  color: '#AFC1F2',}}>Flight</Text>
                                      <Text style={{marginTop:7, fontSize: 18, fontWeight: '600',  color: '#5b97dc',}}>Arik Air</Text>
                                      </View>

                              </View>
                          </View>
                          <TouchableOpacity style={styles.listItemWhite }  >
                                        <Text style={{margin:10, fontSize: 18, fontWeight: '600',  color: '#5b97dc',}}>LAG - ABD</Text>
                         </TouchableOpacity>

                            <View style = {styles.menudetailsTop}>

                            <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#AFC1F2',}}>Details</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#AFC1F2',}}>W3-777</Text>
                        </View>


                         <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#AFC1F2',}}>Depature</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>20:22</Text>
                        </View>

                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#AFC1F2',}}>Arival</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>02:34</Text>
                        </View>
                
                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#AFC1F2',}}>Status</Text>
                        <Text style={{marginTop:7, fontSize: 16, fontWeight: '500',  color: '#000',}}>Boarding</Text>
                        </View>

                    
                    
                        </View>

               <View style = {styles.maintwo}>
             <Picker
              selectedValue={(this.state && this.state.pickerValue) || 3}
                    style = {styles.inputpicker}
                    onValueChange={(itemValue) =>
                      this.setState({id: itemValue})
                      
                    }
                    selectedValue={this.state.id}>
                    <Picker.Item label="Arrived" value="1" />
                    <Picker.Item label="Boarding" value="2" />
                    <Picker.Item label="Cargo" value="3" />
                    <Picker.Item label="Taking off" value="4" />
                   
                  </Picker>
             
                  </View>
             </View>

                <View style = {styles.submaintwo}>

                 <View style={styles.Linkcontainer}>
                <TouchableOpacity style={styles.buttonContainer} >
                    <Text style={styles.buttonText}
                     onPress ={() => this.checkUpdate()}
                    > UPDATE</Text>

                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelContainer} >
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
    backgroundColor: '#a8bbf3',
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
    marginBottom:50,
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

