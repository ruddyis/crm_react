import React from 'react';
import './style.less'
import Drag from '../../components/Drag'
import { useState, useEffect } from 'react';

export default function Overview() {

  // 点击更多触发
  const moreClick = () => {
    console.log('tell me which num')
  }
  // 点击待处理触发
  const clickPendingNum = () => {
    console.log('overview 点击待处理数量')
  }
  // 改变位置提示条的显隐
  const [moveHoverOrder, setMoveHoverOrder] = useState(-1)
  const changeMoveHover = (value) => {
    setMoveHoverOrder(value)
  }
  
  // currentOrder: 被拖拽元素的data-order, targetOrder: 目标元素的data-order
  const [sortArr, setSortArr] = useState([0,1,2,3])
  var sort1 = sortArr.slice() // 浅复制数组
  const getTargetOrder = (currentOrder, targetOrder) => {
    if(targetOrder !== -1){
      // 拖拽元素在sort1数组中的位置
      var currentIndex = sort1.indexOf(currentOrder)
      // 目标元素在sort1中的位置
      var targetIndex = sort1.indexOf(targetOrder)
      if(currentIndex < targetIndex){
        // 拖拽元素在前，先增后减
        sort1.splice(targetIndex+1, 0, currentOrder)
        sort1.splice(currentIndex,1)
      }else if(currentIndex > targetIndex){ // 目标元素在前，先减后增
        sort1.splice(currentIndex,1)
        sort1.splice(targetIndex+1, 0, currentOrder)
      }
      // 至关重要的一步，不能使用setSortArr(sort1)，否则sortArr指向的内存地址不变，不会立即更新视图
      setSortArr([...sort1])
    }
  }
 
  // 获取到order对应的类型大小
  const getSizeFromOrder = (size, order) => {
    // console.log('size', size, 'order', order)
    var optionsArr = [optionOne, optionTwo, optionThree, optionFour]
    optionsArr.forEach((item) => { 
      if(item['data-order'] === order) { 
        var changeItem = {...item, dragSize: size}
        if(item['data-order'] === 0){
          setOptionOne(changeItem)
        }else if(item['data-order'] === 1){
          setOptionTwo(changeItem)
        }else if(item['data-order'] === 2){
          setOptionThree(changeItem)
        }else if(item['data-order'] === 3){
          setOptionFour(changeItem)
        }
      }
    })  
  }

  var [optionOne, setOptionOne] = useState({
    sizeOptions: ['small', 'middle', 'great', 'relax', 'giant'],
    dragSize: "small",
    title:'第0个dragDiv',
    "data-order": 0,
    getTargetOrder: getTargetOrder,
    changeMoveHover: changeMoveHover,
    getSizeFromOrder: getSizeFromOrder,
    childrenNode: () => {
      return (
        <>
          <div style={{height: '100px',width: '100px', backgroundColor:'red'}}></div>
        </>
      )
    }
  })
  var [optionTwo, setOptionTwo] = useState({
    sizeOptions: ['small', 'middle', 'great', 'relax', 'giant'],
    dragSize: "small",
    title:'第1个dragDiv',
    pendingNum: 2,
    "data-order": 1,
    clickPendingNum:clickPendingNum,
    moreClick: moreClick,
    getTargetOrder: getTargetOrder,
    changeMoveHover: changeMoveHover,
    getSizeFromOrder: getSizeFromOrder,
    childrenNode: () => {
      return (
        <>
          <div style={{height: '100px',width: '100px', backgroundColor:'orange'}}></div>
        </>
      )
    }
  })
  var [optionThree, setOptionThree] = useState({
    sizeOptions: ['small', 'middle', 'great', 'relax', 'giant'],
    dragSize: "small",
    title:'第2个dragDiv',
    pendingNum: 3,
    "data-order": 2,
    clickPendingNum:clickPendingNum,
    getTargetOrder: getTargetOrder,
    changeMoveHover: changeMoveHover,
    getSizeFromOrder: getSizeFromOrder,
    childrenNode: () => {
      return (
        <>
          <div style={{height: '100px',width: '100px', backgroundColor:'blue'}}></div>
        </>
      )
    }
  })
  var [optionFour, setOptionFour] = useState({
    sizeOptions: ['small', 'middle', 'great', 'relax', 'giant'],
    dragSize: "small",
    title:'第3个dragDiv',
    pendingNum: 4,
    "data-order": 3,
    clickPendingNum:clickPendingNum,
    getTargetOrder: getTargetOrder,
    changeMoveHover: changeMoveHover,
    getSizeFromOrder: getSizeFromOrder,
    childrenNode: () => {
      return (
        <>
          <div style={{height: '100px',width: '100px', backgroundColor:'green'}}></div>
        </>
      )
    }
  })

  const [componentsArr, setComponentsArr] = useState([]) 
  useEffect(() => {
    var oComponentArr = []
    sortArr.forEach((item1) => {
      [optionOne, optionTwo, optionThree, optionFour].forEach((item2) => {
        item2['data-order'] === item1 && oComponentArr.push(item2)
      })
    })
    setComponentsArr(oComponentArr)
  }, [sortArr, optionOne, optionTwo, optionThree, optionFour, moveHoverOrder]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="overview">
      {
        componentsArr.map((item) => {
            return <Drag key={item["data-order"]} options={item} dragSize={item.dragSize} showMoveHover={moveHoverOrder}>{item.childrenNode()}</Drag>
        })
      }
    </div>
  );
}
