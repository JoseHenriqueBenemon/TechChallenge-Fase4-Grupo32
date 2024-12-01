import React, { useEffect, useState } from 'react';
import { FlatList, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Container, UserItem, UserName, UserEmail, EmptyMessage, ButtonContainer, HeaderContainer, AddButton, FilterInput, ButtonText } from './styles';
import { API_BASE_URL } from '../../../../config';

type RootStackParamList = {
  PostList: undefined;
  AddEditPost: undefined;
  PostDetail: { postId: number };
};

type PostListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PostList'
>;

interface Post {
  id: number;
  title: string;
  description: string;
  user: {
    name: string;
  };
}

export function PostListScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const navigation = useNavigation<PostListScreenNavigationProp>();

  useEffect(() => {
    if (filterText === '') {
      setFilteredPosts(posts);
    } else {
      const lowercasedFilter = filterText.toLowerCase();
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(lowercasedFilter) ||
        post.description.toLowerCase().includes(lowercasedFilter) || 
        post.user.name.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredPosts(filtered);
    }
  }, [filterText, posts]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userRole = await AsyncStorage.getItem('userRole');
        setRole(userRole);

        if (!token) {
          Alert.alert('Erro', 'Token de usuário não encontrado. Faça login novamente.');
          return;
        }

        const url =
          userRole === 'Teacher'
            ? `${API_BASE_URL}/posts/admin`
            : `${API_BASE_URL}/posts`;

        const response = await axios.get<Post[]>(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(response.data);
      } catch (error: any) {
        console.error('Erro ao encontrar postagens:', error);
        Alert.alert(
          'Erro',
          error.response?.data?.message || 'Falha ao encontrar postagens.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleViewPost = (postId: number) => {
    navigation.navigate('PostDetail', { postId });
  };

  const handleEditPost = (postId: number) => {
    // Navegar para a tela de edição (implementar posteriormente)
    Alert.alert('Editar Post', `Editar post com ID: ${postId}`);
  };
  
  const confirmDeletePost = (postId: number) => {
    Alert.alert(
      'Confirmar Deleção',
      'Tem certeza de que deseja deletar esta postagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Deletar', style: 'destructive', onPress: () => handleDeletePost(postId) },
      ]
    );
  };

  const handleDeletePost = async (postId: number) => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      if (!token) {
        Alert.alert('Erro', 'Token de usuário não encontrado. Faça login novamente.');
        return;
      }

      await axios.delete(`http://192.168.10.8:3000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remover o post deletado da lista
      setPosts(posts.filter((post) => post.id !== postId));

      Alert.alert('Sucesso', 'Postagem deletada com sucesso.');
    } catch (error: any) {
      console.error('Erro ao deletar postagem:', error);
      Alert.alert(
        'Erro',
        error.response?.data?.message || 'Falha ao deletar postagem.'
      );
    }
  };

  const renderItem = ({ item }: { item: Post }) => (
    <UserItem>
      <UserName>
        {item.title} - {item.user.name}
      </UserName>
      <UserEmail>{item.description}</UserEmail>
  
      <ButtonContainer>
        {role === 'Teacher' && (
          <>
            <TouchableOpacity onPress={() => navigation.navigate('AddEditPost', { post: item })}>
              <Icon name="pencil" size={24} color="#3b5998" style={{ marginRight: 15 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmDeletePost(item.id)}>
              <Icon name="trash" size={24} color="#e74c3c" />
            </TouchableOpacity>
          </>
        )}
        {role === 'Student' && (
          <TouchableOpacity onPress={() => handleViewPost(item.id)}>
            <Icon name="eye" size={24} color="#3b5998" />
          </TouchableOpacity>
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
          <HeaderContainer>
            {role === 'Teacher' && (
              <AddButton onPress={() => navigation.navigate('AddEditPost')}>
                <Icon name="plus" size={20} color="#fff" />
                <ButtonText>Adicionar Post</ButtonText>
              </AddButton>
            )}
            <FilterInput
              placeholder="Filtrar posts..."
              value={filterText}
              onChangeText={setFilterText}
              style={role !== 'Teacher' && { marginLeft: 0 }}
            />
          </HeaderContainer>
          {filteredPosts.length === 0 ? (
            <EmptyMessage>Nenhuma postagem encontrada.</EmptyMessage>
          ) : (
            <FlatList
              data={filteredPosts}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </>
      )}
    </Container>
  );
}
