
/* Defines the Inverter entity */
export interface IInverter {
    id: number;
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

