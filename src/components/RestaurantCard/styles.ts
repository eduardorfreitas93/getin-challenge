import styled from 'styled-components/native';

export const ItemButton = styled.TouchableOpacity`
  flex: 1;
  border-radius: 20px;
  margin: 10px 15px;
  height: 177px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.small};
  color: ${({ theme }) => theme.colors.white};
  margin: 10px;
`;

export const ImageBackground = styled.ImageBackground`
  flex: 1;
  width: 100%;
  aspect-ratio: 1;
  justify-content: flex-end;
  background-color: #000;
  border-radius: 8px;
`;
