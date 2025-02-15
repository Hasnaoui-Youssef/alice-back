import { AbilityBuilder, createMongoAbility, ExtractSubjectType,MongoAbility, MongoQuery } from "@casl/ability";
import { Actions } from "src/common/enums/actions.enum";
import { Subjects } from "./types";
import { User } from "src/modules/users/user.schema";
import { UserRoles } from "src/common/enums/roles.enum";
import { Product } from "src/modules/product/schemas/product.schema";
import { RequestUser } from "src/common/types/requestUser.type";
import { Types } from "mongoose";
import { ClientReview } from "src/modules/product/schemas/client-review.schema";

type PossibleAbilities = [Actions, Subjects];
type Conditions = MongoQuery;

export type AppAbility = MongoAbility<PossibleAbilities, Conditions>;

export class CaslAbilityFactory {

    createForUser(user : RequestUser){
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility<PossibleAbilities, Conditions>);
        if(!user){
            can(Actions.Read, Product);
        }else if(user.role === UserRoles.Admin){
            can(Actions.Manage, 'all');
        }else{
            can(Actions.Update, User, { _id : new Types.ObjectId(user.userId) });
            can(Actions.Read, User, { _id : new Types.ObjectId(user.userId) });
            can(Actions.Create, ClientReview);
            cannot(Actions.Update, Product);
        }
        return build({
            detectSubjectType : (subject) => subject.constructor as ExtractSubjectType<Subjects>,
        })
    }

}
