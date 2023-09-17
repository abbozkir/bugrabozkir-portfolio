import {Chart} from "primereact/chart";
import {Button} from "primereact/button";
import React, {useEffect, useRef, useState} from "react";
import {Dialog} from "primereact/dialog";
import {InputTextarea} from "primereact/inputtextarea";
import {Toast} from "primereact/toast";
import {ShowcaseService} from "@/service/ShowcaseService";

const WeatherChart = (props) => {
    const toast = useRef();
    const chartRef = useRef();
    const [chartLabels, setChartLabels] = useState([]);
    const [chartDataRaw, setChartDataRaw] = useState({});
    const [chartNotes, setChartNotes] = useState([]);
    const [chartData, setChartData] = useState({});
    const [noteDialogVisible, setNoteDialogVisible] = useState(false);
    const [selectedNote, setSelectedNote] = useState("");
    const [selectedNoteDetails, setSelectedNoteDetails] = useState(undefined);
    const dataKeys = [
        "highestRecord",
        "highestAverage",
        "lowestAverage",
        "lowestRecord"
    ];
    const chartOptions = {
        maintainAspectRatio: false,
        pointHitRadius: 5,
        pointHoverRadius: 5,
        animation: false,
        scales: {
            x: {},
            y: {
                max: 50,
                min: -30
            }
        },
        onClick: (event, element) => {
            if (event.type === "click" && element.length) {
                setSelectedNoteDetails({
                    datasetIndex: element[0].datasetIndex,
                    monthIndex: element[0].index
                });

                if (element.length > 1) {
                    setSelectedNote(
                        chartNotes[element[0].index][dataKeys[element[0].datasetIndex]]
                    );
                } else {
                    setSelectedNote("");
                }

                setNoteDialogVisible(true);
            }
        }
    };

    useEffect(() => {
        let labels = [];
        let temperatureData = {};
        let noteData = [];

        dataKeys.forEach(key => {
            temperatureData[key] = [];
        });

        ShowcaseService.fetchWeatherData()
            .then(weatherData => {
                weatherData.forEach(monthWeather => {
                    labels.push(monthWeather.month);
                    dataKeys.forEach(key => {
                        temperatureData[key].push(monthWeather[key]);
                    });
                    noteData.push(monthWeather.notes);
                });

                setChartNotes(noteData);
                setChartLabels(labels);
                setChartDataRaw({
                    chartLabels: labels,
                    temperatureData: temperatureData,
                });
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        let noteLineData = [];
        chartNotes.forEach((monthNote, index) => {
            dataKeys.forEach(key => {
                if (monthNote[key] && monthNote[key].trim() !== '') {
                    noteLineData.push({
                        x: chartLabels[index],
                        y: chartDataRaw.temperatureData[key][index],
                        note: monthNote[key]
                    });
                }
            });
        });

        const img = new Image(75, 75);
        img.src = '/images/chart/note.png';

        const noteDataset = {
            label: 'Notes',
            data: noteLineData,
            type: 'scatter',
            borderColor: '#8dd0ff',
            backgroundColor: '#8dd0ff',
            tension: 0.4,
            pointStyle: img
        };

        chartDataRaw.temperatureData &&
        setChartData({
            labels: chartDataRaw.chartLabels,
            datasets: [
                {
                    label: 'Highest Record',
                    data: chartDataRaw.temperatureData[dataKeys[0]],
                    borderColor: '#bb2d3b',
                    backgroundColor: '#bb2d3b',
                    tension: 0.4
                },
                {
                    label: 'Highest Average',
                    data: chartDataRaw.temperatureData[dataKeys[1]],
                    borderColor: '#d76b11',
                    backgroundColor: '#d76b11',
                    tension: 0.4
                },
                {
                    label: 'Lowest Average',
                    data: chartDataRaw.temperatureData[dataKeys[2]],
                    borderColor: '#1bab80',
                    backgroundColor: '#1bab80',
                    tension: 0.4
                },
                {
                    label: 'Lowest Record',
                    data: chartDataRaw.temperatureData[dataKeys[3]],
                    borderColor: '#5e38a4',
                    backgroundColor: '#5e38a4',
                    tension: 0.4
                },
                noteDataset
            ]
        });
        chartRef.current.refresh();
    }, [chartNotes]);

    const saveNote = (noteRemoval) => {
        setChartNotes(prevNoteList => {
            let newNoteList = [...prevNoteList];
            newNoteList[selectedNoteDetails.monthIndex][
                dataKeys[selectedNoteDetails.datasetIndex]
                ] = noteRemoval ? '' : selectedNote;

            return newNoteList;
        });

        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: noteRemoval || selectedNote === '' ? 'Message Removed' : 'Message Saved',
            life: 3000
        });
    };

    const removalButtonVisible = selectedNote.trim() !== "";
    const noteDialogTitle =
        selectedNoteDetails &&
        `${removalButtonVisible ? 'Edit Note' : 'Add Note'} for 
                    ${
            chartData.datasets[selectedNoteDetails.datasetIndex].label
        } on 
                    ${chartLabels[selectedNoteDetails.monthIndex]}`;

    const noteDialogFooter = (
        <>
            <Button
                visible={removalButtonVisible}
                type="button"
                label="Remove"
                icon="pi pi-trash"
                onClick={() => {
                    saveNote(true);
                    setNoteDialogVisible(false);
                }}
                text
            />
            <Button
                type="button"
                label="Cancel"
                icon="pi pi-times"
                onClick={() => setNoteDialogVisible(false)}
                text
            />
            <Button
                type="button"
                label="Save"
                icon="pi pi-check"
                onClick={() => {
                    saveNote(false);
                    setNoteDialogVisible(false);
                }}
                text
            />
        </>
    );

    return (
        <div className="grid p-fluid">
            <Toast ref={toast}/>
            <div className="col-12">
                <Chart
                    type="line"
                    style={{height: "600px"}}
                    data={chartData}
                    options={chartOptions}
                    ref={chartRef}
                />
            </div>
            <Dialog
                header={noteDialogTitle}
                visible={noteDialogVisible}
                position="top"
                blockScroll
                onHide={() => setNoteDialogVisible(false)}
                draggable={false}
                resizable={false}
                dismissableMask={true}
                closeOnEscape={true}
                footer={noteDialogFooter}
                closable={false}
            >
                <div className="grid p-fluid">
                    <div className="col-12">
                        <InputTextarea
                            rows={5}
                            cols={30}
                            value={selectedNote}
                            autoResize
                            onChange={(e) => setSelectedNote(e.target.value)}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default WeatherChart;
