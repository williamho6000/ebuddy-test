'use client'
import axios from 'axios'
import { headers } from 'next/headers'
import * as qs from 'qs'

const paramsSerializer = (params: any) => qs.stringify(params ?? {})

export const getToken = (token?: string) => {
    if (token) {
        return token
    }

    if (typeof window !== 'undefined' && !token) {
        return localStorage ? localStorage?.getItem?.('ebuddy-token') : null
    }

    return null
}

export const removeToken = () => {
    if (typeof window !== 'undefined') {
        localStorage ? localStorage?.removeItem?.('ebuddy-token') : null
        window.location.href = '/'
    }
}

export const getAuthorizationHeader = (token?: string) => `Bearer ${getToken(token)}`

const config = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 60000,
    paramsSerializer,
    headers: {
        Accept: "application/json",
        ...(getToken()
            ? {
                Authorization: getAuthorizationHeader(),
            }
            : {}),
    }
}

const fetch = axios.create(config as any)

export const setToken = (token: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('ebuddy-token', token)
        fetch.defaults.headers.common['Authorization'] = getAuthorizationHeader(token)
    }
}

fetch.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        if (error.response.status === 401) {
            removeToken()
        }

        return Promise.reject(error)
    }
)

export { fetch }
