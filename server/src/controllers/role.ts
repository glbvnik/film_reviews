import { NextFunction, Request, Response } from 'express'
import { RoleService } from '../services/role'

export const RoleController = {
    async addUserRole(req: Request, res: Response, next: NextFunction) {
        try {
            await RoleService.addUserRole({
                ...req.body,
                userUuId: req.params.uuId,
            })

            res.json({ message: 'User role was added' })
        } catch (e) {
            next(e)
        }
    },
    async removeUserRole(req: Request, res: Response, next: NextFunction) {
        try {
            await RoleService.removeUserRole({
                userUuId: req.params.uuId,
                roleId: +req.params.roleId,
            })

            res.json({ message: 'User role was removed' })
        } catch (e) {
            next(e)
        }
    },
}
