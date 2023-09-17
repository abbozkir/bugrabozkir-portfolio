import React from "react";
import CustomCard from "@/components/CustomCard";

const Education = (props) => {
    return (
        <div className="card">
            <h3>Education</h3>
            {
                props.educationData && props.educationData.map(event => (
                    <CustomCard title={event.title} subTitle={event.date} content={event.summary} icon="pi pi-book"/>
                ))
            }
        </div>
    );
}

export default Education;
