import { RolesEnum } from '../models/user'

export enum DrawerSectionsEnum {
    MY_REVIEWS = 'my-reviews',
    FILMS_FOR_REVIEW = 'films-for-review',
    CREATE_REVIEW = 'create-review',
    UPDATE_REVIEW = 'update-review',
    UNPUBLISHED_REVIEWS = 'unpublished-reviews',
    MANAGE_USERS = 'manage-users',
    ALLOW_COMMENTS = 'allow-comments',
    CHANGE_PASSWORD = 'change-password',
}

export const drawerSections = {
    [process.env.NEXT_PUBLIC_ACCOUNT_ROUTE!]: {
        [RolesEnum.USER]: [
            {
                name: 'Change password',
                src: process.env.NEXT_PUBLIC_ACCOUNT_CHANGE_PASSWORD_ROUTE!,
            },
        ],
    },
    [process.env.NEXT_PUBLIC_ADMINISTRATION_ROUTE!]: {
        [RolesEnum.ADMIN]: [
            {
                name: 'Manage users',
                src: process.env.NEXT_PUBLIC_ADMINISTRATION_MANAGE_USERS_ROUTE!,
            },
        ],
        [RolesEnum.MODERATOR]: [
            {
                name: 'Allow comments',
                src: process.env
                    .NEXT_PUBLIC_ADMINISTRATION_ALLOW_COMMENTS_ROUTE!,
            },
        ],
    },
    [process.env.NEXT_PUBLIC_REVIEWS_ROUTE!]: {
        [RolesEnum.WRITER]: [
            {
                name: 'My reviews',
                src: process.env.NEXT_PUBLIC_REVIEWS_MY_REVIEWS_ROUTE!,
            },
            {
                name: 'Create review',
                src: process.env.NEXT_PUBLIC_REVIEWS_FILMS_FOR_REVIEW_ROUTE!,
            },
        ],
        [RolesEnum.EDITOR]: [
            {
                name: 'Unpublished reviews',
                src: process.env.NEXT_PUBLIC_REVIEWS_UNPUBLISHED_REVIEWS_ROUTE!,
            },
        ],
    },
}
