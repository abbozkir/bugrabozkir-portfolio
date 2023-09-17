import React from 'react';
import SkillSetCategory from '@/components/SkillSetCategory';

const SkillSet = (props) => {
    return (
        <div className="card">
            <h3>Skill Set</h3>
            {props.skillSetData &&
                props.skillSetData.map((skillSetCategory) => (
                    <SkillSetCategory title={skillSetCategory.title} skills={skillSetCategory.skills}/>
                ))}
        </div>
    );
};

export default SkillSet;
