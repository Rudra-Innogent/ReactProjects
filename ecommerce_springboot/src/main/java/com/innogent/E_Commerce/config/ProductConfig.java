package com.innogent.E_Commerce.config;

import com.innogent.E_Commerce.CoupanRepo.CouponRepository;
import com.innogent.E_Commerce.ProductRepo.ProductRepository;
import com.innogent.E_Commerce.entity.Coupon;
import com.innogent.E_Commerce.entity.Product;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class ProductConfig {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CouponRepository couponRepository;

    @PostConstruct
    public void init() {
        if (productRepository.count() == 0) {

            List<Product> products = List.of(
                    new Product(1, "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                            109.95, "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                            "men's clothing", "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png", 3.9, 120),

                    new Product(2, "Mens Casual Premium Slim Fit T-Shirts ",
                            22.3, "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
                            "men's clothing", "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png", 4.1, 259),

                    new Product(3, "Mens Cotton Jacket",
                            55.99, "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions like working, hiking, camping, or cycling.",
                            "men's clothing", "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png", 4.7, 500),

                    new Product(4, "Mens Casual Slim Fit",
                            15.99, "Color may differ slightly from screen. Size info should be reviewed carefully.",
                            "men's clothing", "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png", 2.1, 430),

                    new Product(5, "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
                            695.0, "Inspired by the mythical Naga dragon that protects the ocean's pearl.",
                            "jewelery", "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png", 4.6, 400),

                    new Product(6, "Solid Gold Petite Micropave ",
                            168.0, "Designed and sold by Hafeez Center USA. Return or exchange any order within 30 days.",
                            "jewelery", "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png", 3.9, 70),

                    new Product(7, "White Gold Plated Princess",
                            9.99, "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.",
                            "jewelery", "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png", 3.0, 400),

                    new Product(8, "Pierced Owl Rose Gold Plated Stainless Steel Double",
                            10.99, "Rose Gold Plated Double Flared Tunnel Plug Earrings made of 316L Stainless Steel.",
                            "jewelery", "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png", 1.9, 100),

                    new Product(9, "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
                            64.0, "USB 3.0 and USB 2.0 Compatibility, Fast data transfers, and High Capacity.",
                            "electronics", "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png", 3.3, 203),

                    new Product(10, "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
                            109.0, "Faster boot up, shutdown, and application load. Up to 535MB/s read speed.",
                            "electronics", "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png", 2.9, 470)
            );

            productRepository.saveAll(products);
            System.out.println(" Initialized " + products.size() + " products successfully!");
        } else {
            System.out.println(" Products already exist, skipping initialization.");
        }

        // Initialize Coupons
        if (couponRepository.count() == 0) {
            List<Coupon> coupons = List.of(
                    new Coupon(1, "WELCOME10", "ACTIVE", LocalDateTime.now(), LocalDateTime.now(), 10.0),
                    new Coupon(2, "FESTIVE15", "ACTIVE", LocalDateTime.now(), LocalDateTime.now(), 15.0),
                    new Coupon(3, "NEWUSER20", "ACTIVE", LocalDateTime.now(), LocalDateTime.now(), 20.0),
                    new Coupon(4, "SUMMER25", "EXPIRED", LocalDateTime.now().minusMonths(2), LocalDateTime.now(), 25.0),
                    new Coupon(5, "WINTER30", "ACTIVE", LocalDateTime.now(), LocalDateTime.now(), 30.0),
                    new Coupon(6, "FLASH5", "ACTIVE", LocalDateTime.now(), LocalDateTime.now(), 5.0),
                    new Coupon(7, "SUPER40", "INACTIVE", LocalDateTime.now(), LocalDateTime.now(), 40.0),
                    new Coupon(8, "LOYAL50", "ACTIVE", LocalDateTime.now(), LocalDateTime.now(), 50.0),
                    new Coupon(9, "SAVE100", "EXPIRED", LocalDateTime.now().minusMonths(1), LocalDateTime.now(), 100.0),
                    new Coupon(10, "DEAL25", "ACTIVE", LocalDateTime.now(), LocalDateTime.now(), 25.0)
            );

            couponRepository.saveAll(coupons);
            System.out.println(" Initialized " + coupons.size() + " coupons successfully!");
        } else {
            System.out.println(" Coupons already exist, skipping initialization.");
        }

    }
}
