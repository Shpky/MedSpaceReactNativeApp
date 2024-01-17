import { Image } from "react-native";
type BuilderProps = {
    actualUser: PatientInterface | undefined,


}
/**
 * Renders the profile image component.
 * @param {BuilderProps} props - The component props.
 * @returns {JSX.Element | null} The rendered profile image component.
 */
export const ProfileImage = ({ actualUser }: BuilderProps) => {
    if (!actualUser) return null;
    return (
        <Image
            style={{
                width: 150,
                height: 150,
                marginTop: 20,
                borderRadius: 100,
            }}
            source={{ uri: actualUser.icone }}
        />
    );
};