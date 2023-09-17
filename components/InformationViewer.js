import React, {useEffect, useState} from "react";
import {Sidebar} from "primereact/sidebar";
import {Card} from "primereact/card";
import {ShowcaseService} from "@/service/ShowcaseService";

const Code = (props) => {
    const [information, setInformation] = useState({});

    useEffect(() => {
        ShowcaseService.fetchComponentInformation(props.componentName)
            .then(data => {
                setInformation(data)
            })
    }, [])

    return (
        <Sidebar visible={props.visible} onHide={props.onHide} position="bottom" style={{height: '90%', width: '60%'}}>
            <Card className="card p-0" title="Need">
                <p>{information && information.need}</p>
            </Card>
            <Card className="card p-0" title="Solution">
                <p>{information && information.solution}</p>
            </Card>
            <Card className="card p-0" title="Usage">
                <p>{information && information.usage}</p>
            </Card>
        </Sidebar>
    )
}

export default Code;
