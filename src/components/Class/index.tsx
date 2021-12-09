import { useAuth } from '../../context/Auth'
import { Button } from '../Button'
import Link from 'next/link'

import styles from './styles.module.scss'

interface ClassProps {
  username: string;
  image: string;
  id: string;
  title: string;
  description: string;
  date: string;
  price: number;
  subject: string;
}

export function Class({ 
  username,
  image,
  id,
  title, 
  description, 
  date,
  price,
  subject }: ClassProps) {
  return (
    <article className={styles.classContainer}>
      <header>
        <div>
          <img src={image} alt={username} />
          <div>
            <strong>{ username }</strong>
            <span>{ subject }</span>
          </div>
        </div>
        <strong>{ date }</strong>
      </header>
      <p>
        <strong>{ title }</strong>
        { description }
      </p>
      <footer>
        <p>
          Preço/hora
          <strong>R${ price / 100 }</strong>
        </p>
        <Button>
          <Link href={`https://meet.jit.si/${id}`}>
            <a target="_blank">Acessar aula</a>
          </Link>
        </Button>
      </footer>
    </article>
  );
}