interface MedicineInterface {
    name: string, /* nom générique */
    company: string, /* nom du labo */
    dosage: number,
    dosageType: string,
    frequency: RoutineInterface | DailyInterface | WeeklyInterface, // Pourquoi des ou ?
    duration: Date | null, // jusqu'a tel date ?
    administration_route: string,
    warning: boolean, // ?
    notes?: string,
    substitutable?: boolean,
    to_renew?: number,
    minimumHoursbetweenDoses?: number,
}

interface RoutineInterface { //Pouvoir définir par default un heure pour la notif ? genre morning 8h ?
    morning: boolean,
    noon: boolean,
    evening: boolean,
}

interface DailyInterface { // On compte de xh à xh ? 
    count: number,
}

interface WeeklyInterface {
    delay: number, /* tous les cb de jours ex-> 1 = tous les jours, 2 = tous les 2 jours, etc */

}


