import {
  GET_CONTACTS,
  GET_CONTACT,
  DELETE_CONTACT,
  DEL_ERROR,
  ADD_CONTACT,
  UPDATE_CONTACT
} from '../actions/type';
import axios from 'axios';

// we are not passing through a paramenter but we are passing through the dispacth function so we need a double arrow function
export const getContacts = () => async dispatch => {
  const res  = await axios.get('https://jsonplaceholder.typicode.com/users');
  dispatch({
    type: GET_CONTACTS,
    payload: res.data
  })
}

export const getContact = id => async dispatch => {
  const res  = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

  // this is a call to our reducer. we are sending an action, GET_CONTACT, and a payload to our reducer
  dispatch({
    type: GET_CONTACT,
    payload: res.data
  })
}

export const deleteContact = id => async dispatch => {
  try{
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

    dispatch({
      type: DELETE_CONTACT,
      payload: id
    })
  }catch (error){
    dispatch({
      type: DEL_ERROR,
      payload: error
    })
  }
}

export const addContact = contact => async dispatch => {
  const res = await axios.post('https://jsonplaceholder.typicode.com/users', contact);
  dispatch({
    type: ADD_CONTACT,
    payload: res.data
  })
}

export const updateContact = contact => async dispatch => {
  const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${contact.id}`, contact);

  dispatch({
    type: UPDATE_CONTACT,
    payload: res.data
  })
}