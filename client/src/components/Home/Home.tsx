import { FC, useRef } from 'react'
import ReviewsList from '../ReviewsList/ReviewsList'
import Wrapper from '../UI/Wrapper'
import HomeForm from './HomeForm'

const Home: FC = () => {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <Wrapper innerRef={ref}>
            <HomeForm />
            <ReviewsList parentRef={ref} />
        </Wrapper>
    )
}

export default Home
