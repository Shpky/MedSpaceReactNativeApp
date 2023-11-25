import RNSecureStorage from "rn-secure-storage";

export default function getSave(): SaveInterface | void {
    RNSecureStorage.exists('save')
        .then((exists) => {
            if (exists)
                RNSecureStorage.get('save')
                    .then((data) => {
                        if (typeof data === "string")
                            return JSON.parse(data);
                    })
        })

}
