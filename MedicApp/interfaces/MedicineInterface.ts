interface MedicineInterface {
    name: string,
    quantity: number,
    dosage: number,
    dosageType: string,
    frequency: number,
    frequencyType: string,
    duration: number,
    durationType: string,
    notes?: string,
    substitutable?: boolean,
    to_renew?: string,
    not_refundable?: boolean,
}