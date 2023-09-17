import React from 'react';
import ShowcaseComponentWrapper from "@/components/ShowcaseComponentWrapper";
import DevelopmentPlanning from "@/components/DevelopmentPlanning";

const Index = () => {
    return (
        <ShowcaseComponentWrapper componentName="DevelopmentPlanning">
            <DevelopmentPlanning/>
        </ShowcaseComponentWrapper>
    );
}

export default Index;