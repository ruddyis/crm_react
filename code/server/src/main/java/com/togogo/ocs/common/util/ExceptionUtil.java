package com.togogo.ocs.common.util;

import com.togogo.ocs.common.configs.MessageMap;

public class ExceptionUtil {

    /**
     * 解析异常代号
     * */
    public static int getExceptionId(Throwable e){
        if(e instanceof CommonException ){
            return ((CommonException) e).getResultCode();
        }
        if(e instanceof RuntimeException){
            return 11;//连接超时
        }else{
            return 10;//其他未处理的异常
        }
    }

    /**
     * 获取异常的提示消息 (BY Exception)
     * */
    public static String getExceptionValue(Throwable e){
        int id=getExceptionId(e);
        if(id==12){
            return e.getMessage();
        }
        if(id==10){
            e.printStackTrace();
        }
        return MessageMap.get(id);
    }
}
