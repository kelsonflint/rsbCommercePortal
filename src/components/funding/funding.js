import React from 'react';
import FundingBlank from './fundingBlank';
import FundingTable from './fundingTable';
import FundingForm from './fundingForm';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getFundingEmpty} from '../../reducers/fundingReducer'

class Funding extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const {getFundingEmpty} = this.props;
        return (
            <div className="Funding">
                <FundingTable style={{flexDirection: 'row'}}/>
                {getFundingEmpty ? <FundingBlank/> : <FundingForm/>}
            </div>
        )
    }
}    

const mapStateToProps = state => ({
    getFundingEmpty: getFundingEmpty(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Funding);