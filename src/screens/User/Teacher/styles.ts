import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';

export const Container = styled(View)`
  flex: 1;
  padding: 20px;
  background-color: #f0f2f5;
`;

export const Button = styled(TouchableOpacity)`
  width: 100%;
  height: 50px;
  background-color: #3b5998;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const ButtonText = styled(Text)`
  color: #ffffff;
  font-size: 18px;
`;

export const Label = styled(Text)`
  margin: 8px 0;
  font-weight: bold;
`;

export const Input = styled.TextInput<{ isError?: boolean }>`
  border-width: 1px;
  border-color: ${({ isError }) => (isError ? 'red' : '#ccc')};
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 10px;
`;

export const TextArea = styled(Input)`
  min-height: 100px;
  text-align-vertical: top;
`;

export const ErrorText = styled(Text)`
  color: red;
  margin-bottom: 10px;
`;

export const PickerWrapper = styled(View)`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 10px;
`;

export const DatePickerWrapper = styled(View)`
  margin-bottom: 10px;
`;