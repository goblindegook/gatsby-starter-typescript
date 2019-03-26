import React, { useState } from 'react'
import styled from '@emotion/styled'

const Wrapper = styled('div')`
  margin: 1rem 0;
  text-align: center;
`

const Button = styled('button')`
  padding: 1rem 2rem;
`

const Count = styled('span')`
  padding: 1rem 2rem;
`

export const Counter = () => {
  const [count, setCount] = useState(0)
  return (
    <Wrapper>
      <Button onClick={() => setCount(count - 1)}>-</Button>
      <Count>{count}</Count>
      <Button onClick={() => setCount(count + 1)}>+</Button>
    </Wrapper>
  )
}
