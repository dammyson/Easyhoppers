
import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View,AsyncStorage, Image, TextInput} from 'react-native';
import { List, ListItem, SearchBar} from 'react-native-elements';
import { PacmanIndicator} from 'react-native-indicators';
import PickerModal from 'react-native-picker-modal-view';
const URL = require("../../components/server");



const list = [
	{Id: 1, Name: 'Food', Value: 'Food'},
	{Id: 2, Name: 'Hotel', Value: 'Hotel'},
	{Id: 3, Name: 'House Kepping', Value: 'House Kepping'},
	{Id: 4, Name: 'Parking', Value: 'Parking'}
]

export default class LiveUpdate extends Component{

      
      constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          status: false,
          data: [],
          search: '',
          transaction_id:'',
          auth:"",
        };
    
       this.arrayholder = [];
  
      }      

       
  componentWillUnmount() {
    clearTimeout(this.timeout);
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
      const itemData = `${item.name.toUpperCase()} ${item.departure_port.toUpperCase()} ${item.arrival_port.toUpperCase()}`;

      const textData = search.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  
  renderHeader = () => {
    return (
      <View style={{ flexDirection: "row",  justifyContent: 'center', alignItems: 'center', marginLeft:10, marginRight:10}} 
     >

     <View style={styles.searchcontainer}>
     <PickerModal
                    onSelected={(selected) => this.setState({cat: selected.Value})}
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
                    selectPlaceholderText={'LOVe'}
                    forceSelect={false}
                    autoSort={true}
                    style={styles.buttonContainer} 
	                	/>
     </View>


      


       <View style={styles.searchcontainer}>
     <PickerModal
                    onSelected={(selected) => this.setState({cat: selected.Value})}
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
                    forceSelect={false}
                    autoSort={true}
                    style={styles.buttonContainer} 
	                	/>
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


             <Image
               style={styles.image}
               resizeMode='contain'
               source={require('../../images/sn.png')}/>

                    <View style = {styles.details} >
                        <View style = {styles.menudetailsTop}>
                
                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#AFC1F2',}}>AirLine</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#AFC1F2',}}>{item.name}</Text>
                        </View>
                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#AFC1F2',}}>Flight Number</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#AFC1F2',}}>{item.description }</Text>
                        </View>

                    
                    <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#AFC1F2',}}>Depature</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>{item.scheduled_departure_time}</Text>
                        </View>

                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#AFC1F2',}}>Arival</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>{item.scheduled_arrival_time}</Text>
                        </View>
                
                    </View>
                    <View style = {styles.menudetailsBottom}> 
                
                    <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#AFC1F2',}}>Route</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>{item.departure_port + " - " + item.arrival_port }</Text>
                        </View>

                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 10, fontWeight: '200',  color: '#AFC1F2',}}>Status</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>{ item.status == 0 ? "On Time" :"djdjd"}</Text>
                        </View>

                         <View style = {styles.menudetailsTopchild}>
                        </View>

                        <View style = {styles.menudetailsTopchild}>
                       
                        <Image
                                
                                resizeMode='contain'
                                source={  item.status == 0 ? require('../../images/cancel.png') : item.sta == 1 ? require('../../images/inactivebell.png') : require('../../images/activeball.png')     } />
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  backgroundColor: '#a8bbf3', }}>
        <PacmanIndicator color='white' />
        <Text style={{ color: '#fff' }}>Processing</Text>
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
          <Text style={{color:"#fff", fontWeight: '900',  fontSize:16,}}>LiveUpdate</Text>
        </View>


             <View style = {styles.main}>

          <FlatList
                style={{paddingBottom:5}}
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
    backgroundColor: '#a8bbf3',
    paddingTop:10,
  },
  searchcontainer:{
    flex: 1,
   
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    paddingTop:10,
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
    color: '#a8bbf3',
    paddingHorizontal: 40,
    borderRadius: 25,
    marginLeft:40,
    marginRight:40,
    textAlign: 'center',
    fontWeight: '700',
    
    },
    image:{
        flex: 2,
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
     }
});
