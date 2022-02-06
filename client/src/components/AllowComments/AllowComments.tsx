import {
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material'
import React, { FC, useEffect } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { administrationSelectors } from '../../redux/reducers/administration'
import {
    allowComments,
    getUsers,
} from '../../redux/reducers/administration/action-creators'

const AllowComments: FC = () => {
    const { users, isUsersLoading, isAllowCommentsLoading } = useAppSelector(
        administrationSelectors.all
    )

    const dispatch = useAppDispatch()

    const [user, setUser] = React.useState('')
    const [bannedUser, setBannedUser] = React.useState('')

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    useEffect(() => {
        if (!isAllowCommentsLoading) {
            setUser('')
            setBannedUser('')
        }
    }, [isAllowCommentsLoading])

    return (
        <Container>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                p={2}
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
                            value={user}
                            label="User"
                            onChange={(event) => setUser(event.target.value)}
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
                        variant="contained"
                        size="large"
                        endIcon={
                            isAllowCommentsLoading && (
                                <CircularProgress
                                    color="secondary"
                                    style={{
                                        height: '20px',
                                        width: '20px',
                                    }}
                                />
                            )
                        }
                        onClick={() =>
                            dispatch(
                                allowComments({
                                    uuId: user,
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
                            value={bannedUser}
                            label="Banned user"
                            onChange={(event) =>
                                setBannedUser(event.target.value)
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
                        variant="contained"
                        size="large"
                        endIcon={
                            isAllowCommentsLoading && (
                                <CircularProgress
                                    color="secondary"
                                    style={{
                                        height: '20px',
                                        width: '20px',
                                    }}
                                />
                            )
                        }
                        onClick={() =>
                            dispatch(
                                allowComments({
                                    uuId: bannedUser,
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
            </Box>
        </Container>
    )
}

export default AllowComments
