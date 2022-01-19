import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'

enum DrawerWriterSectionsEnum {
    MY_REVIEWS = 'My reviews',
    CREATE_REVIEW = 'Create review',
    PUBLISH_REVIEWS = 'Publish reviews',
}

const DrawerSectionsList = () => {
    return (
        <List>
            {Object.values(DrawerWriterSectionsEnum).map((text) => (
                <ListItem button key={text}>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    )
}

export default DrawerSectionsList
