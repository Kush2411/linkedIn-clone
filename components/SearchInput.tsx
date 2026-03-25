import { Input } from "./ui/input";

export const SearchInput = () => {
  return (
    <div>
      <Input
        type="text"
        placeholder="Search"
        className="bg-[#E0F3F8] w-80 rounded-lg border-none"
      />
    </div>
  );
};
