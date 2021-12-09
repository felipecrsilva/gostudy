import { FaGithub } from 'react-icons/fa'
import { signIn, useSession } from 'next-auth/client'
import { useAuth } from '../../context/Auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import styles from './styles.module.scss'

export function UserInfosAndSignInButton() {
  const [session] = useSession()
  const { toggleIsLogged, user } = useAuth()
  const notify = () => toast('Executando SignIn!')

  session ? (
    toggleIsLogged(true)
  ) : toggleIsLogged(false)

  function handleToastify() {
    notify()
    setInterval(() => signIn('github'), 1000)
  }

  return session ? (
    <div className={styles.userInfos}>
      <img src={ user.image } alt={ user.name } />
      <span>Bem vindo, <br /> <strong>{ session.user.name }</strong></span>
    </div>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={handleToastify}
    >
      <FaGithub color="#393939" />
      Sign in with GitHub
      <ToastContainer 
        theme="dark" 
        autoClose={1000}
      />
    </button>
  )
}