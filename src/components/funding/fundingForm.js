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
import { getSelectedFunding, getAddingNew } from '../../reducers/fundingReducer'
import { setFundingAttr, setSelectedFunding } from '../../actions/fundingAction'
import {updateFunding, addNewFunding, deleteFunding, fetchFunding} from '../../api/fundingAPI'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


class FundingForm extends React.Component {
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
        const {setFundingAttr} = this.props;
        let u = this.props.selectedFunding[field];
        u = u.includes(value) ? u.filter(e => e !== value) : [...u, value]
        setFundingAttr(field, u);
    }

    handleItemChange(field, value) {
        const {setFundingAttr} = this.props;
        setFundingAttr(field, value);
    }

    handleTextArrayChanges(field, value) {
        const {setFundingAttr} = this.props;
        let s = value.split("; ");
        setFundingAttr(field, s);
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
        const {updateFunding, addNewFunding, fetchFunding} = this.props;
        if (addNew) {
            addNewFunding(this.props.selectedFunding);
            setTimeout(fetchFunding, 1000)
        } else {
            updateFunding(this.props.selectedFunding);
            setTimeout(fetchFunding, 1000)
        }
    }


    handleDelete() {
        const {deleteFunding, fetchFunding} = this.props;
        deleteFunding(this.props.selectedFunding)
        setTimeout(fetchFunding, 1000)
    }

    render() {
        const {description, endDate, fundingName, fundingType, id, provider, startDate, terms, uses, website, useCases, nonprofit, demographics, NAICS} = this.props.selectedFunding;
        console.log("rendering form")
        const usesList = {
            "employees": "Pay Employees",
            "inventory": "Purchase Inventory",
            "covid": "Pandemic Related Expenses",
            "refinance": "Refinance",
            "rent": "Rent/Utility Bills",
            "marketing": "Marketing",
            "insurance": "Insurance",
            "improveBuild": "Make Building Improvements",
            "equipment": "Purchase Machinery or Equipment",
            "property": "Buy a Building/Property"
        }
        const naicsList = {
            "11": "Agriculture",
            "23": "Construction",
            "71": "Arts & Entertainment",
            "61": "Education",
            "52": "Finance",
            "72": "Food",
            "62": "Health Services",
            "51": "Information Technology",
            "31-33": "Manufacturing",
            "55": "Professional & Business Services",
            "53": "Real Estate",
            "44-45": "Retail",
            "48-49": "Trade, Transportation, & Utilities",
            "81": "Other"
        }
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
            <form className="fundingForm" >
                <h2>{!this.props.getAddingNew ? fundingName : "New Funding"}</h2>
                {!this.props.getAddingNew ? <Button style={{float: "right"}} color='secondary' variant='contained'
                    onClick={e=> {e.preventDefault(); console.log("clicked");
                        confirmAlert({
                            title: 'Confirm',
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
                    }}>
                     DELETE
                    </Button> : <div></div>}
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
                        id="fundingName" 
                        label="Title" 
                        style={{ margin: 8, width: 500}}
                        value={fundingName || ''}
                        placeholder="Funding Title"
                        variant="outlined"
                        onChange={e => {this.handleItemChange("fundingName", e.target.value)}}
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                    <FormLabel style={{ margin: 8 }} component="legend">Funding Type</FormLabel>
                    <RadioGroup row aria-label="funding type" name="fundingType" value={fundingType} onChange={(event) => {this.handleItemChange("fundingType", event.target.value)}}>
                        <FormControlLabel style={{ margin: 8 }} value="Loan" control={<Radio />} label="Loan" />
                        <FormControlLabel style={{ margin: 8 }} value="Grant" control={<Radio />}  label="Grant" />
                        <FormControlLabel style={{ margin: 8 }} value="Private" control={<Radio />} label="Private" />
                    </RadioGroup> 
                    <TextField
                        id="provider"
                        label="Funding Provider"
                        placeholder="i.e. (Small Business Administration)"
                        //fullwidth
                        style={{ margin: 8, width: 500 }}
                        variant="outlined"
                        value={provider || ''}
                        onChange={e => {this.handleItemChange("provider", e.target.value)}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="website"
                        label="Website URL"
                        placeholder="i.e. (https://www.sba.gov/funding)"
                        //fullwidth
                        style={{ margin: 8, width: 500 }}
                        variant="outlined"
                        value={website || ''}
                        onChange={e => {this.handleItemChange("website", e.target.value)}}
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
                    <TextField
                        id="endDate"
                        label="Application End Date (YYYY-MM-DD)"
                        placeholder="i.e. (YYYY-MM-DD)"
                        //fullwidth
                        style={{ margin: 8, width: 500 }}
                        variant="outlined"
                        value={endDate || ''}
                        onChange={e => {this.handleItemChange("endDate", e.target.value)}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormLabel style={{ margin: 8 }} component="legend">What Can This Be Used For?</FormLabel>
                    <FormControlLabel
                        label="Select All"
                        style={{ marginLeft: 8}}
                        control={<Checkbox checked={useCases.length == Object.keys(usesList).length}
                        onClick={e => {
                            let useAll = Object.keys(usesList);
                            const {setFundingAttr} = this.props;
                            if (useCases.length == Object.keys(usesList).length) {
                                setFundingAttr("useCases", [])
                            } else {
                                setFundingAttr("useCases", useAll);
                            }
                            
                        }}/>}
                    />
                    {Object.entries(usesList).map(([key, value]) => {
                        return <FormControlLabel
                            control={<Checkbox checked={this.props.selectedFunding.useCases.includes(key)} 
                            onClick={e => {this.handleCasesClick("useCases", key)}}/>} 
                            label={value}
                            style={{ marginLeft: 8}}
                            key={key}
                        />
                    })}
                    <FormLabel style={{ margin: 8 }} component="legend">Is this for Non-Profits(501(c)) only?</FormLabel>
                    <FormControlLabel 
                        label={nonprofit ? "Yes" : "No"}
                        control={<Switch checked={nonprofit} onChange={e => {
                            const {setFundingAttr} = this.props;
                            setFundingAttr("nonprofit", !nonprofit) }}/>
                        }
                        style={{ marginLeft: 8}}
                    />
                    <FormLabel style={{ margin: 8 }} component="legend">What Businesses Can Apply?</FormLabel>
                    <FormControlLabel
                        label="Select All"
                        style={{ marginLeft: 8}}
                        
                        control={<Checkbox checked={NAICS.length == Object.keys(naicsList).length}
                        onClick={e => {
                            let naicsNums = Object.keys(naicsList);
                            const {setFundingAttr} = this.props;
                            if (NAICS.length == Object.keys(naicsList).length) {
                                setFundingAttr("NAICS", [])
                            } else {
                                setFundingAttr("NAICS", naicsNums);
                            }
                            
                        }}/>}
                    />
                    {Object.entries(naicsList).map(([key, value]) => {
                        return <FormControlLabel
                            control={<Checkbox checked={this.props.selectedFunding.NAICS.includes(key)} 
                            onClick={e => {this.handleCasesClick("NAICS", key)}}/>} 
                            label={value}
                            style={{ marginLeft: 8}}
                            key={key}
                        />
                    })}
                    <FormLabel style={{ margin: 8 }} component="legend">What are the Terms for this Funding Opportunity? (if applicable)</FormLabel>
                    <FormHelperText style={{ marginLeft: 12 }}>Separate Bullet Points with a Semi-Colon (;)</FormHelperText>
                    <TextField
                        id="terms"
                        label="Terms"
                        placeholder="i.e. (3.75% fixed for businesses; 2.75% fixed for nonprofits)"
                        multiline
                        //fullwidth
                        style={{ margin: 8, width: 500 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={this.convertTextArrayToString(terms)}
                        onChange={e => {
                            console.log(terms);
                            this.handleTextArrayChanges("terms", e.target.value)}}
                    />
                    <FormLabel style={{ margin: 8 }} component="legend">Is this Opportunity Specific to any Demographics?</FormLabel>
                    <FormHelperText style={{ marginLeft: 12 }}>Select All If NOT Applicable</FormHelperText>
                    <FormControlLabel
                        label="Select All"
                        style={{ marginLeft: 8}}
                        control={<Checkbox checked={demographics.length == Object.keys(demoList).length}
                        onClick={e => {
                            let demoAll = Object.keys(demoList);
                            const {setFundingAttr} = this.props;
                            if (demographics.length == Object.keys(demoList).length) {
                                setFundingAttr("demographics", [])
                            } else {
                                setFundingAttr("demographics", demoAll);
                            }
                            
                        }}/>}
                    />
                    {Object.entries(demoList).map(([key, value]) => {
                        return <FormControlLabel
                            control={<Checkbox checked={this.props.selectedFunding.demographics.includes(key)} 
                            onClick={e => {this.handleCasesClick("demographics", key)}}/>} 
                            label={value}
                            style={{ marginLeft: 8}}
                            key={key}
                        />
                    })}
                    <FormLabel style={{ margin: 8 }} component="legend">Describe the Use Cases for this Funding (if applicable)</FormLabel>
                    <FormHelperText style={{ margin: 12 }}>Separate Bullet Points with a Semi-Colon (;)</FormHelperText>
                    <TextField
                        id="uses"
                        label="Uses Description"
                        placeholder="i.e. (Working Capital; Payroll costs)"
                        multiline
                        //fullwidth
                        style={{ margin: 8, width: 500 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={this.convertTextArrayToString(uses) || ''}
                        onChange={e => {
                            console.log(uses);
                            this.handleTextArrayChanges("uses", e.target.value)}}
                    />
                <FormControl />
            </form>
        )
    }
}

const mapStateToProps = state => ({
    selectedFunding: getSelectedFunding(state),
    getAddingNew: getAddingNew(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setFundingAttr: setFundingAttr,
    updateFunding: updateFunding,
    addNewFunding: addNewFunding,
    deleteFunding: deleteFunding,
    fetchFunding: fetchFunding
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FundingForm);