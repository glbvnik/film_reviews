import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { administrationSelectors } from '../../redux/reducers/administration'
import {
    allowComments,
    getUsers,
} from '../../redux/reducers/administration/action-creators'
import ButtonLoader from '../UI/ButtonLoader'

const AllowComments: FC = () => {
    const { users, isUsersLoading, isActionLoading } = useAppSelector(
        administrationSelectors.all
    )

    const dispatch = useAppDispatch()

    const [userUuId, setUserUuId] = useState('')
    const [bannedUserUuId, setBannedUserUuId] = useState('')

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    useEffect(() => {
        if (!isActionLoading) {
            setUserUuId('')
            setBannedUserUuId('')
        }
    }, [isActionLoading])

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
            }}
        >
            <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                width="100%"
                maxWidth={900}
            >
                <FormControl fullWidth>
                    <InputLabel id="users-label">User</InputLabel>
                    <Select
                        disabled={isUsersLoading}
                        labelId="users-label"
                        value={userUuId}
                        label="User"
                        onChange={(event) => setUserUuId(event.target.value)}
                    >
                        {users
                            ?.filter((user) => user.isCommentsAllowed)
                            .map((user) => (
                                <MenuItem key={user.uuId} value={user.uuId}>
                                    {user.email}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <Button
                    disabled={!userUuId}
                    variant="contained"
                    size="large"
                    endIcon={isActionLoading && <ButtonLoader />}
                    onClick={() =>
                        dispatch(
                            allowComments({
                                uuId: userUuId,
                                isCommentsAllowed: false,
                            })
                        )
                    }
                    sx={{
                        width: { sm: 100 },
                        mt: { xs: 1, sm: 0 },
                        ml: { xs: 0, sm: 1 },
                    }}
                >
                    Ban
                </Button>
            </Box>
            <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                width="100%"
                maxWidth={900}
                mt={3}
            >
                <FormControl fullWidth>
                    <InputLabel id="users-label">Banned user</InputLabel>
                    <Select
                        disabled={isUsersLoading}
                        labelId="banned-users-label"
                        value={bannedUserUuId}
                        label="Banned user"
                        onChange={(event) =>
                            setBannedUserUuId(event.target.value)
                        }
                    >
                        {users
                            ?.filter((user) => !user.isCommentsAllowed)
                            .map((user) => (
                                <MenuItem key={user.uuId} value={user.uuId}>
                                    {user.email}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <Button
                    disabled={!bannedUserUuId}
                    variant="contained"
                    size="large"
                    endIcon={isActionLoading && <ButtonLoader />}
                    onClick={() =>
                        dispatch(
                            allowComments({
                                uuId: bannedUserUuId,
                                isCommentsAllowed: true,
                            })
                        )
                    }
                    sx={{
                        width: { sm: 100 },
                        mt: { xs: 1, sm: 0 },
                        ml: { xs: 0, sm: 1 },
                    }}
                >
                    Allow
                </Button>
            </Box>
        </Container>
    )
}

export default AllowComments
