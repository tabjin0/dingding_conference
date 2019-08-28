package com.repository;

import com.entity.RobotMsg;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RobotMsgRepository extends JpaRepository<RobotMsg, String> {
}
