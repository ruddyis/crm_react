import Request from './request'
export const login = data => Request.post('/login', data)