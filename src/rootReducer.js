import { combineReducers }     from 'redux';
import AdminHomeReducer        from './components/AdminHome/AdminHomeReducer';
import AdminLoginReducer       from './components/AdminLogin/AdminLoginReducer';
import MeetupsReducer          from './components/Meetups/MeetupsReducer'
import OrganizersReducer       from './components/Organizers/OrganizersReducer';
import SignUpReducer           from './components/SignUp/SignUpReducer';
import TalksReducer            from './components/Talks/TalksReducer';
import PastTalksReducer        from './components/PastTalks/PastTalksReducer';

const rootReducer = combineReducers({
    AdminHome        : AdminHomeReducer,
    AdminLogin       : AdminLoginReducer,
    Meetups          : MeetupsReducer,
    Organizers       : OrganizersReducer,
    SignUp           : SignUpReducer,
    Talks            : TalksReducer, 
    PastTalks        : PastTalksReducer, 

            
});

export default rootReducer; 
