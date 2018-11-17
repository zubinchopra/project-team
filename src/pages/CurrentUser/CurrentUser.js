import React, { Component } from 'react';
import './CurrentUser.css'
import { Link, redirectTo } from '@reach/router';
import Names from '../../names.json';

class CurrentUser extends Component {

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <span id="user-greeting">Group Up!</span>
                <input id='user-name' type='text' placeholder='Enter your name' value={this.props.username} onChange={this.props.handleOnChange} name="name" list="name-list" />
                <datalist id="name-list">
                    {Names.map(name => {
                        return <option value={name} key={name} />
                    })}
                </datalist>
                <Link to='/partner'><button className='next-button' type='submit' disabled={!Names.includes(this.props.username)}>That's me!</button></Link>
            </form>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Submit the username value to firebase and get results back

    }
}

export default CurrentUser;