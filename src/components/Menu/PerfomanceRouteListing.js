
import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage,FlatList, Alert, Platform, StyleSheet, Text, View,TouchableOpacity, Image, TextInput} from 'react-native';
const URL = require("../../components/server");
import DatePicker from 'react-native-datepicker'
import { Card, Icon,SocialIcon} from 'react-native-elements'
import { MaterialDialog } from 'react-native-material-dialog';
import RadioGroup from 'react-native-radio-buttons-group';

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
      today:"",
      dur:"",
      visible: false,
      dated: [
         {
            label: '1 week',
            size: 30,
            value: "1",
            color: 'green',
        },
        {
          label: '2 Weeks',
          size: 30,
          value: "2",
          color: 'green',
      },
      {
        label: '1 Month',
        size: 30,
        value: "4",
        color: 'green',
    },
    ],
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
    },
    body: JSON.stringify({
      from: today,
      to: today,
    }), 
    })

      .then(res => res.json())
      .then(res => {
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

RemakeRemoteRequest = (fromdate, todate) => {
  const {auth} = this.state

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


  weekfilter()
  {

         this.setState({visible: false})
        const {auth} = this.state
        let selectedButton = this.state.dated.find(e => e.selected == true);
        selectedButton = selectedButton ? selectedButton.value : this.state.dated[0].label;
        var dateFormat = require('dateformat');
        var firstDay = new Date();
        var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000 * selectedButton);
        var fromdate = dateFormat(firstDay, "yyyy-mm-dd")
        var todate = dateFormat(nextWeek, "yyyy-mm-dd")


        this.RemakeRemoteRequest(fromdate, todate);

       
}


  startFilter = () => {
    const {fromdate, todate} = this.state
    if(fromdate == "" || todate == "" ){
    alert('Select start and end date')
      return
    }
    var diff =  Math.floor(( Date.parse(todate) - Date.parse(fromdate) ) / 86400000); 
       if(diff > 7){
         alert("Select Interval of Seven (7) days")
         return
       }else{
        this.RemakeRemoteRequest(fromdate, todate,);
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
   
   <View>
   <View style = {styles.headerform}>
             
            
                
      
      
      
          <TouchableOpacity style={styles.buttonContainerone} 
                  onPress={() => this.props.navigation.navigate('Criteria')}>
                    <Text style={styles.buttonText}
                   >Compare Airline</Text>
                    
                </TouchableOpacity>
      
        <TouchableOpacity style={styles.circle }   onPress={ () => this.setState({visible:true})} >
      
          <Icon
            name="bars"
            style={{marginRight:10}} name="calendar" size={20}
            type="font-awesome"
            color="#fff"
            />
      </TouchableOpacity>
      
      
                </View>
      

      <View style = {styles.headerform}>
             
       <DatePicker
        style={{width: 120}}
        date={this.state.fromdate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2019-08-10"
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
          

        <Text style={{fontSize: 12, margin:10,fontWeight: '600',  color: '#000',}}>TO</Text> 
            <DatePicker
        style={{width: 120}}
        date={this.state.todate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2019-08-10"
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
  color="#fff"
  />
</TouchableOpacity>

       </View>

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
                            <Text style={{fontSize: 10, fontWeight: '200',  color: URL.bgcolor,}}>Airline</Text>
                                <Text style={{marginTop:7, fontSize: 15, fontWeight: '500',  color: URL.bgcolor,}}>{item.flight}</Text>
                                            
                                    </View>
                    


                             <View style = {styles.menudetailsTopchild}>
                                    <Text style={{fontSize: 10, fontWeight: '200',  color: URL.bgcolor,}}>Route</Text>
                                    <Text style={{marginTop:7, fontSize: 15, fontWeight: '500',  color: '#000',}}>{item.route}</Text>
                                    </View>
                    
                    
                        </View>
                        <Text style={{fontSize: 10, fontWeight: '800',  color: '#000',}}>Departure</Text>

                    <View style = {styles.menudetailsBottom}> 
                   

                    <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: URL.bgcolor,}}>Early </Text>
                        <Text style={{marginTop:7, fontSize: 14, fontWeight: '500',  color: URL.bgcolor,}}>{item.percentageEarlyDepartures.toFixed(1)}%</Text>
                        </View>
                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: URL.bgcolor,}}>On Time</Text>
                        <Text style={{marginTop:7, fontSize: 14, fontWeight: '500',  color: URL.bgcolor,}}>{item.percentageOnTimeDepartures.toFixed(1)}%</Text>
                        </View>
                          

                           <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: URL.bgcolor,}}>Late</Text>
                        <Text style={{marginTop:7, fontSize: 14, fontWeight: '500',  color: URL.bgcolor,}}>{item.percentageDelayedDepartures.toFixed(1)}%</Text>
                        </View>
                    
                    <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: URL.bgcolor,}}>Cancellation</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: URL.bgcolor,}}>{item.percentageCancellations.toFixed(1)}%</Text>
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
                        <Text style={{fontSize: 10, fontWeight: '200',  color: URL.bgcolor,}}>Early</Text>
                        <Text style={{marginTop:7, fontSize: 14, fontWeight: '500',  color: URL.bgcolor,}}>{item.percentageEarlyArrival.toFixed(1)}%</Text>
                        </View>
                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: URL.bgcolor,}}>On Time</Text>
                        <Text style={{marginTop:7, fontSize: 14, fontWeight: '500',  color: URL.bgcolor,}}>{item.percentageOnTimeArrivals.toFixed(1)}%</Text>
                        </View>

                       

                    
                    <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: URL.bgcolor,}}>Late</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: URL.bgcolor,}}>{item.percentageDelayedArrivals.toFixed(1)}%</Text>
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

        onPress = dated => this.setState({ dated });

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
           <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',paddingTop:8, paddingBottom:10, color:"#fff", fontWeight: '900',  fontSize:13,}}>
           <TouchableOpacity onPress={() =>this.props.navigation.goBack() } style={{ marginLeft: 10 }}>
          <Icon
              name="angle-left"
              size={30}
              type='font-awesome'
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={{ color: "#fff", fontWeight: '900', fontSize: 16, flex:1, textAlign:'center' }}>Performance</Text>
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


              <MaterialDialog
            title="Select Duration"
            visible={this.state.visible}
            onOk={() => this.weekfilter()}
            onCancel={() => this.setState({ visible: false })}>
              <View style={{justifyContent: 'flex-end', alignItems: 'flex-start',}}>
                <RadioGroup radioButtons={this.state.dated} onPress={this.onPress} />
            
                        </View>
            </MaterialDialog>
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
    buttonContainerone:{
      height:40,
      width:150,
      marginBottom:10,
      backgroundColor: URL.bgcolor,
      justifyContent: 'center',
      borderRadius: 10,
      margin:10,
    },
});
