import React, { Component } from 'react';
import { Router } from '@reach/router';
import CurrentUser from './pages/CurrentUser/CurrentUser';
import Partner from './pages/Partner/Partner';
import AllSet from './pages/AllSet/AllSet';

class App extends Component {
	render() {
		return (
			<Router>
				<CurrentUser path='/'/>
				<Partner path='/partner' />
				<AllSet path='/done' />
			</Router>
    	);
  	}
}

export default App;
