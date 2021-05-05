import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText';

import {setUserCredentials} from '../../actions/userAction';
import { getUser, getUserCredentials, getUserError, getUserLoggedIn, getUserToken } from '../../reducers/userReducer';
import { login } from '../../api/userAPI';


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogin = this.handleLogin.bind(this);
        this.handleCredentialChange = this.handleCredentialChange.bind(this);
    }

    handleCredentialChange(field, value) {
        const {setUserCredentials} = this.props;
        setUserCredentials(field, value)
    }

    handleLogin() {
        const {login, UserCredentials} = this.props;
        console.log(UserCredentials);
        login(UserCredentials.email, UserCredentials.password);
    }

    render() {
        const {User, UserCredentials, UserError} = this.props;
        return (
            <div >
                <FormControl >
                    <TextField 
                        id="email" 
                        label="Email" 
                        style={{ margin: 8, width: 500}}
                        value={UserCredentials.email || ''}
                        placeholder="Email"
                        variant="outlined"
                        onChange={e => {this.handleCredentialChange("email", e.target.value)}}
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                    <TextField 
                        id="password" 
                        label="Password" 
                        style={{ margin: 8, width: 500}}
                        value={UserCredentials.password || ''}
                        placeholder="Password"
                        variant="outlined"
                        onChange={e => {this.handleCredentialChange("password", e.target.value)}}
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                    <FormHelperText style={{margin: "auto", color: "red"}}>{this.props.UserError}</FormHelperText>
                    <Button color="primary" variant="contained" onClick={this.handleLogin}>LOGIN</Button>
                </FormControl>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);