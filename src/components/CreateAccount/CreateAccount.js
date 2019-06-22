import React,{Component} from 'react';
import axios from 'axios';

class CreateAccount extends Component{
    constructor(){
        super();
        this.state = {
            accountCreationData : {

            }
        }
    }
    handleChangeEvent = (event) => {
        const { accountCreationData } = this.state;
        accountCreationData[event.target.name] = event.target.value;
        this.setState({ accountCreationData });
    }

    onSubmitEvent = (event) => {
        event.preventDefault();
        const { accountCreationData } = this.state;
        console.log(accountCreationData, "asdfgh");
        this.getAccountCreation(accountCreationData).then(response => {
            console.log(response, '1232');
            if(response.data.role === "admin"){
                this.props.history.push('/adminPage/'+response.data.userId);
            }else{
                this.props.history.push('/userPage/'+response.data.userId);
            }
        }).catch(error => {
            alert(error.message);
        })

    }
    getAccountCreation = (accountCreationData) => {
        return new Promise((resolve, reject) => {
            axios.post('http://', accountCreationData).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    render(){
        return(
            <div className="container-fluid">
                <form onSubmit={this.onSubmitEvent}>
                    <div className="form-group row">
                        <label htmlFor="customerName" className="col-sm-2 col-form-label">Customer Name</label>
                        <div className="col-sm-10">
                        <input type="text" name="customerName" className="form-control" id="customerName" placeholder="Enter Customer Name" required
                        onChange={this.handleChangeEvent} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                        <input type="email" name="email" class="form-control" id="email" placeholder="Enter Email" required
                          onChange={this.handleChangeEvent}/>
                    </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="mobileNumber" className="col-sm-2 col-form-label">Registered Mobile Number</label>
                        <div className="col-sm-10">
                        <input type="number" name="mobileNumber" className="form-control" id="mobileNumber" placeholder="Enter Mobile Number" required
                         onChange={this.handleChangeEvent} />
                    </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
                        <div className="col-sm-10">
                        <textarea type="text" name="address" className="form-control" id="address" placeholder="Enter Address" required
                        onChange={this.handleChangeEvent} />
                    </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="nominee" className="col-sm-2 col-form-label">Nominee</label>
                        <div className="col-sm-10">
                        <input type="text" name="nominee" className="form-control" id="nominee" placeholder="Enter Nominee" required
                          onChange={this.handleChangeEvent}/>
                    </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="nomineeRelation" className="col-sm-2 col-form-label">Nominee Relationship</label>
                        <div className="col-sm-10">
                        <input type="text" name="nomineeRelation" className="form-control" id="nomineeRelation" placeholder="Enter Nominee Relation" required
                         onChange={this.handleChangeEvent} />
                    </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="age" className="col-sm-2 col-form-label">Age</label>
                        <div className="col-sm-10">
                        <input type="number" name="age" className="form-control" id="age" placeholder="Enter Age" required
                          onChange={this.handleChangeEvent}/>
                    </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="aadharNumber" className="col-sm-2 col-form-label">Aadhar Number</label>
                        <div className="col-sm-10">
                        <input type="text" name="aadharNumber" className="form-control" id="aadharNumber" placeholder="Enter Aadhar Number" required
                          onChange={this.handleChangeEvent}/>
                    </div>
                    </div>
                    <fieldset className="form-group">
                        <div className="row">
                                <legend className="col-form-label col-sm-2 pt-0">Account Type</legend>
                                <div className="col-sm-10">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="accountType" id="savings" value="savings" 
                                        onChange={this.handleChangeEvent}/>
                                        <label className="form-check-label" htmlFor="accountType">Savings</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="accountType" id="current" value="current"
                                        onChange={this.handleChangeEvent}/>
                                        <label className="form-check-label" htmlFor="accountType">Current</label>
                                    </div>
                                </div>
                        </div>
                    </fieldset>
                    <div class="row">
                        <div class="col">
                            <button id="btn1" className="btn btn-primary" type="submit">Upload Documents</button>
                        </div>
                        <div class="col order-1">
                            <button id="btn2" className="btn btn-primary" type="submit">Submit</button>
                        </div>
                        <div class="col order-12">
                            <button id="btn3" className="btn btn-primary" type="reset">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default CreateAccount;