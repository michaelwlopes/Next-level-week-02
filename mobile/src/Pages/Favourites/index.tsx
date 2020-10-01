import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { View, ScrollView, AsyncStorage } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

function Favourites () {    
  const [favourites, setFavourites] = useState([]);

  function loadFavourites() {
    AsyncStorage.getItem('favourites')
      .then(response => {
        if (response) {
          const favouritedTeachers =  JSON.parse(response);
          setFavourites(favouritedTeachers);
        }
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavourites();
    }, [])
  )
  
  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos" />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favourites.map((teacher: Teacher) => (
          <TeacherItem 
            key={teacher.id}
            teacher={teacher}
            favourited          
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default Favourites;
