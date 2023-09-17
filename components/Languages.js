import React from "react";
import CustomCard from "@/components/CustomCard";

const SkillSet = (props) => {
    return (
        <div className="card">
            <h3>Languages</h3>
            {
                props.languagesData && props.languagesData.map(language => (
                    <CustomCard title={language.title} subTitle={language.level} icon="pi pi-comment"/>
                ))
            }
        </div>
    )
}

export default SkillSet;
