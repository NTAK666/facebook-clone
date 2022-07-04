import {IUserFull} from "./User";

export interface ICommentFull {
    id: number
    createdAt: string
    updatedAt: string
    comment: string
    image: string
    reactComments: any[]
    user: IUserFull
    delete: boolean
}

export interface ICommentCreate {
    postId: number;
    comment: string
}