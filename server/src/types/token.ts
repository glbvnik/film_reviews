export interface IToken {
    id: number
    agent: string
    refreshToken: string
    userId: string
    createdAt: Date
    updatedAt: Date
}

export interface ITokens {
    accessToken: string
    refreshToken: string
}
