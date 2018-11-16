import React, { Component } from 'react';
import './AllSet.css';
import { Link } from '@reach/router';

class AllSet extends Component {
    render() {
        return (
            <div id='all-set-container'>
                <h3 id='all-set-content'>You're all set!</h3>
                <Link to='/'><button className='back-button'>Home</button></Link>
            </div>
        )
    }
}

export default AllSet;