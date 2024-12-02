import { SearchButton, SearchContainer, SearchInput } from "./searchBarStyles";
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    value: string;
    onSearchChange: (value: string) => void;
}

function SearchBar({ value, onSearchChange }: SearchBarProps){

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value); // Atualiza o estado no componente pai
    };
    return(
        <SearchContainer>
            <SearchInput
                type="text"
                value={value}
                onChange={handleSearch}
                placeholder="Pesquisar..."
            />
            <SearchButton>
                <SearchIcon
                sx={{ color:
                    "action","&:hover": {
                        color: "rgba(243, 114, 39)"
    }}}/> </SearchButton>
        </SearchContainer>
    )
}

export default SearchBar;
