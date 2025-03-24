import { User } from "@prisma/client";
import { api } from './api';

export type UserData = Omit<User, "id">;
type ResponseLoginData = User & { token: string };

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResponseLoginData, UserData>({
            query: (userData) => ({
                url: '/users/login',
                method: 'POST',
                body: userData,
            })              
        }),
        register: builder.mutation<ResponseLoginData, UserData>({
            query: (userData) => ({
                url: '/users/register',
                method: 'POST',
                body: userData,
            })              
        }),
        current: builder.query<ResponseLoginData, void>({
        //current: builder.query<User, void>({ //#TODO не работает почему-то( хотя token из /current не приходит по идее)
            query: () => ({
                url: '/users/register',
                method: 'GET',
            })              
        })
    })
});

export const { useLoginMutation, useRegisterMutation, useCurrentQuery } = authApi;

export const { endpoints: {login, register, current}} = authApi;