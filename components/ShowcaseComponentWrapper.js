import React, {useState} from 'react';
import {Button} from 'primereact/button';
import SourceCodeViewer from '@/components/SourceCodeViewer';
import InformationViewer from '@/components/InformationViewer';

const ShowcaseComponentWrapper = (props) => {
    const [sourceCodeVisible, setSourceCodeVisible] = useState(false);
    const [informationVisible, setInformationVisible] = useState(false);

    return (
        <React.Fragment>
            <div className="grid card p-0">
                <div className="col-12 md:col-6">
                    <Button
                        label="Component Information and Use Case"
                        icon="fa-solid fa-info"
                        iconPos="right"
                        severity="info"
                        className="w-full font-bold pr-4"
                        onClick={() => {
                            setInformationVisible(true);
                        }}
                    />
                </div>
                <div className="col-12 md:col-6">
                    <Button
                        label="Quick Look at the Source Code"
                        icon="fa-solid fa-code"
                        iconPos="right"
                        severity="help"
                        className="w-full font-bold pr-4"
                        onClick={() => {
                            setSourceCodeVisible(true);
                        }}
                    />
                </div>
            </div>
            <InformationViewer visible={informationVisible} {...props} onHide={() => {
                setInformationVisible(false);
            }}/>
            <SourceCodeViewer visible={sourceCodeVisible} {...props} onHide={() => {
                setSourceCodeVisible(false);
            }}/>
            {props.children}
        </React.Fragment>
    );
};

export default ShowcaseComponentWrapper;
