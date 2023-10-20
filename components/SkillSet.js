import React from 'react';
import SkillSetCategory from '@/components/SkillSetCategory';
import {Skeleton} from "primereact/skeleton";

const SkillSet = (props) => {
    return (
        <div className="card">
            <h3>Skill Set</h3>
            {
                props.skillSetData ? (
                    props.skillSetData &&
                    props.skillSetData.map((skillSetCategory) => (
                        <SkillSetCategory title={skillSetCategory.title} skills={skillSetCategory.skills}/>
                    ))
                ) : (
                    <Skeleton className="mb-2" borderRadius="10px" height="4rem"></Skeleton>
                )
            }
        </div>
    );
};

export default SkillSet;
