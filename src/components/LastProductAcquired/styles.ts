import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  height: 100px;
  width: 200px;
  flex-direction: column;
  justify-content: space-between;
  background-color: beige;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.rotobo.medium};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const ProductText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.rotobo.medium};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.title};
`;
