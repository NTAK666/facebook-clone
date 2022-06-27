import {IUser} from "./User";
import {IPost} from "./Post";

export interface IComment {
    id: string;
    message: string;
    owner: IUser;
    post: IPost;
    publishDate: string;
}