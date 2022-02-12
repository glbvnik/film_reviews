import { List, ListItemButton, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import { drawerSections } from '../../constants/drawerSections'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { setIsMobileDrawerOpen } from '../../redux/reducers/app'
import { authSelectors } from '../../redux/reducers/auth'
import { clearOmdb } from '../../redux/reducers/omdb'

const DrawerSectionsList = () => {
    const user = useAppSelector(authSelectors.user)

    const dispatch = useAppDispatch()

    const router = useRouter()

    const mainRoute = router.pathname.replace('/[section]', '')

    const currentPageSections = drawerSections[mainRoute]

    const sectionsRoles = Object.keys(
        currentPageSections
    ) as (keyof typeof drawerSections[typeof mainRoute])[]

    const handleClick = (src: string) => {
        dispatch(setIsMobileDrawerOpen(false))

        if (src === process.env.NEXT_PUBLIC_REVIEWS_FILMS_FOR_REVIEW_ROUTE) {
            dispatch(clearOmdb())
        }

        router.push(src)
    }

    return (
        <List>
            {sectionsRoles.map((role) => {
                if (user!.roles.includes(role)) {
                    return currentPageSections[role]!.map(({ name, src }) => (
                        <ListItemButton
                            key={name}
                            onClick={() => handleClick(src)}
                        >
                            <ListItemText primary={name} />
                        </ListItemButton>
                    ))
                }
            })}
        </List>
    )
}

export default DrawerSectionsList
