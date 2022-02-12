import { Typography } from '@mui/material'
import { FC } from 'react'

interface ActionMessageProps {
    message: string
}

const ActionMessage: FC<ActionMessageProps> = ({ message }) => {
    return (
        <Typography variant="h4" textAlign="center" width="100%" p={2}>
            {message}
        </Typography>
    )
}

export default ActionMessage
