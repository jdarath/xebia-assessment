import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actionTypes from '../common/store/action-types';
import { useLazyQuery } from '@apollo/client';
import { searchTopics } from '../common/gqlqueries';
import TopicsList from './TopicsList';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';

const TopicsMaster = () => {
    const [ isWaiting, setIsWaiting ] = useState(false),
          [ timeOutId, setTimeoutId ] = useState(0),
          [ tempSearch, setTempSearch ] = useState('react'),
          isDataLoaded = useSelector(state => state.isDataLoaded),
          topicTree = useSelector(state => state.topicTree),
          dispatch = useDispatch(),
          [ getTopics, { loading, error, data }] = useLazyQuery(searchTopics);
    
    if(data && !isDataLoaded) {
        let newChildren = [];
        if(data.parentList && data.parentList.relatedTopics) {
            newChildren = data.parentList.relatedTopics.map(topic => {
                return({
                    id: topic.id,
                    name: topic.name,
                    stargazers: topic.stargazers.totalCount
                });
            });
        }
        const newTree = { name: topicTree.name, children: newChildren };
        setTimeout(() => {
            dispatch({ type: actionTypes.SET_TOPIC_TREE, topicTree: newTree });
        }, 100);
    }

    useEffect(() => {
        //fetch data for the 1st time:
        if(!data && !loading && !error) getTopics({ variables: { search: topicTree.name }});
    });

    useEffect(() => {
        if(isWaiting && tempSearch.trim() !== '') {
            if(timeOutId !== 0) clearTimeout(timeOutId);
            const newTimeoutId = setTimeout(() => {
                fetchSearch(tempSearch);
            }, 1000);
            setTimeoutId(newTimeoutId);
        }
    }, [tempSearch, isWaiting]);

    const onSearchChange = (event) => {
        setTempSearch(event.target.value);
        setIsWaiting(true);
    }

    const onSearchBlur = (event) => {
        //If search is left empty, reset it back to "React" 
        let newValue = event.target.value;
        if(newValue.trim() === '') newValue = 'react';
        if(isWaiting || newValue !== topicTree.name) {
            if(timeOutId > 0) clearTimeout(timeOutId);
            setTempSearch(newValue);
            fetchSearch(newValue);
        }
    }

    const fetchSearch = (newTopic) => {
        setIsWaiting(false);
        setTimeoutId(0);
        dispatch({ type: actionTypes.SET_TOPIC_BASE, name: newTopic });
        getTopics({ variables: { search: newTopic }});
    }

    return(
        <>
            <header>
                <h1>{ topicTree.name } Related Topics on GitHub</h1>
            </header>
            <main>
                <div className="search-wrapper">
                    <input 
                        type="text" name="search" value={tempSearch} 
                        onChange={onSearchChange} onBlur={onSearchBlur}
                    />
                    <BiSearch />
                </div>
                <div className="main-wrapper">
                    { error && <div className="error-msg">{error.message}</div>}
                    { loading && <AiOutlineLoading3Quarters className="loading" /> }
                    { data && topicTree.name !== '' && topicTree.children.length > 0 && 
                        <TopicsList topics={topicTree.children} />
                    }
                </div>
            </main>
        </>
    );
}

export default TopicsMaster;