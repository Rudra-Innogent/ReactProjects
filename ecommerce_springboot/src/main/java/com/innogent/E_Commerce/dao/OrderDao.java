package com.innogent.E_Commerce.dao;

import com.innogent.E_Commerce.OrderRepo.OrderItemRepository;
import com.innogent.E_Commerce.OrderRepo.OrderRepository;
import com.innogent.E_Commerce.entity.Order;
import com.innogent.E_Commerce.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class OrderDao {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }
    
    public List<Order> findAllOrders() {
        return orderRepository.findAllByOrderByDateOfOrderDesc();
    }
    
    public Optional<Order> findOrderById(Long id) {
        return orderRepository.findById(id);
    }
    
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
    
    public List<OrderItem> findOrderItemsByOrderId(Long orderId) {
        return orderItemRepository.findByOrder_Id(orderId);
    }
    
    public void saveOrderItems(List<OrderItem> orderItems) {
        orderItemRepository.saveAll(orderItems);
    }
}

