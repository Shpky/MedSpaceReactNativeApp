interface PatientInterface {
    name: string,
    icone: string,
    prescriptions: PrescriptionInterface[],
    actualUser: Boolean,
    earliesttime: number,
    latesttime: number,
    calendar?: calendar,
}
