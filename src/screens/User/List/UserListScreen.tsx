import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Container, UserItem, UserName, UserEmail, EmptyMessage, HeaderContainer, AddButton, FilterInput, ButtonText, ButtonContainer } from './styles';
import { API_BASE_URL } from '../../../../config';

type RootStackParamList = {
  UserList: undefined;
  AddEditUser: undefined; 
  PostDetail: { postId: number };
};

type UserListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'UserList'
>;

interface User {
  id: number;
  name: string;
  email: string;
}

export function UserListScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<UserListScreenNavigationProp>();

  useEffect(() => {
    if (filterText === '') {
      setFilteredUsers(users);
    } else {
      const lowercasedFilter = filterText.toLowerCase();
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(lowercasedFilter) ||
        user.email.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredUsers(filtered);
    }
  }, [filterText, users]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const role = await AsyncStorage.getItem('userRole');
        setRole(role);

        const email = await AsyncStorage.getItem('userEmail');
        setEmail(email);

        if (!token || role == 'Student') {
          Alert.alert('Error', 'Token de usuário não encontrado/autorizado. Faça login novamente.');
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data as User[]);
      } catch (error: any) {
        console.error('Erro ao encontrar usuários:', error);
        Alert.alert(
          'Error',
          error.response?.data?.message || 'Falha ao encontrar Usuários.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const renderItem = ({ item }: { item: User }) => (
    <UserItem>
      <UserName>{item.name}</UserName>
      <UserEmail>{item.email}</UserEmail>

      <ButtonContainer>
      {email === item.email && (
          <>
            <TouchableOpacity onPress={() => navigation.navigate('AddEditUser', { user: item})}>
              <Icon name="pencil" size={24} color="#3b5998" style={{ marginRight: 15 }} />
            </TouchableOpacity>
          </>
        )}
      </ButtonContainer>
    </UserItem>
  );

  return (
  <Container>
    {loading ? (
      <ActivityIndicator size="large" color="#3b5998" />
    ) : (
      <>
        {role === 'Teacher' && (
          <HeaderContainer>
            <AddButton onPress={() => navigation.navigate('AddEditUser')}>
              <Icon name="plus" size={20} color="#fff" />
              <ButtonText>Adicionar Usuário</ButtonText>
            </AddButton>
            <FilterInput
              placeholder="Filtrar usuários..."
              value={filterText}
              onChangeText={setFilterText}
            />
          </HeaderContainer>
        )}
        {role !== 'Teacher' && (
          <FilterInput
            placeholder="Filtrar usuários..."
            value={filterText}
            onChangeText={setFilterText}
          />
        )}
        {filteredUsers.length === 0 ? (
          <EmptyMessage>Nenhum usuário encontrado.</EmptyMessage>
        ) : (
          <FlatList
            data={filteredUsers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </>
    )}
  </Container>
);
}