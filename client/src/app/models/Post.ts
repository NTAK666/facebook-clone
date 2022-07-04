import {IUserFull} from "./User";
import {ICommentFull} from "./Comment";

export interface IPostFull {
    id: number
    createdAt: string
    updatedAt: string
    title: any
    slug: any
    thumbnail: any
    description: any
    body: string
    views: string
    cover: any
    user: IUserFull
    reactPosts: any[]
    commentPosts: ICommentFull[]
    delete: boolean
}

export interface IPostCreate {
    thumbnail?: string;
    body?: string;
}