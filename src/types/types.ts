export interface ITokensObj {
    accessToken: string,
    refreshToken: string
}

export interface IJWTData {
    tokenId: string,
    role: string
}

export interface IAuthObj {
    accessToken: string,
    refreshToken: string,
    userId: string,
    expiresAccessToken: number
}

export interface IRefreshTokenObj {
    accessToken: string,
    refreshToken: string,
    expiresAccessToken: number
}

export interface IUser {
    id: string,
    email: string,
    password: string,
    role: string
}

export interface IUserEmailAndPass {
    email: string,
    password: string
}

export interface IUserWithoutPass {
    id: string,
    email: string,
    role: string
}

export interface ITask {
    id: string,
    title: string,
    completed: boolean,
    user_id: string
}