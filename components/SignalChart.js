import React, {useEffect, useRef, useState} from 'react';
import {Chart} from 'primereact/chart';
import {ListBox} from 'primereact/listbox';
import {InputText} from 'primereact/inputtext';
import {Knob} from 'primereact/knob';
import {ShowcaseService} from '@/service/ShowcaseService';

const SignalChart = (props) => {
    const chartRef = useRef();
    const chartOptions = {
        maintainAspectRatio: false,
        animation: false,
        indexAxis: 'y',
        scales: {
            x: {
                min: 0,
                max: 100,
                type: 'linear',
                position: 'bottom',
                grid: {
                    color: '#3f4b5b'
                }
            },
            y: {
                grid: {
                    color: '#3f4b5b'
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            }
        },
        onClick: (event, item) => {
            if (item.length > 0) {
                setSelectedSignal({
                    satelliteName: satelliteList[item[0].index],
                    towerId: item[0].datasetIndex + 1,
                    signalQuality: signalDatasets[item[0].datasetIndex].data[item[0].index],
                    label: `${satelliteList[item[0].index]}#${item[0].datasetIndex + 1}`,
                });
            }
        }
    };

    const [selectedSignal, setSelectedSignal] = useState({
        satelliteName: null,
        towerId: null,
        label: null
    });
    const [satelliteInfo, setSatelliteInfo] = useState({});
    const [listBoxOptions, setListBoxOptions] = useState([]);
    const [signalDatasets, setSignalDatasets] = useState([]);
    const [satelliteList, setSatelliteList] = useState([]);
    const [highlightDataset, setHighlightDataset] = useState({});
    const [selectedSignalDetails, setSelectedSignalDetails] = useState([]);

    useEffect(() => {
        initiateSatelliteInfo();
        initiateSatelliteSignalData();
    }, []);

    useEffect(() => {
        let satSelection = [];
        satSelection[0] = 150;

        const highlightImage = new Image(40, 40);
        highlightImage.src = `/images/chart/selection.png`;

        if (selectedSignal.satelliteName) {
            const satIndex = satelliteList.findIndex((satName) => satName === selectedSignal.satelliteName);
            satSelection[satIndex] = selectedSignal.signalQuality;
        }

        setHighlightDataset({
            pointStyle: highlightImage,
            showLine: false,
            radius: 10,
            hoverRadius: 20,
            label: 'Selected Signal',
            data: satSelection,
            backgroundColor: '#FFD54F'
        });
    }, [selectedSignal]);

    useEffect(() => {
        if (selectedSignal.satelliteName) {
            setSelectedSignalDetails({
                satelliteName: selectedSignal.satelliteName,
                towerId: selectedSignal.towerId,
                signalQuality: selectedSignal.signalQuality,
                dimensions: satelliteInfo.satelliteAttributes[selectedSignal.satelliteName].dimensions,
                perigeeAltitude: satelliteInfo.satelliteAttributes[selectedSignal.satelliteName].perigeeAltitude,
                apogeeAltitude: satelliteInfo.satelliteAttributes[selectedSignal.satelliteName].apogeeAltitude,
                city: satelliteInfo.towerAttributes[selectedSignal.towerId - 1].city,
                latitude: Math.abs(satelliteInfo.towerAttributes[selectedSignal.towerId - 1].latitude),
                latitudePole:
                    satelliteInfo.towerAttributes[selectedSignal.towerId - 1].latitude > 0 ? '° N' : '° S',
                longitude: Math.abs(satelliteInfo.towerAttributes[selectedSignal.towerId - 1].longitude),
                longitudeHemisphere:
                    satelliteInfo.towerAttributes[selectedSignal.towerId - 1].longitude > 0 ? '° E' : '° W',
            });
        }
    }, [selectedSignal]);

    const initiateSatelliteInfo = () => {
        ShowcaseService.fetchSatelliteInformation()
            .then(data => {
                setSatelliteInfo(data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const initiateSatelliteSignalData = () => {
        ShowcaseService.fetchSatelliteSignalData()
            .then(data => {
                let towerCount = 0;
                let listBoxOptions = [];
                let satList = [];
                let datasets = [];

                data.forEach(satellite => {
                    satellite.signals.forEach(signal => {
                        towerCount = Math.max(towerCount, signal.towerId);
                    });
                    satList.push(satellite.satelliteName);
                });

                for (let i = 0; i < towerCount; i++) {
                    let datasetsData = [];
                    satList.forEach(currentSatName => {
                        const signal = data
                            .find(satellite => satellite.satelliteName === currentSatName).signals
                            .find(signal => signal.towerId === i + 1);

                        datasetsData.push(signal ? signal.signalQuality : null);
                    });

                    datasets.push({
                        data: datasetsData,
                    });
                }

                for (let i = 0; i < towerCount; i++) {
                    let img = new Image(24, 24);
                    img.src = '/images/chart/base.png';
                    let pointStyle = img;

                    if (i < 16) {
                        img = new Image(24, 24);
                        img.src = `/images/chart/${i + 1}.png`;
                        pointStyle = img;
                    }

                    datasets[i] = {
                        ...datasets[i],
                        type: 'scatter',
                        radius: 10,
                        hoverRadius: 10,
                        label: i + 1,
                        backgroundColor: 'white',
                        pointStyle: pointStyle
                    };
                }

                data.forEach(satellite => {
                    satellite.signals.forEach(signal => {
                        listBoxOptions.push({
                            label: `${satellite.satelliteName}#${signal.towerId}`,
                            satelliteName: satellite.satelliteName,
                            signalQuality: signal.signalQuality,
                            towerId: signal.towerId
                        });
                    });
                });

                setSatelliteList(satList);
                setSignalDatasets(datasets);
                setListBoxOptions(listBoxOptions);
                chartRef.current.refresh();
            })
            .catch(error => {
                console.error(error);
            });
    };

    const sensorTrackEntryTemplate = (satelliteData) => {
        return (
            <div className="grid">
                <div className="col-7 flex align-items-center">
                    <span className="vertical-align-middle font-bold text-xl">{satelliteData.satelliteName}</span>
                </div>
                <div className="col-5 flex align-items-center justify-content-end">
                    <img
                        src={satelliteData.towerId < 16 ? `/images/chart/${satelliteData.towerId}.png` : '/images/chart/base.png'}
                        width={32}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="grid p-fluid">
            <div className="col-12 md:col-10">
                <Chart
                    style={{height: '600px'}}
                    type="line"
                    data={{
                        labels: satelliteList,
                        datasets: [...signalDatasets, highlightDataset],
                    }}
                    options={chartOptions}
                    ref={chartRef}
                />
                <div className="grid">
                    <div className="col-12 md:col-4">
                        <div className="border-1 border-50 border-round flex justify-content-between p-3">
                            <div className="w-full">
                                <span className="block text-500 font-medium mb-3 text-2xl">Satellite</span>
                                <div className="p-inputgroup mt-3">
                                    <span className="p-inputgroup-addon w-10rem">Satellite Name</span>
                                    <InputText
                                        value={selectedSignalDetails && selectedSignalDetails.satelliteName}
                                        disabled={true}
                                    />
                                </div>
                                <div className="p-inputgroup mt-3">
                                    <span className="p-inputgroup-addon w-10rem">Dimensions</span>
                                    <InputText
                                        value={selectedSignalDetails && selectedSignalDetails.dimensions}
                                        disabled={true}
                                    />
                                    <span className="p-inputgroup-addon">cm</span>
                                </div>
                                <div className="p-inputgroup mt-3">
                                    <span className="p-inputgroup-addon w-10rem">Perigee Altitude</span>
                                    <InputText
                                        value={selectedSignalDetails && selectedSignalDetails.perigeeAltitude}
                                        disabled={true}
                                    />
                                    <span className="p-inputgroup-addon">km</span>
                                </div>
                                <div className="p-inputgroup mt-3">
                                    <span className="p-inputgroup-addon w-10rem">Apogee Altitude</span>
                                    <InputText
                                        value={selectedSignalDetails && selectedSignalDetails.apogeeAltitude}
                                        disabled={true}
                                    />
                                    <span className="p-inputgroup-addon">km</span>
                                </div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-primary border-round"
                                 style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className="fa-solid fa-satellite primary-text text-2xl"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 md:col-4">
                        <div className="border-1 border-50 border-round flex justify-content-between p-3">
                            <div className="w-full">
                                <span className="block text-500 font-medium mb-3 text-2xl">Tower</span>
                                <div className="p-inputgroup mt-3">
                                    <span className="p-inputgroup-addon w-10rem">Tower Number</span>
                                    <InputText
                                        value={selectedSignalDetails && selectedSignalDetails.towerId}
                                        disabled={true}
                                    />
                                </div>
                                <div className="p-inputgroup mt-3">
                                    <span className="p-inputgroup-addon w-10rem">City</span>
                                    <InputText
                                        value={selectedSignalDetails && selectedSignalDetails.city}
                                        disabled={true}
                                    />
                                </div>
                                <div className="p-inputgroup mt-3">
                                    <span className="p-inputgroup-addon w-10rem">Latitude</span>
                                    <InputText
                                        value={selectedSignalDetails && selectedSignalDetails.latitude}
                                        disabled={true}
                                    />
                                    <span
                                        className="p-inputgroup-addon">{selectedSignalDetails ? selectedSignalDetails.latitudePole : '° N'}</span>
                                </div>
                                <div className="p-inputgroup mt-3">
                                    <span className="p-inputgroup-addon w-10rem">Longitude</span>
                                    <InputText
                                        value={selectedSignalDetails && selectedSignalDetails.longitude}
                                        disabled={true}
                                    />
                                    <span
                                        className="p-inputgroup-addon">{selectedSignalDetails ? selectedSignalDetails.longitudeHemisphere : '° E'}</span>
                                </div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-primary border-round"
                                 style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className="fa-solid fa-tower-cell primary-text text-2xl"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 md:col-4">
                        <div className="border-1 border-50 border-round flex justify-content-between p-3">
                            <div className="w-full">
                                <span className="block text-500 font-medium mb-3 text-2xl">Signal Quality</span>
                                <div className="w-full text-center ">
                                    <Knob
                                        value={selectedSignalDetails && selectedSignalDetails.signalQuality || 0}
                                        min={0} max={100} strokeWidth={10} size={200} readOnly
                                        valueColor={selectedSignalDetails &&
                                            (selectedSignalDetails.signalQuality < 25 ? 'var(--red-300)' :
                                                    selectedSignalDetails.signalQuality < 75 ?
                                                        'var(--yellow-300)' : 'var(--green-300)'
                                            ) || 'var(--green-300)'}
                                        valueTemplate={'{value}%'}
                                    />
                                </div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-primary border-round"
                                 style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className="fa-solid fa-signal primary-text text-2xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 md:col-2 mt-4">
                <ListBox filter value={selectedSignal} onChange={(e) => {
                    e.value && setSelectedSignal({
                        satelliteName: e.value.satelliteName,
                        towerId: e.value.towerId,
                        signalQuality: e.value.signalQuality,
                        label: e.value.label
                    });
                }} options={listBoxOptions}
                         itemTemplate={(option) => sensorTrackEntryTemplate(option)} optionLabel={"label"}
                         className="w-full"/>
            </div>
        </div>
    );
};

export default SignalChart;
