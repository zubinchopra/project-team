import React, { Component } from 'react';
import './Approve.css';
import firebase from 'firebase';

class Approve extends Component {

    state = {
        student: {},
        userIndex: -1
    }

    componentDidMount() {
        if(!this.props.username) {
            window.location.href = '/';
        }
 
        let ref = firebase.database().ref();
        ref.orderByChild('name').equalTo(this.props.username).on('value', snapshot => {
            let userIndex = Object.keys(snapshot.val());
            let student = snapshot.val()[userIndex];
            this.setState({
                student: student,
                userIndex: userIndex
            });
        });
    }

    render() {
        return (
            <div className='container'>
                <h3>Hi {this.props.username}</h3>
                {this.props.status ?
                <div className="content-container">
                    <div>You are teamed up with {this.state.student.picked_by || this.state.student.chosePartner}</div>
                    <button className='back-button button-padding' onClick={this.handleGoHome}>Home</button>
                    <button className='next-button button-padding' onClick={this.handleDecline}>Break Team</button>
                </div>
                
                :
                
                <div>
                    {this.state.student.chosePartner === "" ?
                    <div>
                        <div className='approve-content'>Your potential partner is {this.state.student.picked_by}</div>
                        <div className='approve-content'>Do you wish to proceed?</div>
                        <button className='next-button button-padding' onClick={this.handleProceed}>Proceed</button>
                        <button className='back-button button-padding' onClick={this.handleDecline}>Decline</button>
                    </div>
                    :
                    <div className="content-container">
                        Awaiting response by {this.state.student.chosePartner}
                        <button className='back-button button-padding' onClick={this.handleGoHome}>Home</button>
                    </div>
                    }
                </div>
                }
            </div>
        );
    }

    handleGoHome = (e) => {
        e.preventDefault();
        window.location.href = '/';
    }

    handleProceed = (e) => {
        e.preventDefault();

        let ref = firebase.database().ref('/' + this.state.userIndex);
        ref.update({
            confirmed: true
        }).then(() => {
            firebase.database().ref().orderByChild('name').equalTo(this.state.student.picked_by).on('value', snapshot => {
                let partnerIndex = Object.keys(snapshot.val());
                let partnerRef = firebase.database().ref('/' + partnerIndex);
                partnerRef.update({
                    confirmed: true
                });
            });
        }).then(() => {
            window.location.href = '/done';
        });
    }

    handleDecline = (e) => {
        e.preventDefault();
        let ref = firebase.database().ref('/' + this.state.userIndex);
        let partnerName = this.state.student.picked_by || this.state.student.chosePartner;
        ref.update({
            confirmed: "",
            picked_by: "",
            chosePartner: ""
        }).then(() => {
            firebase.database().ref().orderByChild('name').equalTo(partnerName).on('value', snapshot => {
                let partnerIndex = Object.keys(snapshot.val());
                let partnerRef = firebase.database().ref('/' + partnerIndex);
                partnerRef.update({
                    confirmed: "",
                    chosePartner: "",
                    picked_by: ""
                });
            });
        }).then(() => {
            window.location.href = '/done'
        });
    }

}

export default Approve;