import { Model, Optional } from 'sequelize'
import { IToken } from '../../../types/token'
import { User } from './user'

type TokenAttributes = Omit<IToken, 'createdAt' | 'updatedAt'>

interface TokenCreationAttributes extends Optional<TokenAttributes, 'id'> {}

export class Token
    extends Model<TokenAttributes, TokenCreationAttributes>
    implements TokenAttributes
{
    id!: number
    agent!: string
    refreshToken!: string
    userUuId!: string

    static associate() {
        Token.belongsTo(User, {
            as: 'user',
            foreignKey: { name: 'userUuId', allowNull: false },
        })
    }
}
