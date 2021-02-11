import React from 'react';

import Button from '../Forms/Button';

import './Search.css';

const Search = props => {
    return (
        <form className="search-bar" onSubmit={props.clicked}>
            <label htmlFor="filter">Filter by
                <select name="filter" id="filter" className="search-bar__filter" onChange={props.changed}>
                    <option value="breed">Breed</option>
                    <option value="gender">Gender</option>
                    <option value="age">Maximum Age</option>
                </select>
            </label>
            <label htmlFor="search">
                <input
                    type="text"
                    id="search"
                    className="search-bar__input"
                    onChange={props.changed} />
            </label>
            <Button
                type="submit"
                isValid={true}
                text="Search"
                className="search-bar__btn" />
        </form>
    );
};

export default Search;