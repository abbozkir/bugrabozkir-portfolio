import React from 'react';
import ShowcaseComponentWrapper from "@/components/ShowcaseComponentWrapper";
import WeatherChart from "@/components/WeatherChart";

const Index = () => {
    return (
        <ShowcaseComponentWrapper componentName="WeatherChart">
            <WeatherChart/>
        </ShowcaseComponentWrapper>
    );
}

export default Index;