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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerTransportFactory = void 0;
const nodemailer_1 = require("nodemailer");
const common_1 = require("@nestjs/common");
const mailer_const_1 = require("./constants/mailer.const");
let MailerTransportFactory = class MailerTransportFactory {
    constructor(options) {
        this.options = options;
    }
    createTransport(opts) {
        return (0, nodemailer_1.createTransport)(opts || this.options.transport, this.options.defaults);
    }
};
exports.MailerTransportFactory = MailerTransportFactory;
exports.MailerTransportFactory = MailerTransportFactory = __decorate([
    __param(0, (0, common_1.Inject)(mailer_const_1.MAILER_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], MailerTransportFactory);
//# sourceMappingURL=mailer-transport.factory.js.map