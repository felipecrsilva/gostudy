import Head from 'next/head'
import Link from 'next/link'
import { FaBook, FaChalkboardTeacher } from 'react-icons/fa'
import { Button } from '../components/Button'

import styles from './home.module.scss'

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>Home - GoStudy</title>
      </Head>

      <main>
        <div>
          <h1>GoStudy</h1>
          <p>
            Sua plataforma de educação, aprenda com professores ao vivo ou dê aulas.
          </p>
        </div>
        <img src="/hero.svg" alt="Video chamada" />
      </main>

      <footer>
        <Button
          type="button" 
        >
          <Link href="/createclass">
            <a>
              <FaChalkboardTeacher fontSize={'1.25rem'} />
              Sou professor
            </a>
          </Link>
        </Button>
        <Button 
          type="button"
        >
          <Link href="/classeslist">
            <a>
              <FaBook fontSize={'1.25rem'} />
              Sou aluno
            </a>
          </Link>
        </Button>
      </footer>
    </div>
  );
}
