import {
    authHeader,
    handleResponse
} from '@/_helpers'

const get = url => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    return fetch(url, requestOptions).then(handleResponse)
}

export const fetcher = {
    get,
}