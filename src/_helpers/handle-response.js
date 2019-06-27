import {
    authenticationService
} from '@/_services'

export const handleResponse = response => {
    const {
        ok,
        status
    } = response
    return response.text().then(text => {
        const data = text && JSON.parse(text)


        if (!ok) {
            if (status === (401 || 403)) {
                authenticationService.logout()
                location.reload(true)
            }
            const err = (data && data.message) || response.statusText
            return Promise.reject(err)
        }

        return Promise.resolve(data)

    })
}