import styled from 'styled-components'

const NavLogo = styled.h2`
  color: white;
  font-size: 1.4rem;
  margin: 0;
  margin-right: auto;
`
const NavBar = styled.nav`
  display: flex;
  background-color: #3b64ec;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  padding: 25px;
  flex-grow: 2;
  min-height: 3em;
  border-radius: 8px;
  margin: 10px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);

  button, .button-1, input[type="button"] {
    background: none;
    color: inherit;
    border: none;
    box-shadow: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit; 
    font-size: 1.5rem;
  }
  a {
    color: white;
    font-size: 1.5rem;
    text-decoration: none;
  }
`
export { NavBar, NavLogo }

