import { UserInfosAndSignInButton } from '../UserInfosAndSignInButton';
import { FiLogOut } from 'react-icons/fi';
import { signOut } from 'next-auth/client';
import Link from 'next/link';
import { useAuth } from '../../context/Auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './styles.module.scss';

export function Header() {
  const { isLogged } = useAuth()
  const notify = () => toast('Executando SignOut!');

  function handleToastify() {
    notify()
    setInterval(() => signOut(), 1000)
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/">
            <a>GoStudy</a>
          </Link>
          <UserInfosAndSignInButton />
        </div>
        { isLogged ? <FiLogOut onClick={handleToastify} fontSize={'1.25rem'} style={{ cursor: 'pointer' }} /> : '' }
      </header>
      <ToastContainer 
        theme="dark" 
        autoClose={1000}
      />
    </>
  );
}