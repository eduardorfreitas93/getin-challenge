import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  height: ${Dimensions.get('window').height - 180}px;
  position: absolute;
  top: 150px;
  background-color: ${({ theme }) => theme.colors.white};
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding-top: 45px;
`;

export const Header = styled.View`
  flex: 1;
  position: absolute;
  align-items: center;
  top: 70px;
  z-index: 9999;
  width: 100%;
`;

export const ImageHeader = styled.Image`
  height: 120px;
  width: 120px;
  border-radius: 60px;
`;

export const HeaderImageBackground = styled.ImageBackground`
  resize-mode: cover;
  height: 33%;
  background-color: #000;
`;

export const ButtonBack = styled.TouchableOpacity`
  margin-left: 15px;
  margin-top: 40px;
`;

export const ViewTitle = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.h2};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkDown};
  margin-bottom: 20px;
`;

export const DescribeTextTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.h4};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkDown};
  margin-bottom: 5px;
`;
export const DescribeTextInfo = styled.Text`
  font-size: ${({ theme }) => theme.fonts.paragraph};
  color: ${({ theme }) => theme.colors.lightDown};
  line-height: 20px;
`;

export const ViewDescribe = styled.View`
  margin: 30px 15px 0 15px;
`;

export const Spacing = styled.View`
  margin: 30px 15px 0 15px;
  border: 0.5px solid ${({ theme }) => theme.colors.light};
`;

export const ContentLoading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
