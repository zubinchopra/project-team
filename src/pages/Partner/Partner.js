import React, { Component } from 'react';
import { Link } from '@reach/router';
import './Partner.css';
import Names from '../../names.json';
import firebase from 'firebase';

class Partner extends Component {

    state = {
        user: {}
    }

    componentDidMount() {
        if(!this.props.username) {
            window.location.href='/';
        }
        let ref = firebase.database().ref();
        ref.orderByChild('name').equalTo(this.props.username).on('value', snapshot => {
            this.setState({user: snapshot.val()[Object.keys(snapshot.val())]});
        });
    }

    render() {
        console.log(this.state.user);
        return (
            <form onSubmit={this.handleSubmit}>
                <span id="user-greeting">Hey {this.props.username.split(" ")[0]}!</span>
                <input id='user-name' type='text' placeholder='Pick a partner' value={this.props.partnername} onChange={this.props.handlePartnerName} name='name' list='name-list' />
                <datalist id="name-list">
                    {Names.map(name => {
                        if(name === this.props.username) {
                            return <option key="exclude"/>
                        }
                        return <option value={name} key={name} />
                    })}
                </datalist>
                <Link to='/done'><button className='next-button' type='submit' disabled={!Names.includes(this.props.partnername) && this.props.partnername !== this.props.username}>Next</button></Link>
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