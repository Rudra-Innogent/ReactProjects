package com.innogent.E_Commerce.entity;

import jakarta.persistence.*;
@Entity
@Table(name = "products")
public class Product {

    @Id
    private Integer id; // not auto-generated, manually assigned

    private String title;
    private Double price;
    private String description;
    private String category;
    private String image;

    // Embedded RatingInfo (non-static inner class)
    @Embedded
    private RatingInfo ratingInfo = new RatingInfo();

    public Product() {}

    public Product(Integer id, String title, Double price, String description, String category, String image, Double rating, Integer count) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
        this.ratingInfo = new RatingInfo(rating, count);
    }

    // ============ Getters and Setters ============

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public Double getRating() { return ratingInfo.getRating(); }
    public void setRating(Double rating) { this.ratingInfo.setRating(rating); }

    public Integer getCount() { return ratingInfo.getCount(); }
    public void setCount(Integer count) { this.ratingInfo.setCount(count); }

    public void addNewRating(Double newRating) {
        double total = this.ratingInfo.getRating() * this.ratingInfo.getCount();
        this.ratingInfo.setCount(this.ratingInfo.getCount() + 1);
        this.ratingInfo.setRating((total + newRating) / this.ratingInfo.getCount());
    }

    // ============ Inner Class for Rating Info ============
    @Embeddable
    public static class RatingInfo {
        private Double rating;
        private Integer count;


        public RatingInfo() {
            this.rating = 0.0;
            this.count = 0;
        }

        public RatingInfo(Double rating, Integer count) {
            this.rating = rating;
            this.count = count;
        }

        public Double getRating() { return rating; }
        public void setRating(Double rating) { this.rating = rating; }

        public Integer getCount() { return count; }
        public void setCount(Integer count) { this.count = count; }
    }
}
