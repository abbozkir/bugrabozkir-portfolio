import React, {useContext, useEffect, useState} from "react";
import {TabPanel, TabView} from "primereact/tabview";
import {LayoutContext} from "@/layout/context/layoutcontext";
import SyntaxHighlighter from 'react-syntax-highlighter';

import {darculaCustomizedScheme} from '/styles/darculaCustomizedColorScheme';
import {customizedScheme} from '/styles/customizedColorScheme';
import {Sidebar} from "primereact/sidebar";
import {ShowcaseService} from "@/service/ShowcaseService";

const Code = (props) => {
    const {layoutConfig} = useContext(LayoutContext);
    const [sourceCode, setSourceCode] = useState({});
    const [secondarySourceCode, setSecondarySourceCode] = useState({});

    useEffect(() => {
        ShowcaseService.fetchSourceCode(props.componentName)
            .then(data => {
                setSourceCode(data);
            })
            .catch(error => {
                console.error(error);
            });

        props.secondaryComponentName && ShowcaseService.fetchSourceCode(props.secondaryComponentName)
            .then(data => {
                setSecondarySourceCode(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const colorScheme = layoutConfig.colorScheme === 'dark' ? darculaCustomizedScheme : customizedScheme;
    return (
        <Sidebar visible={props.visible} onHide={props.onHide} position="bottom" style={{height: '90%', width: '60%'}}>
            <TabView>
                <TabPanel header={`${props.componentName}.js`}>
                    <SyntaxHighlighter language="javascript" style={colorScheme}>
                        {sourceCode}
                    </SyntaxHighlighter>
                </TabPanel>
                {props.secondaryComponentName && (
                    <TabPanel header={`${props.secondaryComponentName}.js`}>
                        <SyntaxHighlighter language="javascript" style={colorScheme}>
                            {secondarySourceCode}
                        </SyntaxHighlighter>
                    </TabPanel>
                )}
            </TabView>
        </Sidebar>
    );
};

export default Code;
