
import React from 'react';
import { Container, Button, ButtonText } from './styles';

export function TeacherScreen({ navigation }: any) {
  return (
    <Container>
      <Button onPress={() => navigation.navigate('UserList')}>
        <ButtonText>User</ButtonText>
      </Button>
      <Button onPress={() => navigation.navigate('PostList')}>
        <ButtonText>Post</ButtonText>
      </Button>
    </Container>
  );
}