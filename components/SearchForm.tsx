import React from "react";
import Form from "next/form";
import ClearButton from "./ClearButton";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query: string }) => {
  return (
    <Form action={"/"} scroll={false} className="search-form">
      <input
        type="text"
        name="query"
        defaultValue={query}
        placeholder="Search for startups"
        className="search-input"
      />
      <div className="flex gap-2">
        {query && <ClearButton />}
        <button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
