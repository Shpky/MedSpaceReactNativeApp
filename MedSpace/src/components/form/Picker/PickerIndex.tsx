import { Pressable, View, Text } from "react-native";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import style from "./style";
import Modal from "./Modal";


/**
 * Permet de sélectionner un élément dans une liste
 * A refaire pour que ce soit plus générique
 * 
 * @param items liste des éléments à sélectionner
 * @param onChange callback appelé lorsqu'un élément est sélectionné (à modifier)
 * @param defaultValue valeur par défaut (à modifier
 */
export default function PickerIndex({ items, onChange, defaultValue }:
    {
        items: { label: string, value: string }[],
        onChange: Dispatch<SetStateAction<"routine" | "daily" | "weekly">>,
        defaultValue?: string
    }) {


    const [selected, setSelected] = useState<{ label: string, value: string } | null>(
        items.find((i) => i.value === defaultValue) || null);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const switchOpenHandler = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        onChange(selected?.value as "routine" | "daily" | "weekly")
    }, [selected])

    return <>
        {isOpen && <Modal items={items}
            onSelect={{ select: setSelected, close: () => setIsOpen(false) }} />}
        <Pressable style={style.flexbox} onPress={switchOpenHandler}>
            <Text style={style.text}>{selected?.label}</Text>
            <View style={[style.triangle, !isOpen && { transform: [{ rotate: '180deg' }] }]} />
        </Pressable>
    </>
}
