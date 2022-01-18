import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import React from 'react'

enum DrawerWriterOptionsEnum {
    MY_REVIEWS = 'My reviews',
    CREATE_REVIEW = 'Create review',
    PUBLISH_REVIEWS = 'Publish reviews',
}

const DrawerOptionsList = () => {
    return (
        <List>
            {Object.values(DrawerWriterOptionsEnum).map((text) => (
                <ListItem button key={text}>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    )
}

export default DrawerOptionsList
