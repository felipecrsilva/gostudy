import { useEffect, useState } from 'react'
import { Class } from '../../components/Class'
import { supabase } from '../../utils/supabaseClient'

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

export default function ClassesList() {
  const [classes, setClasses] = useState<ClassProps[]>([])

  useEffect(() => {
    fetchClasses()
  }, [])

  async function fetchClasses() {
    const { data } = await supabase
      .from('classes')
      .select()
      if (data) {
        setClasses(data);
      }
  }

  return (
    <div className={styles.classesListContainer}>
      <header>
        <h1>Lista de aulas</h1>
      </header>
      
      { classes.map((classItem, index) => {
        return <Class 
          key={index}
          username={classItem.username}
          image={classItem.image}
          id={classItem.id}
          title={classItem.title} 
          description={classItem.description}
          date={classItem.date}
          price={classItem.price}
          subject={classItem.subject}
        />
      }) }
    </div>
  );
}