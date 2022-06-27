import { IUser } from "./User";

export interface IPost {
    id: string;
    text: string;
    image: string;
    likes: number;
    tags: string[];
    publishDate: string;
    owner: IUser;
}