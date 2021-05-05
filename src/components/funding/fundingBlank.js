import { Button } from '@material-ui/core';
import React from 'react';
import {addFunding} from '../../actions/fundingAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class FundingBlank extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddClick = this.handleAddClick.bind(this);
    }

    handleAddClick() {
        const {addFunding} = this.props;
        addFunding();
    }
    render() {
        return (
            <div className="blank">
                <h1 className="managerLabel">Funding Opportunity Manager</h1>
                <br />
                <h2 className="managerLabel">Select an Existing Opportunity from the Left</h2>
                <h2 className="managerLabel">or Add a New One  <Button color="primary" variant='contained' onClick={this.handleAddClick}>NEW</Button></h2>

            </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addFunding: addFunding
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FundingBlank);