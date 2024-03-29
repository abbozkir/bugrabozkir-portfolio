import React, {useEffect, useState} from 'react';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {ColorPicker} from "primereact/colorpicker";

export const TeamDetail = ({item, deletable, onUpdate, onDelete}) => {
    const [predefinedColors, setPredefinedColors] = useState([]);
    const defaultColorPickerColor = '#909090';

    useEffect(() => {
        const presetColors = [
            "var(--red-500)",
            "var(--orange-500)",
            "var(--yellow-500)",
            "var(--green-500)",
            "var(--cyan-500)",
            "var(--blue-500)",
            "var(--purple-500)",
            "var(--pink-500)"
        ];

        let colorOptions = [{
            type: 'custom',
        }];
        presetColors.forEach(color => {
            colorOptions.push({
                type: 'preset',
                content: color
            });
        });

        setPredefinedColors(colorOptions);
    }, []);

    return (
        <div className="grid">
            <div className="col-12 md:col-4">
                <InputText className="inputfield w-full"
                           value={item.teamName ? item.teamName : ""}
                           onChange={(e) =>
                               onUpdate("teamName", e.target.value)} placeholder={"Team Name"}
                />
            </div>
            <div className="col-12 md:col-3">
                <div className="p-inputgroup">
                    <InputText className="inputfield w-full" keyfilter="pint"
                               value={item.teamSize ? item.teamSize : ""}
                               onChange={(e) =>
                                   onUpdate("teamSize", e.target.value)} placeholder={"Team Size"}
                    />
                    <span className="p-inputgroup-addon">ppl</span>
                </div>
            </div>
            <div
                className={`col-${item.isCustomTeamColor ? 11 : 12} md:col-${item.isCustomTeamColor ? 3 : 4}`}>
                <Dropdown
                    dropdownIcon={item.isCustomTeamColor ? "pi pi-arrow-right" : ""}
                    className="inputfield w-full"
                    options={predefinedColors}
                    placeholder={"Team Color"}
                    onChange={(e) => {
                        if (e.value.type === 'custom') {
                            onUpdate("isCustomTeamColor", true)
                            onUpdate("teamColor", defaultColorPickerColor)
                        } else {
                            onUpdate("isCustomTeamColor", false)
                            onUpdate("teamColor", e.value.content)
                        }
                    }}
                    itemTemplate={(rowData) => {
                        if (rowData.type === 'custom') {
                            return (<div><p>{"Custom Color"}</p></div>)
                        }
                        return <div style={{
                            background: rowData.content,
                            height: '30px',
                            marginTop: '-5px',
                            marginBottom: '-5px',
                            borderRadius: '3px'
                        }}>&nbsp;</div>
                    }}
                    valueTemplate={() => {
                        if (!item.isCustomTeamColor && !item.teamColor || item.isCustomTeamColor) {
                            return <div><p>{"Team Color"}</p></div>
                        }

                        return <div style={{
                            background: item.teamColor,
                            borderRadius: '3px',
                            color: 'black',
                            textAlign: "left"
                        }}><p className="ml-2">Team Color</p></div>
                    }}
                />
            </div>
            {
                item.isCustomTeamColor && (
                    <div className="col-1 md:col-1 flex justify-content-center">
                        <ColorPicker id="colorPicker" hidden={!item.isCustomTeamColor}
                                     value={item.teamColor.charAt(0) === '#' ? item.teamColor : defaultColorPickerColor}
                                     style={{marginTop: '.3rem'}} onChange={(e) => {
                            onUpdate("teamColor", `#${e.value}`)
                        }}></ColorPicker>
                    </div>
                )
            }
            <div className="col-12 md:col-1 flex justify-content-center">
                <Button className="p-button-danger p-button-icon-only" icon="pi pi-trash" onClick={() => {
                    onDelete()
                }} disabled={!deletable}/>
            </div>
        </div>
    );
}
