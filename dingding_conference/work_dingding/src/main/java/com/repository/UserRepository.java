package com.repository;

import com.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


/**
 * @ClassName UserRepository
 * @Description
 * @Author tabjin
 */
public interface UserRepository extends JpaRepository<User, String> {

}
