import AssistanceTable from './assistanceTable';
import AssistanceForm from './assistanceForm';
import AssistanceBlank from './assistanceBlank';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getAssistanceEmpty} from '../../reducers/assistanceReducer'
import Copyright from '../home/copyright';


class Assistance extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {getAssistanceEmpty} = this.props;

        return (
            <div className="Assistance">
                <AssistanceTable style={{flexDirection: 'row'}}/>
                {getAssistanceEmpty ? <AssistanceBlank /> : <AssistanceForm/>}
            </div>
        )
    }
   

}
const mapStateToProps = state => ({
    getAssistanceEmpty: getAssistanceEmpty(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Assistance);