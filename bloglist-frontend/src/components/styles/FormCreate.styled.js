import styled from 'styled-components'

export const FormCreate = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
  border-radius: 5px;

  & label {
    display: flex;
    flex-direction: column;
  }

  & input {
    padding: .75em;
    color: #000000;
    font-size: 1rem;
    border: solid #8f7d7d;
    border-width: 1px 2px;
    border-radius: 5px;
    outline: none;
    background-color: #ffffffff;
  }

  & input:focus {
    border: solid 2px black;
    border-radius: 5px;
  }
`
