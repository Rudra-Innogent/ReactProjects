package com.innogent.E_Commerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDto {
    private Long id; // Order ID from frontend
    private String name; // From address container
    private String contactNumber; // From address container
    private AddressDto address; // From address container
    private List<OrderItemDto> items; // Order items
    private Double total; // Total amount

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
        private Integer id; // Product ID (itemId)
        private String title;
        private String image;
        private Double price;
        private Integer qty; // Quantity from frontend
    }
}

