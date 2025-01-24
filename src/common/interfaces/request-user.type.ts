import { UserRoles } from "../enums/roles.enum"

export type RequestUser = {
    userId : string,
    username : string,
    role : UserRoles
}