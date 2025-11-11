package com.innogent.E_Commerce.mapper;

import com.innogent.E_Commerce.dto.ProductRequestDto;
import com.innogent.E_Commerce.dto.ProductResponseDto;
import com.innogent.E_Commerce.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    // Converts Product Entity to ProductResponseDto

    public ProductResponseDto toResponseDto(Product product) {
        if (product == null) {
            return null;
        }

        ProductResponseDto dto = new ProductResponseDto();
        dto.setId(product.getId());
        dto.setTitle(product.getTitle());
        dto.setPrice(product.getPrice());
        dto.setDescription(product.getDescription());
        dto.setCategory(product.getCategory());
        dto.setImage(product.getImage());

        // Map RatingInfo to RatingDto
        ProductResponseDto.RatingDto ratingDto = new ProductResponseDto.RatingDto();
        ratingDto.setRate(product.getRating());
        ratingDto.setCount(product.getCount());
        dto.setRating(ratingDto);

        return dto;
    }


      // Converts ProductRequestDto to Product Entity

    public Product toEntity(ProductRequestDto dto) {
        if (dto == null) {
            return null;
        }

        Product product = new Product();
        product.setId(dto.getId());
        product.setTitle(dto.getTitle());
        product.setPrice(dto.getPrice());
        product.setDescription(dto.getDescription());
        product.setCategory(dto.getCategory());
        product.setImage(dto.getImage());

        // Map RatingDto to RatingInfo
        if (dto.getRating() != null) {
            product.setRating(dto.getRating().getRate());
            product.setCount(dto.getRating().getCount());
        }
        return product;
    }
}

