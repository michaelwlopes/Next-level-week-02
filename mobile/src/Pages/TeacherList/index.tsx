import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import useFilter from '../../hooks/useFilter';
import api from '../../services/api';

import styles from './styles';

function TeacherList () {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);  
  const [favourites, setFavourites] = useState<number[]>([]);
  const [teachers, setTeachers] = useState([]);

  const { 
    handleInputChange,
    values 
  } = useFilter({
    subject: '',
    week_day: '',
    time: '',
  });

  function loadFavourites() {
    AsyncStorage.getItem('favourites')
      .then(response => {
        if (response) {
          const favouritedTeachers =  JSON.parse(response);
          const favouritedTeachersId = favouritedTeachers.map((teacher: Teacher) => teacher.id);
          setFavourites(favouritedTeachersId);
        }
    });
  }

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFilterSubmit() {
    loadFavourites();

    const response = await api.get('classes', {
      params: {
        subject: values.subject,
        week_day: Number(values.week_day),
        time: values.time
      }
    });

    setIsFiltersVisible(!isFiltersVisible);
    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis" 
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        )}
      > 
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Input
              label="Matéria"
              value={values.subject}
              name="subject"
              onChangeText={handleInputChange}
              placeholder="Qual a matéria?"
            />          

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>       
                <Input 
                  label="Dia da semana"
                  value={values.week_day}
                  name="week_day"
                  onChangeText={handleInputChange}
                  placeholder="Qual o dia?"
                />    

              </View>
              <View style={styles.inputBlock}>       
                <Input 
                  label="Horário"
                  value={values.time}
                  name="time"
                  onChangeText={handleInputChange}
                  placeholder="Qual horário?"
                />    
              </View>
            </View>

            <RectButton
              style={styles.submitButton}
              onPress={handleFilterSubmit}
            >
              <Text style={styles.submitButtonText}>
                Filtrar
              </Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favourited={favourites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
