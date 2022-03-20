import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 36px;

  padding: 0 12px;
  margin-bottom: 8px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ProductInfoText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(24)}px;
`;

export const ButtonsWrapper = styled.View`
  width: 18%;
  flex-direction: row;
  justify-content: space-between;
`;
