import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  height: 75px;
  min-width: 120px;
  flex-direction: column;
  justify-content: space-between;
  background-color: beige;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.rotobo.medium};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const QuantityText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.inconsolata.bold};
  font-size: ${RFValue(36)}px;
  color: ${({ theme }) => theme.colors.title};
`;
