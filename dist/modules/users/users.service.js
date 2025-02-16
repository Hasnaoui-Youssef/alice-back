"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./user.schema");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(createUserDTO) {
        const existingUser = await this.userModel.findOne({
            email: createUserDTO.email
        });
        if (existingUser) {
            throw new common_1.BadRequestException("User with this username or email already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(createUserDTO.password, salt);
        createUserDTO.password = hashedPassword;
        const newUser = new this.userModel(createUserDTO);
        return await newUser.save();
    }
    async findAll(query) {
        const options = { $and: [] };
        if (query.name) {
            options.$and.push({
                $expr: {
                    $regexMatch: {
                        input: { $concat: ["$firstName", "$lastName"] },
                        regex: query.name,
                        options: 'i'
                    },
                }
            });
        }
        if (query.email) {
            options.$and.push({
                $expr: {
                    $regexMatch: {
                        input: "$email",
                        regex: query.email,
                        options: 'i'
                    },
                }
            });
        }
        if (query.phoneNumber) {
            options.$and.push({
                $expr: {
                    $regexMatch: {
                        input: "$phoneNumber",
                        regex: query.phoneNumber,
                        options: 'i'
                    },
                }
            });
        }
        const dbQuery = this.userModel.find(options);
        if (query.sort) {
            if (query.sortBy) {
                if (query.sortBy === "name") {
                    dbQuery.sort({
                        "$lastName": query.sort,
                        "$firstName": query.sort
                    });
                }
                else {
                    const property = `$${query.sortBy}`;
                    dbQuery.sort({
                        property: query.sort
                    });
                }
            }
        }
        const pageNumber = Math.max((query.pageNumber || 1), 1);
        const PAGE_LIMIT = 10;
        const totalUsers = await this.countDocs(options);
        if (totalUsers === 0) {
            return {
                users: [],
                pageNumber: 1,
                totalUsers: 0,
                totalPages: 1
            };
        }
        const totalPages = Math.ceil(totalUsers / PAGE_LIMIT);
        if (pageNumber > totalPages) {
            throw new common_1.BadRequestException(`Page number ${pageNumber}, bigger than total number of pages ${totalPages}`);
        }
        const users = await dbQuery.skip((pageNumber - 1) * PAGE_LIMIT).limit(PAGE_LIMIT).exec();
        return {
            users,
            pageNumber,
            totalUsers,
            totalPages
        };
    }
    async findOneByEmail(email) {
        try {
            const user = await this.userModel.findOne({ email }).exec();
            return user.toObject();
        }
        catch (error) {
            throw new common_1.NotFoundException(`User ${email} not found, ${error.message}`);
        }
    }
    async findOneById(id) {
        try {
            const user = await this.userModel.findById(new mongoose_2.Types.ObjectId(id)).exec();
            return user;
        }
        catch (error) {
            throw new common_1.NotFoundException(`User ${id} not found, ${error.message}`);
        }
    }
    async countDocs(query) {
        return await this.userModel.countDocuments(query);
    }
    async updateUser(query, data) {
        try {
            const user = await this.userModel.findOneAndUpdate(query, data);
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException("Error Updating User");
        }
    }
    async deleteUser(id) {
        return await this.userModel.findByIdAndDelete(new mongoose_2.Types.ObjectId(id));
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map