import config from 'config'
import {
    fetcher
} from '@/_helpers'

const getAll = () => {
    return fetcher.get(`${config.apiUrl}/users`)
}

const getById = id => {
    return fetcher.get(`${config.apiUrl}/users/${id}`)
}

export const userService = {
    getAll,
    getById
}