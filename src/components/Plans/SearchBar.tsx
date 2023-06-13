import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  search: string;
  setSearch: any;
}

const container = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  duration: {},
};
export function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <div className="flex justify-center mx-auto w-full">
      <label htmlFor="search" className="w-full max-w-[408px] relative">
        <div className="bg-pink-500 rounded-full max-w-fit p-[5px] text-white absolute top-[7px] left-[8px] max-h-fit cursor-text">
          <FiSearch size={18} />
        </div>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Country, City, Place..."
          className="rounded-full w-full mx-auto pr-4 pl-11 py-2 text-base"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
      </label>
    </div>
  );
}
