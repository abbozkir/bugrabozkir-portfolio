import React from "react";
import CustomCard from "@/components/CustomCard";
import {Skeleton} from "primereact/skeleton";

const SkillSet = ({languagesData}) => {
    return (
        <div className="card">
            <h3>Languages</h3>
            {
                languagesData ? (
                    languagesData && languagesData.map(({title, level}, index) => (
                        <CustomCard key={index} title={title} subTitle={level} icon="pi pi-comment"/>
                    ))
                ) : (
                    <Skeleton className="mb-2" borderRadius="10px" height="4rem"></Skeleton>
                )
            }
        </div>
    )
}

export default SkillSet;
