import React, {Component} from 'react';
import {ActivityIndicator,AsyncStorage,FlatList, StyleSheet, Text, View,Image, Dimensions, TouchableOpacity} from 'react-native';
import { MultiLineChart } from 'react-native-d3multiline-chart';
import DatePicker from 'react-native-datepicker'
import { Card, Icon,SocialIcon} from 'react-native-elements'
const URL = require("../../components/server");

const deviceWidth = Dimensions.get ('window').width - 20;
const deviceHeight = Dimensions.get ('window').height;

let leftAxis = [2, 4, 6, 8, 10, 12,14, 16 ,18, 20, 22, 24,];
let bottomAxisData = [2, 4, 6, 8, 10, 12,14, 16 ,18, 20, 22, 24,];
let legendColor = ['#0000FF', 'green', '#FFBF00'];
let legendText = ['Early','OnTime', 'Late'];
let minX = 0, maxX = 24;
let minY = 0, maxY = 24;

//since there are only two lines
var Color = ['#0000FF', 'green', '#FFBF00'];
//general data to represent ticks in y-axis and it doesn't take part in calculation
let bottomAxisDataToShow = [2, 4, 6, 8, 10, 12,14, 16 ,18, 20, 22, 24,];
let leftAxisDataToShow = [2, 4, 6, 8, 10, 12,14, 16 ,18, 20, 22, 24,];
//general data to represent ticks in y-axis and it doesn't take part in calculation


export default class RoutePerfomanceArivall extends Component{

  
      constructor(props) {
        super(props);
        this.state = {
          loading: true,
          status: false,
          data: [],
          search: '',
          transaction_id:'',
          selectedStartDate: null,
          fromdate:"2019-05-29",
          todate:"2019-06-11",
          today:"",
          airline: "",
          rout:"",
          airlinename: "",
          route:"",
        };
        this.onDateChange = this.onDateChange.bind(this);
    
       this.arrayholder = [];

       
    
      }      
       
        
        //since there are only two lines
       
        onDateChange(date) {
        console.warn(date);

          this.setState({
            selectedStartDate: date,
          });
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
      airlinename: this.props.navigation.getParam("airlinename", "defaultValue"),
  route:this.props.navigation.getParam("route", "defaultValue"),
  airline:this.props.navigation.getParam("airline", "defaultValue"),
  rout:this.props.navigation.getParam("rout", "defaultValue")
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
            const {auth, airline, rout, fromdate, today,todate} = this.state
        this.setState({ loading: true });
        fetch(URL.url+'/api/graph', { method: 'POST',  headers: {
          Accept: 'application/json',
          'Authorization': 'Bearer ' + auth,
          'Content-Type': 'application/json',
        },body: JSON.stringify({
             airline_code: airline,
             route_id:rout,
             type:"day",
             from: today,
             to: today,
            }), 
          
          })
              .then(res => res.json())
              .then(res => {
                this.setState({
                  loading: false,
                  status: res.status,
                  data: res.data.departure,
                  
                });
                this.arrayholder = res.data;
              })
              .catch(error => {
                this.setState({ error, loading: false });
              });
  };



  RemakeRemoteRequest = () => {
     const {auth, airline, rout,fromdate, todate} = this.state
      this.setState({ loading: true });
      fetch(URL.url+'/api/graph', { method: 'POST',  headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth,
        'Content-Type': 'application/json',
      },body: JSON.stringify({
          airline_code: airline,
          route_id:rout,
          type:"day",
          from: fromdate,
          to: todate,
          }), 
        
        })
      .then(res => res.json())
      .then(res => {
        this.setState({
          loading: false,
          status: res.status,
          data: res.data.departure,
          
        });
        this.arrayholder = res.data;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
};

  startFilter = () => {
    const {fromdate, todate, auth} = this.state
    if(fromdate == "" || todate == "" ){
    alert('Select start and end date')
      return
    }
    var diff =  Math.floor(( Date.parse(todate) - Date.parse(fromdate) ) / 86400000); 
       if(diff > 7){
         alert("Select Interval of Seven (7) days")
         return
       }else{
        this.RemakeRemoteRequest();
       }
    
  };

  //
 
  
  //

  render() {
    const {data} = this.state;

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
          <Text style={{color:"#fff", fontWeight: '900',  fontSize:16,}}>Perfomance Details</Text>
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
                                      <Text style={{fontSize: 12, fontWeight: '200',  color: '#7892FB',}}>Airline</Text>
                                      <Text style={{marginTop:7, fontSize: 18, fontWeight: '600',  color: '#5b97dc',}}>{this.state.airlinename}</Text>
                                      </View>

                              </View>
                          </View>
             
                          <Text style={{margin:10, fontSize: 20, fontWeight: '300',  color: '#000',}}>Trend Performance</Text>
                          <TouchableOpacity style={styles.listItemWhite }  >
                                        <Text style={{margin:10, fontSize: 18, fontWeight: '600',  color: '#5b97dc',}}>{this.state.route} (Arivall) </Text>
                         </TouchableOpacity>


<Text style={{fontSize: 12,  margin:10, fontWeight: '200',  color: '#7892FB',}}>Filter</Text> 
 <View style = {styles.headerform}>
             
 <DatePicker
        style={{width: 120}}
        date={this.state.fromdate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2019-05-01"
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
          

 <Text style={{fontSize: 12,   margin:10,fontWeight: '600',  color: '#000',}}>TO</Text> 
            <DatePicker
        style={{width: 120}}
        date={this.state.todate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2019-05-01"
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
        onDateChange={(date) => {this.setState({todate: date})}}
      />



      <TouchableOpacity style={styles.circle } onPress={() => this.startFilter()} >

<Icon
  name="bars"
  style={{marginRight:10}} name="search" size={20}
  type="font-awesome"
  color="#000"
  />
</TouchableOpacity>
       </View>









             </View>

                <View style = {styles.submaintwo}>
                <View>
                <Text style={{fontSize: 12, fontWeight: '200',  color: '#7892FB',}}>Actual</Text> 
                </View>
              

                <MultiLineChart
                style={{ alignItems: 'center',}}
          data={data}
          leftAxisData={leftAxis}
          bottomAxisData={bottomAxisData}
          legendColor={legendColor}
          legendText={legendText}
          minX={minX}
          maxX={maxX}
          minY={minY}
          maxY={maxY}
          scatterPlotEnable={false}
          dataPointsVisible={true}
          Color={Color}
          legendStyle ={{
            width: 10,
            fillOpacity: 0.5,
            height: 10,
            legendFontSize: 10,
            legentTextFill: 'black',
          }}
          bottomAxisDataToShow={bottomAxisDataToShow}
          leftAxisDataToShow= {leftAxisDataToShow}
          circleLegendType={false}
          fillArea={true}
          yAxisGrid={false}
          xAxisGrid={false}
          hideXAxis={false}
          hideYAxis={false}
          inclindTick={false}
          pointDataToShowOnGraph=""
          animation={true}
          duration={1500}
          delay={1000}
          GraphHeight={230}
          GraphWidth={deviceWidth}
          chartWidth={deviceWidth - 40}
          chartHeight={210}
          staggerLength={220}
          speed={50}
        /> 
        <Text style={{ marginLeft:10, fontSize: 12, fontWeight: '200',  color: '#000'}}>Schedule Time ()</Text> 
               
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

  submaintwo: {
    flex: 2,
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
      padding:9,
      
    },
    listItemBlack: {
      backgroundColor: '#fff',
      padding:9,
    },
    headerform:{
      height:40,
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:10,
      marginRight:15,
      marginLeft:15, 
       marginTop:10,
    },
    circle: {
     width: 40,
     height: 40,
     backgroundColor: '#7892FB',
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

