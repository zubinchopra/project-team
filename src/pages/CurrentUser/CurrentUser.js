import React, { Component } from 'react';
import './CurrentUser.css'
import { Link } from '@reach/router';

class CurrentUser extends Component {

    state = {
        username: ''
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input id='user-name' type='text' placeholder='Enter your name' value={this.state.username} onChange={e => {this.setState({username: e.target.value})}} />
                <Link to='/partner'><button className='next-button' type='submit'>That's me!</button></Link>
            </form>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Submit the username value to firebase and get results back

    }
}

export default CurrentUser;