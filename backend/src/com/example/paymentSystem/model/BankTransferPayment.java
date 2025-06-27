package com.example.paymentSystem.model;

public class BankTransferPayment extends PaymentGateway {
    private String bankName;
    private String branchName;
    private String accountType;
    private String accountNumber;
    private String accountHolderName;

    public BankTransferPayment(String bankName, String branchName, String accountType, String accountNumber,
            String accountHolderName, String gatewayName, double amount) {
        super(gatewayName);
        setAmmount(amount);
        this.bankName = bankName;
        this.branchName = branchName;
        this.accountType = accountType;
        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
    }

    public boolean validate() {
        if (bankName.isEmpty() || branchName.isEmpty() || accountType.isEmpty() || accountNumber.isEmpty()
                || accountHolderName.isEmpty()) {
            return false;
        }
        // API Process)
        return true;
    }

    @Override
    public boolean processPayment(String transactionId) {
        this.transactionId = transactionId;
        if (validate()) {
            System.out.println("--- Bank Transfer Payment Instructions ---");
            System.out.println("Please transfer " + getAmmount() + " JPY to the following account:");
            System.out.println("Bank: " + bankName);
            System.out.println("Branch: " + branchName);
            System.out.println("Account Type: " + accountType);
            System.out.println("Account Number: " + accountNumber);
            System.out.println("Account Holder: " + accountHolderName);
            System.out.println("Transaction ID: " + getTransactionId());
            System.out.println("--- Your order will be processed upon confirmation of payment. ---");
            return true;
        }
        System.out.println("Bank transfer information is incomplete or invalid.");
        return false;
    }

    @Override
    public String generateReceipt() {
        // ヒント: 領収書に振込先情報と、入金確認が必要な旨を含める
        return "Bank Transfer Receipt (Pending Confirmation)\n" +
                "Transaction ID: " + getTransactionId() + "\n" + // <-- ここで取得
                "Amount Due: " + getAmmount() + " JPY\n" +
                "Please transfer to: " + bankName + " " + branchName + " " + accountNumber + " (" + accountHolderName
                + ")\n" +
                "Your order will be processed after payment confirmation.";
    }
}
