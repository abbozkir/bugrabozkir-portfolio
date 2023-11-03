import React from "react";
import {Timeline} from "primereact/timeline";
import {Card} from "primereact/card";
import {Skeleton} from "primereact/skeleton";

const Experience = ({experienceEvents}) => {

    const locationFooter = (location) => (
        <div className="flex justify-content-center text-500">
            <i className={"pi pi-map-marker"}></i><span className="ml-2">{location}</span>
        </div>
    )

    const customizedContent = (item) => {
        return (
            <Card title={item.status} subTitle={item.date} footer={locationFooter(item.location)}
                  className="surface-section border-round-2xl">
                <div className={"inner-logo hidden align-items-center mb-3"}>
                    {eventImage(item, "flex justify-content-center")}
                </div>
                <p className="text-left">
                    {item.summary && item.summary.split('\n').map((paragraph) => (
                        <span>
                            {paragraph}
                            <br/>
                        </span>
                    ))}
                </p>
            </Card>
        );
    };

    const eventImage = (item, alignment) => {
        return (
            <div className={`timeline-image ${alignment}`}>
                {item.image && <img src={`/images/${item.image}`}
                                    onError={(e) =>
                                        (e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
                                    alt={item.name} width={'70%'}
                                    className="shadow-2 pl-4 pr-4 surface-section border-round-3xl"/>}
            </div>
        );
    };

    const customizedMarker = () => {
        return (
            <span
                className="flex w-2rem h-2rem align-items-center justify-content-center border-circle z-1 shadow-2 bg-primary-reverse">
                <i className="fa-solid fa-suitcase text-primary"></i>
            </span>
        );
    };

    return (
        <div className="card experience-timeline">
            <h3>Experience</h3>
            {
                experienceEvents ? (
                    <Timeline value={experienceEvents} align="alternate" className="customized-timeline"
                              content={customizedContent}
                              marker={customizedMarker} opposite={eventImage}/>
                ) : (
                    <div className="flex flex-column">
                        <Skeleton width={'50%'} borderRadius="10px" height="4rem" className="mb-2 align-self-end"></Skeleton>
                        <Skeleton width={'50%'} borderRadius="10px" height="4rem" className="mb-2"></Skeleton>
                        <Skeleton width={'50%'} borderRadius="10px" height="4rem" className="mb-2 align-self-end"></Skeleton>
                    </div>
                )
            }
        </div>
    );
}

export default Experience;
