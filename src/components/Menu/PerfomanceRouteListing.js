
import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage,FlatList, StyleSheet, Text, View,TouchableOpacity, Image, TextInput} from 'react-native';
const URL = require("../../components/server");
import DatePicker from 'react-native-datepicker'
import { Card, Icon,SocialIcon} from 'react-native-elements'

export default class PerfomanceRouteListing extends Component{
  
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
      today:""
    };

   this.arrayholder = [];

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
const {auth, today} = this.state
this.setState({ loading: true });
fetch(URL.url+'/api/performanceAggregation', { method: 'POST',  headers: {
  Accept: 'application/json',
  'Authorization': 'Bearer ' + auth,
  'Content-Type': 'application/json',
 },body: JSON.stringify({
  from: today,
  to: today,
}), 
 })

  .then(res => res.json())
  .then(res => {
    console.log(res)
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

RemakeRemoteRequest = () => {
  const {auth, fromdate, todate} = this.state
  this.setState({ loading: true });
  fetch(URL.url+'/api/performanceAggregation', { method: 'POST',  headers: {
    Accept: 'application/json',
    'Authorization': 'Bearer ' + auth,
    'Content-Type': 'application/json',
   },body: JSON.stringify({
    from: fromdate,
    to: todate,
  }), 
   })
  
    .then(res => res.json())
    .then(res => {
      console.log(res)
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
      const itemData = `${item.flight.toUpperCase()} ${item.route.toUpperCase()}`;

      const textData = search.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  
  renderHeader = () => {
    return (
      <View>

         
      <TextInput
        style = {styles.input}
        placeholder="Search..."
        placeholderTextColor= '#4286f4'
        round
        value={this.state.search}
        onChangeText={this.searchFilterFunction}
      />
   

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
                              <Image
                            style={styles.image}
                            resizeMode='contain'
                            source={require('../../images/sn.png')}/>



                            <View style = {styles.menudetailsTopchild}>
                            <Text style={{fontSize: 10, fontWeight: '200',  color: '#7892FB',}}>Airline</Text>
                                <Text style={{marginTop:7, fontSize: 15, fontWeight: '500',  color: '#7892FB',}}>{item.flight}</Text>
                                            
                                    </View>
                    


                             <View style = {styles.menudetailsTopchild}>
                                    <Text style={{fontSize: 10, fontWeight: '200',  color: '#7892FB',}}>Route</Text>
                                    <Text style={{marginTop:7, fontSize: 15, fontWeight: '500',  color: '#000',}}>{item.route}</Text>
                                    </View>
                    
                    
                        </View>
                        <Text style={{fontSize: 10, fontWeight: '800',  color: '#000',}}>Departure</Text>

                    <View style = {styles.menudetailsBottom}> 
                   

                    <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#7892FB',}}>Early </Text>
                        <Text style={{marginTop:7, fontSize: 14, fontWeight: '500',  color: '#7892FB',}}>{item.percentageEarlyDepartures}%</Text>
                        </View>
                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#7892FB',}}>On Time</Text>
                        <Text style={{marginTop:7, fontSize: 14, fontWeight: '500',  color: '#7892FB',}}>{item.percentageOnTimeDepartures}%</Text>
                        </View>
                          

                           <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#7892FB',}}>Late</Text>
                        <Text style={{marginTop:7, fontSize: 14, fontWeight: '500',  color: '#7892FB',}}>{item.percentageDelayedDepartures}%</Text>
                        </View>
                    
                    <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#7892FB',}}>Cancellation</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#7892FB',}}>{item.percentageCancellations}%</Text>
                        </View>

                        <View style = {styles.menudetailsTopchild}>
                        <TouchableOpacity style={styles.buttonContainer} 
                         
                    onPress={() => this.props.navigation.navigate('RoutePerfomanceDeparture', 
                    {
                      airline: item.airlineId,
                      rout:item.routeId,
                      airlinename: item.flight,
                      route:item.route,
                    })
                    
                    }>
                    <Text style={styles.buttonText}>Graph</Text>

                </TouchableOpacity>
                         </View>

                
                    </View>



                       <Text style={{fontSize: 10, fontWeight: '800',  color: '#000',}}>Arrival</Text>

                       <View style = {styles.menudetailsBottom}> 
                       <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#7892FB',}}>Early</Text>
                        <Text style={{marginTop:7, fontSize: 14, fontWeight: '500',  color: '#7892FB',}}>{item.percentageEarlyArrival}%</Text>
                        </View>
                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#7892FB',}}>On Time</Text>
                        <Text style={{marginTop:7, fontSize: 14, fontWeight: '500',  color: '#7892FB',}}>{item.percentageOnTimeArrivals}%</Text>
                        </View>

                       

                    
                    <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#7892FB',}}>Late</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#7892FB',}}>{item.percentageDelayedArrivals}%</Text>
                        </View>
                        <View style = {styles.menudetailsTopchild}>
                       </View>

                    <View style = {styles.menudetailsTopchild}>
                    <TouchableOpacity style={styles.buttonContainer}
                    
                    onPress={() => this.props.navigation.navigate('RoutePerfomanceArivall', 
                    {
                      airline: item.airlineId,
                      rout:item.routeId,
                      airlinename: item.flight,
                      route:item.route,
                    })
                    
                    }
                    >
                        <Text style={styles.buttonText}>Graph</Text>

            </TouchableOpacity>
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
          <Text style={{color:"#fff", fontWeight: '900',  fontSize:16,}}>Performance</Text>
        </View>
             <View style = {styles.main}>

          <FlatList
                style={{paddingBottom:10}}
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.description}
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
    backgroundColor: '#7892FB',
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
    color: '#7892FB',
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
        backgroundColor: "#7892FB",
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
