package com.innogent.E_Commerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDto {
    private Integer id;
    private String title;
    private Double price;
    private String description;
    private String category;
    private String image;
    private RatingDto rating;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RatingDto {
        private Double rate;
        private Integer count;
    }
}
