package com.innogent.E_Commerce.service;

import com.innogent.E_Commerce.dao.CoupanDao;
import com.innogent.E_Commerce.entity.Coupon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CouponServiceImpl implements CouponService {

    @Autowired
    CoupanDao coupanDao;

    @Override
    public List<String> getCode() {
        return coupanDao.getCouponsName();
    }

    @Override
    public Double getDiscount(String code) {
        //System.out.println("this is: "+code);
        Coupon coupon=coupanDao.findByCode(code.toUpperCase());
        if(coupon!=null){
            System.out.println("coupon found");
            if(coupon.getStatus().equals("ACTIVE"))return coupon.getDiscount();
            else {
               System.out.println("coupon status not found");
                return 0.0;}
        }
        else {
            System.out.println("coupon not found");
            return 0.0;}
    }

    @Override
    public void addCoupon(Coupon coupon) {
        coupanDao.save(coupon);
    }

    @Override
    public List<Coupon> getCoupons() {
        return coupanDao.getCoupons();
    }

    @Override
    public void saveCoupons(List<Coupon> coupons) {
        coupanDao.save(coupons);

    }

    @Override
    public void save(Coupon coupon) {
            coupanDao.save(coupon);
    }
}
