import { Button } from '@material-ui/core';
import React from 'react';
import {addAssistance} from '../../actions/assistanceAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AssistanceBlank extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddClick = this.handleAddClick.bind(this);
    }

    handleAddClick() {
        const {addAssistance} = this.props;
        addAssistance();
    }
    render() {
        return (
            <div className="blank">
                <h1 className="managerLabel">Technical Assistance Manager</h1>
                <br />
                <h2 className="managerLabel">Select an Existing Organization from the Left</h2>
                <h2 className="managerLabel">or Add a New One  <Button color="primary" variant='contained' onClick={this.handleAddClick}>NEW</Button></h2>

            </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addAssistance: addAssistance
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AssistanceBlank);