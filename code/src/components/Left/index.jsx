import React from 'react';
import { Link } from 'react-router-dom'

const Left = () => {
    const clickMenuLeftLiHandle = (e) => {
        let allLis = e.target.closest("li").parentNode.children
        for(let i = 0; i < allLis.length; i++){
            allLis[i].classList.remove('on')
        }
        e.target.closest("li").classList.add('on')

        let currentIndex = [].indexOf.call(allLis,e.target.closest("li"))
        let allMenuLists = document.getElementsByClassName('menu-list')[0].childNodes
        let currentMenuList = allMenuLists[currentIndex]
        for(let i = 0; i < allMenuLists.length; i++){
            allMenuLists[i].classList.remove('on')
        }
        currentMenuList.classList.add('on')
    }
  return (
    <div className="menu-box">
      <div className="menu-content">
          <div className="menu-left">
            <div className="menu-index">
                <Link className='menu-home' to="/index/overview">
                    <img src={require('../../assets/images/home.png')} alt="" />
                    <span>首页</span>
                </Link>
                <ul className="menu-left-list">
                    <li onClick={e => clickMenuLeftLiHandle(e)}><span></span>咨询</li>
                    <li onClick={e => clickMenuLeftLiHandle(e)}><span></span>报名</li>
                    <li onClick={e => clickMenuLeftLiHandle(e)}><span></span>教务</li>
                    <li onClick={e => clickMenuLeftLiHandle(e)}><span></span>考务</li>
                    <li onClick={e => clickMenuLeftLiHandle(e)}><span></span>校企</li>
                    <li onClick={e => clickMenuLeftLiHandle(e)}><span></span>财务</li>
                    <li onClick={e => clickMenuLeftLiHandle(e)}><span></span>系统</li>
                </ul>
                <div className="menu-list">
                    <ul className="on">
                        <li className="menu-item">
                            <Link to="/counsel/counselList">咨询库</Link>
                        </li>
                    </ul>
                    <ul>
                        <li className="menu-item">
                            <Link to="">报名库</Link>
                        </li>
                    </ul>
                    <ul>
                        <li className="menu-item">
                            <Link to="">学员库</Link>
                        </li>
                    </ul>
                    <ul>
                        <li className="menu-item">
                            <Link to="">考生库</Link>
                        </li>
                    </ul>
                    <ul>
                        <li className="menu-item">
                            <Link to="">活动管理</Link>
                        </li>
                    </ul>
                    <ul>
                        <li className="menu-item">
                            <Link to="">缴费审批</Link>
                        </li>
                    </ul>
                    <ul>
                        <li className="menu-item">
                            <Link to="">配置</Link>
                        </li>
                    </ul>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
}
export default Left