package com.togogo.ocs.login.service;


import com.togogo.ocs.common.util.CommonException;

import javax.servlet.http.HttpSession;

/**
 * 登录管理业务逻辑接口
 * @author xgb
 * @date 2022年9月14日
 */
public interface LoginService {

    /**
     * 验证登录
     * @author xgb
     * @date 2022年9月14日
     * @param userName
     * @return
     */
    public String login(HttpSession session, String userName, String password) throws Exception;
}
