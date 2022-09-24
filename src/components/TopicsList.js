import React from 'react';
import Topic from './Topic';

const TopicsList = (props) => {
    if(!props.topics || props.topics.length === 0 )
        return (<div className="error-msg">No more topics found.</div>);

    return(
        <div className="topic--list">
            {props.topics && props.topics.map((topic, iIx) => 
                <Topic key={topic.id} index={iIx} topic={topic} />
            )}
        </div>
    );
}

export default TopicsList;