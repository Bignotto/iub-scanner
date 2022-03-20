import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ScreenTitle = styled.Text`
  padding: 0 12px;
  font-family: ${({ theme }) => theme.fonts.rotobo.black};
  font-size: ${RFValue(24)}px;
`;

export const Header = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-top: 35px;
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.attention};
  padding: 0 12px;
`;
