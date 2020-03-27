import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { LunrSearch } from './LunrSearch'

const style = {
  container: css`
    background: #ff5700;
    margin-bottom: 1.45rem;
  `,
  wrapper: css`
    display: grid;
    grid-template-columns: auto 10rem;
    grid-template-rows: auto;
    margin: 0 auto;
    max-width: 960px;
    padding: 1.45rem 1.0875rem;
  `,
  title: css`
    margin: 0;
    display: inline-block;
  `,
}

const TitleLink = styled(Link)`
  color: #fff;

  &:active,
  &:hover {
    color: #fff;
  }
`

interface HeaderProps {
  readonly title: string
}

export const Header = ({ title }: HeaderProps) => (
  <div css={style.container}>
    <div css={style.wrapper}>
      <h1 css={style.title}>
        <TitleLink to="/">{title}</TitleLink>
      </h1>
      <LunrSearch limit={10} />
    </div>
  </div>
)
