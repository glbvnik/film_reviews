import { Container } from '@mui/material'
import { FC } from 'react'
import HomeForm from './HomeForm'
import ReviewsList from './List/ReviewsList'

const Home: FC = () => {
    return (
        <Container sx={{ p: { xs: 1, md: 2, lg: 3 } }}>
            <HomeForm />
            <ReviewsList />
        </Container>
    )
}

export default Home
