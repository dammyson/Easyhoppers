import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, TextInput, StyleSheet, Text, View,Alert, Dimensions, TouchableOpacity} from 'react-native';
import PickerModal from 'react-native-picker-modal-view';
const URL = require("../../components/server");


const list = [
	{Id: 1, Name: 'Food', Value: 'Food'},
	{Id: 2, Name: 'Hotel', Value: 'Hotel'},
	{Id: 3, Name: 'House Kepping', Value: 'House Kepping'},
	{Id: 4, Name: 'Parking', Value: 'Parking'}
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
          
          selectedItem: {},
          auth:"",
          cat:"",
          textcat:"",
          des:"",
          ammount:"",
          expense_id:1
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

    this.setState({
      id:this.props.navigation.getParam("s_id", "defaultValue")
    })
    AsyncStorage.getItem('auth').then((value) => this.setState({ 'auth': value.toString()}))
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
      

                const {cat, ammount, auth, des, textcat,expense_id} = this.state
                if(cat !== ""){
                 this.newExpenseDetailsProcess(cat, ammount, auth, des, expense_id)
                }else if(textcat !== ""){

                  this.newExpenseDetailsProcess(textcat, ammount, auth, des, expense_id)
                
                }else{
                  Alert.alert('Process failed', 'Select or type a category', [{text: 'Okay'}])
                  return
                }

             if(ammount == ""){
               Alert.alert('Process failed', 'Select a statuse', [{text: 'Okay'}])
               return
              }
            
       

           
   }


   newExpenseDetailsProcess(cat, ammount, auth, des, expense_id)
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
                    expense_id: expense_id
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
                     <TextInput
                        style = {styles.inputtwo}
                        placeholder="Enter Amount of Expenses"
                        placeholderTextColor= '#000'
                        round
                        onChangeText = {text => this.setState({ammount: text})}
                        />

                         <View style = {styles.cat}>
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
                    chooseText={'Choose Category'}
                    searchText={'Search...'} 
                    forceSelect={false}
                    autoSort={true}
                    style={styles.buttonContainer} 
	                	/>
                  </View>
                  <Text style={{fontSize: 12, fontWeight: '200',  color: '#f44242', textAlign:"center"}}>If category is not in the list enter in the field below</Text>
                     <TextInput
                        style = {styles.inputtwo}
                        placeholder="Enter Category"
                        placeholderTextColor= '#000'
                        round
                        onChangeText = {text => this.setState({textcat: text})}
                        />


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
      backgroundColor: "#AFC1F2",
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
   
});

