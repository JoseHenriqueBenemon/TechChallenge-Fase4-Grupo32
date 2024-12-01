import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Login: undefined;
  Teacher: undefined;
  UserList: undefined;
  PostDetail: { PostId: number };
  PostList: undefined;
  AddUser: undefined;
  AddPost: undefined;
};

interface LogoutButtonProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ navigation }) => {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('userEmail');

      // Redefine a pilha de navegação
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Não foi possível fazer logout. Tente novamente.');
    }
  };

  return (
    <TouchableOpacity onPressOut={logout} style={{ marginRight: 15 }}>
      <Icon name="sign-out" size={24} color="#fff" />
    </TouchableOpacity>
  );
};