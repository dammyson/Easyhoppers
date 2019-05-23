
import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View,Image, Dimensions, TouchableOpacity} from 'react-native';
import {LineChart} from 'react-native-chart-kit'
   

export default class RoutePerfomance extends Component{

    static navigationOptions = {
        title: 'Live Update',
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


                <View style = {styles.submainone}>
                        <View style = {styles.ariline}>
                              <Image
                              style={styles.image}
                              resizeMode='contain'
                            source={require('../../images/sn.png')} />
                            <View style = {styles.details} >
                                <View style = {styles.menudetailsTopchild}>
                                      <Text style={{fontSize: 12, fontWeight: '200',  color: '#AFC1F2',}}>Flight</Text>
                                      <Text style={{marginTop:7, fontSize: 18, fontWeight: '600',  color: '#5b97dc',}}>Arik Air</Text>
                                      </View>

                              </View>
                          </View>
             
                          <Text style={{margin:10, fontSize: 20, fontWeight: '300',  color: '#000',}}>Trend Performance</Text>
                          <TouchableOpacity style={styles.listItemWhite }  >
                                        <Text style={{margin:10, fontSize: 18, fontWeight: '600',  color: '#5b97dc',}}>LAG - ABD</Text>
                         </TouchableOpacity>
                          <LineChart
                              data={{
                              labels: [0, 8, 10, 12, 14, 16],
                              datasets: [{
                                  data: [0, 8, 10, 0, 14, 16]
                                  }]
                                  }}
                                  width={Dimensions.get('window').width - 20 } // from react-native
                                  height={220}
                                  yAxisLabel={''}
                                  chartConfig={{
                                  backgroundColor: '#cc6600',
                                  backgroundGradientFrom: '#eff3fd',
                                  backgroundGradientTo: '#eff3fd',
                                  decimalPlaces: 0, // optional, defaults to 2dp
                                  color: (opacity = 1) => `#a8bbf3`,
                                  style: {
                                      borderRadius: 16
                                  }
                                  }}
                            
                                  style={{
                                  marginVertical: 8,
                                  borderRadius: 16
                                  }}
                            /> 
             </View>

                <View style = {styles.submaintwo}>
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
    
});

