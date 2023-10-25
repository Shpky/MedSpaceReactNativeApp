import defaultSave from "../data/defaultSave.json";

export default class Save implements SaveInterface {
    constructor(
        public doctors: DoctorInterface[],
        public patients: PatientInterface[]
    ) { }

    toJson(): SaveInterface {
        return {
            doctors: this.doctors,
            patients: this.patients
        }
    }
    static default(): Save {
        return Object.assign(new Save([], [],), defaultSave);
    }
    static fromJson(json: SaveInterface): Save {
        return new Save(
            json.doctors,
            json.patients
        );
    }
}