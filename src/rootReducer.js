import { combineReducers }     from 'redux';
import AccountReducer          from './components/Account/AccountReducer';
import AdminHomeReducer        from './components/AdminHome/AdminHomeReducer';
import AdminLoginReducer       from './components/AdminLogin/AdminLoginReducer';
import MeetupsReducer          from './components/Meetups/MeetupsReducer'
import OrganizersReducer       from './components/Organizers/OrganizersReducer';
import SignUpReducer           from './components/SignUp/SignUpReducer';
import TalksReducer            from './components/Talks/TalksReducer';


const rootReducer = combineReducers({
    Account          : AccountReducer,
    AdminHome        : AdminHomeReducer,
    AdminLogin       : AdminLoginReducer, 
    Meetups          : MeetupsReducer,
    Organizers       : OrganizersReducer,
    SignUp           : SignUpReducer,
    Talks            : TalksReducer,  

            
});

export default rootReducer; 