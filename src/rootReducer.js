import { combineReducers }     from 'redux';
import SignUpReducer           from './components/SignUp/SignUpReducer';
import TalksReducer            from './components/Talks/TalksReducer';
import AdminLoginReducer       from './components/AdminLogin/AdminLoginReducer';
import MeetupsReducer                 from './components/Meetups/MeetupsReducer'


const rootReducer = combineReducers({
   SignUp                 : SignUpReducer,
   Talks                  : TalksReducer,  
   AdminLogin             : AdminLoginReducer, 
   Meetups                : MeetupsReducer,
            
});

export default rootReducer; 