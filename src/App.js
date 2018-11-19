import React, { Component } from 'react';
import { Router } from '@reach/router';
import CurrentUser from './pages/CurrentUser/CurrentUser';
import Partner from './pages/Partner/Partner';
import AllSet from './pages/AllSet/AllSet';
import DataTable from './pages/DataTable/DataTable';

class App extends Component {

	state = {
		username: '',
		partnername: '',
	}

	render() {
		return (
			<Router>
				<CurrentUser 
					username={this.state.username} 
					handleOnChange={this.handleOnChange}
					path='/' 
				/>
				<Partner 
					username={this.state.username} 
					partnername={this.state.partnername} 
					handlePartnerName={this.handlePartnerName} 
					path='/partner' 
				/>
				<AllSet 
					path='/done' 
				/>
				<DataTable
					path='/table' 
				/>
			</Router>
    	);
	}
	  
	handleOnChange = (e) => {
        this.setState({
            username: e.target.value
        });
	}
	
	handlePartnerName = (e) => {
		this.setState({
			partnername: e.target.value
		});
	}
}

export default App;
