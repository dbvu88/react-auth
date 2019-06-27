import {
    authenticationService
} from '@/_services'

export const authHeader = () => {
    const currentUser = authenticationService.currentUserValue;

    return currentUser && currentUser.token ? {
        Authorization: `${currentUser.token}`
    } : {}
}