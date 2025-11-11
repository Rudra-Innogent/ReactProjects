package com.innogent.E_Commerce.controller;

import com.innogent.E_Commerce.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coupon")
public class CouponController {
@Autowired
CouponService couponservice;
    @PostMapping("/allAvailableCoupons")
    public List<String> getAllPromo(){
        return couponservice.getCode();
    }
    @GetMapping("/applyPromo/{code}")
    public Double applyPromo(@PathVariable String code){
        System.out.println("this is: "+code);
        return couponservice.getDiscount(code);
    }
}
