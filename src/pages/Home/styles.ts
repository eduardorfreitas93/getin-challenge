import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  flex: 1;
  margin: 40px 30px 60px 30px;
`;

export const HeaderImageBackground = styled.ImageBackground`
  resize-mode: cover;
  height: 33%;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.h2};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkDown};
  margin-bottom: 20px;
`;

export const SubTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.lead};
  color: ${({ theme }) => theme.colors.dark};
`;

export const ContentList = styled.View`
  flex: 1;
  width: 100%;
  height: ${Dimensions.get('window').height - 270}px;
  position: absolute;
  top: 250px;
  background-color: ${({ theme }) => theme.colors.white};
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding-top: ${Platform.OS === 'ios' ? '30px' : 0};
`;

export const ViewSearch = styled.View`
  margin: 0 15px;
`;

export const ContainerListView = styled.View`
  flex: 1;
`;
