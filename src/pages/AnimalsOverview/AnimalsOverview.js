import React, { useEffect, useState } from 'react';

import { useHttp } from '../../shared/hooks/useHttp';
import OverviewCard from '../../components/OverviewCard/OverviewCard';
import Loading from '../../shared/components/Loading';
import Modal from '../../shared/components/Modal';
import Button from '../../components/Forms/Button';
import Search from '../../components/Search/Search';

import './AnimalsOverview.css';

const AnimalsOverview = props => {
    const { isLoading, error, sendRequest, clearError } = useHttp();
    const [loadedAnimals, setLoadedAnimals] = useState();
    const [filteredAnimals, setFilteredAnimals] = useState();
    const [searchQuery, setSearchQuery] = useState({ term: 'breed' });
    const [noResultsFound, setNoResultsFound] = useState(false);

    // Fetch all animals from backend on page load and redirect. Reset values of search queries to original values.
    useEffect(() => {
        setNoResultsFound(false);
        setSearchQuery({ term: 'breed' });
        setFilteredAnimals();
        const fetchAnimals = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_URL + '/animals');
                setLoadedAnimals(responseData.data.animals);
            } catch (error) { }

        };
        fetchAnimals();
    }, [sendRequest, props.location]);

    const searchQueryHandler = (e) => {
        // Save user search terms in state on change event
        setNoResultsFound(false);
        const inputValue = e.target.value;
        // If the changed input is the select list, save the input value under the "term" key
        if (e.target.id === 'filter') {
            setSearchQuery({
                ...searchQuery,
                term: inputValue === 'age' ? `${inputValue}[lte]` : inputValue
            });
        }
        // If the changed input is the text bar, save the input value under the "value" key
        // Also, if search input has been erased, remove the filtered animals so the full list of animals returns
        if (e.target.id === 'search') {
            if (inputValue === '') {
                setFilteredAnimals();
            }
            setSearchQuery({
                ...searchQuery,
                value: inputValue.toLowerCase()
            });
        }
    };

    const sendFilteredSearchRequest = async (e) => {
        e.preventDefault();
        // On "search" button click, set query string depending on inputs and append to the fetched URL
        const queryStr = searchQuery.value ? `?${searchQuery.term}=${searchQuery.value}` : '';
        try {
            const responseData = await sendRequest(`${process.env.REACT_APP_URL}/animals${queryStr}`);
            setFilteredAnimals(responseData.data.animals);
            // If there are no results, save that info in state in order to output
            // "no results found" message to user
            if (responseData.data.animals.length === 0) {
                setNoResultsFound(true);
            }
        } catch (error) { }
    };


    // If animals has successfully loaded from backend, map through the array and output a card for each
    // If user has performed a search, use the filtered results from the backend instead
    let useAnimals;
    if (filteredAnimals && searchQuery.value) {
        useAnimals = filteredAnimals;
    } else {
        useAnimals = loadedAnimals;
    }


    const animalsList = loadedAnimals && !isLoading ? useAnimals.map(animal => {
        return <OverviewCard
            key={animal._id}
            applications={animal.applications}
            id={animal._id}
            name={animal.name}
            age={animal.age}
            gender={animal.gender}
            breed={animal.breed}
            photo={animal.image}
            adoptionStatus={animal.adoptionStatus}
            likes={animal.likes}
            dislikes={animal.dislikes}
            health={animal.healthIssues}
            summary={animal.summary}
            goodWithChildren={animal.goodWithChildren} />;
    }
    ) : null;

    return (
        <React.Fragment>
            {error &&
                <Modal
                    show={error !== null}
                    message={error}
                    heading='Oops, something went wrong!'
                    onClose={clearError}>
                    <Button type="button" isValid={true} clicked={clearError} text="Close" />
                </Modal>}
            {loadedAnimals && <Search
                clicked={sendFilteredSearchRequest}
                changed={searchQueryHandler}
                inputs={searchQuery}
            />}
            {isLoading && <Loading />}
            {noResultsFound && <p className="search__no-results">No results found. Please try again.</p>}
            <div className="animals-overview">
                {loadedAnimals && animalsList}
            </div>
        </React.Fragment>

    );
};

export default AnimalsOverview;;