export interface PaymentDetailsResponse {
  payment : PaymentDetails;
}
interface PaymentDetails {
  id : string;
  receiverWallet : RecieverWallet;
  transactions : TransactionDetails[];
  amountDue : number;
  reachedAmount : number;
  amount : number;
  token : string;
  convertedAmount : number;
  exchangeRate : number;
  expirationDate : string;
  shortId : string;
  link : string;
  webhook : string;
  successUrl : string;
  failUrl : string;
  orderId : string;
  type : string;
  status : string;
  details : string;
  acceptedPaymentMethods : string[];
}
interface RecieverWallet {
  id : string;
  owner : CompanyDetails;
  participants : string[];
  type : string;
  name : string;
  phoneNumber : string;
}
export interface CompanyDetails {
  email : string;
  name : string;
  phoneNumber : string;
  imageUrl : string;
  owner : CompanyOwner;
}
export interface CompanyOwner {
  email : string;
  firstName : string;
  lastName : string;
  phoneNumber : string;
}
interface TransactionDetails {
  _id :  string;
  receiverWallet : RecieverWallet;
  senderWallet : RecieverWallet;
  token : string;
  amount : number;
  type : string;
  status : string;
  payment : string;
  method : string;
  extSenderInfo : any;
}