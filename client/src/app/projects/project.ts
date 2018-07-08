export interface IProject {
  id: number;
  // Strings
  numberOfString: number;
  numberOfModuleInverter1String1: number;
  numberOfModuleInverter1String2: number;
  numberOfModuleInverter1String3: number;
  // Service panel
  spaceAvailable: boolean;
  mainServiceBreakerSize: number;

  // Unfused disconnect
  unFusedAcDisconnectAmpRating: number;
  acOutputVoltage: number;

  // Fused disconnect
  fusedAcDisconnectAmpRating: number;
  fuseSize: number;

  inverterMaxDcVoltage: number;
  nominalDcInputVoltage: number;
  ratedVoltage: number;

  // Inverter 1 spec
  inverter1Type: string;
  maxPowerOutput: number;
  inverterMaxPowerOutput: number;
  moduleSpec: string;
  inverterAcOutputVoltage: number;
  maxAcCurrentOutput: number;
  cec: number;

  // Optimizer
  optimizerMaxDcCurrentInput: number;
  optimizerMaxDcCurrentOutput: number;
  optimizerMaxPowerOutput: number;
  optimizerMaxDcVoltage: number;
  optimizerModel: number;
  // Panel
  panelMaxSystemVoltage: number;
  panelIsc: number;
  panelVoc: number;
  panelImp: number;
  panelVmp: number;
  panelPower: number;
  panelType: string;

  // Title block
  customerName: string;
  jobType: string;
  systemPower: number;

  adress1: string;
  adress2: string;
  drawingDate: string;
}
