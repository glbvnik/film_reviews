import { CircularProgress } from '@mui/material'

const ButtonLoader = () => {
    return (
        <CircularProgress
            color="secondary"
            style={{
                height: '20px',
                width: '20px',
            }}
        />
    )
}

export default ButtonLoader
