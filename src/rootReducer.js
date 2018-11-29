import { combineReducers }     from 'redux';
import AdminLoginReducer       from './components/AdminLogin/AdminLoginReducer';
import ConfimOrCancelReducer   from './components/ConfirmOrCancel/ConfirmOrCancelReducer';
import MeetupsReducer          from './components/Meetups/MeetupsReducer'
import OrganizersReducer       from './components/Organizers/OrganizersReducer';
import SignUpReducer           from './components/SignUp/SignUpReducer';
import TalksReducer            from './components/Talks/TalksReducer';
import TalksPageReducer        from './components/TalksPage/TalksPageReducer';
import PastTalksReducer        from './components/PastTalks/PastTalksReducer';

const rootReducer = combineReducers({
    AdminLogin       : AdminLoginReducer,
    ConfirmOrCancel  : ConfimOrCancelReducer,
    Meetups          : MeetupsReducer,
    Organizers       : OrganizersReducer,
    SignUp           : SignUpReducer,
    Talks            : TalksReducer, 
    TalksPage        : TalksPageReducer, 
    PastTalks        : PastTalksReducer,
});

export default rootReducer; 
