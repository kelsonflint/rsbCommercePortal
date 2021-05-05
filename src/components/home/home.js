import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText';
import {Card} from 'react-bootstrap';

import {setUserCredentials} from '../../actions/userAction';
import { getUser, getUserCredentials, getUserError, getUserLoggedIn, getUserToken } from '../../reducers/userReducer';
import { login } from '../../api/userAPI';
import Login from './login';
import { Link } from 'react-router-dom';


class Home extends React.Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        return (
            <div className="loginForm">
                <h1>Home</h1>
                { !this.props.UserLoggedIn ? <Login /> :
                <div className="home">
                    <h1>Hello {this.props.User.firstName + " " + this.props.User.lastName} :)</h1>
                    <Link to="/funding" className="fundingLink">
                        <Card bg='success' text='white' style={{ width: '20rem', height: '10rem', textDecoration: 'none' }}>
                            <Card.Body>
                                <Card.Title>Funding</Card.Title>
                                <Card.Text>Add or Edit Funding Opportunities</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link> 
                    <Link to="/assistance" className="fundingLink">
                        <Card bg='primary' text='white' style={{ width: '20rem', height: '10rem', textDecoration: 'none' }}>
                            <Card.Body>
                                <Card.Title>Technical Assistance</Card.Title>
                                <Card.Text>Add or Edit Technical Assistance Organizations</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link> 
                    <Link className="fundingLink">
                        <Card bg='danger' text='white' style={{ width: '20rem', height: '10rem', textDecoration: 'none' }}>
                            <Card.Body>
                                <Card.Title>Announcements</Card.Title>
                                <Card.Text>Add or Edit Funding Finder Announcements</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link> 
                </div>}
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    User: getUser(state),
    UserToken: getUserToken(state),
    UserCredentials: getUserCredentials(state),
    UserError: getUserError(state),
    UserLoggedIn: getUserLoggedIn(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setUserCredentials: setUserCredentials,
    login: login
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home);