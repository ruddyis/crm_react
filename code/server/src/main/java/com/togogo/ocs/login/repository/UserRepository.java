package com.togogo.ocs.login.repository;

import com.togogo.ocs.login.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {


    User findByUserName(String userName);


}
