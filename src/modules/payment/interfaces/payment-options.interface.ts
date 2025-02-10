export enum PaymentToken {
  TND = "TND",
  EUR = "EUR",
  USD = "USD",
}
export enum PaymentType {
  Immediate = "immediate",
  Partial = "partial",
}
export enum AcceptedPaymentMethods {
  Wallet="wallet",
  BankCard="bank-card",
  EDinar="e-DINAR",
  Flouci="flouci",
}
export interface Options {
  token? : PaymentToken;
  type? : PaymentType;
  acceptedPaymentMethodds? : AcceptedPaymentMethods[];
  lifespan? : number;
  checkoutForm? : boolean;
  addPaymentFeesToAmount? : boolean;
  webhook? : string;
  silentWebhook? : boolean;
  successUrl? : string;
  failUrl? : string;
  theme? : "dark" | "light";
}
export interface PaymentOptions {
  options? : Options,
  receiverWalletId : string;
  apiKey : string;
}