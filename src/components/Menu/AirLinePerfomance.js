
import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage,FlatList, Alert, Platform, StyleSheet, Text, View,TouchableOpacity, Image, TextInput} from 'react-native';
const URL = require("../../components/server");
import DatePicker from 'react-native-datepicker'
import { Card, Icon,SocialIcon} from 'react-native-elements'
import { MaterialDialog } from 'react-native-material-dialog';
import RadioGroup from 'react-native-radio-buttons-group';

export default class AirLinePerfomance extends Component{
      
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      status: false,
      data: [],
      search: '',
      transaction_id:'',
      auth:"",
      fromdate:"2019-05-29",
      todate:"2019-06-11",
      today:"",
      body:"",
      sta:"",
      visible: false,
    };

   this.arrayholder = [];

  }       

       
      componentWillUnmount() {
        clearTimeout(this.timeout);
        }

        componentDidMount() {
         
          const responseJson = this.props.navigation.getParam("myJSON");
          this.setState({body: responseJson });
          const on = this.props.navigation.getParam("sta");
          this.setState({sta: on});

        AsyncStorage.getItem('auth').then((value) => this.setState({ 'auth': value.toString()}))
        AsyncStorage.getItem('auth').then((value) => {
          if(value==''){
           
          }else{
            this.setState({auth: value})
          }
         this.makeRemoteRequest();
        })
        
        
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
     makeRemoteRequest = () => {
      const {auth, body} = this.state
      this.setState({ loading: true });
      fetch(URL.url+'/api/getAirlinePerformanceComparism', { method: 'POST',  headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth,
        'Content-Type': 'application/json',
      },
      body: body, 
      })
  
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if(!res.data){
            Alert.alert('Operation failed', res.message, [{text: 'Okay'}])
        }
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

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#fff',
        }}
      />
    );
  };

  searchFilterFunction = search => {
    this.setState({ search });
    console.log(this.arrayholder);
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.flight.toUpperCase()}`;

      const textData = search.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  
  renderHeader = () => {
    return (
      
      <TextInput
        style = {styles.input}
        placeholder="Type Here..."
        placeholderTextColor= '#fff'
        round
        value={this.state.search}
        onChangeText={this.searchFilterFunction}
      />
    );
  };
        renderItem=({ item , index}) => 
        {
          return (
            <View style={
              index % 2 == 0 ? styles.listItemWhite : styles.listItemBlack
            } >
                 <View style = {styles.submain}>
                          <View style = {styles.details} >
                              <View style = {styles.menudetailsTop}>
                                  <View style = {styles.menudetailsTopchild}>
                                      <Text style={{fontSize: 10, fontWeight: '200',  color: URL.bgcolor,}}>Airline</Text>
                                      <Text style={{marginTop:7, fontSize: 15, fontWeight: '500',  color: URL.bgcolor,}}>{item.airline}</Text>                                           
                                    </View>
                                 
                                          <View style = {styles.menudetailsTopchild}>
                              <Text style={{fontSize: 10, fontWeight: '200',  color: URL.bgcolor,}}>Metric</Text>
                              <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: URL.bgcolor,}}>{this.renderStatusSwitch(this.state.sta)}</Text>
                              </View>
      
                                <View style = {styles.menudetailsTopchild}>
                                   <Text style={{fontSize: 10, fontWeight: '200',  color: URL.bgcolor,}}>Performance</Text>
                                  <Text style={{marginTop:7, fontSize: 15, fontWeight: '500',  color: '#000',}}>{parseInt(item.percentage)}</Text>
                                </View>
                          
                              </View>
                       </View>
      
      
                  </View>
      
      
          
      </View>
      
              )}
  render() {

    const { search } = this.state;

    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
          <Text>Loading products</Text>
        </View>
      );
    }

    if (this.state.error) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>No Product found at this time</Text>
        </View>
      );
    }

 
    return (
       
          <View style = {styles.container}>

            <View style={{alignItems: 'center', justifyContent: 'center',paddingTop:8, paddingBottom:10, color:"#fff", fontWeight: '900',  fontSize:13,}}>
          <Text style={{color:"#fff", fontWeight: '900',  fontSize:16,}}>Airline Performance</Text>
        </View>
             <View style = {styles.main}>

          <FlatList
                style={{paddingBottom:10}}
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.detail}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
             />
            
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
    flexDirection: "row",
  },

  details: {
    flex: 10,
  },


  menudetailsTop:{
    flexDirection: "row",
    flex: 1,
     marginBottom:9,
     marginLeft:10,
    marginRight:10,
  },
  menudetailsMid:{
    flexDirection: "row",
    flex: 1,
     marginBottom:9,
     marginLeft:10,
    marginRight:10,
  },
  menudetailsTopchild:{
    flex: 1,
  },
  menudetailsBottom:{
    flexDirection: "row",
    flex: 1,
    marginLeft:10,
    marginRight:10,
  },

  listItemWhite: {
    backgroundColor: '#eff3fd',
    padding:9,
    
  },
  listItemBlack: {
    backgroundColor: '#fff',
    padding:9,
  },
  
  input:{
    height:40,
    backgroundColor: '#eff3fd',
    marginBottom:15,
    color: URL.bgcolor,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginLeft:40,
    marginRight:40,
    textAlign: 'center',
    fontWeight: '700',
    
    },
    image:{
        margin:2,
        justifyContent: 'center',
        alignItems: 'center',
      },
      status:{
        flex: 1,
        margin:5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      circle: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
     },
     circletwo: {
        width: 20,
        height: 20,
        backgroundColor: 'green',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
     },
     buttonContainer:{
        height:30,
        backgroundColor: URL.bgcolor,
        justifyContent: 'center',
        borderRadius: 20,
      },
      buttonText:{
        textAlign:'center',
        color: "#FFFFFF",
        fontWeight: '500',
        fontSize:13,
      },

      headerform:{
        height:40,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:4,
        marginRight:15,
        marginLeft:15, 
         marginTop:4,
      },
      circle: {
       width: 40,
       height: 40,
       backgroundColor: URL.bgcolor,
       borderRadius: 10,
       justifyContent: 'center',
       alignItems: 'center',
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 2 },
       shadowOpacity: 0.5,
       shadowRadius: 2,
       elevation: 2,
       marginLeft:10
    },
});

