package com.innogent.E_Commerce.service;

import com.innogent.E_Commerce.dao.ProductDao;
import com.innogent.E_Commerce.dto.ProductResponseDto;
import com.innogent.E_Commerce.entity.Product;
import com.innogent.E_Commerce.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    
    @Autowired
    private ProductDao productDao;
    
    @Autowired
    private ProductMapper productMapper;

    @Override
    public List<ProductResponseDto> findAll() {
        List<Product> products = productDao.findAllProducts();
        return products.stream()
                .map(productMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<ProductResponseDto> findById(Integer id) {
        Optional<Product> product = productDao.findById(id);
        return product.map(productMapper::toResponseDto);
    }

    @Override
    public List<ProductResponseDto> findByCategory(String category) {
        List<Product> products = productDao.findByCategory(category);
        return products.stream()
                .map(productMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<String> findAllCategories() {
        return productDao.findAllCategories();
    }
}
