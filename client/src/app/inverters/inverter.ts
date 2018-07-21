
/* Defines the Inverter entity */
export interface IInverter {
    inverterId: number;
    inverterManufacturer: string;
    inverterType: string;
    maxDcVoltage: number;
    maxPowerOutput: number;
    nominalDcInputVoltage: number;
    acOutputVoltage: number;
    maxAcCurrentOutput: number;
    startupVoltage: number;
    cec: number;
}

