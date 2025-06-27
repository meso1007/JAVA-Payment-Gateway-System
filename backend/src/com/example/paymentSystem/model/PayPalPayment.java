package com.example.paymentSystem.model;

public class PayPalPayment extends PaymentGateway {
    private String email;
    private String password;

    public PayPalPayment(String email, String password, String gateWayAName, double ammount){
        super( gateWayAName);
        setAmmount(ammount);
        this.email = email;
        this.password = password;
        
    }

    public boolean validate(){
        if(email.isEmpty() || password.trim().isEmpty()){
            return false;
        }
        // API Process
        return true;
    }

    @Override
    public boolean processPayment(String transactionId) {
        this.transactionId = transactionId;
        if(validate()){
            System.out.println("Processing PayPal payment through " + getGateWayName() + " for transaction " + getTransactionId() + " with amount " + getAmmount());
            return true;
        }
        System.out.println("PayPal validation failed for amount " + getAmmount());
        return false;
    }

    @Override
    public String generateReceipt() {
        return "Receipt for transaction via " + getGateWayName() + " for user " + email;
    }
    
}
