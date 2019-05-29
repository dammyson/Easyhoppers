
import React, {Component} from 'react';
import {ActivityIndicator, TouchableOpacity, FlatList, StyleSheet, Text, View,AsyncStorage, Image, TextInput} from 'react-native';
import { List, ListItem, SearchBar} from 'react-native-elements';
const URL = require("../../components/server");

export default class ExpensesSum extends Component{

      
      constructor(props) {
        super(props);
    
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
    fetch(URL.url+'/api/expense', { method: 'GET',  headers: {
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
           
           <View style = {styles.submain} 
            >


             <Image
               style={styles.image}
               resizeMode='contain'
               source={require('../../images/ticket.png')}/>

                    <View style = {styles.details} >
                        <View style = {styles.menudetailsTop}>
                
                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 12, fontWeight: '200',  color: '#AFC1F2',}}>Name</Text>
                        <Text style={{marginTop:7, fontSize: 15, fontWeight: '500',  color: '#000',}}>{item.name}</Text>
                        </View>
                        <TouchableOpacity style={{ height:40,width:150, backgroundColor: "#AFC1F2", justifyContent: 'center',borderRadius: 10, margin:5,}} 
                                  onPress={() => this.props.navigation.navigate('Reciept', 
                                  {
                                    e_id: item.id,
                                    name:item.name,
                                  })
                                  
                                }
                                 >
                          <Text style={styles.buttonText} >More Details >> </Text>
                            </TouchableOpacity>  
                            
                    </View>
                    <View style = {styles.menudetailsBottom}> 
                
                    <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 12, fontWeight: '200',  color: '#AFC1F2',}}>Budget</Text>
                        <Text style={{marginTop:7, fontSize: 14, fontWeight: '500',  color: '#000',}}>{item.budget}</Text>
                        </View>

                          <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 12, fontWeight: '200',  color: '#AFC1F2',}}>Amount Spent</Text>
                        <Text style={{marginTop:7, fontSize: 14, fontWeight: '500',  color: '#000',}}>{item.amount_spent}</Text>
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
          <Text style={{color:"#fff", fontWeight: '900',  fontSize:16,}}>Expenses</Text>
        </View>


             <View style = {styles.main}>

          <FlatList
                style={{paddingBottom:5}}
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.name}
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
     },
     buttonText:{
      textAlign:'center',
      color: "#FFFFFF",
      fontWeight: '500',
      fontSize:13,
    },
     
});
