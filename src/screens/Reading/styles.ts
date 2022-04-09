import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  flex-direction: column;
  justify-content: space-between;
`;

export const ScreenTitle = styled.Text`
  padding: 0 10px;
  font-family: ${({ theme }) => theme.fonts.rotobo.black};
  font-size: ${RFValue(24)}px;
`;

export const Header = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-top: 35px;
`;

export const TopInfoWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const LeftBlockWrapper = styled.View`
  width: 20%;
`;

export const RightBlockWrapper = styled.View`
  flex-direction: column;
`;

export const ScannerWrapper = styled.View`
  width: 100%;
`;

export const ReadingInfoContainer = styled.View``;

export const Footer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
`;
