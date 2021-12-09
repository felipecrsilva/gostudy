import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/Auth';
import { supabase } from '../../utils/supabaseClient';
import { v4 as uuid } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './styles.module.scss';

interface ClassProps {
  id: string;
  username: string;
  image: string;
  theme: string;
  description: string;
  date: string;
  price: number;
  subject: string;
}

export default function CreateClass() {
  const { isLogged, user } = useAuth()
  const { register, handleSubmit } = useForm()
  const router = useRouter()
  const notify = (msg: string) => toast(msg)

  async function createClass(data: ClassProps) {
    if (!isLogged) {
      notify('Faça o login antes!')
      return;
    }

    await supabase
      .from('classes')
      .insert([
        {
          id: uuid(), 
          username: user.name, 
          image: user.image, 
          title: data.theme, 
          description: data.description, 
          date: handleFormatDate(data.date), 
          subject: data.subject, 
          price: data.price * 100,
        }
      ])
    
    router.push('/classeslist')
    notify('Aula criada!')
  }

  function handleFormatDate(dateTimeString: string) {
    const [date, time] = dateTimeString.split('T') // Sepair date and time
    const [YY, MM, DD] = date.split('-') // Divider date into day, month and year
    const [HH, mm] = time.split(':') // Divider time into hour and minutes
    
    return `${DD}/${MM}/${YY} às ${HH}:${mm}`;
  }

  return (
    <div className={styles.createClassContainer}>
      <h1>Criar aula</h1>

      <form onSubmit={handleSubmit(createClass)}>
        <input { ...register("theme", { required: true }) } type="text" placeholder="Tema da aula" />
        <textarea { ...register("description", { required: true }) } placeholder="Descrição" />
        <input { ...register("date", { required: true }) } type="datetime-local" placeholder="Data" />
        <input { ...register("price", { required: true }) } step="any" min="0" max="100" placeholder="Preço/hora" />
        <select { ...register("subject", { required: true }) }>
          <option value="">Matéria</option>
          <option value="Matemática">Matemática</option>
          <option value="Português">Português</option>
          <option value="História">História</option>
          <option value="Geografia">Geografia</option>
          <option value="Filosofia">Filosofia</option>
          <option value="Física">Física</option>
          <option value="Química">Química</option>
          <option value="Outra matéria">Outra</option>
        </select>
        <Button type="submit">Enviar</Button>
      </form>
      <ToastContainer 
        theme="dark" 
        autoClose={1000}
      />
    </div>
  );
}