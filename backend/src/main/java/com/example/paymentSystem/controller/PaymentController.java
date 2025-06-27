package com.example.paymentSystem.controller;

import com.example.paymentSystem.model.CreditCardPayment;
import com.example.paymentSystem.model.PayPalPayment;
import com.example.paymentSystem.model.BankTransferPayment;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @PostMapping("/creditcard")
    public String processCreditCard(@RequestParam String cardNumber,
                                    @RequestParam String expirationDate,
                                    @RequestParam String cvv,
                                    @RequestParam String userName,
                                    @RequestParam String gatewayName,
                                    @RequestParam double amount,
                                    @RequestParam String transactionId) {
        
        CreditCardPayment payment = new CreditCardPayment(cardNumber, expirationDate, cvv, userName, gatewayName, amount);
        boolean success = payment.processPayment(transactionId);
        
        if (success) {
            return "✅ クレジットカード決済が成功しました！\n" + payment.generateReceipt();
        } else {
            return "❌ クレジットカード決済が失敗しました。";
        }
    }

    @PostMapping("/paypal")
    public String processPayPal(@RequestParam String paypalEmail,
                               @RequestParam String gatewayName,
                               @RequestParam double amount,
                               @RequestParam String transactionId) {
        
        PayPalPayment payment = new PayPalPayment(paypalEmail, "password", gatewayName, amount);
        boolean success = payment.processPayment(transactionId);
        
        if (success) {
            return "✅ PayPal決済が成功しました！\n" + payment.generateReceipt();
        } else {
            return "❌ PayPal決済が失敗しました。";
        }
    }

    @PostMapping("/banktransfer")
    public String processBankTransfer(@RequestParam String accountNumber,
                                     @RequestParam String bankName,
                                     @RequestParam String gatewayName,
                                     @RequestParam double amount,
                                     @RequestParam String transactionId) {
        
        BankTransferPayment payment = new BankTransferPayment(bankName, "Main Branch", "Savings", accountNumber, "Account Holder", gatewayName, amount);
        boolean success = payment.processPayment(transactionId);
        
        if (success) {
            return "✅ 銀行振込が成功しました！\n" + payment.generateReceipt();
        } else {
            return "❌ 銀行振込が失敗しました。";
        }
    }
} 