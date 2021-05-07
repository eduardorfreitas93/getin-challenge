import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  border: solid 1px ${({ theme }) => theme.colors.lightMedium};
  border-radius: 8px;
  padding: ${Platform.OS === 'ios' ? '13px' : 0} 20px;
`;

export const Input = styled.TextInput`
  font-size: ${({ theme }) => theme.fonts.paragraph};
  margin: 0 10px;
`;

export const Image = styled.Image``;
