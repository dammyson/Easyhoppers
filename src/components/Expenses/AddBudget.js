import React, {Component} from 'react';
import {ActivityIndicator, Platform,AsyncStorage, TextInput, StyleSheet, Text, View,Alert, Dimensions, TouchableOpacity} from 'react-native';
import PickerModal from 'react-native-picker-modal-view';
const URL = require("../../components/server");
import DatePicker from 'react-native-datepicker'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
const list = [
	{Id: 1, Name: 'Food', Value: 'Food'},
	{Id: 2, Name: 'Hotel', Value: 'Hotel'},
	{Id: 3, Name: 'House Kepping', Value: 'House Kepping'},
  {Id: 4, Name: 'Parking', Value: 'Parking'},
  {Id: 5, Name: 'Others', Value: 'other'}
]

const currecny= [
	{Id: 1, Name: 'Naira - N', Value: 'Food'},
	{Id: 2, Name: 'Dollar $', Value: 'Hotel'},
	{Id: 3, Name: 'Pounds GB', Value: 'House Kepping'},
  {Id: 4, Name: 'Euros E', Value: 'Parking'},
]
export default class AddBudget extends Component{
    
      
      constructor(props) {
        super(props);
        
        this.state = {
          loading: false,
          status: false,
          data: [],
          search: '',
          transaction_id:'',
          st:false,
          selectedItem: {},
          auth:"",
          cat:"",
          textcat:"",
          des:"",
          ammount:"",
          expense_id:1,
          eid:"",
          fromdate:"2019-05-29 00:00",
          today:""
        };
    
       this.arrayholder = [];
      }      
      selected(selected) {
        this.setState({
          selectedItem: selected
        })
      }
    
         
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
 


  componentDidMount() {
    AsyncStorage.getItem('eid').then((value) => this.setState({'eid': value.toString()}))
   
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.setState({
      today: year + '-' + month + '-' + date,
      
    });

    this.setState({
      expense_id:this.props.navigation.getParam("expense_id", "defaultValue")
    })

    AsyncStorage.getItem('auth').then((value) => {
      if(value==''){
       
      }else{
        this.setState({auth: value})
      }
     // this.makeRemoteRequest();
    })


     }

     newExpenseDetails()
     {
                const {cat, ammount, auth,  fromdate, des, textcat, eid, expense_id} = this.state
              if(ammount == ""){
              Alert.alert('Process failed', 'Select a statuse', [{text: 'Okay'}])
              return
             }
                if(cat !== ""){
                 this.newExpenseDetailsProcess(cat, ammount, auth, des, eid, fromdate)
                }else if(textcat !== ""){

                  this.newExpenseDetailsProcess(textcat, ammount, auth, des, eid, fromdate)
                
                }else{
                  Alert.alert('Process failed', 'Select or type a category', [{text: 'Okay'}])
                  return
                }
   }


   



   newExpenseDetailsProcess(cat, ammount, auth, des, eid, fromdate)
   {
    
           this.setState({loading: true})
           fetch(URL.url+'/api/expense/add/details', { method: 'POST',  headers: {
             Accept: 'application/json',
             'Authorization': 'Bearer ' + auth,
             'Content-Type': 'application/json',
           }, body: JSON.stringify({
                    category: cat,
                    amount:ammount,
                    description: des,
                    expense_id: eid,
                    date_of_expense:fromdate
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
setCurren(curr){
  this.setState({curr: curr}),  
  this.hideMenu()
}

  render() {
    

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
          <Text style={{color:"#fff", fontWeight: '900',  fontSize:16,}}>Input Expense</Text>
        </View>
          <View style = {styles.main}>
            
            <View style = {styles.submain}>
    
                <View style = {styles.submaintwo}>
                <TouchableOpacity style={{ height:30,width:80, backgroundColor: "#f44242", justifyContent: 'center',borderRadius: 10, marginLeft:50,}}
                        onPress={() => this.props.navigation.navigate('Expense')} >
                      <Text style={styles.buttonText} > Close</Text>
                  </TouchableOpacity> 
                    

                         <View style = {styles.cat}>
                  <PickerModal
                    onSelected={(selected) =>   selected.Value=="other" ? this.setState({st: true}) : this.setState({cat: selected.Value})}
                    onRequestClosed={()=> console.log('closed...')}
                    onBackRequest={()=> console.log('back key pressed')}
                    items={list}
                    showToTopButton={true}
                    defaultSelected={this.state.selectedItem}
                    autoCorrect={false}
                    autoGenerateAlphabet={true}
                    chooseText={'Choose Category'}
                    searchText={'Search...'} 
                    forceSelect={false}
                    style={styles.buttonContainer} 
	                	/>
                  </View>

      

                       {this.state.st ?   
                     <TextInput
                        style = {styles.inputtwo}
                        placeholder="Enter Category"
                        placeholderTextColor= '#000'
                        round
                        onChangeText = {text => this.setState({textcat: text})}
                        /> : null}



                  <View>
                  <TextInput
                        style = {styles.inputtwo}
                        placeholder="Enter Amount"
                        placeholderTextColor= '#000'
                        keyboardType = "numeric"
                        round
                        onChangeText = {text => this.setState({ammount: text})}
                        />

                  </View>
                      
                    
                  <View style = {{ flexDirection: "row", marginLeft:40, marginRight:40,}}> 
                            <DatePicker
                                style={{width: 250}}
                                date={this.state.fromdate}
                                mode="datetime"
                                placeholder="select date"
                                format="YYYY-MM-DD hh:ss"
                                minDate="2019-06-01 00:00"
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
                              
                        </View>  

    
                        
          






                          <TextInput
                        style = {styles.inputtwo}
                        placeholder="Description"
                        placeholderTextColor= '#000'
                        round
                        onChangeText = {text => this.setState({des: text})}
                        />

                                    <View style = {styles.search}>
                  <TouchableOpacity style={styles.buttonContainer} 
                  onPress={() => this.newExpenseDetails()}>
                    <Text style={styles.buttonText}
                   >Save</Text>
                    
                </TouchableOpacity>
                
                </View>
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
    backgroundColor: URL.bgcolor,
    paddingTop:Platform.OS === 'ios' ? 25 : 10,
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
  headerchild:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    paddingTop:8,
    paddingBottom:8,
    borderRadius: 20,
    marginBottom:30,
    marginLeft:10,
    marginRight:10,
    backgroundColor: '#fff',
  },
  submain: {
    flex: 1,
  },
  submainone: {
    flex: 1,
     backgroundColor: '#eff3fd',
  },

  submaintwo: {
    flex: 4,
    justifyContent: 'center',
    
  },

  submainthree: {
    flex: 3,
    alignItems: 'center',
    
  },
  search: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
   
  },

    inputtwo:{
        height:40,
        marginBottom:10,
        marginTop:15,
        color: '#000',
        paddingHorizontal: 40,
        borderWidth: 1,
        borderColor:"#b2aeae",
        marginLeft:40,
        marginRight:40,
        textAlign: 'center',
        fontWeight: '500',
        
        },
    inputpicker:{
      height: 30,
       width: 100,
      
      },
    menudetailsTopchild:{
      marginLeft:10,
    marginRight:10,
    },
    cat: {
      marginLeft:40,
      marginRight:40,
    }, 
    catone: {
      marginLeft:40,
      marginRight:40,
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
      marginBottom:10,
      backgroundColor: URL.bgcolor,
      justifyContent: 'center',
      borderRadius: 10,
      margin:10,
    },
    buttonText:{
      textAlign:'center',
      color: "#FFFFFF",
      fontWeight: '500',
      fontSize:13,
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
      marginLeft:20
   },
   
});

