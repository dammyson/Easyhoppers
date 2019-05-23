
import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View,Image, Dimensions, TouchableOpacity} from 'react-native';
import {LineChart} from 'react-native-chart-kit'
   

export default class Performance extends Component{

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
    const url = 'http://192.168.10.165/may/inde.php';
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

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: '86%',
          backgroundColor: '#fff',
        }}
      />
    );
  };

  renderItem=({ item , index}) => 
  {
    return (
    <TouchableOpacity style={
        index % 2 == 0 ? styles.listItemWhite : styles.listItemBlack
      }  onPress={() => this.props.navigation.navigate('PerfomanceRouteListing')}>
           
           <View style = {styles.routmain}>
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
             
            </View>
    
</TouchableOpacity>
        )}


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
                <View style = {styles.submaintwo}>
                <FlatList
                style={{paddingBottom:10}}
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.detail}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
             />
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

