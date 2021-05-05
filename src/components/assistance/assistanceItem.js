import React from 'react';
import ReactDOM from 'react-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { getSelectedAssistance } from '../../reducers/assistanceReducer';
import { connect } from 'react-redux';
import assistanceTable from './assistanceTable';
import {setSelectedAssistance} from '../../actions/assistanceAction';
import { bindActionCreators } from 'redux';

class AssistanceItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleCellClick = this.handleCellClick.bind(this)
    }

    handleCellClick = (e) => {
        const {setSelectedAssistance} = this.props;
        setSelectedAssistance(this.props.item)
        console.log("assistance selected: " + this.props.selectedAssistance.orgName)
    }

    render() {
        const {description, endDate, orgName, assistanceType, id, provider, qualifications, startDate, terms, uses, website} = this.props.item;

        return (
            <TableRow hover key={orgName}>
                <TableCell component="th" scope="row" onClick={this.handleCellClick}>
                    {orgName}
                </TableCell>
            </TableRow>
        )
    }
}

const mapStateToProps = state => ({
    selectedAssistance: getSelectedAssistance(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setSelectedAssistance: setSelectedAssistance
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AssistanceItem);