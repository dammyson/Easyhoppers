import React, {Component} from 'react';
import {ActivityIndicator, Picker, TextInput, StyleSheet, Text, View,Image, Dimensions, TouchableOpacity} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {PieChart} from 'react-native-chart-kit'   
const screenWidth = Dimensions.get('window').width
export default class ExpensesSum extends Component{
      static navigationOptions = {
        title: 'Expense Summary',
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
    const url = 'http://192.168.10.165/may/inde.php';
    this.setState({ loading: false });

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
                            <PieChart
                            data={[
                              { name: 'Toronto', population: 28, color: '#F00' },
                              { name: 'Beijing', population: 52, color: '#ddd' },
                              { name: 'Beij', population: 52, color: '#000' },
                            ]}
                            width={screenWidth}
                            height={200}
                            chartConfig={{
                              backgroundColor: '#e26a00',
                              backgroundGradientFrom: '#fb8c00',
                              backgroundGradientTo: '#ffa726',
                              decimalPlaces: 2, // optional, defaults to 2dp
                              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                              style: {
                                borderRadius: 6
                              }
                            }}
                            accessor="population"
                            backgroundColor="transparent"
                            paddingLeft="35"
                            absolute
                          />
                       

                </View>

                  <View style = {styles.submainthree}>
                  <AnimatedCircularProgress
                      size={200}
                      width={16}
                      fill={this.state.fill}
                      tintColor="#7892fb"
                      backgroundColor="#a8bbf3">
                      {
                        (fill) => (
                            <View>
                            <Text  style = {styles.headText}> Balance </Text>
                          <Text  style = {styles.headText}> N35000 </Text>
                          </View>
                        )
                      }
                         </AnimatedCircularProgress>
                  </View>
          
                  <View style={styles.header}> 

<View style={styles.headerchild}> 
<TouchableOpacity style={styles.button} onPress={this.showDialog}> 
                                <Image
                                    style={styles.image}
                                    resizeMode='contain'
                                    source={require('../../images/share.png')} />
                                   
                                 </TouchableOpacity> 
</View>
 <View style={styles.headerchild}>  
 
 
  </View>
            <View style={styles.headerchild}> 
           
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
    fontSize:20,
    textAlign:'left',
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    paddingTop:14,
    paddingBottom:14,
    borderRadius: 20,
    marginBottom:50,
    marginLeft:10,
    marginRight:10,
    backgroundColor: '#fff',
  },
  submain: {
    flex: 1,
  },
  submainone: {
    flex: 1,
  },

  submaintwo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#fff',
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
      borderRadius: 20,
      margin:10,
    },
    buttonText:{
      textAlign:'center',
      color: "#FFFFFF",
      fontWeight: '500',
      fontSize:13,
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
    
});

