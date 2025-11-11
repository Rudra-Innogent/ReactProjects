package com.innogent.E_Commerce.mapper;

import com.innogent.E_Commerce.dto.OrderRequestDto;
import com.innogent.E_Commerce.dto.OrderResponseDto;
import com.innogent.E_Commerce.entity.Order;
import com.innogent.E_Commerce.entity.OrderItem;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderMapper {


      // Converts OrderRequestDto to Order Entity

    public Order toEntity(OrderRequestDto dto) {
        if (dto == null) {
            return null;
        }

        Order order = new Order();
        order.setId(dto.getId());
        order.setName(dto.getName());
        order.setContactNumber(dto.getContactNumber());
        order.setDateOfOrder(LocalDateTime.now());
        order.setTotal(dto.getTotal());

        // Map AddressDto to DeliveryAddress
        if (dto.getAddress() != null) {
            Order.DeliveryAddress deliveryAddress = new Order.DeliveryAddress(
                dto.getAddress().getName(),
                dto.getAddress().getPhone(),
                dto.getAddress().getAddressLine(),
                dto.getAddress().getCity(),
                dto.getAddress().getPincode()
            );
            order.setDeliveryAddress(deliveryAddress);
        }

        // Map OrderItems
        if (dto.getItems() != null) {
            List<OrderItem> orderItems = dto.getItems().stream()
                .map(itemDto -> {
                    OrderItem orderItem = new OrderItem(
                        order,
                        itemDto.getId(), // itemId = product id
                        itemDto.getTitle(),
                        itemDto.getImage(),
                        itemDto.getPrice(),
                        itemDto.getQty() // quantity
                    );
                    return orderItem;
                })
                .collect(Collectors.toList());
            order.setOrderItems(orderItems);
        }

        return order;
    }

    /**
     * Converts Order Entity to OrderResponseDto
     */
    public OrderResponseDto toResponseDto(Order order) {
        if (order == null) {
            return null;
        }

        OrderResponseDto dto = new OrderResponseDto();
        dto.setId(order.getId());
        dto.setName(order.getName());
        dto.setContactNumber(order.getContactNumber());
        dto.setDate(order.getDateOfOrder());
        dto.setStatus(order.getStatus() != null ? order.getStatus() : "Ordered");
        dto.setTotal(order.getTotal());

        // Map DeliveryAddress to AddressDto
        if (order.getDeliveryAddress() != null) {
            OrderResponseDto.AddressDto addressDto = new OrderResponseDto.AddressDto(
                order.getDeliveryAddress().getName(),
                order.getDeliveryAddress().getPhone(),
                order.getDeliveryAddress().getAddressLine(),
                order.getDeliveryAddress().getCity(),
                order.getDeliveryAddress().getPincode()
            );
            dto.setAddress(addressDto);
        }

        // Map OrderItems
        if (order.getOrderItems() != null) {
            List<OrderResponseDto.OrderItemDto> itemDtos = order.getOrderItems().stream()
                .map(orderItem -> {
                    OrderResponseDto.OrderItemDto itemDto = new OrderResponseDto.OrderItemDto();
                    itemDto.setId(orderItem.getId());
                    itemDto.setItemId(orderItem.getItemId());
                    itemDto.setTitle(orderItem.getTitle());
                    itemDto.setImage(orderItem.getImage());
                    itemDto.setPrice(orderItem.getPrice());
                    itemDto.setQuantity(orderItem.getQuantity());
                    return itemDto;
                })
                .collect(Collectors.toList());
            dto.setItems(itemDtos);
        }

        return dto;
    }
}

