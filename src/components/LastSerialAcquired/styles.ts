import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 250px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-color: beige;
`;

export const SerialText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.inconsolata.medium};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.title};
`;
