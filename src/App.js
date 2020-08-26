import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch }  from 'react-router-dom';
import './App.css';

// Font awestuff 
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faTimes, faHome, faPlus, faQuestion, faSortDown, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

// Import custom components
import { Provider } from './context';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Contacts from './components/contacts/Contacts';
import EditContact from './components/contacts/EditContact'
import AddContact from './components/contacts/AddContact';
import About from './components/pages/About';
import Test from './components/test/Test';
import NotFound from './components/pages/NotFound';

class App extends Component {
  
  render(){
     // Create a Font awesome library
    library.add(faPencilAlt, faTimes, faHome, faPlus, faQuestion, faSortDown, faExclamationTriangle)
    return (
      <Provider>
        <Router>
          <Header branding='Contact Manager'/>
          <div className="container">
            {/* switch the browser based on the component */}
            <Switch>
              <Route exact path='/' component={Contacts} />
              <Route exact path='/contact/add' component={AddContact} />
              <Route exact path='/contact/edit/:id' component={EditContact} />
              <Route exact path='/about' component={About} />
              <Route exact path='/test' component={Test} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;