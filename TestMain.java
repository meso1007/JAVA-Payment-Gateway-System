import java.io.*;

class Person {

    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public void setName(String userName) {
        if (userName == null || userName.trim().isEmpty()) {
            System.out.println("Name cannot be empty");
        } else {
            this.name = userName;
        }
    }

    public void setAge(int userAge) {
        if (userAge < 0 || userAge >= 150) {
            System.out.println("Invalid age");
        } else {
            this.age = userAge;
        }
    }
}

class Product {

    private final int id; //finalをつけると一度だけ設定する
    private String name;

    public Product(int id, String name) {
        this.id = id;
        if (name == null || name.trim().isEmpty()) {
            System.out.println("Name cannot be empty");
            this.name = "Unknown";
        } else {
            this.name = name;
        }
    }

    public String getName() {
        return this.name;
    }

    public int getId() {
        return this.id;
    }

    public void setName(String productName) {
        if (productName == null || productName.trim().isEmpty()) {
            System.out.println("Name cannot be empty");
        } else {

            this.name = productName;
        }

    }
}

class BankAccount {

    private final String accountNumber;
    private double balance;

    public BankAccount(String accountNumber, double balance) {
        if (accountNumber == null || accountNumber.trim().isEmpty()) {
            throw new IllegalArgumentException("You need a valid Account Number");
        }
        this.accountNumber = accountNumber;
        if (balance < 0) {
            System.err.println("You need to deposit more than 0 ");
            this.balance = 0;
        } else {

            this.balance = balance;
        }
    }

    public String getbAccountNumber() {
        return this.accountNumber;
    }

    public double getBalace() {
        return this.balance;
    }

    public void deposit(double ammount) {
        if (ammount < 0) {
            System.out.println("Invalid ammount");
            return;
        } else {

            this.balance += ammount;
            System.out.println("Your Blance: " + this.balance);
        }
    }

    public boolean withdraw(double ammount) {
        if (ammount < 0 || this.balance < ammount) {
            System.out.println("You don't have enough balance");
            return false;
        } else {

            this.balance -= ammount;
            System.out.println("Your Blance: " + this.balance);
            return true;
        }

    }
}


public class TestMain {
    public static void main(String[] args) throws IOException {
        PrintWriter writer = new PrintWriter(new FileWriter("test_result.html"));

        writer.println("<html><head><meta charset='UTF-8'><title>テスト結果</title></head><body>");
        writer.println("<h2>テスト結果</h2>");
        writer.println("<ul>");
        writer.println("<li>名前: 山田 太郎, 年齢: 30</li>");
        writer.println("<li>製品名: Java入門書, ID: 1</li>");
        writer.println("<li>現在の残高: 1000.0</li>");
        // ... 必要な出力を追加
        writer.println("</ul>");
        writer.println("</body></html>");
        writer.close();
    }
}
