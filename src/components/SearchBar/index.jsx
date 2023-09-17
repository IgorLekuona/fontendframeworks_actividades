import "./styles.css";

export const SearchBar = ({value, onSearch}) => {

    return (
        <div className="input-group rounded search-bar">
            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={onSearch} />
        </div>
    );
}