import React from 'react';
import { connect } from 'react-redux';
import {fetchFunding} from '../../api/fundingAPI';
import { bindActionCreators } from 'redux';
import {getFunding, getFundingPending, getFundingError} from "../../reducers/fundingReducer"
import FundingItem from './fundingItem'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import {addFunding} from '../../actions/fundingAction';
import CircularProgress from '@material-ui/core/CircularProgress';



class FundingTable extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentRender = this.shouldComponentRender.bind(this);
        this.handleCellClick = this.handleCellClick.bind(this);
    }

    componentWillMount() {
        const {fetchFunding} = this.props;
        fetchFunding();
    }

    shouldComponentRender() {
        const {pending} = this.props;
        if (pending === true) return false;
        //more tests
        return true;
    }

    handleCellClick() {
        const {addFunding} = this.props;
        addFunding()
    }

    render() {
        const {fundingList, error, pending} = this.props;
        const StyledTableContainer = withStyles((theme) => ({
            root: {
              width: "30%"
            }
          }))(TableContainer);

        if (!this.shouldComponentRender()) return <div><StyledTableContainer><CircularProgress /></StyledTableContainer></div>
        return (
            <StyledTableContainer component={Paper}>
                <Table>
                    <TableBody>
                        <TableRow hover>
                            <TableCell component="th" scope="row" onClick={this.handleCellClick}>
                                + Add A New Opportunity
                            </TableCell>
                        </TableRow>
                        {fundingList.map((f) => (
                            <FundingItem key={f.id} item={f}/>
                        ))}
                        
                    </TableBody>
                </Table>
            </StyledTableContainer>
        );
    }
}

const mapStateToProps = state => ({
    error: getFundingError(state),
    fundingList: getFunding(state),
    pending: getFundingPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchFunding: fetchFunding,
    addFunding: addFunding
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FundingTable);