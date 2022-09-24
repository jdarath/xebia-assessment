import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actionTypes from '../common/store/action-types';
import { useLazyQuery } from '@apollo/client';
import { searchTopics } from '../common/gqlqueries';
import TopicsList from './TopicsList';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';

const Topic = (props) => {
    const [ isOpen, setIsOpen ] = useState(false),
          [ childrenTopics, setChildrenTopics ] = useState([]),
          [ isChildrenLoaded, setIsChildrenLoaded ] = useState(false),
          dispatch = useDispatch(),
          allTopics = useSelector(state => state.allTopics),
          topicName = props.topic.name,
          stargazers = props.topic.stargazers,
          [ getTopics, { loading, error, data }] = useLazyQuery(searchTopics);
    
    useEffect(() => {
        if(isOpen && childrenTopics.length === 0) {
            getTopics({ variables: { search: topicName }});
        }
    }, [isOpen]);

    useEffect(() => {
        const newTopics = childrenTopics.map(topic => topic.name);
        dispatch({ type: actionTypes.ADD_TOPICS, newTopics });
    }, [childrenTopics]);

    if(data && !isChildrenLoaded) {
        const newChildren = [];
        if(data.parentList && data.parentList.relatedTopics) {
            data.parentList.relatedTopics.forEach(topic => {
                if(!allTopics.includes(topic.name))
                    newChildren.push({
                        id: topic.id,
                        name: topic.name,
                        stargazers: topic.stargazers.totalCount
                    });
            });
        }
        setChildrenTopics(newChildren);
        setIsChildrenLoaded(true);
    }

    return(
        <div className="topic--item">
            <div className="topic--header">
                <span className="topic--toggler" id={props.topic.id} onClick={() => setIsOpen(!isOpen)}>
                    { isOpen? <BsDashSquare /> : <BsPlusSquare />
                    }
                </span>
                <div className="topic--info">
                    <span className="topic--name">{topicName}</span>
                    <span className="label-stargazers">stargazers: { stargazers }</span>
                </div>
            </div>
            { isOpen && 
              <>
                { error && <div className="error-msg">{error.message}</div>}
                { loading && <AiOutlineLoading3Quarters className="loading" /> }
                { data && <TopicsList topics={childrenTopics} />}
              </>
            }
        </div>
    );
}

export default Topic;