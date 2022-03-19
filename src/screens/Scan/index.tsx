import React from "react";
import ScannerComponent from "../../components/ScannerComponent";
import { useScan } from "../../hooks/scan";

import { ScannerWrapper } from "./styles";

const Scan: React.FC = () => {
  return (
    //TODO: header
    <ScannerWrapper>
      <ScannerComponent />
    </ScannerWrapper>
    //TODO: footer
  );
};

export default Scan;
