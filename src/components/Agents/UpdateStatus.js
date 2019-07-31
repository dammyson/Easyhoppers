
import React, {Component} from 'react';
import {ActivityIndicator, Platform,AsyncStorage, StyleSheet, Text, View,Image, Alert, TouchableOpacity} from 'react-native';
const URL = require("../../components/server");
import DatePicker from 'react-native-datepicker'
import PickerModal from 'react-native-picker-modal-view';

const list = [
  {Id: 8, Name: 'Air Borne', Value: '8'},
  {Id: 10, Name: 'Boarding', Value: '10'},
  {Id: 5, Name: 'Cancelled', Value: '5'},
  {Id: 3, Name: 'Delayed Arrival', Value: '3'},
  {Id: 4, Name: 'Delayed Departure', Value: '4'},
	{Id: 11, Name: 'Early Arrival', Value: '11'},
	{Id: 12, Name: 'Early Departure', Value: '12'},
	{Id: 7, Name: 'On Ground', Value: '7'},
  {Id: 1, Name: 'On Time Arrival', Value: '1'},
	{Id: 2, Name: 'On Time Departure', Value: '2'},
  {Id: 6, Name: 'Rescheduled', Value: '6'},
  {Id: 9, Name: 'Taxiing', Value: '9'},

]

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
          loading: true,
          status: false,
          data: [],
          search: '',
          transaction_id:'',
          id:0, 
          auth:"",
          name:"",
          sta:"",
          fromdate:"2019-05-29 00:00",
          today:""
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


    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.setState({
      today: year + '-' + month + '-' + date,
      
    });
   

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
      const {auth, id} = this.state
      console.warn(id);
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
    
        const {id,sta, fromdate, auth} = this.state

         if(sta == "" || fromdate == "" ){
            Alert.alert('Process failed', 'Select a statuse', [{text: 'Okay'}])
            return
          }
          var date = fromdate.slice(0, 10);
          var time = fromdate.slice(11, 16)+ ":00";
          var formdata ="" ;
           if(sta == "1" || sta == "3" ||sta == "11"  ){
            formdata = JSON.stringify({
              status: sta,
              actual_arrival_time: time,
              actual_arrival_date: date
            });
           }else if(sta == "2" || sta == "4" ||sta == "5" || sta == "6" || sta == "12"){
            formdata = JSON.stringify({
              status: sta,
              actual_departure_time: time,
              actual_adeparture_date: date
            });
          }else{
            formdata = JSON.stringify({
              status: sta,
            });
          }

      this.setState({ loading: true})
        fetch(URL.url+'/api/schedule/update/'+id, { method: 'PUT',  headers: {
          Accept: 'application/json',
          'Authorization': 'Bearer ' + auth,
          'Content-Type': 'application/json',
        }, body: JSON.stringify({
          status: sta,
        }), 
       })
        .then(res => res.json())
        .then(res => {

          if(res.status){ 
          this.setState({sta: sta, loading: false})
          Alert.alert('Operation Successful', "Update"+ res.message, [{text: 'Okay'}])

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
       <View style={{alignItems: 'center', justifyContent: 'center',paddingTop:8, paddingBottom:10, color:"#fff", fontWeight: '900',  fontSize:13,}}>
          <Text style={{color:"#fff", fontWeight: '900',  fontSize:16,}}>Update</Text>
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
                                      <Text style={{fontSize: 12, fontWeight: '200',  color: '#AFC1F2',}}>Flight</Text>
                                      <Text style={{marginTop:7, fontSize: 18, fontWeight: '600',  color: '#5b97dc',}}>{this.state.name.name}</Text>
                                      </View>

                              </View>
                          </View>
                          <TouchableOpacity style={styles.listItemWhite }  >
                                        <Text style={{margin:10, fontSize: 18, fontWeight: '600',  color: '#5b97dc',}}>{this.state.name.departure_port + " - " + this.state.name.arrival_port }</Text>
                         </TouchableOpacity>

                            <View style = {styles.menudetailsTop}>

                            <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#AFC1F2',}}>Details</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#AFC1F2',}}>{this.state.name.description}</Text>
                        </View>


                         <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#AFC1F2',}}>Depature</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>{this.state.name.scheduled_departure_time}</Text>
                        </View>

                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#AFC1F2',}}>Arival</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>{this.state.name.scheduled_arrival_time}</Text>
                        </View>
                
                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#AFC1F2',}}>Status</Text>
                        <Text style={{marginTop:7, fontSize: 16, fontWeight: '500',  color: '#000',}}>{this.renderStatusSwitch(this.state.name.status)}</Text>
                        </View>

                    
                    
                        </View>

               <View style = {styles.maintwo}>
               <Text style={{fontSize: 13, fontWeight: '500',  color: '#AFC1F2',}}>Select a flight status  and Time to update {this.state.sta} </Text>
               <PickerModal
                    onSelected={(selected) => this.setState({sta: selected.Value})}
                    onRequestClosed={()=> console.warn('closed...')}
                    onBackRequest={()=> console.warn('back key pressed')}
                    items={list}
                    sortingLanguage={'tr'}
                    showToTopButton={true}
                    defaultSelected={this.state.selectedItem}
                    autoCorrect={false}
                    autoGenerateAlphabet={true}
                    chooseText={'Airline'}
                    searchText={'Search...'} 
                    selectPlaceholderText={'Status'}
                    forceSelect={false}
                    autoSort={true}
                    style={styles.buttonContainer} 
	                	/>
          <DatePicker
        style={{width: 250}}
        date={this.state.fromdate}
        mode="datetime"
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
             </View>

                <View style = {styles.submaintwo}>

                 <View style={styles.Linkcontainer}>
                <TouchableOpacity style={styles.buttonContainer} >
                    <Text style={styles.buttonText}
                     onPress ={() => this.checkUpdate()}
                    > UPDATE</Text>

                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelContainer} 
                 onPress={() => this.props.navigation.navigate('AgentSheduleListing')}
                >
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
    borderColor:'#AFC1F2',
    marginLeft:20,
    marginRight:20,
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

