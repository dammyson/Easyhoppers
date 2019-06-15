import React, {Component} from 'react';
import {ActivityIndicator, Animated, AsyncStorage, TextInput, StyleSheet, Text, View,Alert, Dimensions, TouchableOpacity} from 'react-native';  
import { Pie } from 'react-native-pathjs-charts'
import { MaterialDialog } from 'react-native-material-dialog';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Card, Icon,SocialIcon} from 'react-native-elements'
import { PacmanIndicator,} from 'react-native-indicators';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

let ta = [{
  "name": "Empty",
  "population": 7694980
}]

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
          eid:'1',
          budget_data:""
        };
    
       this.arrayholder = [];
      }      

         
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  componentDidMount() {
    AsyncStorage.getItem('eid').then((value) => this.setState({'eid': value.toString()}))
    AsyncStorage.getItem('eid').then((value) => {
      if(value==''){
      }else{
        
        this.setState({eid: value})
       
      }
     
    })
   
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
              AsyncStorage.setItem('eid', res.expense_id.toString());
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


   endExpense()
   {
    this.setState({visible: false})
         const {eid, auth} = this.state
          if(eid == "" ){
             Alert.alert('Process failed', 'Select a statuse', [{text: 'Okay'}])
             return
           }
         this.setState({loading: true})
         fetch(URL.url+'/api/expense/close/'+eid, { method: 'GET',  headers: {
           Accept: 'application/json',
           'Authorization': 'Bearer ' + auth,
           'Content-Type': 'application/json',
         }
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

   _menu = null;
 
   setMenuRef = ref => {
     this._menu = ref;
   };
  
   hideMenu = () => {
     this._menu.hide();
   };
  
   showMenu = () => {
     this._menu.show();
   };


   makeRemoteRequest = () => {
    const {auth,eid, e_id} = this.state

    this.setState({ loading: true });
    fetch(URL.url+'/api/expense/'+eid , { method: 'GET',  headers: {
      Accept: 'application/json',
      'Authorization': 'Bearer ' + auth,
      'Content-Type': 'application/json',
     }
     })

      .then(res => res.json())
      .then(res => {
        if(res.status){
        this.setState({
          data: res.pie_data,
          loading: false,
          status: res.status,
          budget_data: res.budget_data[0],
        
        });
      }else{
        this.setState({
          loading: false,
          data:ta,
        
        });
      }
      })
      .catch(error => {
        alert(error.message);
          this.setState({ loading: false})
      }); 
  };

///


  render() {
    
    let options = {
      width: 350,
      height: 350,
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
        fontSize: 5,
        fontWeight: true,
        color: '#ECF0F1'
      }
    }

    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  backgroundColor: '#7892FB', }}>
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






 
 <View style = {styles.submain2}>

            <Menu
     ref={this.setMenuRef}
     button={<TouchableOpacity style={styles.circle } onPress={this.showMenu} >

     <Icon
       name="bars"
       style={{marginRight:10}} name="bars" size={20}
       type="font-awesome"
       color="#000"
       />
</TouchableOpacity>}
   >
     <MenuItem  onPress={() => this.props.navigation.navigate('AddBudget',
     
     {
      expense_id: this.state.expense_id,
    } 
     )}>Add Expense</MenuItem>
     <MenuDivider />
     <MenuItem onPress={() => this.props.navigation.navigate('ExpensesSum')}>Achirve</MenuItem>
   </Menu>
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
                      fontSize: 9,
                      fontWeight: true,
                      color: '#ECF0F1'
                    }}
                  />

                      <ProgressBarAnimated
            width={300}
            value={this.state.budget_data == "" ? 100 :this.state.budget_data.percentage}
            height={30}
            backgroundColorOnComplete="#6CC644"
          />
             
             <Text style={{color:"#6CC644", fontWeight: '900',  fontSize:16, marginBottom:20}}>{ this.state.budget_data == "" ? "Expens is Empty" : "N"+this.state.budget_data.budget +" / N"+ this.state.budget_data.amount_spent }</Text>


           </View>


                <View style = {styles.submain}>
             
            
            </View>




               <View style = {styles.submain}>
             
               <TouchableOpacity style={{ height:40,width:150, backgroundColor: "#f44242", justifyContent: 'center',borderRadius: 10, margin:5,}}
                 onPress={() => this.endExpense()} >
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
    backgroundColor: '#7892FB',
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

  submain2: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
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
      backgroundColor: "#7892FB",
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
    }  ,
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
     marginRight:30
  },
    
});


