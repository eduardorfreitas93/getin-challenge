import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Header = styled.View`
  margin: 20px 0 30px 0;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.h2};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkDown};
`;

export const SubTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.lead};
  color: ${({ theme }) => theme.colors.dark};
`;

export const ContentList = styled.View`
  flex: 1;
`;

export const ViewSearch = styled.View`
  margin: 0 15px;
`;

export const ButtonBack = styled.TouchableOpacity`
  margin-left: 15px;
  margin-top: 0;
`;

export const ContainerListView = styled.View`
  flex: 1;
`;
