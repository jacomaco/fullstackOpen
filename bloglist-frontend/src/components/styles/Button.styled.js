import styled from 'styled-components'

export const Button = styled.button.attrs({
  type: 'submit'
})`
  --bg: ${props => props.$primary ? '#3b64ecff' : '#e34433ff'};

  background: var(--bg);
  font-size: 1em;
  padding: 0.7em 1.2em;
  border: 1px solid var(--bg);
  border-radius: 5px;
  color: white;
  cursor: pointer;
  max-width: fit-content;
  min-width: 2em;
  transition-duration: .3s;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;


  &:hover {
    background: #FFFFFF;
    color: var(--bg);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  }

`
