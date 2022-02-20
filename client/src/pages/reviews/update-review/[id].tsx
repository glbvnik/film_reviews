import { NextPage } from 'next'
import Drawer from '../../../components/Drawer/Drawer'
import withRoles from '../../../hoc/withRoles'
import { RolesEnum } from '../../../models/user'

const UpdateReview: NextPage = () => {
    return <Drawer />
}

export default withRoles(UpdateReview, [RolesEnum.WRITER, RolesEnum.EDITOR])
