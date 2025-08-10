import { handleSearch } from "@/server-actions/search/search";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";

function SearchBar() {
  return (
    <form action={handleSearch} className="flex-1 max-w-md relative">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        name="q"
        placeholder="Search"
        className="pl-10 pr-4 py-2 rounded-md bg-muted text-sm"
      />
    </form>
  );
}

export default SearchBar;
