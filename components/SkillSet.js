import React from 'react';
import SkillSetCategory from '@/components/SkillSetCategory';
import {Skeleton} from "primereact/skeleton";

const SkillSet = ({skillSetData}) => {
    return (
        <div className="card">
            <h3>Skill Set</h3>
            {
                skillSetData ? (
                    skillSetData &&
                    skillSetData.map((skillSetCategory, index) => (
                        <SkillSetCategory key={index} {...skillSetCategory}/>
                    ))
                ) : (
                    <Skeleton className="mb-2" borderRadius="10px" height="4rem"></Skeleton>
                )
            }
        </div>
    );
};

export default SkillSet;
