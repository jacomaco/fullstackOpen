import styled from 'styled-components'

export const StyledBlogList = styled.div`
  .blogStyle {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    margin-bottom: 1rem;
    transition: box-shadow 0.2s ease-in-out;

    &:hover {
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
    }
  }
`