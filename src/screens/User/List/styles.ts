import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export const Container = styled(View)`
  flex: 1;
  padding: 20px;
  background-color: #f0f2f5;
`;

export const UserItem = styled(View)`
  background-color: #ffffff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

export const UserName = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const UserEmail = styled(Text)`
  font-size: 16px;
  color: #666;
`;

export const EmptyMessage = styled(Text)`
  font-size: 18px;
  color: #333;
  text-align: center;
  margin-top: 20px;
`;

export const ButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const HeaderContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const AddButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  background-color: #3b5998;
  padding: 10px 15px;
  border-radius: 5px;
`;

export const ButtonText = styled(Text)`
  color: #fff;
  font-size: 16px;
  margin-left: 5px;
`;

export const FilterInput = styled(TextInput)`
  flex: 1;
  height: 40px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  padding: 0 10px;
  margin-left: 10px;
`;