import type { NextPage } from 'next'
import wrapper from '../redux/store'

const Home: NextPage = () => {
    return <div>Hello</div>
}

export default Home

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
    return { props: {} }
})
