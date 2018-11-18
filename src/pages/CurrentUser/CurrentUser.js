import React, { Component } from 'react';
import './CurrentUser.css'
import { Link } from '@reach/router';
import Names from '../../names.json';
import firebase from 'firebase';

class CurrentUser extends Component {

    state = {
        students: [],
        jacobDecides: false,
        partnerExists: false
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
            <form onSubmit={this.handlubmit}>
                <span id="user-greeting">Group Up!</span>
                <input id='user-name' type='text' placeholder='Enter your name' value={this.props.username} onChange={this.props.handleOnChange} name='name' list='name-list' />
                <datalist id='name-list'>
                    {this.state.students.map((student) => {
                        return <option value={student.name} key={student.uwnetid} />
                    })}
                </datalist>
                <div>
                    <Link to='/partner'>
                        <button className='next-button button-padding user-button' onSubmit={this.handleSubmit} disabled={!Names.includes(this.props.username)}>I have a partner</button>
                    </Link>
                    <button className='back-button button-padding user-button' onClick={this.handleJacobSubmit} disabled={!Names.includes(this.props.username)}>Let Jacob decide</button>
                </div>
                <div className='current-user-content'>
                    {this.state.jacobDecides ? 'You already asked Jacob to choose your partner' : <div />}
                    {this.state.partnerExists ? 'You already picked a team member' : <div />}
                </div>
            </form>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    handleJacobSubmit = (e) => {
        e.preventDefault();
        firebase.database().ref().orderByChild('name').equalTo(this.props.username).on('value', snapshot => {
            let userIndex = Object.keys(snapshot.val());
            let userRef = firebase.database().ref('/' + userIndex);
            userRef.on('value', userVal => {
                if(userVal.val().jacobDecides === true) {
                    this.setState({jacobDecides: true});
                } else if(userVal.val().confirmed !== '') {
                    this.setState({
                        partnerExists: true,
                        jacobDecides: false
                    });
                } else {
                    userRef.update({jacobDecides: true}).then(() => {
                        window.location.href = '/done';
                    });
                }
            });
        });
        
    }
}

export default CurrentUser;