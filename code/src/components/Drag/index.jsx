/* 
 @params title:移动块的标题
 @params pendingNum:待处理数据的数量
 @params clickPendingNum:点击待处理数量触发的函数
*/

import React, { Component } from 'react';
import './style.less'

export default class Drag extends Component {
  constructor(props){
      super(props)
      this.state = {
        // dragSize: {...props.options}.dragSize, // 移动块的大小类型，小：small、中：middle、大：great、宽：relax、巨：giant
        sizeOptions: {...props.options}.sizeOptions, // 父组件传递过来的大小型号的选项，默认第一个是初始型号
        allow_drag: false, // 是否允许拖拽
        currentOrder: 0, // 被拖拽元素的data-order
        targetOrder: -1, // 目标元素的data-order
        moveOrder: 0, // 移动过程中途径元素的order，用于控制位置提示条的显隐
        origin_left: 0, // 被拖拽元素原始相对于视图的X坐标
        origin_top: 0, // 被拖拽元素原始相对于视图的Y坐标
        mouse_left: 0, // 鼠标相对于视图的x坐标
        mouse_top: 0, // 鼠标相对于视图的y坐标
        fixed_left: 0, // 鼠标相对于元素的X坐标
        fixed_top: 0, // 鼠标相对于元素的Y坐标
        move_x: 0, // 元素相对于父元素的left
        move_y: 0, // 元素相对于父元素的top
        aPos: [], // 各个移动块的位置
      }
      this.mouseDown = this.mouseDown.bind(this)
      this.mouseMove = this.mouseMove.bind(this)
      this.mouseUp = this.mouseUp.bind(this)
      this.findNearest = this.findNearest.bind(this)
      this.getPosition = this.getPosition.bind(this)
      this.pauseEvent = this.pauseEvent.bind(this)
  }

  // 开始拖拽事件
  mouseDown(e){
    this.pauseEvent(e);
    // 鼠标按下时元素放大部分的宽度
    var scaleWidth = e.target.closest('.move_block').offsetWidth * 0.05
    if(!this.state.allow_drag){
      this.setState({
        currentOrder: parseInt(e.target.closest('.blockAndBg').dataset.order),
        allow_drag: true,
        origin_left: this.getPosition(e.target.closest('.blockAndBg')).left,
        origin_top: this.getPosition(e.target.closest('.blockAndBg')).top,
        fixed_left: e.pageX+document.getElementsByClassName('right-container')[0].scrollLeft - this.getPosition(e.target.closest('.blockAndBg')).left + scaleWidth / 2,
        fixed_top: e.pageY+document.getElementsByClassName('right-container')[0].scrollTop - this.getPosition(e.target.closest('.blockAndBg')).top
      },() => {
        // 获取页面中所有移动块的位置
        var arrPos = []
        // 不能在遍历中改变aPos的状态，因为setState是异步更新的，改变的状态全都是最后的值
        document.querySelectorAll('.blockAndBg').forEach((item, index) => {
          arrPos.push(
            {
              left: item.offsetLeft, 
              right: item.offsetLeft+ item.offsetWidth,
              top: item.offsetTop + document.getElementsByClassName('top')[0].offsetHeight, 
              bottom: item.offsetTop + document.getElementsByClassName('top')[0].offsetHeight + item.offsetHeight
            }
          )
        })
        this.setState({
          aPos: arrPos
        }, () => {
          // 监听移动事件
          document.onmousemove = (event) => {
            this.mouseMove(event)
          }
        })
      })
    }
  }
  // 鼠标移动事件
  mouseMove(e){
    this.pauseEvent(e);
    if(this.state.allow_drag){
      // 获取鼠标移动的x，y坐标
      this.setState({
        mouse_left: e.pageX+document.getElementsByClassName('right-container')[0].scrollLeft,
        mouse_top: e.pageY+document.getElementsByClassName('right-container')[0].scrollTop,
        // 鼠标移动的x - (鼠标相对于元素在x轴上的距离 + blockAndBg的left值 ) = 元素absolute的left值
        move_x: e.pageX+document.getElementsByClassName('right-container')[0].scrollLeft - this.state.fixed_left - this.state.origin_left, 
        move_y: e.pageY+document.getElementsByClassName('right-container')[0].scrollTop - this.state.fixed_top - this.state.origin_top
      },()=>{
        this.findNearest()
      })
    }
  }
  // 结束拖拽事件
  mouseUp(e){
    // 必须先删除mousemove事件,并且取消冒泡，否则可能会无法实现鼠标抬起事件
    document.onmousemove = null
    this.pauseEvent()
    this.setState({
      allow_drag: false,
      move_x: 0,
      move_y: 0
    },() => {
      // 调用父元素的getTargetOrder方法传递给父元素拖拽对象的order和目标对象的order
      this.props.options.getTargetOrder(this.state.currentOrder, this.state.targetOrder)
      // 将位置提示条隐藏
      this.props.options.changeMoveHover(-1)
    })      
  }
  findNearest(){
    this.state.aPos.forEach((item, index) => {
      if(this.state.mouse_left > item.left && this.state.mouse_left < item.right && this.state.mouse_top < item.bottom && this.state.mouse_top > item.top){
        // 目标元素
        var targetMove = document.querySelectorAll('.blockAndBg')[index]
        var orderBy = parseInt(targetMove.dataset.order)
        this.setState({
          targetOrder: orderBy,
          moveOrder: orderBy
        },() => {
          this.props.options.changeMoveHover(this.state.moveOrder)
        })
      }
    })
  }
  // 获取元素到文档区域的坐标
  getPosition(element){
    if(element != null){
      var rec = element.getBoundingClientRect(),
      _x = rec.left, // 获取元素相对浏览器视窗window的左、上坐标
      _y = rec.top;
      // 与html或body元素的滚动距离相加就是元素相对于文档区域document的坐标位置
      _x += document.getElementsByClassName('right-container')[0].scrollLeft;
      _y += document.getElementsByClassName('right-container')[0].scrollTop;
      return {
        left: _x,
        top: _y
      };
    }
  }
  // 阻止事件冒泡, 不仅仅要stopPropagation，还要preventDefault
  pauseEvent(e){ 
    e=e || window.event;
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
  }
  render() {
    return (
      <div className={`blockAndBg ${this.props.dragSize}`} data-order={this.props.options['data-order']}>
        <div className={`bg ${!this.state.allow_drag ? "hide": ''}`}></div>
        <div className="move_block list-divs-big" style={this.state.allow_drag ? {"zIndex": 999, transform:'scaleX(1.05)', opacity: 0.5, left: this.state.move_x, top: this.state.move_y} : null}>
          <div className="list-div-top">
              <span className="textcor" onClick={this.props.options.clickPendingNum}>
                {this.props.options.title} 
                {this.props.options.pendingNum ? "(" : null}<i className='clientNum'>{this.props.options.pendingNum}</i>{this.props.options.pendingNum ? ")" : null}
              </span>
              <div className="right_bet" onMouseUp={e => this.mouseUp(e)}>
                  <span className="moveBtn" title="移动" onMouseDown={this.mouseDown}></span>
                  {this.props.options.moreClick ? <span className="moreClient" onClick={this.props.options.moreClick}>更多</span> : null}
                  <div className="install_border">
                      <div className="install_size"></div>
                      <div className="border_size visitors_size">
                          <div className={`small-line ${this.state.sizeOptions.indexOf("small") !== -1 ? 'show-flex' : 'hide'}`} onClick={() => {
                              this.props.options.getSizeFromOrder('small', this.props.options['data-order'])
                          }}>
                              <i className="iocsmall"></i>
                              <span>小</span>
                          </div>
                          <div className={`middle-line ${this.state.sizeOptions.indexOf("middle") !== -1 ? 'show-flex' : 'hide'}`} onClick={() => {
                              this.props.options.getSizeFromOrder('middle', this.props.options['data-order'])
                          }}>
                              <i className="iocmiddle"></i>
                              <span>中</span>
                          </div>
                          <div className={`great-line ${this.state.sizeOptions.indexOf("great") !== -1 ? 'show-flex' : 'hide'}`} onClick={() => {
                              this.props.options.getSizeFromOrder('great', this.props.options['data-order'])
                          }}>
                              <i className="iocgreat"></i>
                              <span>大</span>
                          </div>
                          <div className={`relax-line ${this.state.sizeOptions.indexOf("relax") !== -1 ? 'show-flex' : 'hide'}`} onClick={() => {
                              this.props.options.getSizeFromOrder('relax', this.props.options['data-order'])
                          }}>
                              <i className="iocrelax"></i>
                              <span>宽</span>
                          </div>
                          <div className={`giant-line ${this.state.sizeOptions.indexOf("giant") !== -1 ? 'show-flex' : 'hide'}`} onClick={() => {
                              this.props.options.getSizeFromOrder('giant', this.props.options['data-order'])
                          }}>
                              <i className="iocgiant"></i>
                              <span>巨</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div>{this.props.children}</div>
        </div>
        {
          this.props.showMoveHover === this.props.options['data-order']  && <div className="mousehover"></div>
        }
      </div>
    );
  }
}
