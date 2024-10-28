import style from "./index.module.scss";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSearchByUserMutation } from "@/redux/reducers/SearchSlice/SearchApiSlice";

type searchProps = {
  showSearch: any;
  onSearch?: any;
};

const SearchBar = ({ showSearch, onSearch }: searchProps) => {
  const [saveSearch] = useSearchByUserMutation();
  const { data: session }: any = useSession();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [searchQuery, setSearchQuery] = useState<any>("" || search);
  const router = useRouter();

  // useEffect(() => {
  //   if (searchQuery?.length > 0) {
  //     router.push(`/search?search=${searchQuery}`);
  //   }
  // }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery?.length > 0) {
      if (session) {
        const payload = {
          data: {
            keyword: `${searchQuery}`,
            user: {
              connect: [{ id: `${session?.user?.id}` }],
            },
          },
        };

        saveSearch(payload);
      }
      router.push(`/search?search=${searchQuery}`);
    }
  };
  return (
    // <div className={style.search__wrapper}>
    <div className={`${style.search__wrapper} ${showSearch ? style.show : ""}`}>
      <form onSubmit={handleSubmit}>
        <Image
          src="/assets/svg/search.svg"
          alt="search"
          width={18}
          height={18}
        />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery ?? ""}
          onChange={handleSearch}
        />
        <button className={`${style.searchArrow}`} onClick={() => handleSubmit}>
          <Image
            src={"/assets/svg/right-arrow-black.svg"}
            alt="arrow"
            height={18}
            width={18}
          />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
