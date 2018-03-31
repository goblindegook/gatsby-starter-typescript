import * as React from 'react'
import styled from 'react-emotion'
import GatsbyLink from 'gatsby-link'

const Container = styled('div')`
  background: navy;
  margin-bottom: 1.45rem;
`

const Wrapper = styled('div')`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Title = styled('h1')`
  font-family: sans-serif;
  margin: 0;
`

const TitleLink = styled(GatsbyLink)`
  color: white;
  text-decoration: none;
`

export const Header = () => (
  <Container>
    <Wrapper>
      <Title>
        <TitleLink to="/">Gatsby Starter</TitleLink>
      </Title>
    </Wrapper>
  </Container>
)

export default Header
