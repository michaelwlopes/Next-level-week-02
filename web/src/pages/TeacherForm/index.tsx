import React, { useState, FormEvent } from 'react';

import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import warningIcon from '../../assets/images/icons/warning.svg';
import useForm from '../../hooks/useForm';

import api from '../../services/api';

import './styles.css';


function TeacherForm() {
  const history = useHistory();

  const { 
    handleInputChange,
    handleTextareaChange,
    handleSelectChange,
    values 
  } = useForm({
    name: '',
    avatar: '',
    whatsapp: '',
    bio: '',
    subject: '',
    cost: '',
  });
  
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ]);
  }
  
  function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    api.post('classes', {
      name: values.name,
      avatar: values.avatar,
      whatsapp: values.whatsapp,
      bio: values.bio,
      subject: values.subject,
      cost: Number(values.cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso');
      history.push('/');
    }).catch(() => {
      alert('Erro ao realizar o cadastro');
    });

  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return {...scheduleItem, [field]: value }
      }
      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  return( 
    <div id="page-teacher-form" className="container"> 
      <PageHeader 
        title="Que incrível que você quer dar aulas." 
        description="O primeiro passo é preencher esse formulário de inscrição."
      />   

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome Completo"
              value={values.name}
              onChange={handleInputChange}
            />

            <Input 
              name="avatar"
              label="Avatar"
              value={values.avatar}
              onChange={handleInputChange} 
            />

            <Input
              name="whatsapp"
              label="WhatsApp"
              value={values.whatsapp}
              onChange={handleInputChange}
            />

            <Textarea 
              name="bio" 
              label="Biografia" 
              value={values.bio} 
              onChange={handleTextareaChange}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select 
              name="subject"
              value={values.subject}
              onChange={handleSelectChange}
              label="Matéria"
              options={[
                { value: 'Português', label: 'Português' },
                { value: 'Inglês', label: 'Inglês' },
                { value: 'Espanhol', label: 'Espanhol' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'História', label: 'História' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'Educação Física', label: 'Educação Física' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Química', label: 'Química' },
                { value: 'Física', label: 'Física' },
                { value: 'Laboratórios Especiais', label: 'Laboratórios Especiais' },
              ]}
            />

            <Input 
              name="cost"
              label="Custo da sua hora aula"
              value={values.cost}
              onChange={handleInputChange}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário             
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div key={index} className="schedule-item">
                <Select 
                  name="week-day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda-feira' },
                    { value: '2', label: 'Terça-feira' },
                    { value: '3', label: 'Quarta-feira' },
                    { value: '4', label: 'Quinta-feira' },
                    { value: '5', label: 'Sexta-feira' },
                    { value: '6', label: 'Sábado' },
                  ]}
                />
                <Input 
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                />
                <Input 
                  name="to"
                  label="Até"
                  type="time"                  
                  value={scheduleItem.to}
                  onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                />            
              </div>
            ))}

            
          </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante"/>
            Importante! <br/>
            Preencha todos os dados
          </p>
          <button type="submit">Salvar cadastro</button>
        </footer>
        
      </form>
      </main>  
    </div>
  )
}

export default TeacherForm;