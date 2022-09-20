import React, { useState } from 'react';
import { searchTopics } from '../common/gqlqueries';
import TopicsList from './TopicsList';
import { BiSearch } from 'react-icons/bi';

const TopicsMaster = () => {
    const [ searchTerm, setSearchTerm ] = useState('react');

    const onSearchBlur = (event) => {
        //If search is left empty, reset it back to "React" 
        let newValue = event.target.value;
        if(newValue.trim() === '') newValue = 'react';
        setSearchTerm(newValue);
    }

    return(
        <>
            <header>
                <h1>{ searchTerm } Related Topics on GitHub</h1>
            </header>
            <main>
                <div className="search-wrapper">
                    <input 
                        type="text" name="search" value={searchTerm} 
                        onChange={(event) => setSearchTerm(event.target.value)} onBlur={onSearchBlur}
                    />
                    <BiSearch />
                </div>
                { searchTerm !== '' && 
                    <div className="main-wrapper">
                        <TopicsList gqlQry={searchTopics} needle={searchTerm} />
                    </div>
                }
            </main>
        </>
    );
}

export default TopicsMaster;