import StarIcon from '@mui/icons-material/Star'
import { Box, Grid, Paper, Skeleton, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState } from 'react'
import { DrawerSectionsEnum } from '../../constants/drawerSections'
import { styles } from './sx'

interface ReviewItemProps {
    id: number
    filmName: string
    author: string
    avgRating: number | null
    image: string
}

const ReviewItem: FC<ReviewItemProps> = ({
    id,
    filmName,
    author,
    avgRating,
    image,
}) => {
    const [isLoaded, setIsLoaded] = useState(false)

    const isMounted = useRef(true)

    const router = useRouter()

    const handleClick = () => {
        if (
            router.query.section === DrawerSectionsEnum.MY_REVIEWS ||
            router.query.section === DrawerSectionsEnum.UNPUBLISHED_REVIEWS
        ) {
            return router.push(
                `${process.env.NEXT_PUBLIC_REVIEWS_UPDATE_REVIEW_ROUTE!}/${id}`
            )
        }

        router.push(`${process.env.NEXT_PUBLIC_REVIEW}/${id}`)
    }

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    return (
        <Grid item xs={1} sx={styles.reviewItem}>
            <Paper
                elevation={4}
                sx={styles.reviewItemPaper}
                onClick={handleClick}
            >
                <Image
                    priority
                    src={`${process.env.NEXT_PUBLIC_API_URL!}/images/${image}`}
                    alt={filmName}
                    layout="fill"
                    objectFit="cover"
                    onLoadingComplete={() =>
                        isMounted.current && setIsLoaded(true)
                    }
                />
                {!isLoaded && (
                    <Skeleton
                        animation="wave"
                        variant="circular"
                        sx={styles.reviewItemSkeleton}
                    />
                )}
                <Box sx={styles.reviewItemBox}>
                    <Typography
                        component="h3"
                        variant="h5"
                        sx={styles.reviewItemText}
                    >
                        {filmName}
                    </Typography>
                    <Box sx={styles.reviewItemBottomBox}>
                        <Typography
                            component="h4"
                            variant="h6"
                            sx={styles.reviewItemText}
                        >
                            {author}
                        </Typography>
                        {avgRating && (
                            <Box
                                display="flex"
                                alignItems="center"
                                color="white"
                                fontSize="20px"
                            >
                                <StarIcon
                                    color="primary"
                                    sx={{ fontSize: '32px', mr: '4px' }}
                                />
                                <span>{avgRating}</span>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Grid>
    )
}

export default ReviewItem
