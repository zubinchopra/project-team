import React, { Component } from 'react';
import { Link } from '@reach/router';
import './Partner.css';

class Partner extends Component {

    state = {
        partnername: ""
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input id='user-name' type='text' placeholder="Enter partner's name" value={this.state.username} onChange={e => {this.setState({partnername: e.target.value})}} />
                <Link to='/done'><button className='next-button' type='submit'>Next</button></Link>
                <Link to='/'><button className='back-button' type='submit'>Back</button></Link>
            </form>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Submit the username value to firebase and get results back

    }

}

export default Partner;