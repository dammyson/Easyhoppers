import React, {Component} from 'react';
import {ActivityIndicator, Picker, TextInput, StyleSheet, Text, View,Image, Dimensions, TouchableOpacity} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {PieChart} from 'react-native-chart-kit'   
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AddBudget extends Component{
      static navigationOptions = {
        title: 'AddBudget',
        headerStyle: {
            backgroundColor: '#AFC1F2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      };
      
      constructor(props) {
        super(props);
        
        this.state = {
          loading: false,
          status: false,
          data: [],
          search: '',
          transaction_id:'',
          fill:76,
        };
    
       this.arrayholder = [];
    
    
       const actions = [{
        text: 'Accessibility',
        name: 'bt_accessibility',
        position: 2
      }];
    
      }      

         
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  componentDidMount() {
    this.makeRemoteRequest();
     }

  makeRemoteRequest = () => {
    const url = 'http://192.168.43.230/may/inde.php';
    this.setState({ loading: true });

    fetch(url, { method: 'GET',  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    } }
    
    )
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
        this.setState({ error, loading: false });
      });
  };



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
          <View style = {styles.main}>
            
            <View style = {styles.submain}>
             

              <View >
            <TextInput
              style = {styles.input}
              placeholder="Type Here..."
              placeholderTextColor= '#fff'
              round
              value={this.state.search}
              onChangeText={this.searchFilterFunction}
            /></View>

              <View style = {styles.search}>
                  <TouchableOpacity style={styles.buttonContainer} >
                    <Text style={styles.buttonText}
                   >Save</Text>

                </TouchableOpacity>

                </View>
                <View style = {styles.submaintwo}>

                    <AnimatedCircularProgress
                      size={200}
                      width={16}
                      fill={this.state.fill}
                      tintColor="#7892fb"
                      backgroundColor="#a8bbf3">
                      {
                        (fill) => (
                          <Text  style = {styles.headText}> N35000
                            
                          </Text>
                        )
                      }
                         </AnimatedCircularProgress>
                     <TextInput
                        style = {styles.inputtwo}
                        placeholder="Enter Amount of Expenses"
                        placeholderTextColor= '#000'
                        round
                        value={this.state.search}
                        onChangeText={this.searchFilterFunction}
                        />
                </View>

                  <View style = {styles.submainthree}>
                  
                   
                  <Picker
                    selectedValue={this.state.language}
                    style = {styles.inputpicker}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({language: itemValue})
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                 
                  </View>
          
                  <View style={styles.header}> 

                    <View style={styles.headerchild}> 
                    <TouchableOpacity style={styles.button} onPress={this.showDialog}> 
                    <Text style={{fontSize: 15, fontWeight: '900',  color: '#AFC1F2',}}>ADD</Text>
                    </TouchableOpacity>
                    </View>
                     <View style={styles.headerchild}>  
                     
                     <TouchableOpacity style={styles.button} onPress={this.showDialog}> 
                                <Image
                                    style={styles.image}
                                    resizeMode='contain'
                                    source={require('../../images/camera.png')} />
                                      <Text style={{fontSize: 12, fontWeight: '200',  color: '#AFC1F2',}}>reciept</Text>
                                 </TouchableOpacity> 
                      </View>
                                <View style={styles.headerchild}> 
                                <TouchableOpacity style={styles.button} onPress={this.showDialog}> 
                                <Image
                                    style={styles.image}
                                    resizeMode='contain'
                                    source={require('../../images/add.png')} />
                                      <Text style={{fontSize: 12, fontWeight: '200',  color: '#AFC1F2',}}>New cat</Text>
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
    paddingTop:14,
    paddingBottom:14,
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
    alignItems: 'center',
    
  },

  submainthree: {
    flex: 3,
    alignItems: 'center',
    
  },
  search: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  input:{
    height:40,
    backgroundColor: '#eff3fd',
    marginBottom:6,
    color: '#fff',
    paddingHorizontal: 40,
    borderRadius: 25,
    marginLeft:40,
    marginRight:40,
    textAlign: 'center',
    fontWeight: '700',
    
    },
    inputtwo:{
        height:40,
        backgroundColor: '#eff3fd',
        marginBottom:10,
        marginTop:15,
        color: '#fff',
        paddingHorizontal: 40,
        borderRadius: 25,
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
      marginBottom:10,
      backgroundColor: "#AFC1F2",
      justifyContent: 'center',
      borderRadius: 20,
      margin:10,
    },
    buttonText:{
      textAlign:'center',
      color: "#FFFFFF",
      fontWeight: '500',
      fontSize:13,
    },
    
});

