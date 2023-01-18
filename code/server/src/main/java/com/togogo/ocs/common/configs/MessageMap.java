package com.togogo.ocs.common.configs;

import java.util.HashMap;

/**
 * 异常反馈信息集合类
 * @author xgb
 * @date 2022年9月16日
 */
public class MessageMap {

    /**
     * 异常信息数据缓存
     */
    private static HashMap<Integer,String> map=new HashMap<Integer,String>();

    /**
     * 依据Id获取异常反馈内容
     * @author xgb
     * @date 2022年9月16日
     * @param id
     * @return
     */
    public static String get(int id){
        if(map.isEmpty()){
            init();
        }
        String message= map.get(id);
        if(message==null){
            //未定义的异常
            message="未定义提示消息的异常: "+id;
        }
        return message;
    }

    /**
     * 定义异常反馈信息
     * @author xgb
     * @data 2022年9月16日
     */
    private static void init(){
        //系统保留的异常代号0-99
        map.put(10,"其他未处理的异常" );
        map.put(11,"连接超时" );
        map.put(12, "自定义消息");
        map.put(13, "日期格式错误");
        map.put(14, "无效短信验证码，请重新获取！");
        map.put(15, "短信验证码已失效，请重新获取！");
        map.put(16, "手机号与短信验证码不匹配！");
        map.put(17, "短信验证码错误！");
        map.put(18, "发送信息参数个数不正确！");
        map.put(19, "发送短信失败！");
        map.put(20, "用户名或密码不正确！");
        map.put(21, "请输入用户名！");
        map.put(22, "请输入密码！");

        //咨询管理模块
        map.put(200,"咨询量不存在");
        map.put(201,"该咨询量无需审批");

    }
}
