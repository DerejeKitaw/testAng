
/* Defines the panel entity */
export interface IPanel {
    id: number;
    panelsManufacturer: string;
    panelType: string;
    power: number;
    vmp: number;
    imp: number;
    voc: number;
    isc: number;
    vocTempCoef: number;
    vmpTempCoef: number;
    iscTempCoef: number;
    maxSystemVoltage:number;
    optimizerModel:string;
    optimizerMaxDcVoltage:string;
    optimizerMaxPowerOutput:string;
    optimizerMaxDcCurrentOutput:string;
    optimizerMaxDcCurrentInput:string;
    
}