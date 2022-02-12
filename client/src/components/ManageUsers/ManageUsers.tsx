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
import withRoles from '../../hoc/withRoles'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { RolesEnum } from '../../models/user'
import { administrationSelectors } from '../../redux/reducers/administration'
import {
    addUserRole,
    getUsers,
    removeUserRole,
} from '../../redux/reducers/administration/action-creators'
import ButtonLoader from '../UI/ButtonLoader'

const ManageUsers: FC = () => {
    const { users, roles, isUsersLoading, isActionLoading } = useAppSelector(
        administrationSelectors.all
    )

    const dispatch = useAppDispatch()

    const [userUuId, setUserUuId] = useState('')
    const [addRoleId, setAddRoleId] = useState('')
    const [removeRoleId, setRemoveRoleId] = useState('')

    const currentUserRoles = users?.find(({ uuId }) => uuId === userUuId)?.roles

    const handleUserChange = (value: string) => {
        setAddRoleId('')
        setRemoveRoleId('')
        setUserUuId(value)
    }

    useEffect(() => {
        dispatch(getUsers({ isWithRoles: true }))
    }, [])

    useEffect(() => {
        if (!isActionLoading) {
            setAddRoleId('')
            setRemoveRoleId('')
            setUserUuId('')
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
                mb={2}
            >
                <FormControl fullWidth>
                    <InputLabel id="users-label">User</InputLabel>
                    <Select
                        disabled={isUsersLoading}
                        labelId="users-label"
                        value={userUuId}
                        label="User"
                        onChange={(event) =>
                            handleUserChange(event.target.value)
                        }
                    >
                        {users?.map((user) => (
                            <MenuItem key={user.uuId} value={user.uuId}>
                                {user.email}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                width="100%"
                maxWidth={900}
                mb={2}
            >
                <FormControl fullWidth>
                    <InputLabel id="add-roles-label">Add role</InputLabel>
                    <Select
                        disabled={!userUuId}
                        labelId="add-roles-label"
                        value={addRoleId}
                        label="Add role"
                        onChange={(event) => setAddRoleId(event.target.value)}
                    >
                        {roles
                            ?.filter(
                                ({ id, name }) =>
                                    name !== RolesEnum.USER &&
                                    !!currentUserRoles &&
                                    !currentUserRoles?.find(
                                        (userRole) => userRole.id === id
                                    )
                            )
                            .map((role) => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <Button
                    disabled={isActionLoading || !addRoleId}
                    variant="contained"
                    size="large"
                    endIcon={isActionLoading && <ButtonLoader />}
                    onClick={() =>
                        dispatch(
                            addUserRole({ uuId: userUuId, roleId: +addRoleId })
                        )
                    }
                    sx={{
                        width: { sm: 100 },
                        mt: { xs: 1, sm: 0 },
                        ml: { xs: 0, sm: 1 },
                    }}
                >
                    Add
                </Button>
            </Box>
            <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                width="100%"
                maxWidth={900}
            >
                <FormControl fullWidth>
                    <InputLabel id="remove-roles-label">Remove role</InputLabel>
                    <Select
                        disabled={!userUuId}
                        labelId="remove-roles-label"
                        value={removeRoleId}
                        label="Remove role"
                        onChange={(event) =>
                            setRemoveRoleId(event.target.value)
                        }
                    >
                        {currentUserRoles
                            ?.filter(({ name }) => name !== RolesEnum.USER)
                            .map((role) => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <Button
                    disabled={isActionLoading || !removeRoleId}
                    variant="contained"
                    size="large"
                    endIcon={isActionLoading && <ButtonLoader />}
                    onClick={() =>
                        dispatch(
                            removeUserRole({
                                uuId: userUuId,
                                roleId: +removeRoleId,
                            })
                        )
                    }
                    sx={{
                        width: { sm: 100 },
                        mt: { xs: 1, sm: 0 },
                        ml: { xs: 0, sm: 1 },
                    }}
                >
                    Remove
                </Button>
            </Box>
        </Container>
    )
}

export default withRoles(ManageUsers, [RolesEnum.ADMIN])
