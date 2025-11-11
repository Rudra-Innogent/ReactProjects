package com.innogent.E_Commerce.service;

import com.innogent.E_Commerce.entity.Coupon;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CouponService {
    public List<String>  getCode();
    public Double getDiscount(String code);
    public void addCoupon(Coupon coupon);
    public List<Coupon> getCoupons();
    public void saveCoupons(List<Coupon> coupons);
    public void save(Coupon coupon);
}
