import {IUserFull} from "./User";

export interface IReactFull {
    id: number
    createdAt: string
    updatedAt: string
    reactType: string
    reactCount: number
    user: IUserFull
    delete: boolean
}

export interface IReactCreate {
    reactType: string
    postId: number
}