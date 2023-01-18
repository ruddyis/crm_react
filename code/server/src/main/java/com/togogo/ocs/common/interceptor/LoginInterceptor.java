package com.togogo.ocs.common.interceptor;

import com.togogo.ocs.login.entity.User;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginInterceptor implements HandlerInterceptor {

    /**
     * Controller方法处理之前
     * Interceptor拦截器是链式的，可以同时存在多个Interceptor，然后SpringMVC会根据声明的前后顺序一个接一个的执行
     * SpringMVC的这种Interceptor链式结构也是可以进行中断的，这种中断方式是令preHandle的返回值为false，当preHandle的返回值为false的时候整个请求就结束了
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session =request.getSession();
        //统一拦截（查询当前session是否存在user）
        User user = (User) session.getAttribute("user");
        if (user != null) {
            //放行
            return true;
        }
        //拦截，未登录，跳转到登录页面
        request.setAttribute("msg","请登录后重新访问");
        request.getRequestDispatcher("/login.html").forward(request ,response);
        return false;

    }

    /**
     * Controller方法处理完之后，DispatcherServlet进行视图的渲染之前，也就是说在这个方法中你可以对ModelAndView进行操作
     * 链式Intercepter情况下，Intercepter按照声明的顺序倒着执行
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    /**
     * preHandle返回true
     * 该方法将在整个请求完成之后，也就是DispatcherServlet渲染了视图执行（这个方法的主要作用是用于清理资源的）
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }

}
