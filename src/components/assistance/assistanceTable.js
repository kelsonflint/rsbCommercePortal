import React from 'react';
import { connect } from 'react-redux';
import {fetchAssistance} from '../../api/assistanceAPI';
import { bindActionCreators } from 'redux';
import {getAssistance, getAssistancePending, getAssistanceError} from "../../reducers/assistanceReducer"
import AssistanceItem from './assistanceItem'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import {addAssistance} from '../../actions/assistanceAction';
import CircularProgress from '@material-ui/core/CircularProgress';



class AssistanceTable extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentRender = this.shouldComponentRender.bind(this);
        this.handleCellClick = this.handleCellClick.bind(this);
    }

    componentWillMount() {
        const {fetchAssistance} = this.props;
        fetchAssistance();
    }

    shouldComponentRender() {
        const {pending} = this.props;
        if (pending === true) return false;
        //more tests
        return true;
    }

    handleCellClick() {
        const {addAssistance} = this.props;
        addAssistance()
    }

    render() {
        const {assistanceList, error, pending} = this.props;
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
                                + Add A New Organization
                            </TableCell>
                        </TableRow>
                        {assistanceList.map((f) => (
                            <AssistanceItem key={f.id} item={f}/>
                        ))}
                        
                    </TableBody>
                </Table>
            </StyledTableContainer>
        );
    }
}

const mapStateToProps = state => ({
        error: getAssistanceError(state),
        assistanceList: getAssistance(state),
        pending: getAssistancePending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAssistance: fetchAssistance,
    addAssistance: addAssistance
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AssistanceTable);