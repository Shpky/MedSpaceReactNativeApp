interface MedicineInterface {
    name: string, /* nom générique */
    company: string, /* nom du labo */
    dosage: number,
    dosageType: string,
    frequency: RoutineInterface | DailyInterface | WeeklyInterface,
    duration: Date | null, // jusqu'à tel date 
    administration_route: string,
    warning: boolean,
    notes?: string,
    substitutable?: boolean,
    to_renew?: number,
    minimumHoursbetweenDoses?: number,
}

interface RoutineInterface { 
    morning: boolean,
    noon: boolean,
    evening: boolean,
}

interface DailyInterface {
    count: number,
}

interface WeeklyInterface {
    delay: number, /* tous les cb de jours ex-> 1 = tous les jours, 2 = tous les 2 jours, etc */

}
