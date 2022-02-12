import { Dialog, DialogContent } from '@mui/material'
import { FC } from 'react'

interface UserDialogProps {
    uuId: string
    email: string
    open: boolean
    handleClose: React.Dispatch<React.SetStateAction<boolean>>
}

const UserDialog: FC<UserDialogProps> = ({
    uuId,
    email,
    open,
    handleClose,
}) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent
                sx={{ display: 'flex', flexDirection: 'column', p: 3 }}
            >
                <span style={{ marginBottom: '8px' }}>uuId: {uuId}</span>
                <span>email: {email}</span>
            </DialogContent>
        </Dialog>
    )
}

export default UserDialog
