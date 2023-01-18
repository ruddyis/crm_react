import React, { Component } from 'react';
import './style.less';
import * as area from '../../assets/js/data/areas';
import MySelect from '../../components/MySelect/MySelect';
// 密码MD5加密
import md5 from 'js-md5';
import Base64  from 'base-64';
import { login } from '../../api/index'
import { useNavigate } from "react-router-dom";

React.Component.prototype.$md5 = md5;

export const withNavigation = (Component) => {
    return (props) => <Component {...props} navigate={useNavigate()}/>
}

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            loginName: '登录',
            userName: '',
            userLength: 0,
            password: '',
            pass: '',
            disableds: false,
            tip: '',
            areas: JSON.parse(JSON.stringify(area)).areas,
            areaNum: ''
        }
    }

    onRef = ref => {
        this.child = ref;
    };
    userNameInput = (e) => {
        this.setState({
            userName: e.target.value
        })
    }
    passWordInput = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    
    componentDidMount(){ 
        //组件挂载时候，注册keypress事件
        document.addEventListener('keypress',this.onkeydown)
    }
    componentWillUmount(){
       //组件卸载时候，注销keypress事件
       document.removeEventListener("keypress",this.onkeydown)
    }

    onkeydown = (e) => {
        if (e.keyCode === 13) {
            this.loginBtn()
        }
    }
    loginBtn = () => {
        this.setState({
            userLength: this.state.userName.length <= 9 ? "0" + this.state.userName.length : this.state.userName.length,
            loginName: '登录中...',
            disableds: true
        })

        if(this.state.userName===""){
            this.setState({
                tip: "用户名不能为空",
                loginName: "登录",
                disableds: false
            })
            return ;
        }
        if(this.state.userName.length<4||this.state.userName.length>30){
            this.setState({
                tip: "用户名为4-30位数字、字母、@字符,区分大小写",
                loginName: "登录",
                disableds: false
            })
            return;
        }else{
            this.setState({
                tip: "",
            })
        }
        let reg = /^[a-zA-Z0-9@]{4,30}$/;
        if(reg.test(this.userName)===false){
            this.setState({
                tip: '用户名格式不正确',
                loginName: "登录",
                disableds: false
            })
            return;
        }
        if(this.state.password===""){
            this.setState({
                tip: "密码不能为空",
                loginName: "登录",
                disableds: false
            })
            return;
        }
        if(this.state.password.length<6||this.state.password.length>30){
            this.setState({
                tip: "密码为6-30位数字、字母、字符,区分大小写",
                loginName: "登录",
                disableds: false
            })
            return;
        }else{
            this.setState({
                tip: "",
            })
        }
        let patrn = /^[a-zA-Z0-9!@#$%^]{6,30}$/;
        if(patrn.test(this.state.password)===false){
            this.setState({
                tip: "密码格式不正确",
                loginName: "登录",
                disableds: false
            })
            return;
        }
        this.setState({
            pass: md5(this.state.password),
            areaNum: this.child.getResult().value
        }, () =>{
            let p=Base64.encode(this.state.userName+this.state.areaNum+this.state.userLength+this.state.pass);
            let dataObj = {_p: p,ajax:1}
            // 发送请求。
            login(dataObj)
                .then((data) => {
                    this.setState({
                        loginName: '登录成功'
                    })
                })
                .catch(err => {
                    this.setState({
                        loginName: '登录失败'
                    })
                    this.props.navigate('/index/overview')
                })
        })
    }
    render() {
        return (
            <div className="main clearfix">
                <img src={require('../../assets/images/title.png')} alt="" className="login_logo" />
                <header className="header">营运协同系统</header>
                <div className="login-content">
                    <div className="sad"></div>
                    <img src={require('../../assets/images/login_bg.png')} className="login_bg" alt="" />
                    <div className="login">
                        <p className="login_p">账号</p>
                        <input type="text" className="login_input" id="login_user" autoComplete="off" placeholder="请输入账号" onInput={this.userNameInput}/>
                        <p className="login_p">密码：</p>
                        <input type="password" className="login_input" id="login_psw" autoComplete="off" placeholder="请输入密码" onInput={this.passWordInput}/>
                        <p className="login_p">区域：</p>
                        <div className="mySelect" id="login_area">
                            <MySelect onRef={this.onRef} options={this.state.areas}></MySelect>
                        </div>
                        <p className="login_tip">{this.state.tip}</p>
                        <button id="login_btn" onClick={this.loginBtn} disabled={this.state.disableds}>{this.state.loginName}</button>
                        <div className="login_version">版本号：V4.4</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withNavigation(Login)
