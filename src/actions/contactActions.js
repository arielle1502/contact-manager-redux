import {GET_CONTACTS} from '../actions/type';
import axios from 'axios';

export const getContacts = () => async dispatch => {
  const res  = await axios.get('https://jsonplaceholder.typicode.com/users');
  dispatch({
    type: GET_CONTACTS,
    payload: res.data
  })
}