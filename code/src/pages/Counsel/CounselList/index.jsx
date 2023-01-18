import React, { Component } from 'react';
// import MySelect from '../../../components/MySelect/MySelect';
import './style.less'

export default class Counsel extends Component {
  render() {
    return (
        <div className="screen-box">
         <div className="form-group top-time-group">
           <label>日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期:</label>
           <input className="min-input startDate-input date-input" type="text" autoComplete="off" />
           <span className="screen-span">-</span>
           <input className="min-input endDate-input date-input" type="text" autoComplete="off" />
           <div className="form-select mySelect" id="time-select"></div>
         </div>
           <div className="form-group bottom-form-group counsel-form-section">
             <label>部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门:</label>
             <div className="form-select mySelect" id="section-select" data=""></div>
           </div>
           <div className="form-group bottom-form-group counsel-form-follow">
             <div className="form-select mySelect" id="entere-select" data=""></div>
             <input type="text" data="" className="followerInputs" id="user_select" autoComplete="off" />
           </div>
         <div className="form-group top-form-group">
           <label>咨询课程:</label>
           <div className="form-select" id="course-select" data="">
           </div>
         </div>
         <div className="form-group top-form-group">
			<label>咨询课程:</label>
			<div className="form-select" id="course-select" data="">
			</div>
		</div>
		<div className="form-group bottom-form-group counsel-form-course ">
			<label>咨询项目:</label>
			<div className="form-select mySelect" id="courseType-select" data=""></div>
		</div>
		<div className="form-group top-form-group ">
			<label>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</label>
			<input className="form-input name-input" type="text" autoComplete="off" maxLength="20"/>
		</div>
		<div className="form-group top-form-group">
			<label>电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话:</label>
			<input className="form-input phone-input" type="text" autoComplete="off" maxLength="20"/>
		</div>
		<div className="form-group top-form-group counsel-form-qq">
			<label>Q&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Q:</label>
			<input className="form-input qq-input" type="text" autoComplete="off" maxLength="20"/>
		</div>
		<div
			className="form-group bottom-form-group ">
			<label>微&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信:</label>
			<input className="form-input wechat-input" type="text" autoComplete="off" maxLength="20"/>
		</div>
		<div className="form-group top-form-group ">
			<label>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:</label>
			<input className="form-input email-input" type="text" autoComplete="off" maxLength="20"/>
		</div>
		<div className="form-group bottom-form-group ">
			<label>分配状态:</label>
			<div className="form-select mySelect" id="status-select" autoComplete="off"></div>
		</div>
        <div className="form-group bottom-form-group ">
          <label>报名状态:</label>
          <div className="form-select mySelect" id="educationStatus" ></div>
        </div>
        <div className="form-group bottom-form-group counsel-form-name">
          <label>证件号码:</label>
          <input className="form-input certNumber-input" type="text"  autoComplete="off" maxLength="30" />
        </div>
        <div className="form-group bottom-form-group counsel-form-qq">
			<label>毕业状态:</label>
			<div className="form-select mySelect" id="graduactionStatus-select" ></div>
		</div>
		<div className="form-group bottom-form-group">
			<label>毕业学校:</label>
			<input className="form-input schoolName-input" type="text" autoComplete="off" maxLength="50"/>
		</div>
		<div className="form-group bottom-time-group">
			<label>毕业年份:</label>
			<input className="min-input graducation-start-input" type="text" autoComplete="off" />
			<span className="screen-span">-</span>
			<input className="min-input graducation-end-input" type="text" autoComplete="off" />
		</div>
		<div className="form-group bottom-form-group ">
			<label>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历:</label>
			<div className="form-select mySelect" id="education-select" ></div>
		</div>
		<div
			className="form-group bottom-form-group">
			<label>工作单位:</label>
			<input className="form-input workplace-input" type="text" autoComplete="off" maxLength="40"/>
		</div>
		<div className="form-group bottom-time-group counsel-form-qq">
			<label>所在地区:</label>
			<div className="form-select min-select mySelect" id="province-select" ></div>
			<div className="form-select min-select mySelect" id="city-select" ></div>
		</div>
		<div
			className="form-group bottom-form-group">
			<label>数据来源:</label>
			<div className="form-select mySelect" id="from-select" ></div>
		</div>
		<div
			className="form-group bottom-form-group ">
			<label>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;签:</label>
			<input className="form-input lable-input" type="text" autoComplete="off" maxLength="50"/>
		</div>
		<div className="form-group bottom-form-group ">
			<label>学员属性:</label>
			<div className="form-select mySelect" id="businessModel-select" autoComplete="off"></div>
		</div>
		<div className="form-group bottom-form-group ">
			<label>客户等级:</label>
			<div className="form-select mySelect" id="customerLevel-select" autoComplete="off"></div>
		</div>
		<div className="form-group top-time-group counsel-form-qq formFollow_time_input">
			<label>跟进时间:</label>
			<input className="min-input startPlanFollowDate-input dates-input" type="text" autoComplete="off" />
				<span className="screen-span">-</span>
			<input className="min-input endPlanFollowDate-input dates-input" type="text" autoComplete="off" />
			<div className="form-select mySelect" id="follow-select"></div>
		</div>
		<div className="form-group bottom-form-group counsel-form-qq counsel_from_order">
			<label>咨询单号:</label>
			<input className="form-input counselId-select" type="text" autoComplete="off" maxLength="19"/>
		</div>
		<div className="form-group bottom-form-group counsel-form-qq counsel_from_order_list">
			<label>有效量:</label>
			<div className="form-select mySelect" id="isValid-select"  autoComplete="off"></div>
		</div>
	<input type="button" className="more-search" value="更多筛选" data="0" />
	<input type="button" className="search-btn" value="查询" />
	<input type="button" className="clear-btn" value="清空" />
	<div className="line-shuttle"></div>
       </div>
    );
  }
}

