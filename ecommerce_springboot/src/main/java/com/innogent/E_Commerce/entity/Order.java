package com.innogent.E_Commerce.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    private Long id; // Coming from frontend, not auto-generated

    @Column(name = "customer_name")
    private String name; // From address container
    
    @Column(name = "contact_number")
    private String contactNumber; // From address container


    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "name", column = @Column(name = "delivery_name")),
        @AttributeOverride(name = "phone", column = @Column(name = "delivery_phone")),
        @AttributeOverride(name = "addressLine", column = @Column(name = "delivery_address_line")),
        @AttributeOverride(name = "city", column = @Column(name = "delivery_city")),
        @AttributeOverride(name = "pincode", column = @Column(name = "delivery_pincode"))
    })
    private DeliveryAddress deliveryAddress = new DeliveryAddress();

    @Column(name = "date_of_order")
    private LocalDateTime dateOfOrder;

    private String status; // Status as String: "Ordered", "Shipped", "Out for Delivery", "Delivered"

    private Double total;

    // One-to-Many relationship with OrderItems
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Order() {}

    public Order(Long id, String name, String contactNumber, DeliveryAddress deliveryAddress, 
                 LocalDateTime dateOfOrder, String status, Double total) {
        this.id = id;
        this.name = name;
        this.contactNumber = contactNumber;
        this.deliveryAddress = deliveryAddress;
        this.dateOfOrder = dateOfOrder;
        this.status = status;
        this.total = total;
    }

    // ============ Getters and Setters ============

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    public DeliveryAddress getDeliveryAddress() { return deliveryAddress; }
    public void setDeliveryAddress(DeliveryAddress deliveryAddress) { this.deliveryAddress = deliveryAddress; }

    public LocalDateTime getDateOfOrder() { return dateOfOrder; }
    public void setDateOfOrder(LocalDateTime dateOfOrder) { this.dateOfOrder = dateOfOrder; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public List<OrderItem> getOrderItems() { return orderItems; }
    public void setOrderItems(List<OrderItem> orderItems) { this.orderItems = orderItems; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }


    public void updateStatus() {
        if (this.dateOfOrder == null) {
            return;
        }

        LocalDateTime now = LocalDateTime.now();
        long hoursPassed = java.time.Duration.between(this.dateOfOrder, now).toHours();

        if (hoursPassed >= 6) {
            this.status = "Delivered";
        } else if (hoursPassed >= 4) {
            this.status = "Out for Delivery";
        } else if (hoursPassed >= 2) {
            this.status = "Shipped";
        } else {
            this.status = "Ordered";
        }
    }

    // ============ Lifecycle Callbacks ============

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (dateOfOrder == null) {
            dateOfOrder = LocalDateTime.now();
        }
        if (status == null) {
            status = "Ordered";
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // ============ Inner Class for Delivery Address ============
    @Embeddable
    public static class DeliveryAddress {
        private String name;
        private String phone;
        private String addressLine;
        private String city;
        private String pincode;

        public DeliveryAddress() {}

        public DeliveryAddress(String name, String phone, String addressLine, String city, String pincode) {
            this.name = name;
            this.phone = phone;
            this.addressLine = addressLine;
            this.city = city;
            this.pincode = pincode;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }

        public String getAddressLine() { return addressLine; }
        public void setAddressLine(String addressLine) { this.addressLine = addressLine; }

        public String getCity() { return city; }
        public void setCity(String city) { this.city = city; }

        public String getPincode() { return pincode; }
        public void setPincode(String pincode) { this.pincode = pincode; }
    }
}

