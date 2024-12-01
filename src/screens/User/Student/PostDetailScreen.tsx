// PostDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Container, PostTitle, PostDescription, AuthorName } from './styles';
import { categorySubjectTranslations } from '../../../utils/categorySubjectTranslations';
import { IPost } from '../../../types/types';
import { API_BASE_URL } from '../../../../config';

type RootStackParamList = {
  PostDetail: { postId: number };
};

export function PostDetailScreen() {
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const route = useRoute<RouteProp<RootStackParamList, 'PostDetail'>>();
  const { postId } = route.params;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');

        if (!token) {
          Alert.alert('Erro', 'Token de usuário não encontrado. Faça login novamente.');
          return;
        }

        const response = await axios.get<IPost>(`${API_BASE_URL}/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPost(response.data);
      } catch (error: any) {
        console.error('Erro ao carregar a postagem:', error);
        Alert.alert(
          'Erro',
          error.response?.data?.message || 'Falha ao carregar a postagem.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#3b5998" />
      </Container>
    );
  }
  if (!post) {
    return (
      <Container>
        <Text>Postagem não encontrada.</Text>
      </Container>
    );
  }

  return (
    <Container>
      <PostTitle>{post.title}</PostTitle>
      <AuthorName>Por: {post.user?.name}</AuthorName>
      <PostDescription>{post.description}</PostDescription>
      <PostDescription>Matéria: {categorySubjectTranslations[post.category_subject]}</PostDescription>
      <PostDescription>Estado do post: {(post.status === "Active" ? "Ativo" : "Desativo")}</PostDescription>
      <PostDescription>Data de vencimento: {post.limit_date}</PostDescription>
    </Container>
  );
}