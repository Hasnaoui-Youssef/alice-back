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
var MailerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const mailer_const_1 = require("./constants/mailer.const");
const mailer_transport_factory_1 = require("./mailer-transport.factory");
let MailerService = MailerService_1 = class MailerService {
    constructor(mailerOptions, transportFactory) {
        this.mailerOptions = mailerOptions;
        this.transportFactory = transportFactory;
        this.transporters = new Map();
        this.logger = new common_1.Logger(MailerService_1.name);
        if (!this.transportFactory) {
            this.transportFactory = new mailer_transport_factory_1.MailerTransportFactory(mailerOptions);
        }
        this.validateTransportOptions();
        this.setupTransporters();
    }
    validateTransportOptions() {
        if ((!this.mailerOptions.transport ||
            Object.keys(this.mailerOptions.transport).length <= 0 &&
                !this.mailerOptions.transports)) {
            throw new Error("Make sure to provide a transport configuration object, URL or transport plugin");
        }
    }
    createTransporter(config, name) {
        const transporter = this.transportFactory.createTransport(config);
        if (this.mailerOptions.verifyTransporter) {
            this.verifyTransporter(transporter, name);
        }
        return transporter;
    }
    verifyTransporter(transporter, name) {
        const transporterName = name ? `'${name}'` : "";
        if (!transporter.verify)
            return;
        Promise.resolve(transporter.verify())
            .then(() => this.logger.debug(`Transporter : ${transporterName} is ready`))
            .catch((error) => this.logger.error(`Error occurred while verifying transporter ${transporterName}: ${error.message}`));
    }
    async verifyAllTransporters() {
        const transporters = [...this.transporters.values(), this.transporter];
        const verifiedTransporters = await Promise.all(transporters.map(transporter => {
            if (!transporter.verify)
                return true;
            return Promise.resolve(transporter.verify()).then(() => true).catch(() => false);
        }));
        return verifiedTransporters.every(val => val);
    }
    setupTransporters() {
        if (this.mailerOptions.transports) {
            Object.keys(this.mailerOptions.transports).forEach((transport) => {
                const transporter = this.createTransporter(this.mailerOptions.transports[transport], transport);
                this.transporters.set(transport, transporter);
            });
        }
        if (this.mailerOptions.transport) {
            this.transporter = this.createTransporter(this.mailerOptions.transport);
        }
    }
    addTransporter(transporterName, config) {
        this.transporters.set(transporterName, this.transportFactory.createTransport(config));
        return transporterName;
    }
    async sendMail(sendMailOptions) {
        if (sendMailOptions.transporterName) {
            if (this.transporters &&
                this.transporters.get(sendMailOptions.transporterName)) {
                return await this.transporters
                    .get(sendMailOptions.transporterName)
                    .sendMail(sendMailOptions);
            }
            else {
                throw new Error(`Initiated Transporters do not contain ${sendMailOptions.transporterName} key`);
            }
        }
        else {
            if (this.transporter) {
                return await this.transporter.sendMail(sendMailOptions);
            }
            else {
                throw new Error("Transporter Object undefined");
            }
        }
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = MailerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(mailer_const_1.MAILER_OPTIONS)),
    __param(1, (0, common_1.Optional)()),
    __param(1, (0, common_1.Inject)(mailer_const_1.MAILER_TRANSPORT_FACTORY)),
    __metadata("design:paramtypes", [Object, Object])
], MailerService);
//# sourceMappingURL=mailer.service.js.map