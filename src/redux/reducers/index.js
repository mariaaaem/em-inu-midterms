import { combineReducers } from 'redux';
//reducers
import students from './students';
import serfil from './serfil';
import auth from './auth';
import comment from "./comment"

export default combineReducers({
   students,
   serfil,
   auth,
   comment
});