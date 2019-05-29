import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View,Image, Dimensions, TouchableOpacity} from 'react-native';
import { MultiLineChart } from 'react-native-d3multiline-chart';
   
const deviceWidth = Dimensions.get ('window').width - 20;
const deviceHeight = Dimensions.get ('window').height;
var dat = [
  [
    {
      y: 0,
      x: 0,
    },
    {
      y: 0,
      x: 2,
    },
    {
      y: 4,
      x: 4,
    },
    {
      y: 10,
      x: 6,
    },
    
    
  ],
  

  [{
    y: 0,
    x: 0,
  },
    {
      y: 4,
      x: 8,
    },
    {
      y: 6,
      x: 10,
    },
    {
      y: 10,
      x: 12,
    },
    
    
  ],


  [

    {
      y: 0,
      x: 0,
    },
    {
      y: 8,
      x: 8,
    },
    {
      y: 6,
      x: 10,
    },
    {
      y: 10,
      x: 12,
    },
    
    
  ],


  [

    {
      y: 0,
      x: 0,
    },
    {
      y: 0,
      x: 4,
    },
    {
      y: 0,
      x: 10,
    },
    {
      y: 0,
      x: 12,
    },
    
    
  ],


];

let leftAxis = [2, 4, 6, 8, 10, 12,];
let bottomAxisData = [2, 4, 6, 8, 10, 12,];
let legendColor = ['#0000FF', 'green', '#FFBF00', 'red'];
let legendText = ['Early','OnTime', 'Late', 'cancellation'];
let minX = 0, maxX = 12;
let minY = 0, maxY = 12;

//since there are only two lines
var Color = ['#0000FF', 'green', '#FFBF00', 'red'];
//general data to represent ticks in y-axis and it doesn't take part in calculation
let bottomAxisDataToShow = [2, 4, 6, 8, 10, 12,14,16];
let leftAxisDataToShow = [2, 4, 6, 8, 10, 12, 14, 16];
//general data to represent ticks in y-axis and it doesn't take part in calculation


export default class RoutePerfomanceDeparture extends Component{

  
      constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          status: false,
          data: dat,
          search: '',
          transaction_id:'',
        };
    
       this.arrayholder = [];

       
    
      }      
       
        
        //since there are only two lines
       
         
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  componentDidMount() {
    this.makeRemoteRequest();
     }

  makeRemoteRequest = () => {
    const url = 'http://192.168.43.230/may/inde.php';
    this.setState({ loading: false });

    fetch(url, { method: 'GET',  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    } }
    
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          loading: false,
          status: res.status,
          
        });
        this.arrayholder = res.data;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
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
                                      <Text style={{fontSize: 12, fontWeight: '200',  color: '#AFC1F2',}}>Airline</Text>
                                      <Text style={{marginTop:7, fontSize: 18, fontWeight: '600',  color: '#5b97dc',}}>Arik Air</Text>
                                      </View>

                              </View>
                          </View>
             
                          <Text style={{margin:10, fontSize: 20, fontWeight: '300',  color: '#000',}}>Trend Performance</Text>
                          <TouchableOpacity style={styles.listItemWhite }  >
                                        <Text style={{margin:10, fontSize: 18, fontWeight: '600',  color: '#5b97dc',}}>LAG - ABD (Departure) </Text>
                         </TouchableOpacity>
             </View>

                <View style = {styles.submaintwo}>
                <View>
                <Text style={{fontSize: 12, fontWeight: '200',  color: '#AFC1F2',}}>Actual</Text> 
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
    
});

