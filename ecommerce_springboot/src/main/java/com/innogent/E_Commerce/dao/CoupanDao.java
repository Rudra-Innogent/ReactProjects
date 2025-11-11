package com.innogent.E_Commerce.dao;

import com.innogent.E_Commerce.CoupanRepo.CouponRepository;
import com.innogent.E_Commerce.entity.Coupon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CoupanDao {
    @Autowired
    private CouponRepository couponRepository;

    public Coupon findByCode(String code){
        return couponRepository.findByCode(code);
    }

    public List<String> getCouponsName(){
    return couponRepository.getCouponsName();
    }

    public List<Coupon> getCoupons() {
        return couponRepository.findAll();
    }
    public void save(Coupon coupon) {
        couponRepository.save(coupon);
    }
    public void save(List<Coupon> coupons) {
        couponRepository.saveAll(coupons);
    }
}

