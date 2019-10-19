
import React, {Component} from 'react';
import {ActivityIndicator, Alert, Platform, Easing, FlatList, Animated, StyleSheet, AsyncStorage, Text, View,TouchableOpacity, Image, TextInput} from 'react-native';
const URL = require("../../components/server");
export default class Boarding extends Component{

  constructor(props) {
    super(props);
    this.triggerAnimation = this.triggerAnimation.bind(this)
    this.animation = new Animated.Value(0)
    this.state = {
      loading: true,
      status: false,
      data: [],
      search: '',
      transaction_id:'',
      auth:"",
    };

   this.arrayholder = [];

  }    

  triggerAnimation(){
this.animation.setValue(0);
Animated.timing(this.animation, {
  duration:2000,
  toValue: 3,
  ease:Easing.bounce,
}).start();
  }
   
componentWillUnmount() {
  this.animation = new Animated.Value(0)
}
componentDidMount() {

AsyncStorage.getItem('auth').then((value) => this.setState({ 'auth': value.toString()}))
AsyncStorage.getItem('auth').then((value) => {
  if(value==''){
   
  }else{
    this.setState({auth: value})
  }
  this.makeRemoteRequest();
})


this.props.navigation.addListener(
  'didFocus',
  payload => {
   this.makeRemoteRequest();
  }
);

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
        if(!res.data){
          Alert.alert('Operation failed', res.message, [{text: 'Okay'}])
      }
        this.setState({
          data: res.data,
          loading: false,
          status: res.status,
          
          
        });
        this.triggerAnimation();
        this.arrayholder = res.data;
      })
      .catch(error => {
        alert(error.message);
          this.setState({ loading: false})
      }); 
};
checkAlert = () => {
  alert("You Are already subscribe to this Schedule");
}


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
      const itemData = `${item.name.toUpperCase()} ${item.departure_port.toUpperCase()} ${item.departure_port_name.toUpperCase()}${item.arrival_port.toUpperCase()} ${item.arrival_port_name.toUpperCase()}`;


      const textData = search.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
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

  
  renderHeader = () => {
    return (
      
      <TextInput
        style = {styles.input}
        placeholder="Type Here..."
        placeholderTextColor= '#4286f4'
        round
        value={this.state.search}
        onChangeText={this.searchFilterFunction}
      />
    );
  };
  renderItem=({ item , index}) => 
  { 
    const interpolated = this.animation.interpolate({
      inputRange: [0, .5, 1, 1.5, 2, 2.5, 3],
      outputRange: [0, -15, 0 , 15 , 0, -15, 0]
    })

    const style={
     transform:[
      { translateX: interpolated }
    ]
  }



    return (
    <View style={
        index % 2 == 0 ? styles.listItemWhite : styles.listItemBlack
      }  onPress={() => this.props.navigation.navigate('Perfomance')}>
           
           <View style = {styles.submain}

           >

                    <TouchableOpacity  style={styles.image}
                    onPress={ 
                      item.isSubscribed == false ?  () => this.props.navigation.navigate('Checkout', 
                    {
                      s_id: item.id,
                    
                    }) : () => this.checkAlert()
                     }
                    >

                        <Text style={{fontSize: 10, fontWeight: '200',  color: URL.bgcolor, marginBottom:10}}>Alert Me</Text>
                      
                     
                            <Animated.Image
                            style={style}
                            source={ item.isSubscribed == false ? require('../../images/inactivebell.png') : require('../../images/activeball.png')   }
                            resizeMode='contain'
                            
                              />
                     
                       </TouchableOpacity>
               

                    <View style = {styles.details} >
                        <View style = {styles.menudetailsTop}>
                
                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 12, fontWeight: '200',  color: URL.bgcolor,}}>Airline</Text>
                        <Text style={{marginTop:7, fontSize: 13, fontWeight: '500',  color: '#000',}}>{item.name}</Text>
                        </View>

                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 12, fontWeight: '200',  color: URL.bgcolor,}}>Flight No</Text>
                        <Text style={{marginTop:7, fontSize: 13, fontWeight: '500',  color: URL.bgcolor,}}>{item.description }</Text>
                        </View>
                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 12, fontWeight: '200',  color: URL.bgcolor,}}>Depature</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>{item.scheduled_departure_time.substring(0, 5)}</Text>
                        </View>

                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 12, fontWeight: '200',  color: URL.bgcolor,}}>Arival</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>{item.scheduled_arrival_time.substring(0, 5)}</Text>
                        </View>
                    
                
                    </View>
                    <View style = {styles.menudetailsBottom}> 
                

                       
                       <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 12, fontWeight: '200',  color: URL.bgcolor,}}>Route</Text>
                        <Text style={{marginTop:7, fontSize: 15, fontWeight: '500',  color: URL.bgcolor,}}>{item.departure_port + " - " + item.arrival_port}</Text>
                        </View>

                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 12, fontWeight: '200',  color: URL.bgcolor,}}>Date</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>{item.scheduled_arrival_date}</Text>
                        </View>
                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: URL.bgcolor,}}>Status</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>{this.renderStatusSwitch(item.status)}</Text>
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
          <Text style={{color:"#fff", fontWeight: '900',  fontSize:16,}}>Boarding Alert</Text>
        </View>
             <View style = {styles.main}>

          <FlatList
                style={{paddingBottom:10}}
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.description+item.id}
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
  },
  menudetailsTopchild:{
    flex: 1,
  },
  menudetailsBottom:{
    flexDirection: "row",
    flex: 1,
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
        flex: 2,
        margin:5,
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
     }
});
