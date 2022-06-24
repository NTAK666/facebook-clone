export interface IUser {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    picture: string;
}

export interface IUserFull {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    phone: string;
    picture: string;
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
    gender: string; // 0: Nữ, 1: Nam
}