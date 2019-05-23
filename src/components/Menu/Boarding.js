
import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View,TouchableOpacity, Image, TextInput} from 'react-native';

export default class Boarding extends Component{

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
    const url = 'http://192.168.10.165/may/index.php';
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
      const itemData = `${item.flight.toUpperCase()} ${item.route.toUpperCase()}`;

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
      }  onPress={() => this.props.navigation.navigate('Perfomance')}>
           
           <View style = {styles.submain}>

                    <TouchableOpacity  style={styles.image}>

                        <Text style={{fontSize: 12, fontWeight: '200',  color: '#AFC1F2', marginBottom:10}}>Sub</Text>
                         <Image
                                
                                resizeMode='contain'
                                source={  item.sta == 1 ? require('../../images/inactivebell.png') : require('../../images/activeball.png')   } />
                       </TouchableOpacity>
               

                    <View style = {styles.details} >
                        <View style = {styles.menudetailsTop}>
                
                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 12, fontWeight: '200',  color: '#AFC1F2',}}>Flight</Text>
                        <Text style={{marginTop:7, fontSize: 13, fontWeight: '500',  color: '#AFC1F2',}}>{item.flight}</Text>
                        </View>

                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 12, fontWeight: '200',  color: '#AFC1F2',}}>Details</Text>
                        <Text style={{marginTop:7, fontSize: 13, fontWeight: '500',  color: '#AFC1F2',}}>{item.detail }</Text>
                        </View>
                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 12, fontWeight: '200',  color: '#AFC1F2',}}>Depature</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>{item.deptime}</Text>
                        </View>

                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 12, fontWeight: '200',  color: '#AFC1F2',}}>Arival</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>{item.arvtime}</Text>
                        </View>
                    
                
                    </View>
                    <View style = {styles.menudetailsBottom}> 
                

                       
                       <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 12, fontWeight: '200',  color: '#AFC1F2',}}>Route</Text>
                        <Text style={{marginTop:7, fontSize: 15, fontWeight: '500',  color: '#000',}}>{item.route}</Text>
                        </View>

                        <View style = {styles.menudetailsTopchild}>
                        <Text style={{fontSize: 12, fontWeight: '200',  color: '#AFC1F2',}}>Date</Text>
                        <Text style={{marginTop:7, fontSize: 12, fontWeight: '500',  color: '#000',}}>Mon 23, April, 2019</Text>
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
             <View style = {styles.main}>

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
    );


  };
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#a8bbf3',
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
        margin:5,
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
     }
});
