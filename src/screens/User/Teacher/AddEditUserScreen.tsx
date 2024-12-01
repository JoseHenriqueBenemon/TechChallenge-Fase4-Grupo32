import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { IUser } from '../../../types/types';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

import { Container, Button, ButtonText, Label, Input, ErrorText, PickerWrapper } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../../config';

type RootStackParamList = {
  AddEditUser: { user?: IUser };
  UserList: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddEditUser'>;

export const AddEditUserScreen: React.FC<Props> = ({ route, navigation }) => {
  const { user } = route.params || {};

  const isEdit = !!user;

  useEffect(() => {
    navigation.setOptions({
      title: isEdit ? 'Editar Usuário' : 'Adicionar Usuário',
    });
  }, [navigation, isEdit]);

  const { control, handleSubmit, setValue } = useForm<IUser>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'Student',
      registration_number: '',
      department: '',
    },
  });

  const selectedRole = useWatch({
    control,
    name: 'role',
    defaultValue: 'Student',
  });

  useEffect(() => {
    if (isEdit && user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('role', user.role);
      setValue('registration_number', user.registration_number || '');
      setValue('department', user.department || '');
    }
  }, [isEdit, user]);

  const onSubmit = async (data: IUser) => {
    const token = await AsyncStorage.getItem('userToken');

    try {
      if (isEdit && user) {
        const { password, ...userData } = data;

        await axios.put(`${API_BASE_URL}/users/${user.id}`, userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
      } else {
        await axios.post(`${API_BASE_URL}/users`, data);
        Alert.alert('Sucesso', 'Usuário criado com sucesso!');
      }
      navigation.navigate('UserList');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar o usuário.');
    }
  };

  return (
    <Container>
      <Label>Nome</Label>
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Nome é obrigatório' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Input
              onChangeText={onChange}
              value={value}
              placeholder="Digite o nome"
              isError={!!error}
            />
            {error && <ErrorText>{error.message}</ErrorText>}
          </>
        )}
      />

      <Label>Email</Label>
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email é obrigatório',
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Email inválido',
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Input
              onChangeText={onChange}
              value={value}
              placeholder="Digite o email"
              keyboardType="email-address"
              autoCapitalize="none"
              isError={!!error}
            />
            {error && <ErrorText>{error.message}</ErrorText>}
          </>
        )}
      />

      {!isEdit && (
        <>
          <Label>Senha</Label>
          <Controller
            control={control}
            name="password"
            rules={{ required: 'Senha é obrigatória' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Input
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite a senha"
                  secureTextEntry
                  isError={!!error}
                />
                {error && <ErrorText>{error.message}</ErrorText>}
              </>
            )}
          />
        </>
      )}

      <Label>Função</Label>
      <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <PickerWrapper>
            <Picker selectedValue={value} onValueChange={onChange}>
              <Picker.Item label="Aluno" value="Student" />
              <Picker.Item label="Professor" value="Teacher" />
            </Picker>
          </PickerWrapper>
        )}
      />

      {selectedRole === 'Student' && (
        <>
          <Label>Número de Matrícula</Label>
          <Controller
            control={control}
            name="registration_number"
            rules={{ required: 'Número de matrícula é obrigatório para alunos' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Input
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite o número de matrícula"
                  keyboardType="number-pad"
                  isError={!!error}
                />
                {error && <ErrorText>{error.message}</ErrorText>}
              </>
            )}
          />
        </>
      )}

      {selectedRole === 'Teacher' && (
        <>
          <Label>Departamento</Label>
          <Controller
            control={control}
            name="department"
            rules={{ required: 'Departamento é obrigatório para professores' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Input
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite o departamento"
                  isError={!!error}
                />
                {error && <ErrorText>{error.message}</ErrorText>}
              </>
            )}
          />
        </>
      )}

      <Button onPressOut={handleSubmit(onSubmit)}>
        <ButtonText>{isEdit ? 'Atualizar Usuário' : 'Criar Usuário'}</ButtonText>
      </Button>
    </Container>
  );
};