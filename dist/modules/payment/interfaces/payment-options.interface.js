"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcceptedPaymentMethods = exports.PaymentType = exports.PaymentToken = void 0;
var PaymentToken;
(function (PaymentToken) {
    PaymentToken["TND"] = "TND";
    PaymentToken["EUR"] = "EUR";
    PaymentToken["USD"] = "USD";
})(PaymentToken || (exports.PaymentToken = PaymentToken = {}));
var PaymentType;
(function (PaymentType) {
    PaymentType["Immediate"] = "immediate";
    PaymentType["Partial"] = "partial";
})(PaymentType || (exports.PaymentType = PaymentType = {}));
var AcceptedPaymentMethods;
(function (AcceptedPaymentMethods) {
    AcceptedPaymentMethods["Wallet"] = "wallet";
    AcceptedPaymentMethods["BankCard"] = "bank-card";
    AcceptedPaymentMethods["EDinar"] = "e-DINAR";
    AcceptedPaymentMethods["Flouci"] = "flouci";
})(AcceptedPaymentMethods || (exports.AcceptedPaymentMethods = AcceptedPaymentMethods = {}));
//# sourceMappingURL=payment-options.interface.js.map