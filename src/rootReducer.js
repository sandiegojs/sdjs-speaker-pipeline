import { combineReducers }     from 'redux';
import  HomeReducer            from './components/Home/HomeReducer';
import SignUpReducer           from './components/SignUp/SignUpReducer';
import AdminDashboardReducer   from './components/AdminDashboard/AdminDashboardReducer';
import AdminLoginReducer       from './components/AdminLogin/AdminLoginReducer';


const rootReducer = combineReducers({
   Home                   : HomeReducer,
   SignUp                 : SignUpReducer,
   AdminDashboard         : AdminDashboardReducer,  
   AdminLogin             : AdminLoginReducer,          

});

export default rootReducer; 