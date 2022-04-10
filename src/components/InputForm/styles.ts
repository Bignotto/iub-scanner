import styled from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View``;

export const Input = styled(TextInput)`
  width: 100%;
  padding: 8px 8px;

  font-family: ${({ theme }) => theme.fonts.inconsolata.medium};
  font-size: ${RFValue(16)}px;

  color: ${({ theme }) => theme.colors.text_dark};
  background-color: ${({ theme }) => theme.colors.shape};

  border-radius: 5px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.rotobo.medium};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const ProductText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.inconsolata.bold};
  font-size: ${RFValue(26)}px;
  color: ${({ theme }) => theme.colors.title};
`;
