import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { IPost } from '../../../types/types';
import axios from 'axios';
import { format, parse, parseISO } from 'date-fns';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Container, Button, ButtonText, Label, Input, ErrorText, TextArea, PickerWrapper } from './styles'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../../config';

type RootStackParamList = {
  AddEditPost: { post?: IPost };
  PostList: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddEditPost'>;

export const AddEditPostScreen: React.FC<Props> = ({ route, navigation }) => {
    const { post } = route.params || {};
    const [showDatePicker, setShowDatePicker] = useState(false);
  
    const isEdit = !!post;
  
    useEffect(() => {
      navigation.setOptions({
        title: isEdit ? 'Editar Postagem' : 'Adicionar Postagem',
      });
    }, [navigation, isEdit]);
  
    const { control, handleSubmit, setValue, watch } = useForm<IPost>({
      defaultValues: {
        title: '',
        description: '',
        category_subject: 'Math',
        status: 'Active',
        limit_date: new Date(),
      },
    });
  
    useEffect(() => {
      if (isEdit && post) {
        setValue('title', post.title);
        setValue('description', post.description);
        setValue('category_subject', post.category_subject);
        setValue('status', post.status);
        setValue('limit_date', parse(post.limit_date, 'dd/MM/yyyy', new Date()));
      }
    }, [isEdit, post]);
  
    const onSubmit = async (data: IPost) => {
      const token = await AsyncStorage.getItem('userToken');

      try {        
        const formattedDate = format(data.limit_date, 'yyyy-MM-dd');
        
        const postData = {
          ...data,
          limit_date: formattedDate,
        };

        if (isEdit && postData) {
          await axios.put(`${API_BASE_URL}posts/${post.id}`, postData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          Alert.alert('Sucesso', 'Post atualizado com sucesso!');
        } else {
          await axios.post(`${API_BASE_URL}posts/`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          Alert.alert('Sucesso', 'Post criado com sucesso!');
        }
        navigation.navigate('PostList');
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível salvar o post.');
      }
    };
  
    return (
      <Container>
        <Label>Título</Label>
        <Controller
          control={control}
          name="title"
          rules={{ required: 'Título é obrigatório' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Input
                onChangeText={onChange}
                value={value}
                placeholder="Digite o título"
                isError={!!error}
              />
              {error && <ErrorText>{error.message}</ErrorText>}
            </>
          )}
        />
  
        <Label>Descrição</Label>
        <Controller
          control={control}
          name="description"
          rules={{ required: 'Descrição é obrigatória' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextArea
                onChangeText={onChange}
                value={value}
                placeholder="Digite a descrição"
                multiline
                isError={!!error}
              />
              {error && <ErrorText>{error.message}</ErrorText>}
            </>
          )}
        />
  
        <Label>Matéria</Label>
        <Controller
          control={control}
          name="category_subject"
          render={({ field: { onChange, value } }) => (
            <PickerWrapper>
              <Picker selectedValue={value} onValueChange={onChange}>
                <Picker.Item label="Matemática" value="Math" />
                <Picker.Item label="Biologia" value="Biology" />
                <Picker.Item label="Física" value="Physics" />
                <Picker.Item label="Química" value="Chemistry" />
                <Picker.Item label="História" value="History" />
                <Picker.Item label="Geografia" value="Geography" />
                <Picker.Item label="Português" value="Portuguese" />
                <Picker.Item label="Inglês" value="English" />
                <Picker.Item label="Literatura" value="Literature" />
                <Picker.Item label="Educação Física" value="Physical Education" />
                <Picker.Item label="Artes" value="Arts" />
                <Picker.Item label="Sociologia" value="Sociology" />
                <Picker.Item label="Filosofia" value="Philosophy" />
              </Picker>
            </PickerWrapper>
          )}
        />
  
        <Label>Status</Label>
        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, value } }) => (
            <PickerWrapper>
              <Picker selectedValue={value} onValueChange={onChange}>
                <Picker.Item label="Ativo" value="Active" />
                <Picker.Item label="Inativo" value="Inactive" />
              </Picker>
            </PickerWrapper>
          )}
        />
  
        <Label>Data Limite</Label>
        <Controller
          control={control}
          name="limit_date"
          render={({ field: { onChange, value } }) => {
            const getFormattedDate = () => {
              if (!value) return '';
              
              let date;
              if (value instanceof Date) {
                date = value;
              } else if (typeof value === 'string') {
                date = parseISO(value);
              } else {
                return '';
              }

              if (isNaN(date.getTime())) {
                return '';
              }

              return format(date, 'yyyy-MM-dd');
            };

            return (
              <>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <Input
                    editable={false}
                    placeholder="Selecione a data"
                    value={getFormattedDate()}
                  />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={value && value instanceof Date ? value : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(Platform.OS === 'ios');
                      if (selectedDate) {
                        onChange(selectedDate);
                      }
                    }}
                  />
                )}
              </>
            );
          }}
        />
  
        <Button onPress={handleSubmit(onSubmit)}>
          <ButtonText>{isEdit ? 'Atualizar Post' : 'Criar Post'}</ButtonText>
        </Button>
      </Container>
    );
  };
  