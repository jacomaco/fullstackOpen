import styled from 'styled-components'

export const StyledBlogPost = styled.div`
  box-shadow: 2px 4px 2px 2px #00000045;
  border-radius: 5px;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  gap: 10px;

  h2 {
    margin: 0;
  }

  h3 {
    margin: 0;
    font-weight: normal;
  }

  .actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-weight: bold;
  }
`