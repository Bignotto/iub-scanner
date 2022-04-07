import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Icon } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  iconName: string;
}

export function IconButton({ iconName, ...rest }: ButtonProps) {
  return (
    <Container {...rest}>
      <Icon name={iconName} />
    </Container>
  );
}
