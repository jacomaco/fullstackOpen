import styled from 'styled-components'

export const StyledNotification = styled.div`
  background: ${props => (props.$type || props.type) === 'error' ? '#fde8e8' : (props.$type || props.type) === 'success' ? '#eefbe8' : 'lightgrey'};
  color: ${props => (props.$type || props.type) === 'error' ? 'rgb(172, 17, 17)' : (props.$type || props.type) === 'success' ? 'rgb(43, 172, 17)' : '#333'};
  font-size: 1rem;
  border: 2px solid ${props => (props.$type || props.type) === 'error' ? 'rgb(172, 17, 17)' : (props.$type || props.type) === 'success' ? 'rgb(43, 172, 17)' : 'grey'};
  border-radius: 8px;
  padding: 1em;
  margin: 10px;

`
