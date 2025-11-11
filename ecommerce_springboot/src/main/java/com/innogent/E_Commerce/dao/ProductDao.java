package com.innogent.E_Commerce.dao;

import com.innogent.E_Commerce.ProductRepo.ProductRepository;
import com.innogent.E_Commerce.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ProductDao {
    
    @Autowired
    private ProductRepository productRepository;

    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }
    
    public List<Product> findByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }
    
    public Optional<Product> findById(Integer id) {
        return productRepository.findById(id);
    }
    
    public List<String> findAllCategories() {
        return productRepository.findAllDistinctCategories();
    }
}
