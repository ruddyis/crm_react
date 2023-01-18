import React, { Component } from 'react';
import TopHeader from '../../components/TopHeader'
import Left from '../../components/Left'
import { Route, Routes } from 'react-router-dom'
import Overview from '../Overview';
import CounselList from '../Counsel/CounselList';

export default class Index extends Component {
  render() {
    return (
      <div>
        <TopHeader></TopHeader>
        <div className="main-container">
          <Left></Left>
          <div className="right-container" style={{backgroundColor: '#f7f7f7'}}>
            <Routes>
              <Route path="/index/overview" element={<Overview></Overview>}></Route>
              <Route path="/counsel/counselList" element={<CounselList></CounselList>}></Route>
            </Routes>
          </div>
        </div>
      </div>
    );
  }
}
