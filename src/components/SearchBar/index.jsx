import "./styles.css";

export const SearchBar = () => {
    return (
        <div class="input-group rounded search-bar">
            <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
        </div>
    );
}