"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PaymentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const payment_const_1 = require("./constants/payment.const");
const rxjs_1 = require("rxjs");
let PaymentService = PaymentService_1 = class PaymentService {
    constructor(httpService, paymentOptions) {
        this.httpService = httpService;
        this.paymentOptions = paymentOptions;
        this.logger = new common_1.Logger(PaymentService_1.name);
    }
    async initiatePayment(payload) {
        const { konnectUrl, ...paymentData } = { ...this.paymentOptions };
        payload = { ...payload, ...paymentData };
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.post(konnectUrl + "init-payment", payload).pipe((0, rxjs_1.catchError)((error) => {
            this.logger.error(JSON.stringify(error.response.data));
            throw "unable to initialize payment";
        })));
        console.log("Payment reference : ", data.paymentRef);
        console.log("Payment url : ", data.payUrl);
        return data;
    }
    async getPaymentDetails(paymentRef) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(paymentRef).pipe((0, rxjs_1.catchError)((error) => {
            this.logger.error(JSON.stringify(error.response.data));
            throw "failed to get payment details";
        })));
        return data;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = PaymentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(payment_const_1.PAYMENT_OPTIONS)),
    __metadata("design:paramtypes", [axios_1.HttpService, Object])
], PaymentService);
//# sourceMappingURL=payment.service.js.map