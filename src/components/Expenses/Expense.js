import React, {Component} from 'react';
import {ActivityIndicator, Animated, AsyncStorage, TextInput, StyleSheet, Text, View,Alert, Dimensions, TouchableOpacity} from 'react-native';  
import { Pie } from 'react-native-pathjs-charts'
import { MaterialDialog } from 'react-native-material-dialog';

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';


const URL = require("../../components/server");
export default class Expense extends Component{
      
      constructor(props) {
        super(props);
        
        this.state = {
          loading: true,
          status: false,
          data:[],
          search: '',
          auth:"",
          visible: false,
          ammount:'',
          name:'',
          progressStatus: 0,  
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

     newExpense()
     {
      this.setState({visible: false})
           const {name, ammount, auth} = this.state
            if(name == "" || ammount == ""){
               Alert.alert('Process failed', 'Select a statuse', [{text: 'Okay'}])
               return
             }
           this.setState({loading: true})
           fetch(URL.url+'/api/expense/create', { method: 'POST',  headers: {
             Accept: 'application/json',
             'Authorization': 'Bearer ' + auth,
             'Content-Type': 'application/json',
           }, body: JSON.stringify({
             name: name,
             budget:ammount
           }), 
          })
           .then(res => res.json())
           .then(res => {
   
             if(res.status){ 
             this.setState({ loading: false})
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




   makeRemoteRequest = () => {
    const {auth, e_id} = this.state

    this.setState({ loading: true });
    fetch(URL.url+'/api/expense/'+1 , { method: 'GET',  headers: {
      Accept: 'application/json',
      'Authorization': 'Bearer ' + auth,
      'Content-Type': 'application/json',
     }
     })

      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.pie_data,
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

///


  render() {
    
    let options = {
      width: 300,
      height: 300,
      color: '#2980B9',
      r: 50,
      R: 50,
      legendPosition: 'topLeft',
      animate: {
        enabled: false,
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        color: '#ECF0F1'
      }
    }

    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  backgroundColor: '#a8bbf3', }}>
            <PacmanIndicator color='white' />
            <Text style={{ color: '#fff' }}>Processing</Text>
        </View>
      );
    }

    return (
       
      <View style = {styles.container}>
        <View style={{alignItems: 'center', justifyContent: 'center',paddingTop:8, paddingBottom:10, color:"#fff", fontWeight: '900',  fontSize:13,}}>
          <Text style={{color:"#fff", fontWeight: '900',  fontSize:16,}}>Expenses</Text>
        </View>
          <View style = {styles.main}>
            
            <View style = {styles.submain}>
             
                  <TouchableOpacity style={styles.buttonContainer} 
                    onPress={ () => this.setState({visible:true})}>
                    <Text style={styles.buttonText} >Start Expense</Text>
                </TouchableOpacity>
            </View>


             <View style = {styles.submaintwo}>
                  <Pie data={this.state.data}
                    options={options}
                    accessorKey="amount"
                    color="#2980B9"
                    r={20}
                    R={120}
                    legendPosition="topLeft"
                    label={{
                      fontFamily: 'Arial',
                      fontSize: 12,
                      fontWeight: true,
                      color: '#ECF0F1'
                    }}
                  />

              </View>


                <View style = {styles.submain}>
             
                  <TouchableOpacity  style = {{width:200}} >


                   
                  </TouchableOpacity>
            </View>


   <View style = {styles.headerform}>
             
             <TouchableOpacity style={{ height:40,width:150, backgroundColor: "#42f4a7", justifyContent: 'center',borderRadius: 10, margin:5,}} 
              onPress={() => this.props.navigation.navigate('AddBudget')}>
               <Text style={styles.buttonText} >Add Expense</Text>
           </TouchableOpacity>   
           <TouchableOpacity style={{ height:40,width:150, backgroundColor: "#b042f4", justifyContent: 'center',borderRadius: 10, margin:5,}}
             onPress={() => this.props.navigation.navigate('ExpensesSum')}> 
               <Text style={styles.buttonText} > Expense Achirve</Text>
           </TouchableOpacity> 
       </View>



               <View style = {styles.submain}>
             
               <TouchableOpacity style={{ height:40,width:150, backgroundColor: "#f44242", justifyContent: 'center',borderRadius: 10, margin:5,}}
                 onPress={() => this.props.navigation.navigate('Expense')} >
               <Text style={styles.buttonText} > End Expense</Text>
           </TouchableOpacity> 
       </View>
                
          </View>
          <MaterialDialog
            title="Expense and Budget"
            visible={this.state.visible}
            onOk={() => this.newExpense()}
            onCancel={() => this.setState({ visible: false })}>
              <View>
             <TextInput
                        style = {styles.input}
                        placeholder="Enter name"
                        placeholderTextColor= '#000'
                        round
                        onChangeText = {text => this.setState({name: text})}
                        />
                         <TextInput
                        style = {styles.input}
                        placeholder="Budget"
                        keyboardType = "numeric"
                        placeholderTextColor= '#000'
                        round
                        onChangeText = {text => this.setState({ammount: text})}
                        />
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
    backgroundColor: '#a8bbf3',
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

  headerform:{
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
    paddingTop:14,
    paddingBottom:14,
    borderRadius: 20,
    marginBottom:20,
    marginLeft:10,
    marginRight:10,
    backgroundColor: '#fff',
  },
  submain: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  submainone: {
    flex: 1,
  },

  submaintwo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submaintwoson: {
    flex: 1,
    height: 100,
    width:100
  },
  submainthree: {
    flex: 1,
    alignItems: 'center',
  },
  search: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  input:{
    height:50,
    backgroundColor: '#eff3fd',
    marginBottom:15,
    color: '#000',
    paddingHorizontal: 40,
    borderRadius: 25,
    marginLeft:40,
    marginRight:40,
    textAlign: 'center',
    fontWeight: '700',
    
    },
    inputpicker:{
      height: 50,
       width: 100,
      
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
    buttonContainer:{
      height:40,
      width:150,
      backgroundColor: "#AFC1F2",
      justifyContent: 'center',
      borderRadius: 10,
      marginBottom:10,
    },
    buttonText:{
      textAlign:'center',
      color: "#FFFFFF",
      fontWeight: '500',
      fontSize:13,
    },


    inner:{  
      width: "100%",  
      height: 30,  
      borderRadius: 15,  
      backgroundColor:"green",  
    },  
    label:{  
      fontSize:23,  
      color: "black",  
      position: "absolute",  
      zIndex: 1,  
      alignSelf: "center",  
    }  
    
});

