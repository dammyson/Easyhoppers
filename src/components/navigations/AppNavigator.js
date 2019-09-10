import  {createStackNavigator, createAppContainer} from 'react-navigation';

import Splash from '../Splash/Splash';
import Welcome from '../Splash/Welcome';
import FeedBack from '../Splash/FeedBack';
import Login from '../Users/Login';
import Register from '../Users/Register';
import Edit from '../Users/Edit';
import ForgotPassword from '../Users/ForgotPassword';
import ChangePassword from '../Users/ChangePassword';
import UserLanding from '../Menu/UserLanding';
import LiveUpdate from '../Menu/LiveUpdate';
import RoutePerfomanceArivall from '../Menu/RoutePerfomanceArivall';
import AirLinePerfomance from '../Menu/AirLinePerfomance';
import Boarding from '../Menu/Boarding';
import Checkout from '../Menu/Checkout';
import Pay from '../Menu/Pay';
import Confirm from '../Menu/Confirm';
import RoutePerfomanceDeparture from '../Menu/RoutePerfomanceDeparture';
import PerfomanceRouteListing from '../Menu/PerfomanceRouteListing';
import Expense from '../Expenses/Expense';
import AddBudget from '../Expenses/AddBudget';
import ExpensesSum from '../Expenses/ExpensesSum';
import Reciept from '../Expenses/Reciept';
import AgentLanding from '../Agents/AgentLanding';
import AgentSheduleListing from '../Agents/AgentSheduleListing';
import UpdateStatus from '../Agents/UpdateStatus';
import Criteria from '../Menu/Criteria';

const AppNavigator = createStackNavigator({
  /* */
  Splash: {screen: Splash,
    navigationOptions: {
      header:null 
    }},  
     Welcome: {screen: Welcome,
    navigationOptions: {
      header:null 
    }}, 
    Login: {screen: Login,
      navigationOptions: {
        header:null 
      }},

     Register: {screen: Register,
     navigationOptions: {
      header:null 
    }},
    ForgotPassword: {screen: ForgotPassword,
    navigationOptions: {
      header:null 
    }},
      ChangePassword: {screen: ChangePassword,
    navigationOptions: {
      header:null 
    }},  

    UserLanding: {screen: UserLanding,
      navigationOptions: {
        header:null 
      }}, 
      Edit: {screen: Edit,
        navigationOptions: {
          header:null 
        }}, 
        FeedBack: {screen: FeedBack,
          navigationOptions: {
            header:null 
          }},
    LiveUpdate: {screen: LiveUpdate,
      navigationOptions: {
        header:null 
      }},
    AgentLanding: {screen: AgentLanding,
      navigationOptions: {
        header:null 
      }},

    Boarding: {screen: Boarding,
      navigationOptions: {
        header:null 
      }},
      
    Checkout: {screen: Checkout,
      navigationOptions: {
        header:null 
      }},

      Pay: {screen: Pay,
        navigationOptions: {
          header:null 
        }},

        Confirm: {screen: Confirm,
          navigationOptions: {
            header:null 
          }},

          Criteria: {screen: Criteria,
            navigationOptions: {
              header:null 
            }},

    AirLinePerfomance: {screen: AirLinePerfomance,
      navigationOptions: {
        header:null 
      }},
    AgentSheduleListing: {screen: AgentSheduleListing,
      navigationOptions: {
        header:null 
      }},
    UpdateStatus: {screen: UpdateStatus,
    navigationOptions: {
      header:null 
    }}, 
    PerfomanceRouteListing: {screen: PerfomanceRouteListing,
    navigationOptions: {
      header:null 
    }},
    
    RoutePerfomanceArivall: {screen: RoutePerfomanceArivall,
      navigationOptions: {
        header:null 
      }},
    RoutePerfomanceDeparture: {screen: RoutePerfomanceDeparture,
      navigationOptions: {
        header:null 
      }},    
    Expense: {screen: Expense,
    navigationOptions: {
      header:null 
    }}, 
    AddBudget: {screen: AddBudget,
    navigationOptions: {
      header:null 
    }}, 
    ExpensesSum: {screen: ExpensesSum,
    navigationOptions: {
      header:null 
    }},
    Reciept: {screen: Reciept,
      navigationOptions: {
        header:null 
      }},  
   
}
);

const App = createAppContainer(AppNavigator);

export default App;

