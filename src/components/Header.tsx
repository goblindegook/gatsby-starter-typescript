import * as React from 'react'
import styled from 'styled-components'
import GatsbyLink from 'gatsby-link'

const Title = styled.h1`
  margin: 0;
`

const Container = styled.div`
  background: navy;
  margin-bottom: 1.45rem;
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const TitleLink = styled(GatsbyLink)`
  color: white;
  text-decoration: none;
`

export const Header = () => (
  <Container>
    <Wrapper>
      <Title>
        <TitleLink to="/">
          Gatsby Starter
        </TitleLink>
      </Title>
    </Wrapper>
  </Container>
)

export default Header
