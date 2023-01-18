package com.togogo.ocs.login.service;

import com.togogo.ocs.common.util.CommonException;
import com.togogo.ocs.login.entity.User;
import com.togogo.ocs.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;

/**
 * 登录管理业务逻辑实现类
 * @author xgb
 * @date 2022年9月14日
 */
@Service
public class LoginServiceImpl implements LoginService{

    @Autowired
    UserRepository userRepository;

    /**
     * 验证登录
     * @author xgb
     * @date 2022年9月14日
     * @param userName
     * @return
     */
    @Override
    public String login(HttpSession session, String userName, String password) throws Exception{
        String result = "";
        if(userName.trim().equals("")){
            throw new CommonException(21);
        }
        if(password.trim().equals("")){
            throw new CommonException(22);
        }
        //查询用户
        User user = userRepository.findByUserName(userName);
        if(user == null || !password.equals(user.getPassword())){
            System.out.println("用户名或密码错误");
            throw new CommonException(20);
        }
        session.setAttribute("user",user);
        return  result;
    }
}
