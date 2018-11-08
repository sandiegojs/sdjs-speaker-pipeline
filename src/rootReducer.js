import { combineReducers }     from 'redux';
import  HomeReducer            from './components/Home/HomeReducer';
import SignUpReducer           from './components/SignUp/SignUpReducer';
import TalksReducer            from './components/Talks/TalksReducer';
import AdminLoginReducer       from './components/AdminLogin/AdminLoginReducer';
import MeetupsReducer                 from './components/Meetups/MeetupsReducer'


const rootReducer = combineReducers({
   Home                   : HomeReducer,
   SignUp                 : SignUpReducer,
   Talks                  : TalksReducer,  
   AdminLogin             : AdminLoginReducer, 
   Meetups                : MeetupsReducer,
            
});

export default rootReducer; 