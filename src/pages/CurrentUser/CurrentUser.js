import React, { Component } from 'react';
import './CurrentUser.css'
import { Link } from '@reach/router';
import Names from '../../names.json';
import firebase from 'firebase';

class CurrentUser extends Component {

    state = {
        students: [],
    }

    componentDidMount() {
        let ref = firebase.database().ref();
        ref.on('value', snapshot => {
            this.setState({
                students: snapshot.val()
            });
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <span id="user-greeting">Group Up!</span>
                <input id='user-name' type='text' placeholder='Enter your name' value={this.props.username} onChange={this.props.handleOnChange} name='name' list='name-list' />
                <datalist id='name-list'>
                    {this.state.students.map((student) => {
                        return <option value={student.name} key={student.uwnetid} />
                    })}
                </datalist>
                <Link to='/partner'>
                    <button className='next-button' type='submit' disabled={!Names.includes(this.props.username)}>That's me!</button>
                </Link>
            </form>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }
}

export default CurrentUser;