import React, { Component } from 'react';
import './DataTable.css';
import firebase from 'firebase';

class TableRowItem extends Component {
    render() { 
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.jacobpick ? "True" : ""}</td>
                <td>{this.props.partner !== "" ? this.props.partner : this.props.pickedby}</td>
            </tr>
    );}
}

class DataTable extends Component {

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
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Jacob Pick?</th>
                        <th>Partner</th>
                    </tr>
                    {this.state.students.map((student) => {
                            console.log(student);
                            return ( 
                                <TableRowItem key={student.uwnetid} name={student.name} jacobpick={student.jacobDecides} partner={student.chosePartner} pickedby={student.picked_by} />
                            ); 
                    })}
                        
                </tbody>
            </table>
        );
    }
}

export default DataTable;