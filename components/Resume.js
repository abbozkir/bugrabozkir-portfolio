import {Button} from 'primereact/button';
import React, {useEffect, useState} from 'react';
import Experience from '@/components/Experience';
import SkillSet from '@/components/SkillSet';
import Languages from '@/components/Languages';
import Title from '@/components/Title';
import Education from '@/components/Education';
import {ResumeService} from '@/service/ResumeService';
import {Skeleton} from "primereact/skeleton";

const Resume = () => {
    const [summary, setSummary] = useState('');
    const [experienceEvents, setExperienceEvents] = useState('');
    const [educationData, setEducationData] = useState('');
    const [skillSetData, setSkillSetData] = useState('');
    const [languagesData, setLanguagesData] = useState('');

    useEffect(() => {
        ResumeService.fetchResumeData()
            .then(resumeData => {
                const {summary, experienceEvents, educationData, skillSetData, languagesData} = resumeData;
                setSummary(summary);
                setExperienceEvents(experienceEvents);
                setEducationData(educationData);
                setSkillSetData(skillSetData);
                setLanguagesData(languagesData);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <div className="grid">
                <div className="col-12 p-6">
                    <div className="grid grid-nogutter">
                        <div className="col-12 md:col-7 flex align-items-center">
                            <Title />
                        </div>
                        <div className="col-12 md:col-5 flex justify-content-center md:justify-content-start">
                            <img
                                src="/images/picture.jpg"
                                className="w-26rem md:w-auto max-h-30rem"
                                style={{ clipPath: 'polygon(0 0, 92% 0%, 100% 100%, 8% 100%)' }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="text-700 text-2xl mb-5 p-2">
                            {summary ?
                                (summary.split('\n').map((paragraph) => (
                                <span>
                                    {paragraph}
                                    <br />
                                </span>
                                ))) : (
                                    <Skeleton className="mb-2" borderRadius="10px" height="4rem"></Skeleton>
                                )
                            }
                        </div>
                        <div className="flex align-items-center justify-content-between">
                            <div>
                                <Button
                                    label="abbozkir"
                                    icon="pi pi-linkedin text-2xl"
                                    className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap mr-2 mb-1"
                                    onClick={() => {
                                        window.open('https://linkedin.com/in/abbozkir');
                                    }}
                                />
                                <Button
                                    label="abbozkir"
                                    icon="pi pi-github text-2xl"
                                    className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap mr-2 mb-1"
                                    onClick={() => {
                                        window.open('https://github.com/abbozkir');
                                    }}
                                />
                                <Button
                                    label="abbozkir@gmail.com"
                                    icon="pi pi-at text-2xl"
                                    className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap mr-2 mb-1"
                                    onClick={() => {
                                        window.open('mailto:abbozkir@gmail.com');
                                    }}
                                />
                            </div>
                            <div className="flex align-items-center">
                                <i className="pi pi-map-marker text-2xl"></i>
                                <span className="ml-2">The Netherlands</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 md:col-8">
                    <Experience experienceEvents={experienceEvents} />
                </div>
                <div className="col-12 md:col-4">
                    <SkillSet skillSetData={skillSetData} />
                    <Languages languagesData={languagesData} />
                    <Education educationData={educationData} />
                </div>
            </div>
        </div>
    );
};

export default Resume;
