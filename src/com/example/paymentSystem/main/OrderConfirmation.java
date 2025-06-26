package com.example.paymentSystem.main;

import com.example.paymentSystem.model.BankTransferPayment;
import com.example.paymentSystem.model.CreditCardPayment;
import com.example.paymentSystem.model.PayPalPayment;
import com.example.paymentSystem.model.PaymentGateway;

import java.time.Year; // Import for current year
import java.util.ArrayList;
import java.util.List;

public class OrderConfirmation {

    final String orderId = "ORD-2023-001";

    public static void main(String[] args) {

        PaymentGateway ccGateway = new CreditCardPayment("1234-5678-9012-3456", "12/25", "123", "Taro Yamada", "Stripe",
                100.50);

        PaymentGateway ppGateway = new PayPalPayment("test@example.com", "mysecurepass", "PayPal", 250.00);

        PaymentGateway btGateway = new BankTransferPayment("Japan Bank", "Tokyo Branch", "Savings", "1234567",
                "Hanako Suzuki", "Direct Bank", 75.25);
        int currentYear = Year.now().getValue();
        String baseOrderIdPrefix = "ORD-" + currentYear + "-"; // Use the current year here
        int orderNumber = 1; // Start the sequence from 1

        // Credit Card Payment
        String ccOrderId = baseOrderIdPrefix + String.format("%03d", orderNumber++);
        System.out.println("\n--- Credit Card Payment for Order: " + ccOrderId + " ---");
        if (ccGateway.processPayment(ccOrderId)) {
            System.out.println(ccGateway.generateReceipt());
        } else {
            System.out.println("Credit Card Payment Failed for Order: " + ccOrderId);
        }

        // PayPal Payment
        String ppOrderId = baseOrderIdPrefix + String.format("%03d", orderNumber++);
        System.out.println("\n--- PayPal Payment for Order: " + ppOrderId + " ---");
        if (ppGateway.processPayment(ppOrderId)) {
            System.out.println(ppGateway.generateReceipt());
        } else {
            System.out.println("PayPal Payment Failed for Order: " + ppOrderId);
        }

        // Bank Transfer Payment
        String btOrderId = baseOrderIdPrefix + String.format("%03d", orderNumber++);
        System.out.println("\n--- Bank Transfer Payment for Order: " + btOrderId + " ---");
        if (btGateway.processPayment(btOrderId)) {
            System.out.println(btGateway.generateReceipt());
        } else {
            System.out.println("Bank Transfer Payment Failed for Order: " + btOrderId);
        }

        // --- (Optional) Process payments from a list ---
        List<PaymentGateway> payments = new ArrayList<>();
        payments.add(ccGateway);
        payments.add(ppGateway);
        payments.add(btGateway);

        System.out.println("\n--- Processing payments from list ---");
        for (PaymentGateway payment : payments) {
            // Generate a new unique ID for each payment in the loop
            String uniqueOrderId = baseOrderIdPrefix + String.format("%03d", orderNumber++); // Use the current year
                                                                                             // prefix
            System.out
                    .println("\n--- Processing " + payment.getGateWayName() + " for Order: " + uniqueOrderId + " ---");
            if (payment.processPayment(uniqueOrderId)) {
                System.out.println(payment.generateReceipt());
            } else {
                System.out.println(payment.getGateWayName() + " Payment Failed for Order: " + uniqueOrderId);
            }
        }

    }

}
