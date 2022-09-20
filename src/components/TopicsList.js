import React from 'react';
import { useQuery } from '@apollo/client';
import Topic from './Topic';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const TopicsList = (props) => {
    const { loading, error, data } = useQuery(props.gqlQry, { variables: { search: props.needle }});
    if (error) return (<div className="error-msg">{error.message}</div>);
    if (loading) return (<AiOutlineLoading3Quarters className="loading" />);
    if(data.parentList === null || data.parentList.relatedTopics.length === 0 ) return (<div className="error-msg">No topics found.</div>);
    const itemsList = data.parentList.relatedTopics;

    return(
        <div className="topic--list">
            {itemsList && itemsList.map((topic, iIx) => 
                <Topic key={topic.id} index={iIx} topic={topic} />
            )}
        </div>
    );
}

export default TopicsList;