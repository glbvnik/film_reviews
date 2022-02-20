import { Box, Container } from '@mui/material'
import { FC, RefObject } from 'react'

interface WrapperProps {
    disablePadding?: boolean
    innerRef?: RefObject<HTMLDivElement>
    isRelative?: boolean
}

const Wrapper: FC<WrapperProps> = ({
    children,
    disablePadding,
    innerRef,
    isRelative,
}) => {
    return (
        <Box
            ref={innerRef}
            overflow="auto"
            width="100%"
            p={disablePadding ? undefined : { xs: 1, md: 2, lg: 3 }}
            position={isRelative ? 'relative' : 'static'}
        >
            <Container>{children}</Container>
        </Box>
    )
}

export default Wrapper
