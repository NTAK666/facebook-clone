export interface IUserFull {
    id: number
    email: string
    userInfo: IUserInfo
}

export interface IUserInfo {
    firstName: string
    lastName: string
    phone: null | string
    address: null | string
    avatar: null | string
    coverImage: null | string
    about: null | string
    bio: null | string
    slug: null | string
    birthday: null | string
    gender: boolean
}


export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserRegister {
    email: string;
    password: string;
    birthday: string;
    firstName: string;
    lastName: string;
    gender: boolean; // 0: Nữ, 1: Nam
}