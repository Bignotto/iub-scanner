import React from "react";
import { TouchableOpacityProps, View } from "react-native";

import { Container, Icon } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  iconName: string;
}

export function Button({ iconName, ...rest }: ButtonProps) {
  return (
    <Container {...rest}>
      <Icon name={iconName} />
    </Container>
  );
}
