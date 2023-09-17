export const ShowcaseService = {
    fetchComponentInformation: async (componentName) => {
        const response = await fetch(`/api/component-information/${componentName}`)
        return await response.json();
    },
    fetchSatelliteSignalData: async () => {
        const response = await fetch('/api/satellite-signal-data');
        return await response.json();
    },
    fetchSatelliteInformation: async () => {
        const response = await fetch('/api/satellite-information');
        return await response.json();
    },
    fetchWeatherData: async () => {
        const response = await fetch('/api/weather-data');
        return await response.json();
    },
    fetchDevTeamData: async () => {
        const response = await fetch('/api/dev-team-data');
        return await response.json();
    },
    fetchDevTeamPlanSample: async () => {
        const response = await fetch('/api/dev-team-plan-sample');
        return await response.json();
    },
    fetchGameSample: async () => {
        const response = await fetch('/api/game-sample');
        return await response.json();
    },
    fetchSourceCode: async (componentName) => {
        const response = await fetch(`/api/source-code/${componentName}`)
        return await response.json();
    }
};


