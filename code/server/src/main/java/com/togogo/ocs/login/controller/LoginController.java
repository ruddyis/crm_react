package com.togogo.ocs.login.controller;

import com.togogo.ocs.common.util.ExceptionUtil;
import com.togogo.ocs.login.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginController {


    @Autowired
    LoginService loginService;

    /**
     * 登录
     * @author xgb
     * @date 2022年9月14日
     * @param userName
     * @return
     */
    @RequestMapping(value = "/login",method=RequestMethod.POST)
    public Map<String,Object> login(HttpSession session,
                        @RequestParam(name = "userName")String userName,
                        @RequestParam(name = "password")String password) {
        Map<String,Object> map = new HashMap<>();
        try {
            loginService.login(session,userName,password);
            System.out.println("登录");
            map.put("result", "1");
            map.put("message", "success");
        }catch (Exception e){
            map.put("result", "0");
            map.put("message", ExceptionUtil.getExceptionValue(e));
        }
        return map;
    }

    /**
     * 退出登录
     * @author xgb
     * @date 2022年9月14日
     * @param session
     * @return
     */
    @RequestMapping(value = "/outLogin",method = RequestMethod.POST)
    public Map<String,Object> outLogin(Model model,HttpSession session){
        Map<String,Object> map = new HashMap<>();
        try {
            session.removeAttribute("user");
            map.put("result", "1");
            map.put("message", "success");
        }catch (Exception e){
            map.put("result", "0");
            map.put("message", ExceptionUtil.getExceptionValue(e));
        }
        return map;
    }



}
