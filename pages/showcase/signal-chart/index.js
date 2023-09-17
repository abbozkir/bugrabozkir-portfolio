import React from 'react';
import ShowcaseComponentWrapper from "@/components/ShowcaseComponentWrapper";
import SignalChart from "@/components/SignalChart";

const Index = () => {
    return (
        <ShowcaseComponentWrapper componentName="SignalChart">
            <SignalChart/>
        </ShowcaseComponentWrapper>
    );
}

export default Index;