export interface PaymentDetailsResponse {
    payment: PaymentDetails;
}
interface PaymentDetails {
    transactions: TransactionDetails[];
    failedTransactions: number;
    successfulTransactions: number;
    acceptedPaymentMethods: string[];
    amount: number;
    token: string;
    orderId?: string;
    type: string;
    status: string;
    convertedAmount: number;
    exchangeRate: number;
    paymentDetails?: {
        phoneNumber: string;
        email: string;
        name: string;
    };
    createdAt: string;
    updatedAt: string;
    id: string;
}
interface TransactionDetails {
    type: string;
    method: string;
    status: string;
    token: string;
    amount: number;
    ext_payment_ref: string;
    from: string;
    amountAfterFee: number;
    extSenderInfo: ExtraSenderInfo;
    feeRate: number;
    totalFee: number;
    id: string;
}
interface ExtraSenderInfo {
    pan: string;
    approvalCode: string;
    expiration: string;
    paymentSystem: string;
    name: string;
    regionType: string;
    email: string;
    bankInfo: {
        bankName: string;
        bankCountryCode: string;
        bankCountryName: string;
    };
}
export {};
