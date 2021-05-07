import styled from 'styled-components/native';

export const TitleList = styled.Text`
  font-size: ${({ theme }) => theme.fonts.h4};
  color: ${({ theme }) => theme.colors.darkDown};
  font-weight: bold;
`;

export const ViewTitleList = styled.View`
  margin: 30px 15px 15px 15px;
`;
