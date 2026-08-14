import styled from 'styled-components'

export const FormLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;

  h2 {
    margin-bottom: 1.5rem;
  }
`

export const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: fit-content;
  margin: 0 auto;

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