import { Pressable, View, Text } from "react-native";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import style from "./style";
import Modal from "./Modal";
export default function index({ items, onChange, default_value }:
    {
        items: { label: string, value: string }[],
        onChange: Dispatch<SetStateAction<"routine" | "daily" | "weekly">>,
        default_value?: string
    }) {


    const [selected, setSelected] = useState<{ label: string, value: string } | null>(items.find((i) => i.value === default_value) || null);

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
