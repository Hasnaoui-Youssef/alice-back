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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_schema_1 = require("../modules/users/user.schema");
const dotenv = __importStar(require("dotenv"));
const seed_utils_1 = require("./seed.utils");
dotenv.config();
async function seedUsers() {
    const MONGO_URI = process.env.MONGO_URI;
    await (0, seed_utils_1.connectToDatabase)(MONGO_URI);
    try {
        const UserModel = mongoose_1.default.model(user_schema_1.User.name, user_schema_1.UserSchema);
        await UserModel.deleteMany({});
        console.log("Cleared Existing Data");
        const users = [
            {
                username: "admin",
                password: await bcrypt.hash("AdminPass123", 10),
                role: "admin",
                email: "admin@example.com",
                firstName: "John",
                lastName: "Doe",
                isActivated: true,
            },
            {
                username: "client",
                password: await bcrypt.hash("ClientPass123", 10),
                role: "client",
                email: "client@example.com",
                firstName: "Patrick",
                lastName: "Hamilton",
                isActivated: true,
            },
        ];
        await UserModel.insertMany(users);
        console.log("Seeded Users : ", users.map(user => user.username));
    }
    catch (error) {
        console.error("Error seeding users:", error);
    }
    finally {
        (0, seed_utils_1.closeDatabaseConnection)();
    }
}
seedUsers();
//# sourceMappingURL=seed-users.js.map