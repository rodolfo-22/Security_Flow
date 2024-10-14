package com.uca.project.repositories;

import com.uca.project.domain.entities.Home;
import com.uca.project.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

public interface HomeRepository extends JpaRepository<Home, UUID> {

    @Query("SELECT h FROM Home h JOIN h.users u WHERE u.code = :userId")
    List<Home> findByUserId(@Param("userId") UUID userId);
    
    @Query("SELECT h FROM Home h JOIN h.users u WHERE u = :user")
    Home findByUser(@Param("user") User user);

    Home findByNumHome(String numHome);
}
