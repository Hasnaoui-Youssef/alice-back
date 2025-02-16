"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaslAbilityFactory = void 0;
const ability_1 = require("@casl/ability");
const actions_enum_1 = require("../../../common/enums/actions.enum");
const user_schema_1 = require("../../users/user.schema");
const roles_enum_1 = require("../../../common/enums/roles.enum");
const product_schema_1 = require("../../product/schemas/product.schema");
const mongoose_1 = require("mongoose");
const client_review_schema_1 = require("../../product/schemas/client-review.schema");
class CaslAbilityFactory {
    createForUser(user) {
        const { can, cannot, build } = new ability_1.AbilityBuilder((ability_1.createMongoAbility));
        if (!user) {
            can(actions_enum_1.Actions.Read, product_schema_1.Product);
        }
        else if (user.role === roles_enum_1.UserRoles.Admin) {
            can(actions_enum_1.Actions.Manage, 'all');
        }
        else {
            can(actions_enum_1.Actions.Update, user_schema_1.User, { _id: new mongoose_1.Types.ObjectId(user.userId) });
            can(actions_enum_1.Actions.Read, user_schema_1.User, { _id: new mongoose_1.Types.ObjectId(user.userId) });
            can(actions_enum_1.Actions.Create, client_review_schema_1.ClientReview);
            cannot(actions_enum_1.Actions.Update, product_schema_1.Product);
        }
        return build({
            detectSubjectType: (subject) => subject.constructor,
        });
    }
}
exports.CaslAbilityFactory = CaslAbilityFactory;
//# sourceMappingURL=casl-ability.factory.js.map