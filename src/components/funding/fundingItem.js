import React from 'react';
import ReactDOM from 'react-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { getSelectedFunding } from '../../reducers/fundingReducer';
import { connect } from 'react-redux';
import fundingTable from './fundingTable';
import {setSelectedFunding} from '../../actions/fundingAction';
import { bindActionCreators } from 'redux';

class FundingItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleCellClick = this.handleCellClick.bind(this)
    }

    handleCellClick = (e) => {
        const {setSelectedFunding} = this.props;
        setSelectedFunding(this.props.item)
        console.log("funding selected: " + this.props.selectedFunding.fundingName)
    }

    render() {
        const {description, endDate, fundingName, fundingType, id, provider, qualifications, startDate, terms, uses, website} = this.props.item;

        return (
            <TableRow hover key={fundingName}>
                <TableCell component="th" scope="row" onClick={this.handleCellClick}>
                    {fundingName}
                </TableCell>
            </TableRow>
        )
    }
}

const mapStateToProps = state => ({
    selectedFunding: getSelectedFunding(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setSelectedFunding: setSelectedFunding
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FundingItem);