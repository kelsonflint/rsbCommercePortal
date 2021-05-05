import React from 'react'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
//import { KeyboardDatePicker } from '@material-ui/pickers';s
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Button from '@material-ui/core/Button'
import '../../App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSelectedAssistance, getAddingNew } from '../../reducers/assistanceReducer'
import { setAssEmpty, setAssistanceAttr, setSelectedAssistance } from '../../actions/assistanceAction'
import {updateAssistance, addNewAssistance, deleteAssistance, fetchAssistance} from '../../api/assistanceAPI'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


class AssistanceForm extends React.Component {
    constructor(props) {
        super(props);
        this.loaded = false;
        this.handleCasesClick = this.handleCasesClick.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleTextArrayChanges = this.handleTextArrayChanges.bind(this);
        this.convertTextArrayToString = this.convertTextArrayToString.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCasesClick(field, value) {
        const {setAssistanceAttr} = this.props;
        let u = this.props.selectedAssistance[field];
        u = u.includes(value) ? u.filter(e => e !== value) : [...u, value]
        setAssistanceAttr(field, u);
        console.log(this.props.selectedAssistance)
    }

    handleItemChange(field, value) {
        const {setAssistanceAttr} = this.props;
        setAssistanceAttr(field, value);
    }

    handleTextArrayChanges(field, value) {
        const {setAssistanceAttr} = this.props;
        let s = value.split("; ");
        setAssistanceAttr(field, s);
    }

    convertTextArrayToString(s) {
        let res = "";
        s.map(e => {
            res += e + "; "
        })
        return res.trim().substr(0, res.length - 2);
    }

    handleSubmit(addNew) {
        console.log("clicked");
        const {updateAssistance, addNewAssistance, fetchAssistance} = this.props;
        if (addNew) {
            addNewAssistance(this.props.selectedAssistance);
            setTimeout(fetchAssistance, 1000)
        } else {
            updateAssistance(this.props.selectedAssistance);
            setTimeout(fetchAssistance, 1000)
        }
    }


    handleDelete() {
        const {deleteAssistance, fetchAssistance, setAssEmpty} = this.props;
        deleteAssistance(this.props.selectedAssistance)
        setTimeout(fetchAssistance, 1000)
    }

    render() {
        const {demographics, description, email, id, languages, locations, orgName, phone, pocName, website} = this.props.selectedAssistance;
        console.log("rendering form")
        const langList = ["English", "Spanish", "Mandarin", "Vietnamese", "Russian", "Korean", "Swahili", "French", "Thai", "Laotian", "ASL" ]
        const demoList = {
            "Woman": "Women",
            "Man": "Men",
            "Native": "Native American or Alaskan Native",
            "Latnix": "Latinx or Hispanic",
            "Asian": "Asian",
            "Black": "Black or African American",
            "Pacific": "Pacific Islander",
            "Middle Eastern": "Middle Eastern or North African",
            "Mixed": "Mixed Race",
            "White": "White",
            "Veteran": "Veteran",
            "LGBTQ": "LGBTQ+"
        }
        return (
            <form className="assistanceForm" >
                <h2>{!this.props.getAddingNew ? orgName : "New Assistance Organization"}</h2>
                {!this.props.getAddingNew ? <Button style={{float: "right"}} color='secondary' variant='contained'
                    onClick={e=> {e.preventDefault(); 
                        confirmAlert({
                            title: 'Confirm Delete',
                            message: 'Are you sure you want to delete this item?',
                            buttons: [
                              {
                                label: 'Yes',
                                onClick: () => this.handleDelete()
                              },
                              {
                                label: 'No',
                              }
                            ]
                          })
                    }}> DELETE </Button> : <div></div>}

                <Button 
                    style={{float: "right"}}
                    color='primary' 
                    variant='contained'
                    onClick={e=> {e.preventDefault(); 
                        confirmAlert({
                            title: 'Confirm Save',
                            message: 'Are you sure you want to save this item?',
                            buttons: [
                              {
                                label: 'Yes',
                                onClick: () => this.handleSubmit(this.props.getAddingNew)
                              },
                              {
                                label: 'No',
                              }
                            ]
                          })
                    }}>
                     {this.props.getAddingNew ? "SAVE" : "UPDATE"}
                </Button>
                <FormControl component="fieldset" />
                <TextField 
                    id="orgName" 
                    label="Name" 
                    style={{ margin: 8, width: 500}}
                    value={orgName || ''}
                    placeholder="Organization Name"
                    variant="outlined"
                    onChange={e => {this.handleItemChange("orgName", e.target.value)}}
                    InputLabelProps={{
                        shrink: true,
                }}/>
                <TextField
                    id="website"
                    label="Website URL"
                    placeholder="i.e. (http://www.wsbdc.org)"
                    style={{ margin: 8, width: 500 }}
                    variant="outlined"
                    value={website || ''}
                    onChange={e => {this.handleItemChange("website", e.target.value)}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="phone"
                    label="Phone Number [(xxx) xxx-xxxx]"
                    placeholder="i.e. (123) 456-7890"
                    style={{ margin: 8, width: 500 }}
                    variant="outlined"
                    value={phone}
                    onChange={e => {this.handleItemChange("phone", e.target.value)}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="email"
                    label="Email Address"
                    placeholder="i.e. (example@gmail.com)"
                    style={{ margin: 8, width: 500 }}
                    variant="outlined"
                    value={email}
                    onChange={e => {this.handleItemChange("email", e.target.value)}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="pocName"
                    label="Point of Contact (if Applicable)"
                    placeholder="i.e. (John Doe)"
                    style={{ margin: 8, width: 500 }}
                    variant="outlined"
                    value={pocName || ""}
                    onChange={e => {this.handleItemChange("pocName", e.target.value)}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="description"
                    label="Description"
                    placeholder="Description"
                    multiline
                    //fullwidth
                    style={{ margin: 8, width: 500 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={description || ''}
                    onChange={e => {this.handleItemChange("description", e.target.value)}}
                />
                <FormLabel style={{ margin: 8 }} component="legend">Does This Organization Help Any Specific Demographics?</FormLabel>
                <FormHelperText style={{ margin: 12 }}>Select All If NOT Applicable</FormHelperText>
                <FormControlLabel
                    label="Select All"
                    style={{ marginLeft: 8}}
                    control={<Checkbox checked={demographics.length == Object.keys(demoList).length}
                    onClick={e => {
                        let demoAll = Object.keys(demoList);
                        const {setAssistanceAttr} = this.props;
                        if (demographics.length == Object.keys(demoList).length) {
                            setAssistanceAttr("demographics", [])
                        } else {
                            setAssistanceAttr("demographics", demoAll);
                        }
                        
                    }}/>}
                />
                {Object.entries(demoList).map(([key, value]) => {
                    return <FormControlLabel
                        control={<Checkbox checked={this.props.selectedAssistance.demographics.includes(key)} 
                        onClick={e => {this.handleCasesClick("demographics", key)}}/>} 
                        label={value}
                        style={{ marginLeft: 8}}
                        key={key}
                    />
                })}
                <FormLabel style={{ margin: 8 }} component="legend">What Language(s) Does Organization Support?</FormLabel>
                <FormControlLabel
                    label="Select All"
                    style={{ marginLeft: 8}}
                    control={<Checkbox checked={languages.length == langList.length}
                    onClick={e => {
                        const {setAssistanceAttr} = this.props;
                        if (languages.length == langList.length) {
                            setAssistanceAttr("languages", [])
                        } else {
                            setAssistanceAttr("languages", langList);
                        }
                    }}/>}
                />
                {langList.map(lang => {
                    return <FormControlLabel
                        control={<Checkbox checked={this.props.selectedAssistance.languages.includes(lang)} 
                        onClick={e => {this.handleCasesClick("languages", lang)}}/>} 
                        label={lang}
                        style={{ marginLeft: 8}}
                        key={lang}
                />
                })}
                
            </form>
        )
    }
}

const mapStateToProps = state => ({
    selectedAssistance: getSelectedAssistance(state),
    getAddingNew: getAddingNew(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setAssistanceAttr: setAssistanceAttr,
    updateAssistance: updateAssistance,
    addNewAssistance: addNewAssistance,
    deleteAssistance: deleteAssistance,
    fetchAssistance: fetchAssistance,
    setAssEmpty: setAssEmpty
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AssistanceForm);