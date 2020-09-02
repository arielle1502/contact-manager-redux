import {
  GET_CONTACTS, 
  GET_CONTACT, 
  DELETE_CONTACT, 
  DEL_ERROR,
  ADD_CONTACT,
  UPDATE_CONTACT
} from '../actions/type';

const initialState = {
  contacts: [],
  contact: {},
  errors: {}
};

export default function(state = initialState, action){
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      };
      case GET_CONTACT:
      return {
        ...state,
        contact: action.payload
      };
      // were passing through our id to be deleted as a payload here, adn the filter will save our new contact array without that object
      case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
      case DEL_ERROR:
        return{
          ...state,
          error: action.payload
        };
       
        case ADD_CONTACT:
          return{
            ...state,
            contacts: [action.payload, ...state.contacts],
            contact: action.payload
             //think of this as doing a psuh on top the the array
          }; 
        case UPDATE_CONTACT:
          return {
            ...state,
            contacts: state.contacts.map(contact =>
              contact.id === action.payload.id
              ? ( contact = action.payload)
              : contact
              // were mapping through all of our contacts adn looking for an id that matches our payload id (the one we changed). if it matches then we save the updated contact as that contact, if doesnt match, then just leave the contact the way it is.
              )
          }

      default:
        return state;
  }
}