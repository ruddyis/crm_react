import React, { useState, useEffect } from 'react';
import './style.less'
import { Link } from 'react-router-dom'

export default function TopHeader() {
  const [isShowMenuSet, setIsShowMenuSet] = useState(false);
  function clickTopRightHandle(){
    setIsShowMenuSet(!isShowMenuSet)
  }
  function hideMenuSet(e){
    if(!e.target.closest('.top-right')){
      setIsShowMenuSet(false)
    }
  }

  useEffect(()=>{
      document.addEventListener('click',(e) => hideMenuSet(e),true)
  },[])

  useEffect(()=>{
    return document.removeEventListener('click',(e) => hideMenuSet(e),true)
  },[])
  
  return (
    <div className="top clearfix">
      <div className="top-left">
          <img className="logo" src={require("../../assets/images/white-title.png")} alt="" />
          <Link to="/index">营运协同系统</Link>
          <img className="area-logo" src={require("../../assets/images/area.png")} alt="" />
          <span className="top-area">广州</span>
      </div>
      <div className="top-right" onClick = {clickTopRightHandle}>
        <img className="top-img" src={require("../../assets/images/user-icon.png")} alt="" />
        <div className="top-name">
          <div>
            <span className="top-user">吴京</span>
            <span className="top-post">财务人事及营运发展部</span>
          </div>
          <div className={`menu-set ${isShowMenuSet ? 'show' : ''}`}>
            <div className="menu-set-list" style={{display:(isShowMenuSet ? 'block' : 'none')}}>
              <a href="/#">个人资料</a>
              <a href="/#">修改密码</a>
              <p className="line-p"></p>
              <a href="/#">安全退出</a>
            </div>
          </div>
        </div>
      </div>
      <span className="find-question">遇到了问题？
            <a className="solve-question" href="http://192.168.20.21:8080" target="_blank" rel="noopener noreferrer">告诉她</a>
            <div className="bug-tip">
                <i className="tip-arrow"></i>
                需连接公司wifi或网络，才能访问bug管理系统
            </div>
        </span>
    </div>
  );
}
