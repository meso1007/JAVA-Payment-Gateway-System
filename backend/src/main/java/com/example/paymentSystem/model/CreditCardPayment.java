package com.example.paymentSystem.model;

public class CreditCardPayment extends PaymentGateway {
    private String cardNumber;
    private String expirationDate;
    private String cvv;
    private String userName;

    public CreditCardPayment(String cardNumber, String expirationDate, String cvv, String userName, String gatewayName,
            double amount) {
        super(gatewayName);
        setAmmount(amount);
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
        this.cvv = cvv;
        this.userName = userName;
    }

    public boolean validate() {
        return cardNumber != null && !cardNumber.trim().isEmpty() &&
                expirationDate != null && !expirationDate.trim().isEmpty() &&
                cvv != null && !cvv.trim().isEmpty() &&
                userName != null && !userName.trim().isEmpty();
    }

    @Override
    public boolean processPayment(String transactionId) {
        super.transactionId = transactionId;
        if (validate()) {
            System.out.println("Processing credit card payment through " + getGateWayName() +
                    " for transaction " + getTransactionId() + " with amount " + getAmmount());
            // 実際の決済APIを呼び出すとしたら、このgetAmmount()の値をAPIに渡すイメージ
            return true;
        }
        System.out.println("Credit card validation failed for amount " + getAmmount()); // 失敗時も金額を表示
        return false;
    }

    @Override
    public String generateReceipt() {
        return "Receipt for transaction via " + getGateWayName() + " for user " + userName;
    }
}
