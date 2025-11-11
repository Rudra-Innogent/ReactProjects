package com.innogent.E_Commerce.service;

import com.innogent.E_Commerce.dto.OrderRequestDto;
import com.innogent.E_Commerce.dto.OrderResponseDto;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    OrderResponseDto createOrder(OrderRequestDto orderRequestDto);
    List<OrderResponseDto> findAllOrders();
    Optional<OrderResponseDto> findOrderById(Long id);
    void deleteOrder(Long id);
    void updateOrderStatus(Long id);
}

