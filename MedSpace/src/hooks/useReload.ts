import { useState } from "react";


export default function useReload(): [() => void] {
    const [reload, setReload] = useState(0)

    const reloadPage = () => {
        setReload(reload + 1)
    }

    return [reloadPage]
}
