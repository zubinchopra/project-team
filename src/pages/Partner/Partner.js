import React, { Component } from 'react';
import { Link } from '@reach/router';
import './Partner.css';
import Names from '../../names.json';
import Approve from '../Approve/Approve';
import firebase from 'firebase';

class Partner extends Component {

    state = {
        students: [],
        userIndex: -1,
        confirmed: null
    }

    componentDidMount() {
        if(!this.props.username) {
            window.location.href='/';
        }

        let ref = firebase.database().ref();
        ref.on("value", snapshot => {
            this.setState({
                students: snapshot.val()
            });
        });

        ref.orderByChild('name').equalTo(this.props.username).on('value', snapshot => {
            let userIndex = Object.keys(snapshot.val());
            let student = snapshot.val()[userIndex];
            this.setState({userIndex: userIndex});
            if(student.confirmed === true || student.confirmed === false) {
                this.setState({
                    confirmed: student.confirmed,
                });
            }
        });
    }

    render() {
        return (
            this.state.confirmed === null ? 

            <form>
                <span id='user-greeting'>Hey {this.props.username.split(' ')[0]}!</span>
                <input id='user-name' type='text' placeholder='Pick a partner' value={this.props.partnername} onChange={this.props.handlePartnerName} name='name' list='name-list' />
                <datalist id='name-list'>
                    {this.state.students.map((student, index) => {
                        if(student.name === this.props.username || student.confirmed !== '' ) {
                            return <option key={'exclude' + index} />
                        }
                        return <option value={student.name} key={student.uwnetid} />
                    })}
                </datalist>
                <button className='next-button' type='submit' disabled={!Names.includes(this.props.partnername) && this.props.partnername !== this.props.username} onClick={this.handleSubmit}>Next</button>
                <Link to='/'><button className='back-button'>Back</button></Link>
            </form>

            :

            <Approve 
                username={this.props.username}
                status={this.state.confirmed}
            />

        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let ref = firebase.database().ref('/' + this.state.userIndex);
        ref.update({
            chosePartner: this.props.partnername,
            confirmed: false
        }).then(() => {
            firebase.database().ref().orderByChild('name').equalTo(this.props.partnername).on('value', snapshot => {
                let partnerIndex = Object.keys(snapshot.val());
                let partnerRef = firebase.database().ref('/' + partnerIndex);
                partnerRef.update({
                    confirmed: false,
                    picked_by: this.props.username
                });
            });
        }).then(() => {
            window.location.href = '/done';
        });
    }

}

export default Partner;