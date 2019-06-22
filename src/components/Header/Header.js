import React , {Component} from 'react';
import { withTranslation} from 'react-i18next';
import image from './logo1.jpg';
import {withRouter} from 'react-router-dom';

class Header extends Component {
    onChangeEvent = (event) => {
        let { i18n } = this.props;
        i18n.changeLanguage(event.target.value);
      }
    
    redirect = (page) => {
        this.props.redirect(page, this.props.history);
    }
 
    onClickAccount = () => {
        this.props.history.push('/CreateAccount');
    }
    render(){
      let { t } = this.props;
      console.log(this.props)
    return(
        <div className="container-fluid">
            <div className="row" style={{backgroundColor: '#ff6200'}} height="50px">
                <img id="image" src={image} height="80px" width=""  alt=""/>
                <h1 id="h1tag" style={{color: 'white'}} align="center" className="col-sm-6" ><i>{t("header")}</i></h1>
               {    
                    this.props.isLoggedIn ?
                    <button className="col-sm-2" style={{color: 'white'}} className="btn btn-default"  onClick={()=>this.redirect('logout')}>{t("logout")}</button>:
                    <button className="col-sm-2" style={{color: 'white'}} className="btn btn-default"  onClick={()=>this.redirect('login')}>{t("login")}</button>
                    
               }
                
                <button className="col-sm-2" style={{color: 'white'}} className="btn btn-default"  onClick={this.onClickAccount}>{t("account")}</button>
                <select id="select" className="col-sm-2" style={{color: 'white'}} align="right" onChange={this.onChangeEvent}  className="btn btn-default dropdown-toggle">
                    <option value="en">English</option>
                    <option value="sp">Spanish</option>
                </select>
            </div>
        </div>   
    );
    }
}
export default withTranslation()(withRouter(Header));