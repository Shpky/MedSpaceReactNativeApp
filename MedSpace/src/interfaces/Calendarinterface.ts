interface WeekData {
    [date: string]: priseInterface[];
}
interface Wcalendar {
    [Wnumber: string]: WeekData;
}

type calendar = { date: Date, prise: priseInterface[] }[]