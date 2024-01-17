/**
 * Updates the consumption status of a medicine in the calendar.
 * @param calendar - The calendar object.
 * @param week - The week identifier.
 * @param day - The day identifier.
 * @param medicine - The medicine object to update.
 * @param setSave - The state setter function for the save object.
 */
export const MedicineConsumed = (calendar: Wcalendar, week: string, day: string, medicine: priseInterface, setSave: React.Dispatch<React.SetStateAction<SaveInterface | undefined>>) => {
    const tempo = calendar[week][day].findIndex((prise) => prise == medicine)
    if (tempo != -1) {
        calendar[week][day][tempo].consumed = !calendar[week][day][tempo].consumed
    }

    setSave((prevSave: SaveInterface | undefined) => {
        if (!prevSave) return prevSave;
        return {
            ...prevSave,
            patients: prevSave.patients.map((patient) => (patient.actualUser ? { ...patient, calendar: calendar } : patient)),
        };
    });


}