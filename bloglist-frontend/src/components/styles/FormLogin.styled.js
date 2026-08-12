import styled from 'styled-components'

export const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: fit-content;

  & label {
    display: flex;
    flex-direction: column;
  }

  & input {
    padding: .75em;
    color: #000000;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #6c6868ff;
    outline: none;
    background-color: #ffffffff;
  }
`
