import React,{Component} from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            loginData : {
                loginName : '',
                password : ''
            }
        }
    }

    handleChangeEvent = (event) => {
        const { loginData } = this.state;
        loginData[event.target.name] = event.target.value;
        this.setState({ loginData });
    }

    onSubmitEvent = (event) => {
        event.preventDefault();
        const { loginData } = this.state;
        console.log(loginData, "asdfgh");
        this.getUserLogin(loginData).then(response => {
            this.props.validateUser(true);
            if(response.data.role === "user"){
                this.props.history.push('/userPage/'+response.data.userId);
            }else{
                this.props.history.push('/adminPage/'+response.data.userId);
            }
        }).catch(error => {
            alert(error.message);
        })

    }
    getUserLogin = (loginData) => {
        return new Promise((resolve, reject) => {
            axios.put('http://10.117.189.18:9091/ingbank/api/login', loginData).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    render(){
        let { t } = this.props;
        return(
            <div className="container">
                <form onSubmit={this.onSubmitEvent}>
                    <div className="form-group row">
                        <label htmlFor="loginName" className="col-sm col-form-label">{t("loginname")}</label>
                            <div className="col-sm">
                                <input type="text" name="loginName" className="form-control" id="loginName" placeholder={t("ploginname")} required
                                    onChange={this.handleChangeEvent} />
                            </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password" className="col-sm col-form-label">{t("password")}</label>
                            <div className="col-sm">
                                <input type="password" name="password" className="form-control" id="password" placeholder={t("ppassword")} required
                                    onChange={this.handleChangeEvent} />
                            </div>
                    </div>
                    <div className="row justify-content-end">
                        <div className="col-6">
                            <button id="btn1" className="btn btn-primary bb" type="submit">{t("login")}</button>
                        </div>
                        <div className="col-6">
                            <button id="btn2" className="btn btn-primary bb1" type="reset">{t("cancel")}</button>
                        </div>
                    </div><br/>
                    <div class="row">
                        <div class="col">
                            <i><b>* New User Click on Apply for Bank Account </b></i>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default withTranslation()(withRouter(Login));