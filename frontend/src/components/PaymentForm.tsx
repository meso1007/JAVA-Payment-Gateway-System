'use client';

import React, { useState } from 'react';

type PaymentMethod = 'creditcard' | 'paypal' | 'banktransfer';

interface PaymentFormData {
  // Credit Card
  cardNumber?: string;
  expirationDate?: string;
  cvv?: string;
  userName?: string;

  // PayPal
  paypalEmail?: string;

  // Bank Transfer
  accountNumber?: string;
  bankName?: string;

  // Common
  amount: number;
  transactionId: string;
}

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('creditcard');
  const [formData, setFormData] = useState<PaymentFormData>({
    amount: 0,
    transactionId: ''
  });
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof PaymentFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateTransactionId = () => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `TXN-${timestamp}-${random}`;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setResult('');

    const transactionId = generateTransactionId();
    const submitData = new FormData();

    // Add common fields
    submitData.append('amount', formData.amount.toString());
    submitData.append('transactionId', transactionId);

    // Add method-specific fields
    switch (paymentMethod) {
      case 'creditcard':
        submitData.append('cardNumber', formData.cardNumber || '');
        submitData.append('expirationDate', formData.expirationDate || '');
        submitData.append('cvv', formData.cvv || '');
        submitData.append('userName', formData.userName || '');
        break;
      case 'paypal':
        submitData.append('paypalEmail', formData.paypalEmail || '');
        break;
      case 'banktransfer':
        submitData.append('accountNumber', formData.accountNumber || '');
        submitData.append('bankName', formData.bankName || '');
        break;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/payments/${paymentMethod}`, {
        method: 'POST',
        body: submitData
      });

      const resultText = await response.text();
      setResult(resultText);
    } catch (error) {
      setResult(`エラーが発生しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Payment System
          </h1>
          <p className="text-white/70">
            Secure and fast payment processing
          </p>
        </div>

        {/* Payment Method Selection */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              id: 'creditcard', label: 'Credit Card', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              )
            },
            {
              id: 'paypal', label: 'PayPal', icon: (
                <svg className="w-6 h-6" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"/></svg>
              )
            },
            {
              id: 'banktransfer', label: 'Bank Transfer', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )
            }
          ].map((method) => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id as PaymentMethod)}
              className={`group relative p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${paymentMethod === method.id
                ? 'border-blue-400/50 bg-gradient-to-r from-blue-500/20 to-purple-600/20 shadow-lg shadow-blue-500/25'
                : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10'
                }`}
            >
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 transition-colors ${paymentMethod === method.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-white/10 text-white/70 group-hover:text-white'
                  }`}>
                  {method.icon}
                </div>
                <div className={`text-sm font-medium transition-colors ${paymentMethod === method.id ? 'text-white' : 'text-white/70 group-hover:text-white'
                  }`}>
                  {method.label}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Payment Form */}
        <div className="space-y-6">
          {/* Credit Card Form */}
          {paymentMethod === 'creditcard' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber || ''}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200 backdrop-blur-sm"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expirationDate || ''}
                    onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200 backdrop-blur-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={formData.cvv || ''}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="TARO YAMADA"
                  value={formData.userName || ''}
                  onChange={(e) => handleInputChange('userName', e.target.value)}
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200 backdrop-blur-sm"
                  required
                />
              </div>
            </div>
          )}

          {/* PayPal Form */}
          {paymentMethod === 'paypal' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/90">
                PayPal Email Address
              </label>
              <input
                type="email"
                placeholder="user@example.com"
                value={formData.paypalEmail || ''}
                onChange={(e) => handleInputChange('paypalEmail', e.target.value)}
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200 backdrop-blur-sm"
                required
              />
            </div>
          )}

          {/* Bank Transfer Form */}
          {paymentMethod === 'banktransfer' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90">
                  Account Number
                </label>
                <input
                  type="text"
                  placeholder="1234567890"
                  value={formData.accountNumber || ''}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200 backdrop-blur-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90">
                  Bank Name
                </label>
                <input
                  type="text"
                  placeholder="Tokyo Bank"
                  value={formData.bankName || ''}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200 backdrop-blur-sm"
                  required
                />
              </div>
            </div>
          )}

          {/* Common Fields */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/90">
              Amount (JPY)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="1,000.00"
              value={formData.amount || ''}
              onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200 backdrop-blur-sm"
              required
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Pay Now</span>
              </>
            )}
          </button>
        </div>

        {/* Result Display */}
        {result && (
          <div className={`mt-6 p-4 rounded-xl text-center font-medium backdrop-blur-sm border ${result.includes('成功')
            ? 'bg-green-500/20 text-green-300 border-green-500/30'
            : 'bg-red-500/20 text-red-300 border-red-500/30'
            }`}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}