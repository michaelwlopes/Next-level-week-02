import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import { Picker } from '@react-native-community/picker';

import styles from './styles';

interface InputProps {
  label: string,
  placeholder: string,
  name: string,
  value: string,
  onChangeText: (name: string, value: string) => void,
}

const Input: React.FC<InputProps> = ({ label, placeholder, value, onChangeText, name }) => {
  const [selectedValue, setSelectedValue] = useState('java');
  return( 
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={value => onChangeText(name, value)}
        placeholderTextColor="#c1bccc"
        placeholder={placeholder}
      />
    </>
  );
  

}

export default Input;