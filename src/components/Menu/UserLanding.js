
import React, { Component } from 'react';
import { Image, ActivityIndicator, Platform, ImageBackground, Dimensions, StyleSheet, Text, Alert, View, TouchableOpacity, AsyncStorage } from 'react-native';
const URL = require("../../components/server");
import Icon from 'react-native-vector-icons/FontAwesome';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Carousel, { Pagination } from 'react-native-snap-carousel';


export default class UserLanding extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      status: false,
      auth: "",
      name: "",
      images: [
        require('../../images/one.jpeg'),
        require('../../images/two.jpeg'),
        require('../../images/three.jpeg')
      ],

    };
  }

  componentDidMount() {

    AsyncStorage.getItem('auth').then((value) => this.setState({ 'auth': value.toString() }))
    AsyncStorage.getItem('auth').then((value) => {
      if (value == '') {

      } else {
        this.setState({ auth: value })
      }
      this.makeRemoteRequest();
    })

  }

  makeRemoteRequest = () => {


    const { auth } = this.state
    this.setState({ loading: true });

    fetch(URL.url + '/api/user', {
      method: 'GET', headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth,
        'Content-Type': 'application/json',
      }
    })

      .then(res => res.json())
      .then(res => {
        console.log(res.user.firstname)
        if (res.status) {
          AsyncStorage.setItem('email', res.user.email.toString());
          AsyncStorage.setItem('eid', res.expense_id.toString());
          if(res.user.firstname != null || res.user.lastname != null){
            AsyncStorage.setItem('first', res.user.firstname.toString());
            AsyncStorage.setItem('last', res.user.lastname.toString());
          }
          this.setState({
            name: res.user.name,
            loading: false,


          });

        } else {

          Alert.alert('Operation failed', "Please check your network and try again", [{ text: 'Okay' }])
          this.setState({ loading: false })
        }
      })
      .catch(error => {
        alert(error.message);
        this.setState({ loading: false })
      });


  };

  logout = () => {
    AsyncStorage.setItem('rem', "no");
    AsyncStorage.setItem('auth', "null");
    this.props.navigation.navigate('Login')
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



  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
      >
        <Image
          source={item}
          style={{ width: Dimensions.get('window').width, height: 350 }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
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

      <ImageBackground
        source={require('../../images/ezbg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.container}>


          <View style={styles.Headercontainer}>

            <View style={styles.header}>

              <TouchableOpacity
                style={styles.button}

                onPress={() => Alert.alert(
                  'Login Out',
                  'Are you sure you want to log out',
                  [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                    { text: 'OK', onPress: () => this.logout() },
                  ],
                  { cancelable: false }
                )}

              >
                <Icon
                  name="lock"
                  size={20}
                  color="white"
                  type="font-awesome"
                />
              </TouchableOpacity>
              <Text style={styles.headTextW}>{this.state.name}</Text>

              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Edit')}>
                <Icon
                  name="pencil"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1, }}>
              <Carousel
                data={this.state.images}
                renderItem={this._renderItem}
                ref={(carousel) => { this._carousel = carousel; }}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width}
                onSnapToItem={(index) => this.setState({ activeSlide: index })}
                enableSnap={true}
              />


            </View>


          </View>

          <View style={styles.foother}>

            <View style={styles.body}>

              <View style={styles.menu}>
                <Menu
                  ref={this.setMenuRef}
                  button={<TouchableOpacity style={styles.circle} onPress={this.showMenu} >

                    <Icon
                      name="bars"
                      style={{ marginRight: 10 }} name="bars" size={20}
                      type="font-awesome"
                      color="#000"
                    />
                  </TouchableOpacity>}
                >
                  <MenuItem onPress={() => this.props.navigation.navigate('FeedBack', this.hideMenu()
                  )}>Feedback</MenuItem>
                </Menu>
              </View>

              <View style={styles.scrollView}>
                <View style={styles.row}>
                  <View style={styles.rowchild}>

                  </View>
                  <View style={styles.rowchild}>
                    <TouchableOpacity style={styles.items}
                      onPress={() => this.props.navigation.navigate('LiveUpdate')}>
                      <Image
                        style={styles.image}
                        source={require('../../images/live.png')} />
                      <Text style={styles.headText}>Live</Text>
                      <Text style={styles.headText}>Status</Text>
                      <Text style={styles.headlink}>View Now</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.rowchild}>

                  </View>
                </View>


                <View style={styles.row}>
                  <View style={styles.rowchild}>
                    <TouchableOpacity style={styles.items}
                      onPress={() => this.props.navigation.navigate('Boarding')}>
                      <Image
                        style={styles.image}
                        source={require('../../images/bell.png')} />
                      <Text style={styles.headText}>Boarding</Text>
                      <Text style={styles.headText}>Alert</Text>
                      <Text style={styles.headlink}>Get Alert</Text>
                    </TouchableOpacity>

                  </View>
                  <View style={styles.rowchildsm}>

                  </View>
                  <View style={styles.rowchild}>
                    <TouchableOpacity style={styles.items} onPress={() => this.props.navigation.navigate('PerfomanceRouteListing')}>
                      <Image
                        style={styles.image}
                        source={require('../../images/osci.png')} />
                      <Text style={styles.headText}>Real-Time</Text>
                      <Text style={styles.headText}>Analytics</Text>
                      <Text style={styles.headlink}>Check Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.rowchild}>

                  </View>
                  <View style={styles.rowchild}>
                    <TouchableOpacity style={styles.items}
                      onPress={() => this.props.navigation.navigate('Expense')}>

                      <Image
                        style={styles.image}
                        source={require('../../images/plane.png')} />
                      <Text style={styles.headText}> Travel</Text>
                      <Text style={styles.headText}>Expenses</Text>
                      <Text style={styles.headlink}>Track Now</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.rowchild}>

                  </View>
                </View>



              </View>
            </View>


          </View>

        </View>
      </ImageBackground >
    );
  }
}



const styles = StyleSheet.create({
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  Headercontainer: {
    flex: 3,
    paddingTop: Platform.OS === 'ios' ? 25 : 10,
    backgroundColor: URL.bgcolor,
    alignItems: 'center',
    justifyContent: 'center',

  },
  foother: {
    flex: 5,
    padding: 2
  },
  header: {
    height: 40,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10
  },
  headText: {
    color: URL.bgcolor,
    fontWeight: '900',
    fontSize: 15,
    textAlign: 'left',
  },
  headText: {
    color: "#000",
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'left',
  },
  headlink: {
    color: URL.homelinkcolor,
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'left',
  },
  items: {
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headimage: {
    alignItems: 'center',
    marginBottom: 25,
  },
  headTextW: {
    color: "#FFF",
    flex: 1,
    fontWeight: '900',
    fontSize: 15,
    textAlign: 'center',
    alignItems: 'center',
  },

  headTextWt: {
    color: "#FFF",
    fontWeight: '900',
    fontSize: 15,
    textAlign: 'left',
  },
  menu: {
    height: 30,
    marginLeft: 20,
    marginTop: 10
  },

  row: {
    flex: 1,
    flexDirection: "row",

  },
  rowchild: {
    flex: 2,
    margin: 5,
  },

  rowchildsm: {
    flex: 1,
    margin: 5,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  body: {
    flex: 1,
  }
  ,
  circle: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginRight: 30
  },
});
