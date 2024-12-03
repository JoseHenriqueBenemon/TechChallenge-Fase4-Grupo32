// LoginScreen.tsx
import React, { useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Input, StyledButton, ButtonText } from './styles';
import { API_BASE_URL } from '../../../config';

export function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Email and password are required.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/users/signin`, {
        email: email,
        password: password
      });

      const { token, role } = response.data;
      
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userRole', role);
      await AsyncStorage.setItem('userEmail', email);

      switch(role) {
        case 'Teacher':
          navigation.replace('Teacher');
          break;
        case 'Student': 
          navigation.replace('PostList');
          break;
        default:
          Alert.alert('Error', 'Categoria do usuário não localizada');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Failed',
        error.response?.data?.message ||
          'Please check your email and password and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Input
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="large" color="#3b5998" />
      ) : (
        <>
          <StyledButton onPress={handleLogin}>
            <ButtonText>Login</ButtonText>
          </StyledButton>
        </>
      )}
    </Container>
  );
}