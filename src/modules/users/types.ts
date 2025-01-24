import { User } from "./user.schema"

export type PaginatedUsers = {
    users : User[],
    pageNumber : number,
    totalUsers : number,
    totalPages : number
}