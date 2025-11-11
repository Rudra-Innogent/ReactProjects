package com.innogent.E_Commerce.service;

import com.innogent.E_Commerce.dao.OrderDao;
import com.innogent.E_Commerce.dto.OrderRequestDto;
import com.innogent.E_Commerce.dto.OrderResponseDto;
import com.innogent.E_Commerce.entity.Order;
import com.innogent.E_Commerce.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    
    @Autowired
    private OrderDao orderDao;
    
    @Autowired
    private OrderMapper orderMapper;

    @Override
    public OrderResponseDto createOrder(OrderRequestDto orderRequestDto) {
        Order order = orderMapper.toEntity(orderRequestDto);
        Order savedOrder = orderDao.saveOrder(order);
        
        // Update status based on time
        savedOrder.updateStatus();
        savedOrder = orderDao.saveOrder(savedOrder);
        
        return orderMapper.toResponseDto(savedOrder);
    }

    @Override
    public List<OrderResponseDto> findAllOrders() {
        List<Order> orders = orderDao.findAllOrders();
        
        // Update status for all orders
        orders.forEach(order -> {
            order.updateStatus();
            orderDao.saveOrder(order);
        });
        
        return orders.stream()
                .map(orderMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<OrderResponseDto> findOrderById(Long id) {
        Optional<Order> order = orderDao.findOrderById(id);
        
        if (order.isPresent()) {
            Order orderEntity = order.get();
            // Update status based on time
            orderEntity.updateStatus();
            orderEntity = orderDao.saveOrder(orderEntity);
            return Optional.of(orderMapper.toResponseDto(orderEntity));
        }
        
        return Optional.empty();
    }

    @Override
    public void deleteOrder(Long id) {
        orderDao.deleteOrder(id);
    }

    @Override
    public void updateOrderStatus(Long id) {
        Optional<Order> orderOpt = orderDao.findOrderById(id);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.updateStatus();
            orderDao.saveOrder(order);
        }
    }
}

