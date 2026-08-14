import { Button } from './styles/Button.styled'
import { FormLogin, FormLoginContainer } from './styles/FormLogin.styled'
// import { Input } from './styles/Input.styled'

const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword
}) => {
  return (
    <FormLoginContainer>
      <h2>Log in to application</h2>
      <FormLogin onSubmit={handleLogin}>
        <label>
          <input
            type='text'
            name='input-username'
            placeholder='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <label>
          <input
            type='password'
            name='input-password'
            placeholder='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <Button $primary>LOGIN</Button>
      </FormLogin>
    </FormLoginContainer>
  )
}

export default LoginForm
