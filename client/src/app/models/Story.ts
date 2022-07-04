import { IUserFull } from "./User";

export interface IStoryFull {
    id: number;
    slug: string;
    title: string;
    image: string;
    user: IUserFull;
    createdAt: string;
    updatedAt: string;
    reactStories: any[];
    commentStories: any[];
    delete: boolean;
}

export interface IStoryCreate {
    title: string;
    image: string;
}
