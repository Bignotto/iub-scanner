import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export const Container = styled(TouchableOpacity)`
  align-items: center;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.text};
`;
