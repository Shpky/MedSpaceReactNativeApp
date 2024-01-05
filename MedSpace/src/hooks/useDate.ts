import { useState, useEffect } from 'react';

const useCurrentDate = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const updateDate = () => {
            const newDate = new Date();
            newDate.setHours(0, 0, 0, 0); // Réglez l'heure à 00:00:00:00 pour obtenir uniquement la date
            setCurrentDate(newDate);
        };

        const intervalId = setInterval(updateDate, 1000); // Mettez à jour la date chaque seconde

        // Mettez à jour la date immédiatement lors du montage
        updateDate();

        return () => {
            clearInterval(intervalId); // Nettoyez l'intervalle lorsque le composant est démonté
        };
    }, []); // Le tableau vide [] garantit que cet effet ne s'exécute qu'une seule fois lors du montage initial

    return currentDate.getTime();
};

export default useCurrentDate;
