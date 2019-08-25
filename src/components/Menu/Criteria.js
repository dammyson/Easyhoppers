import React, {Component} from 'react';
import {ActivityIndicator, Platform,AsyncStorage, TextInput, StyleSheet, Text, View,Alert, Dimensions, TouchableOpacity} from 'react-native';
import PickerModal from 'react-native-picker-modal-view';
const URL = require("../../components/server");
import DatePicker from 'react-native-datepicker'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
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

  const listone = [
    {Id: 1, Name: 'ABV - LOS', Value: '1'},
    {Id: 2, Name: 'LOS - ABV', Value: '2'},
  
  ]

const time= [
	{Id: 1, Name: '1 day', Value: '1'},
	{Id: 7, Name: '7 days', Value: '7'},
	{Id: 14, Name: '2 weeks', Value: '14'},
    {Id: 21, Name: '3 weeks', Value: '21'},
    {Id: 30, Name: '1 month', Value: '30'},
]
export default class Criteria extends Component{
    
      
      constructor(props) {
        super(props);
        
        this.state = {
          loading: false,
          status: false,
          data: [],
          selectedItem: {},
          auth:"",
          cat:"",
          metric:"",
          route:"",
          fromdate:"",
          todate:""
        };
    
       this.arrayholder = [];
      }      
      selected(selected) {
        this.setState({
          selectedItem: selected
        })
      }
    
         
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
 


  componentDidMount() {

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
    
       fetch(URL.url+'/api/routes', { method: 'GET',  headers: {
           Accept: 'application/json',
           'Authorization': 'Bearer ' + auth,
           'Content-Type': 'application/json',
          }
          })
    
          .then(res => res.json())
          .then(res => {
            this.setState({
              loading: false,
             data: res.data,
              
            });
        
          })
          .catch(error => {
            alert(error.message);
              this.setState({ loading: false})
          }); 
    
    
      };
    
      weekfilter(value)
      {
            var dateFormat = require('dateformat');
            var firstDay = new Date();
            var nextWeek = new Date(firstDay.getTime() + 24 * 60 * 60 * 1000 * value);
            var fromday = dateFormat(firstDay, "yyyy-mm-dd")
            var today = dateFormat(nextWeek, "yyyy-mm-dd")
            this.setState({ fromdate: fromday, todate:today});
    
      }
      searchButton(){
        const {metric, route, fromdate, todate} = this.state
        if(metric == "" || route == "" || fromdate == "" ){
            Alert.alert('Validation failed', 'field(s) cannot be empty', [{text: 'Okay'}])
            return
          }
          responseJson = JSON.stringify({
            route_id: route,
            status: metric,
            from: fromdate,
             to: todate,
          })
        this.props.navigation.navigate('AirLinePerfomance')
        this.props.navigation.navigate(
            "AirLinePerfomance", 
            {sta: metric, myJSON: responseJson} 
);

     
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
          <Text style={{color:"#fff", fontWeight: '900',  fontSize:16,}}>Compare ariline by Route</Text>
        </View>
          <View style = {styles.main}>
            
            <View style = {styles.submain}>
    
                <View style = {styles.submaintwo}>

                         <View style = {styles.cat}>
                         <Text style={{fontWeight: '900',  fontSize:16,}}>select Criteria</Text>
                         <Text>select Metrics</Text>
                  <PickerModal
                    onSelected={(selected) =>  this.setState({metric: selected.Value})}
                    onRequestClosed={()=> console.warn('closed...')}
                    onBackRequest={()=> console.warn('back key pressed')}
                    items={list}
                    showToTopButton={true}
                    defaultSelected={this.state.selectedItem}
                    autoCorrect={false}
                    autoGenerateAlphabet={true}
                    chooseText={'Choose Category'}
                    searchText={'Search...'} 
                    forceSelect={false}
                    style={styles.buttonContainer} 
	                	/>
                  </View>



                   <View style = {styles.cat}>
                   <Text>select route</Text>
                  <PickerModal
                    onSelected={(selected) => this.setState({route: selected.Value})}
                    onRequestClosed={()=> console.warn('closed...')}
                    onBackRequest={()=> console.warn('back key pressed')}
                    items={this.state.data}
                    showToTopButton={true}
                    defaultSelected={this.state.selectedItem}
                    autoCorrect={false}
                    autoGenerateAlphabet={true}
                    chooseText={'Choose Category'}
                    searchText={'Search...'} 
                    forceSelect={false}
                    style={styles.buttonContainer} 
	                	/>
                  </View>

                    <View style = {styles.cat}>
                   <Text>select time</Text>
                  <PickerModal
                    onSelected={(selected) =>   this.weekfilter(selected.Value)}
                    onRequestClosed={()=> console.warn('closed...')}
                    onBackRequest={()=> console.warn('back key pressed')}
                    items={time}
                    showToTopButton={true}
                    defaultSelected={this.state.selectedItem}
                    autoCorrect={false}
                    autoGenerateAlphabet={true}
                    chooseText={'Choose Category'}
                    searchText={'Search...'} 
                    forceSelect={false}
                    style={styles.buttonContainer} 
	                	/>
                  </View>






                                    <View style = {styles.search}>
                  <TouchableOpacity style={styles.buttonContainer} 
                  onPress={() =>this.searchButton()}>
                    <Text style={styles.buttonText}
                   >Search</Text>
                    
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
  headText:{
    color: "#000",
    fontWeight: '700',
    fontSize:24,
    textAlign:'left',
  },
  header:{
    height:40,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    marginRight:15,
    marginLeft:15,
  },
  headerchild:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    paddingTop:8,
    paddingBottom:8,
    borderRadius: 20,
    marginBottom:30,
    marginLeft:10,
    marginRight:10,
    backgroundColor: '#fff',
  },
  submain: {
    flex: 1,
  },
  submainone: {
    flex: 1,
     backgroundColor: '#eff3fd',
  },

  submaintwo: {
    flex: 4,
    justifyContent: 'center',
    
  },

  submainthree: {
    flex: 3,
    alignItems: 'center',
    
  },
  search: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
   
  },

    inputtwo:{
        height:40,
        marginBottom:10,
        marginTop:15,
        color: '#000',
        paddingHorizontal: 40,
        borderWidth: 1,
        borderColor:"#b2aeae",
        marginLeft:40,
        marginRight:40,
        textAlign: 'center',
        fontWeight: '500',
        
        },
    inputpicker:{
      height: 30,
       width: 100,
      
      },
    menudetailsTopchild:{
      marginLeft:10,
    marginRight:10,
    },
    cat: {
      marginLeft:40,
      marginRight:40,
    }, 
    catone: {
      marginLeft:40,
      marginRight:40,
      flexDirection: "row",
    }, 
    listItemWhite: {
      backgroundColor: '#eff3fd',
      padding:9,
      
    },
    listItemBlack: {
      backgroundColor: '#fff',
      padding:9,
    },
    buttonContainer:{
      height:40,
      width:150,
      marginBottom:10,
      backgroundColor: URL.bgcolor,
      justifyContent: 'center',
      borderRadius: 10,
      margin:10,
    },
    buttonText:{
      textAlign:'center',
      color: "#FFFFFF",
      fontWeight: '500',
      fontSize:13,
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
      marginLeft:20
   },
   
});

