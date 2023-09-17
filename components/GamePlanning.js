import {Button} from "primereact/button";
import React, {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Card} from "primereact/card";
import {Dialog} from "primereact/dialog";
import {TeamDetail} from "@/components/TeamDetail";
import {ShowcaseService} from "@/service/ShowcaseService";

const GamePlanning = (props) => {
    const [previousTeamsDialog, setPreviousTeamsDialog] = useState(false);
    const [teams, setTeams] = useState([{}]);
    const [playingTeams, setPlayingTeams] = useState([]);
    const [previousTeams, setPreviousTeams] = useState([]);

    useEffect(() => {
        ShowcaseService.fetchGameSample()
            .then(gameSample => {
                setPreviousTeams(gameSample);
                setPlayingTeams(gameSample);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const onTeamDetailsUpdate = (index, field, value) => {
        setTeams(prevTeams => {
            let newTeams = [...prevTeams];
            newTeams[index][field] = value;

            return newTeams;
        });
    };

    const onTeamDelete = (index) => {
        setTeams(prevTeams => {
            let newTeams = [...prevTeams];
            newTeams.splice(index, 1);
            return newTeams;
        });
    };

    return (
        <React.Fragment>
            <Dialog
                header={'Previous teams'}
                visible={previousTeamsDialog}
                resizable={false}
                draggable={false}
                dismissableMask={true}
                onHide={() => setPreviousTeamsDialog(false)}
            >
                <div className="grid p-fluid">
                    <div className="col-12">
                        <DataTable value={previousTeams} paginator={true} rows={5}>
                            <Column field="teamName" header={"Team Name"}></Column>
                            <Column field="teamSize" header={"Team Size"}></Column>
                            <Column
                                field="teamColor"
                                header="Team Color"
                                body={team => (
                                    <div
                                        style={{
                                            background: team.teamColor,
                                            height: '30px',
                                            borderRadius: '3px',
                                        }}
                                    >
                                        &nbsp;
                                    </div>
                                )}
                            ></Column>
                            <Column
                                body={item => (
                                    <Button
                                        className="p-button-success p-button-icon-only"
                                        icon="pi pi-plus"
                                        onClick={() => {
                                            setTeams(prevTeams => {
                                                let newTeams = [...prevTeams];
                                                item.isCustomTeamColor = (item.teamColor.charAt(0) === '#');
                                                if (Object.keys(newTeams[newTeams.length - 1]).length === 0) {
                                                    newTeams[newTeams.length - 1] = item;
                                                } else {
                                                    newTeams.push(item);
                                                }

                                                return newTeams;
                                            });
                                            setPreviousTeamsDialog(false);
                                        }}
                                    />
                                )}
                            />
                        </DataTable>
                    </div>
                </div>
            </Dialog>
            <div className="grid">
                <div className="col-12 md:col-6">
                    <div className="grid p-fluid">
                        <div className="col-12">
                            <Card
                                title="Team Setup"
                                subTitle="Add your own new teams or select from previous teams to play the game"
                            >
                                <div className="grid p-fluid justify-content-end">
                                    <div className="col-12">
                                        {teams.map((item, index) => (
                                            <TeamDetail
                                                key={index}
                                                item={item}
                                                deletable={teams.length > 1}
                                                onDelete={() => onTeamDelete(index)}
                                                onUpdate={(field, value) => onTeamDetailsUpdate(index, field, value)}
                                            />
                                        ))}
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <Button
                                            label={"Add New Team"}
                                            className="p-button"
                                            icon="pi pi-plus"
                                            iconPos="right"
                                            onClick={() => {
                                                setTeams(prevTeams => ([
                                                    ...prevTeams,
                                                    {},
                                                ]));
                                            }}
                                        />
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <Button
                                            label={"Select From Previous Teams"}
                                            className="p-button"
                                            icon="pi pi-save"
                                            iconPos="right"
                                            onClick={() => {
                                                setPreviousTeamsDialog(true);
                                            }}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="col-12 md:col-6">
                            <Button
                                label={'Clear'}
                                className="p-button-danger font-bold"
                                icon="pi pi-trash"
                                iconPos="right"
                                onClick={() => {
                                }}
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <Button
                                label={'Play'}
                                className="p-button-success font-bold"
                                icon="pi pi-play"
                                iconPos="right"
                                onClick={() => {
                                    let teamsToPlay = [];
                                    const currTeams = [...teams];

                                    currTeams.forEach(team => {
                                        if (
                                            team.teamName &&
                                            team.teamSize &&
                                            team.teamColor
                                        ) {
                                            const redundantTeam = teamsToPlay.find(
                                                teamToPlay => (
                                                    team.teamName ===
                                                    teamToPlay.teamName &&
                                                    team.teamSize ===
                                                    teamToPlay.teamSize &&
                                                    team.teamColor ===
                                                    teamToPlay.teamColor
                                                )
                                            );

                                            if (!redundantTeam) {
                                                teamsToPlay.push(team);
                                            }
                                        }
                                    });

                                    if (teamsToPlay.length > 0) {
                                        setTeams([{}]);
                                        setPlayingTeams(teamsToPlay);
                                        setPreviousTeams(prevPreviousTeams => {
                                            let newPreviousTeams = [];

                                            teamsToPlay.forEach(teamToPlay => {
                                                const alreadyAdded = prevPreviousTeams.find(
                                                    previousTeam => (
                                                        previousTeam.teamName ===
                                                        teamToPlay.teamName &&
                                                        previousTeam.teamSize ===
                                                        teamToPlay.teamSize &&
                                                        previousTeam.teamColor ===
                                                        teamToPlay.teamColor
                                                    )
                                                );

                                                if (!alreadyAdded) {
                                                    newPreviousTeams.push(teamToPlay);
                                                }
                                            });

                                            return [
                                                ...prevPreviousTeams,
                                                ...newPreviousTeams,
                                            ];
                                        });
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 md:col-6">
                    <Card
                        title="Game"
                        subTitle="Observe teams playing in the current game"
                    >
                        <div className="grid">
                            {playingTeams.map(playingTeam => {
                                const teamSize = parseInt(
                                    playingTeam.teamSize
                                );

                                return (
                                    <div className="col-12 md:col-6">
                                        <div
                                            className="card"
                                            style={{
                                                borderColor:
                                                playingTeam.teamColor,
                                                borderWidth: "medium",
                                            }}
                                        >
                                            <h4>{playingTeam.teamName}</h4>
                                            <p>{`${teamSize} ${
                                                teamSize > 1
                                                    ? 'people'
                                                    : 'person'
                                            }`}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

export default GamePlanning;
