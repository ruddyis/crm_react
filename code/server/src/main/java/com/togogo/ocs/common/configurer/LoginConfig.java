package com.togogo.ocs.common.configurer;

import com.togogo.ocs.common.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//声明这是一个spring boot配置类
@Configuration
public class LoginConfig implements WebMvcConfigurer {
    //设置请求重定向
    //这个方法是用来实现页面跳转控制的 就比如@RequestMapping("/")，然后方法返回的就是setviewName的值
    //这里配置后就不用再去@Controller实现跳转
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("/login");
        registry.addViewController("/login.html").setViewName("/login");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor())
                .addPathPatterns("/**")//所有请求都被拦截包括静态资源
                .excludePathPatterns(
                        //添加不拦截路径
                        "/login",//登录接口
                        "/login.html",//登录页面
                        "/css/**",//css静态资源
                        "/images/**",//images静态资源
                        "/js/**"//js静态资源
                );
    }

}
