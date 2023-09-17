import React from 'react';
import ShowcaseComponentWrapper from "@/components/ShowcaseComponentWrapper";
import GamePlanning from "@/components/GamePlanning";

const Index = () => {
    return (
        <ShowcaseComponentWrapper componentName="GamePlanning" secondaryComponentName="TeamDetail">
            <GamePlanning/>
        </ShowcaseComponentWrapper>
    );
}

export default Index;