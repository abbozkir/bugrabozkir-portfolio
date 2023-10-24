import React from "react";
import CustomCard from "@/components/CustomCard";
import {Skeleton} from "primereact/skeleton";

const Education = ({educationData}) => {
    return (
        <div className="card">
            <h3>Education</h3>
            {
                educationData ? (
                    educationData && educationData.map(event => (
                        <CustomCard title={event.title} subTitle={event.date} content={event.summary} icon="pi pi-book"/>
                    ))
                ) : (
                    <Skeleton className="mb-2" borderRadius="10px" height="4rem"></Skeleton>
                )
            }
        </div>
    );
}

export default Education;
