import {getDefaultMiddleware} from "@reduxjs/toolkit";
import {userService} from "./services/UserService";

export const middleware = [
    ...getDefaultMiddleware(),
    userService.middleware
];