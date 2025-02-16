import { MongoAbility, MongoQuery } from "@casl/ability";
import { Actions } from "src/common/enums/actions.enum";
import { Subjects } from "./types";
import { RequestUser } from "src/common/types/requestUser.type";
type PossibleAbilities = [Actions, Subjects];
type Conditions = MongoQuery;
export type AppAbility = MongoAbility<PossibleAbilities, Conditions>;
export declare class CaslAbilityFactory {
    createForUser(user: RequestUser): MongoAbility<PossibleAbilities, Conditions>;
}
export {};
