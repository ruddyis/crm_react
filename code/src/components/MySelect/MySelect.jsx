import React, { Component } from 'react';
import './style.less'

/*
@params options 选项
@params onChange 选项选中后的操作函数，onChange触发时返回单个option对象
@params setResult 设置默认选项
*/
export default class MySelect extends Component {
    constructor(props){
        super(props)
        this.state = {
            mySelectOptions: props.options, // 下拉选项
            isShowOptions: false, // 是否显示下拉款
            selectedLabel: props.options[0].label, // 被选中项的label
            result: props.options[0], // 被选中项
        }
        this.initOptions = this.initOptions.bind(this)
        this.blurInput = this.blurInput.bind(this)
        this.selected = this.selected.bind(this)
    }
    // 初始化下拉框
    initOptions(){
        this.setState({
            isShowOptions: true
        })
    }
    // 当被选框失去焦点时
    blurInput(){
        this.setState({
            isShowOptions: false
        })
    }
    // 选项被选中时
    selected(e){
        this.setState({
            selectedLabel: e.target.innerText,
            isShowOptions: false,
        })
        this.forEachOptionsHandle(e.target.innerText, () => {
            if(this.props.onChange !== undefined && typeof(this.props.onChange) === 'function'){
                this.props.onChange(this.state.result)
            }
        })
    }
    forEachOptionsHandle(label,func){
        var length = this.state.mySelectOptions.length
        for(let i = 0; i < length; i++){
            if(this.state.mySelectOptions[i].label === label){
                this.setState({
                    result: this.state.mySelectOptions[i]
                }, func)
            }
        }
    }
    // componentDidMount() 方法在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在 componentDidMount() 方法中。
    componentDidMount(){
        if(this.props.setResult !== undefined){
            this.forEachOptionsHandle(this.props.setResult,() => {
                this.setState({
                    selectedLabel: this.props.setResult
                })
            })
        }
        if (this.props.onRef !== undefined) {
            this.props.onRef(this);
        }
    }
    getResult(){
        return this.state.result
    }
    render() {
        return (
            <div className="my-select" tabIndex="0" onBlur={this.blurInput}>
                <div className="inputWrap" onClick={this.initOptions}>
                    <p>{this.state.selectedLabel}</p>
                    <i className={this.state.isShowOptions ? "fa-angle-up" : "fa-angle-down"}></i>
                </div>
                <ul ref="mySelectOption" className={`mySelect-option ${this.state.isShowOptions ? "showOptions" : "hideOptions"}` } >
                    {
                        this.state.mySelectOptions.map((item,index) => {
                            return(
                                <li key={item.value} onClick={(e) => this.selected(e)}>{item.label}</li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}
