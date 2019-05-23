import  {createStackNavigator, createAppContainer} from 'react-navigation';

import Splash from '../Splash/Splash';
import Login from '../Users/Login';
import Register from '../Users/Register';
import ForgotPassword from '../Users/ForgotPassword';
import UserLanding from '../Menu/UserLanding';
import LiveUpdate from '../Menu/LiveUpdate';
import Perfomance from '../Menu/Perfomance';
import AirLinePerfomance from '../Menu/AirLinePerfomance';
import Boarding from '../Menu/Boarding';
import RoutePerfomance from '../Menu/RoutePerfomance';
import PerfomanceRouteListing from '../Menu/PerfomanceRouteListing';
import Expense from '../Expenses/Expense';
import AddBudget from '../Expenses/AddBudget';
import ExpensesSum from '../Expenses/ExpensesSum';
import Reciept from '../Expenses/Reciept';
import AgentLanding from '../Agents/AgentLanding';
import AgentSheduleListing from '../Agents/AgentSheduleListing';
import UpdateStatus from '../Agents/UpdateStatus';



const AppNavigator = createStackNavigator({
  

 
  /*
  AgentSheduleListing: {screen: AgentSheduleListing},
    Splash: {screen: Splash,
    navigationOptions: {
      header:null 
    }}, */
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
    UserLanding: {screen: UserLanding,
      navigationOptions: {
        header:null 
      }},
      AgentLanding: {screen: AgentLanding,
        navigationOptions: {
          header:null 
        }},
      LiveUpdate: {screen: LiveUpdate},
      Boarding: {screen: Boarding},
      AirLinePerfomance: {screen: AirLinePerfomance},
      PerfomanceRouteListing: {screen: PerfomanceRouteListing},
      Perfomance: {screen: Perfomance},
      LiveUpdate: {screen: LiveUpdate},
      AgentSheduleListing: {screen: AgentSheduleListing},
      UpdateStatus: {screen: UpdateStatus},
      PerfomanceRouteListing: {screen: PerfomanceRouteListing},
      RoutePerfomance: {screen: RoutePerfomance},
      AddBudget: {screen: AddBudget},
      Reciept: {screen: Reciept},
      Reciept: {screen: Reciept},
      ExpensesSum: {screen: ExpensesSum},
      Expense: {screen: Expense},
    
      
     
    
    
   
   
}
);

const App = createAppContainer(AppNavigator);

export default App;

