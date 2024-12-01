import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LogoutButton } from './src/components/Logout/LogoutButton';
import { LoginScreen } from './src/screens/Login/LoginScreen';
import { TeacherScreen } from './src/screens/User/Teacher/TeacherScreen';
import { UserListScreen } from './src/screens/User/List/UserListScreen';
import { PostListScreen } from './src/screens/User/List/PostListScreen';
import { PostDetailScreen } from './src/screens/User/Student/PostDetailScreen';
import { AddEditUserScreen } from './src/screens/User/Teacher/AddEditUserScreen';
import { AddEditPostScreen } from './src/screens/User/Teacher/AddEditPostScreen';
import { IPost, IUser } from './src/types/types';
type RootStackParamList = {
  Login: undefined;
  Teacher: undefined;
  UserList: undefined;
  PostDetail: { postId: number };
  PostList: undefined;
  AddUser: undefined;
  AddEditPost: { post?: IPost };
  AddEditUser: { user?: IUser };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <NavigationContainer>
      <Stack.Navigator
          initialRouteName="Login"
          screenOptions={({ navigation }) => ({
            headerRight: () => <LogoutButton navigation={navigation} />,
            headerStyle: { backgroundColor: '#3b5998' },
            headerTintColor: '#fff',
          })}
        >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Teacher" component={TeacherScreen} />
        <Stack.Screen name="UserList" component={UserListScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
        <Stack.Screen name="PostList" component={PostListScreen} />
        <Stack.Screen name="AddEditUser" component={AddEditUserScreen} />
        <Stack.Screen name="AddEditPost" component={AddEditPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}