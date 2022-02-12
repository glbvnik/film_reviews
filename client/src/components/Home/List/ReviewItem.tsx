import StarIcon from '@mui/icons-material/Star'
import { Box, Grid, Paper, Skeleton, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { styles } from '../sx'

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

    const router = useRouter()

    return (
        <Grid item xs={1} sx={styles.reviewItem}>
            <Paper
                elevation={4}
                sx={styles.reviewItemPaper}
                onClick={() =>
                    router.push(`${process.env.NEXT_PUBLIC_REVIEW}/${id}`)
                }
            >
                <Image
                    priority
                    src={`${process.env.NEXT_PUBLIC_API_URL!}/images/${image}`}
                    alt={filmName}
                    layout="fill"
                    objectFit="cover"
                    onLoadingComplete={() => setIsLoaded(true)}
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
