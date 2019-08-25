
import React, {Component} from 'react';
import {ActivityIndicator,Platform, TouchableOpacity, Alert, FlatList, StyleSheet, Text, View,AsyncStorage, Image, TextInput} from 'react-native';
import { List, ListItem, SearchBar} from 'react-native-elements';
const URL = require("../../components/server");
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialDialog } from 'react-native-material-dialog';
export default class Reciept extends Component{

      
      constructor(props) {
        super(props);
    
        this.state = {
          loading: true,
          status: false,
          data: [],
          search: '',
          email:'',
          name:'',
          auth:"",
          e_id:"",
          visible:false
        };
    
       this.arrayholder = [];
  
      }      

       
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  componentDidMount() {
    this.setState({
      e_id:this.props.navigation.getParam("e_id", "defaultValue"),
      name:this.props.navigation.getParam("name", "defaultValue")
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
    const {auth, e_id} = this.state

    this.setState({ loading: true });
    fetch(URL.url+'/api/expense/'+e_id , { method: 'GET',  headers: {
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
        this.arrayholder = res.data;
      })
      .catch(error => {
        alert(error.message);
          this.setState({ loading: false})
      }); 
  };

   
  newExpense()
  {

   this.setState({visible: false})
        const {auth,email, e_id} = this.state
     
         if(email == ""){
            Alert.alert('Process failed', 'Select a statuse', [{text: 'Okay'}])
            return
          }
        this.setState({loading: true})
        fetch(URL.url+'/api/expense/send_expense', { method: 'POST',  headers: {
          Accept: 'application/json',
          'Authorization': 'Bearer ' + auth,
          'Content-Type': 'application/json',
        }, body: JSON.stringify({
          email: email,
          expense_id:e_id,
        }), 
       })
        .then(res => res.json())
        .then(res => {

          if(res.status){ 
        
          this.setState({ 
            loading: false,
           })
          Alert.alert('Operation Successful', res.message, [{text: 'Okay'}])
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
      const itemData = `${item.category.toUpperCase()} ${item.description.toUpperCase()}`;

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
        style = {styles.inputsearch}
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
                        <Text style={{fontSize: 12, fontWeight: '200',  color: URL.bgcolor,}}>Name</Text>
                        <Text style={{marginTop:7, fontSize: 15, fontWeight: '500',  color: '#000',}}>{this.state.name}</Text>
                        </View>
                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 12, fontWeight: '200',  color: URL.bgcolor,}}>Category</Text>
                        <Text style={{marginTop:7, fontSize: 15, fontWeight: '500',  color: '#000',}}>{item.category}</Text>
                        </View>
                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 12, fontWeight: '200',  color: URL.bgcolor,}}>Amount Spent</Text>
                        <Text style={{marginTop:7, fontSize: 14, fontWeight: '500',  color: '#000',}}>{item.currency+" "+ item.amount}</Text>
                        </View>
                  
                            
                    </View>
                    <View style = {styles.menudetailsBottom}> 
                
                    <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 12, fontWeight: '200',  color: URL.bgcolor,}}>Description</Text>
                        <Text style={{marginTop:7, fontSize: 14, fontWeight: '300',  color: '#000',}}>{item.description}</Text>
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
          <Text>Loading...</Text>
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
          <Text style={{color:"#fff", fontWeight: '900',  fontSize:16,}}>Expense Details</Text>
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
            

            <TouchableOpacity
                  onPress={ () => this.setState({visible:true})}
                  style={styles.TouchableOpacityStyle}>
                    <Icon
                    name="share-alt"
                    style={{marginRight:10}} name="share-alt" size={25}
                    type="font-awesome"
                    color="#fff"
                    />
                  </TouchableOpacity>


                    <MaterialDialog
                        title="Share expenses"
                        visible={this.state.visible}
                        onOk={() => this.newExpense()}
                        onCancel={() => this.setState({ visible: false })}>
                          <View>
                        <TextInput
                        style = {styles.input}
                        placeholder="email"
                        placeholderTextColor= '#000'
                        round
                        onChangeText = {text => this.setState({email: text})}
                        />
                          <View style= {{flexDirection: "row", alignItems: 'center', justifyContent: 'center',marginBottom:4, marginLeft:10, marginRight:10,}}> 
                              </View>
                           </View>
                        </MaterialDialog>
    
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
    paddingTop:10,
    paddingBottom:14,
    borderRadius: 20,
    marginBottom:20,
    marginLeft:10,
    marginRight:10,
    backgroundColor: '#fff',
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    backgroundColor: URL.bgcolor,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    right: 30,
    bottom: 100,
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
    paddingHorizontal: 10,
    borderRadius: 20,
    marginLeft:5,
    marginRight:5,
    fontWeight: '200',
    
    },

    inputsearch:{
      height:40,
      backgroundColor: '#eff3fd',
      marginBottom:15,
      color: URL.bgcolor,
      paddingHorizontal: 40,
      borderRadius: 25,
      marginLeft:10,
      marginRight:10,
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
