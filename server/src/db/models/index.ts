import { readdirSync } from 'fs'
import path from 'path'
import { DataTypes, Sequelize } from 'sequelize'

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/database.js')[env]

const db: any = {}

export let sequelize: any

if (config.use_env_variable) {
    sequelize = new Sequelize(
        process.env[config.use_env_variable] as any,
        config,
    )
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config,
    )
}

readdirSync(__dirname)
    .filter((file: any) => {
        return (
            file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
        )
    })
    .forEach((file: any) => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes)
        db[model.name] = model
    })

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})
