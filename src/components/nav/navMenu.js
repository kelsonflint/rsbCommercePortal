import React from 'react';
import {
    Navbar,
    Nav,
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getUserLoggedIn} from '../../reducers/userReducer';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class NavMenu extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {UserLoggedIn} = this.props;
        return (
            <div className="navMenu">
                <Navbar bg="primary" variant="dark" sticky="top">
                    <Link className="brand" style={{ textDecoration: 'none' }} to="/">Funding Finder Admin</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {UserLoggedIn ? <Nav className="mr-auto" >
                        <Link className="navlink" style={{ textDecoration: 'none' }} to="/funding">Funding</Link>
                        <Link className="navlink" style={{ textDecoration: 'none' }} to="/assistance">Assistance</Link>
                    </Nav> : <div></div>}
                    
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    UserLoggedIn: getUserLoggedIn(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);