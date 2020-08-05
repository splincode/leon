import { Layout } from '@components/layout'
import { FunctionComponent } from 'react'
import config from 'site.config'

export interface AboutPageProps {
  title: string
  description: string
}

const AboutPage: FunctionComponent<AboutPageProps> = ({ title, description, children, ...props }) => {
  return (
    <Layout pageTitle={`${title} | About`} description={description}>
      <h1 className="title">Welcome to my blog!</h1>
      <p className="description">{description}</p>
    </Layout>
  )
}
export default AboutPage

export const getStaticProps = async () => {
  const siteMetadata = config.siteMetadata
  return {
    props: {
      title: siteMetadata.title,
      description: siteMetadata.description,
    },
  }
}
