import React,{Component} from 'react';
import axios from 'axios';

class AdminPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            listOfAccounts : [],
            userIdParams : this.props.match.params.userIdParams,
            approve : {
                userId : '',
                status : ''
            }
        }
    }
    componentDidMount() {
        const {listOfAccounts} = this.state;
        this.getListOfAccounts().then(response => {
            this.setState({ listOfAccounts: response.data });         
        });
        
    }
    getListOfAccounts = () => {
        const {userIdParams} = this.state;
        return new Promise((resolve, reject) => {
            axios.get('http://10.117.189.18:9091/ingbank/api/listapprovals/userId/'+userIdParams).then( (response)=> {
                resolve(response);
                console.log(response,'list response');
            }).catch( (error) => {
                reject(error);
            });
        });
    }

    onApprovalClick = (accountId) => {
        const {approve} = this.state;
        approve['userId'] = accountId;
        approve['status'] = 'approve';
        axios.put('http://10.117.189.18:9091/ingbank/api/approve',approve).then((response) => {
            alert("Application has been Approved");
            console.log(response);
        }).catch((error) => {
            alert(error.message)
        })
    }

    onRejectClick = (accountId) => {
        const {approve} = this.state;
        approve['userId'] = accountId;
        approve['status'] = 'reject';
        axios.put('http://10.117.189.18:9091/ingbank/api/approve',approve).then((response) => {
            console.log(response);
            alert("Application has been Rejected");
        }).catch((error) => {
            alert(error.message)
        })
    }
    render(){
        return(
            <div>
                <table align="center" className="table table-hover container">
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Aadhar Number</th>
                            <th>Mobile Number</th>
                            <th>Email</th>
                            <th>Account Type</th>
                            <th>Approve</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.listOfAccounts.map((item,i) => {
                        return(
                        <tr key={i}>
                            <td> {item.userId}</td>
                            <td>{item.aadharNumber}</td>
                            <td>{item.mobileNumber}</td>
                            <td>{item.email}</td>
                            <td>{item.accountType}</td>
                            <td><button className="btn btn-outline-primary" onClick={() => this.onApprovalClick(item.userId)}>Approve</button></td>
                            <td><button className="btn btn-outline-primary" onClick={() => this.onRejectClick(item.userId)}>Reject</button></td>
                        </tr>
                        )})}
                    </tbody>
                </table> 
            </div>
        )
    }
}
export default AdminPage;