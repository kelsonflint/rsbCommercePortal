import funding from './fundingReducer';
import assistance from './assistanceReducer';
import user from './userReducer';

import { combineReducers } from 'redux'
import {connectRouter} from 'connected-react-router'

const createRootReducer = (history) => combineReducers({
  funding,
  assistance,
  user,
  router: connectRouter(history)
})

export default createRootReducer;
