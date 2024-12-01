import styled from 'styled-components/native';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

export const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
` as typeof View;

export const Input = styled(TextInput)`
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
` as typeof TextInput;

export const StyledButton = styled(TouchableOpacity)`
  width: 100%;
  height: 50px;
  background-color: #3b5998;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 10px;
` as typeof TouchableOpacity;

export const ButtonText = styled(Text)`
  color: #ffffff;
  font-size: 18px;
` as typeof Text;

export const SignUpText = styled(Text)`
  color: #3b5998;
  margin-top: 20px;
  font-size: 16px;
  text-decoration: underline;
` as typeof Text;