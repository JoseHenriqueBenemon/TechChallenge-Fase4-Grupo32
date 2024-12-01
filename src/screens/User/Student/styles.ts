import styled from 'styled-components/native';
import { Text, View} from 'react-native';

export const Container = styled(View)`
  flex: 1;
  padding: 20px;
  background-color: #f0f2f5;
`;

export const PostTitle = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

export const AuthorName = styled(Text)`
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
`;

export const PostDescription = styled(Text)`
  font-size: 16px;
  color: #333;
  line-height: 22px;
`;