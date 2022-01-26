import { Box, Grid, Paper, Rating, Typography } from '@mui/material'
import Image from 'next/image'
import React, { FC } from 'react'
import { styles } from '../sx'

interface ReviewItemProps {
    filmName: string
    author: string
    rating: number | null
    image: string
}

const ReviewItem: FC<ReviewItemProps> = ({
    filmName,
    author,
    rating,
    image,
}) => {
    return (
        <Grid item xs={1} sx={styles.reviewItem}>
            <Paper elevation={4} sx={styles.reviewItemPaper}>
                <Image
                    priority
                    src={`${process.env.NEXT_PUBLIC_API_URL!}/images/${image}`}
                    layout="fill"
                    objectFit="cover"
                />
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
                        <Rating value={rating} sx={{ mb: 1 }} />
                    </Box>
                </Box>
            </Paper>
        </Grid>
    )
}

export default ReviewItem
