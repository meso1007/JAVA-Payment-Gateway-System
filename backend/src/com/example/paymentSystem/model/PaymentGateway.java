package com.example.paymentSystem.model;

public abstract class PaymentGateway {
    private String gateWayName;
    private double ammount;
    protected String transactionId;

    public PaymentGateway(String name) {
        if (name == null || name.trim().isEmpty()) {
            System.out.println("Invalid input");
            throw new IllegalArgumentException("Invalid input");
        } else {
            this.gateWayName = name;
        }
    }

    public String getGateWayName() {
        return gateWayName;
    }

    public double getAmmount() {
        return ammount;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setAmmount(double ammount) {
        if (ammount <= 0) {
            System.out.println("Invalid ammount");
        } else {
            this.ammount = ammount;
        }
    }

    abstract public boolean processPayment(String transactionId);

    abstract public String generateReceipt();
}
