import config from 'config'
import {
    authHeader,
    handleResponse
} from '@/_helpers'

const getAll = () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse)
}

const getById = id => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse)
}

export const userService = {
    getAll,
    getById
}