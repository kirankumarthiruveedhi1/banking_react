import React,{Component} from 'react';
import axios from 'axios';

class UserPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            accountDetails : [],
            userIdParams : this.props.match.params.userIdParams
        }
    }
    componentDidMount() {
        this.getAccountDetails().then(response => {
            this.setState({ accountDetails: response.data });         
        });
        
    }
    getAccountDetails = () => {
        const {userIdParams} = this.state;
        return new Promise((resolve, reject) => {
            axios.get('http://10.117.189.18:9091/ingbank/api/'+userIdParams).then( (response)=> {
                resolve(response);
                console.log(response,'list response');
            }).catch( (error) => {
                reject(error);
            });
        });
    }
    render(){
        return(
            <div>
                <table align="center" className="table table-hover container">
                    <thead>
                        <tr>
                        <th>Account Number</th>
                        <th>Account Type</th>
                        <th>Date</th>
                        <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.accountDetails.map((item,i) => {
                        return(
                        <tr key={i}>
                        <td> {item.accountNumber}</td>
                        <td>{item.accountType}</td>
                        <td>{item.creationDatea}</td>
                        <td>{item.balance}</td>
                        </tr>
                        )})}
                    </tbody>
                </table> 
            </div>
        )
    }
}
export default UserPage;