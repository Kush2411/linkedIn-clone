import { Avatar, AvatarImage } from "../ui/avatar";

export const ProfilePhoto = ({ src }: { src: string }) => {
  return (
    <Avatar className="cursor-pointer">
      <AvatarImage src={src} alt="profile-photo" />
    </Avatar>
  );
};
