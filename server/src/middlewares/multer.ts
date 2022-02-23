import { Express, Request } from 'express'
import multer from 'multer'
import { join } from 'path'
import { v4 } from 'uuid'

const fileStorageEngine = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void
    ) => {
        callback(null, join(__dirname, '../../static/images'))
    },
    filename: function (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, filename: string) => void
    ) {
        callback(null, `${v4()}.${file.originalname.split('.').pop()}`)
    },
})

export const upload = multer({ storage: fileStorageEngine })
