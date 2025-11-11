package com.innogent.E_Commerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDto {
    private Long id; // Order ID
    private String name; // Customer name
    private String contactNumber; // Contact number
    private AddressDto address; // Delivery address
    private LocalDateTime date; // Date of order
    private String status; // Order status
    private Double total; // Total amount
    private List<OrderItemDto> items; // Order items

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AddressDto {
        private String name;
        private String phone;
        private String addressLine;
        private String city;
        private String pincode;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemDto {
        private Long id; // OrderItem ID
        private Integer itemId; // Product ID
        private String title;
        private String image;
        private Double price;
        private Integer quantity;
    }
}

