import { SxProps, Theme } from '@mui/system'

export const createStyles = <T extends SxProps<Theme>>(styles: T) => styles
