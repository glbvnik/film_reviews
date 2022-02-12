import { Box, Button, ButtonGroup, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { FC } from 'react'

const HomeForm: FC = () => {
    const router = useRouter()

    const { handleSubmit, handleChange, resetForm, values } = useFormik({
        initialValues: {
            movie: (router.query.movie as string) || '',
            author: (router.query.author as string) || '',
        },
        onSubmit: (values) => {
            router.push({
                pathname: process.env.NEXT_PUBLIC_FILTER,
                query: { ...values, page: 1 },
            })
        },
    })

    const handleReset = () => {
        resetForm({ values: { movie: '', author: '' } })

        router.push('/')
    }

    return (
        <Box
            noValidate
            component="form"
            onSubmit={handleSubmit}
            onReset={handleReset}
            mb={{ xs: 1, sm: 2, lg: 3, xl: 4 }}
        >
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
                <TextField
                    id="movie"
                    name="movie"
                    size="medium"
                    placeholder="Movie..."
                    value={values.movie}
                    onChange={handleChange}
                    sx={{ flex: '1 0 40%' }}
                />
                <TextField
                    id="author"
                    name="author"
                    size="medium"
                    placeholder="Author..."
                    value={values.author}
                    onChange={handleChange}
                    sx={{ flexGrow: 1 }}
                />
                <ButtonGroup
                    variant="contained"
                    size="large"
                    sx={{ button: { flex: 1 } }}
                >
                    <Button type="submit">Search</Button>
                    <Button type="reset" color="secondary">
                        Reset
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>
    )
}

export default HomeForm
