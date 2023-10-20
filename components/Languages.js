import React from "react";
import CustomCard from "@/components/CustomCard";
import {Skeleton} from "primereact/skeleton";

const SkillSet = (props) => {
    return (
        <div className="card">
            <h3>Languages</h3>
            {
                props.languagesData ? (
                    props.languagesData && props.languagesData.map(language => (
                        <CustomCard title={language.title} subTitle={language.level} icon="pi pi-comment"/>
                    ))
                ) : (
                    <Skeleton className="mb-2" borderRadius="10px" height="4rem"></Skeleton>
                )
            }
        </div>
    )
}

export default SkillSet;
