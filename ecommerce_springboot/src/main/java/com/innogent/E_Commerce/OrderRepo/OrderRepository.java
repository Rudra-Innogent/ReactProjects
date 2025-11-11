package com.innogent.E_Commerce.OrderRepo;

import com.innogent.E_Commerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByOrderByDateOfOrderDesc();
}

