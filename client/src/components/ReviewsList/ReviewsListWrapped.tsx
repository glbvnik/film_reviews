import { FC, useRef } from 'react'
import Wrapper from '../UI/Wrapper'
import ReviewsList from './ReviewsList'

const ReviewsListWrapped: FC = () => {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <Wrapper isRelative innerRef={ref}>
            <ReviewsList parentRef={ref} />
        </Wrapper>
    )
}

export default ReviewsListWrapped
