package com.innogent.E_Commerce.CoupanRepo;

import com.innogent.E_Commerce.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Integer> {
    @Query("SELECT DISTINCT(code) FROM Coupon")
    public List<String> getCouponsName();
    @Query("SELECT c FROM Coupon c WHERE (c.code) = (:code)")
    public Coupon findByCode(String code);

}
