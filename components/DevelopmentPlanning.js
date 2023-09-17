import {Button} from "primereact/button";
import React, {useEffect, useState} from "react";
import {Dropdown} from "primereact/dropdown";
import {MultiSelect} from "primereact/multiselect";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {Chip} from "primereact/chip";
import {Card} from "primereact/card";
import {ShowcaseService} from "@/service/ShowcaseService";

const DevelopmentPlanning = (props) => {
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [selectedTicketsMap, setSelectedTicketsMap] = useState({});
    const [tickets, setTickets] = useState([]);

    const [team, setTeam] = useState({});
    const [teams, setTeams] = useState([]);
    const [plan, setPlan] = useState([]);

    useEffect(() => {
        ShowcaseService.fetchDevTeamData()
            .then(teamsData => {
                teamsData.forEach(team => {
                    team.label = team.name;
                });

                setTeams(teamsData);
            })
            .catch(error => {
                console.error(error);
            });

        ShowcaseService.fetchDevTeamPlanSample()
            .then(samplePlan => {
                setPlan(samplePlan);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const addTicket = (ticket) => {
        setSelectedTickets(prevSelectedTickets => {
            let newSelectedTickets = [...prevSelectedTickets];

            newSelectedTickets.push({
                id: ticket.id,
                team: team,
                ticketName: ticket.name,
                ticketLabel: `${ticket.label} (${team.name})`,
                estimatedTime: ticket.estimatedTime,
                join: false
            });

            return newSelectedTickets;
        });
    };

    const removeTicket = (ticket) => {
        setSelectedTickets([...selectedTickets].filter(selectedTicket => (selectedTicket.id !== ticket.id)));
    };

    const joinBodyTemplate = (rowData, row) => {
        if (row.rowIndex === 0) {
            return <div></div>;
        }
        return <div style={{textAlign: 'center'}}>
            <Checkbox tooltip={"Start at the same time with the ticket above"} tooltipOptions={{showDelay: 300}}
                      onChange={e => {
                          setSelectedTickets(prevSelectedTickets => {
                              let newSelectedTickets = [...prevSelectedTickets];
                              newSelectedTickets[row.rowIndex].join = e.checked;
                              return newSelectedTickets;
                          });
                      }} checked={selectedTickets[row.rowIndex].join === true}/>
        </div>;
    };

    const estimatedTimeBodyTemplate = (rowData, row) => {
        return (
            <div className="p-inputgroup">
                <InputText size={3} className="inputfield w-full" keyfilter={"pint"}
                           value={selectedTickets[row.rowIndex].estimatedTime}
                           onChange={(e) => {
                               setSelectedTickets(prevSelectedTickets => {
                                   let newSelectedTickets = [...prevSelectedTickets];
                                   newSelectedTickets[row.rowIndex].estimatedTime = Number.parseInt(e.target.value);
                                   return newSelectedTickets;
                               });
                           }} placeholder={"time"}
                />
                <span className="p-inputgroup-addon">{"days"}</span>
            </div>
        );
    };

    const deleteTicketBodyTemplate = (rowData, row) => {
        return (
            <Button className="p-button-danger p-button-icon-only" icon="pi pi-trash" onClick={() => {
                const deletedTicket = selectedTickets[row.rowIndex];
                setSelectedTickets(prevSelectedTickets => {
                    let newSelectedTickets = [...prevSelectedTickets];
                    newSelectedTickets.splice(row.rowIndex, 1);
                    return newSelectedTickets;
                });
                setSelectedTicketsMap(prevSelectedTicketsMap => {
                    let newSelectedTicketsMap = {...prevSelectedTicketsMap};
                    newSelectedTicketsMap[deletedTicket.team.id] = selectedTicketsMap[deletedTicket.team.id]
                        .filter(item => item.id !== deletedTicket.id);
                    return newSelectedTicketsMap;
                });
            }}/>
        );
    };

    const deleteBatchBodyTemplate = (rowData, row) => {
        return (
            <Button className="p-button-danger p-button-icon-only mr-3" icon="pi pi-trash" onClick={() => {
                setPlan(prevPlan => {
                    let newPlan = [...prevPlan];
                    newPlan.splice(row.rowIndex, 1);
                    return newPlan;
                });
            }}/>
        );
    };

    const addTicketBatch = () => {
        if (selectedTickets.length === 0) {
            return;
        }

        let ticketBatch = [];
        let ticketGroup = [selectedTickets[0].ticketLabel];
        let totalEstimatedTime = 0;
        let currentGroupTime = selectedTickets[0].estimatedTime;

        selectedTickets.forEach((ticket, index) => {
            if (index === 0) {
                return;
            }

            if (ticket.join) {
                ticketGroup.push(ticket.ticketLabel);
                currentGroupTime = Math.max(currentGroupTime, ticket.estimatedTime);
            } else {
                ticketBatch.push(ticketGroup);
                totalEstimatedTime += currentGroupTime;
                ticketGroup = [ticket.ticketLabel];
                currentGroupTime = ticket.estimatedTime;
            }
        });

        ticketBatch.push(ticketGroup);
        totalEstimatedTime += currentGroupTime;

        setPlan(prevPlan => {
            let newPlan = [...prevPlan];
            newPlan.push({
                ticketBatch: ticketBatch, estimatedTime: totalEstimatedTime
            });

            return newPlan;
        });
    };

    const clearTicketBatch = () => {
        setSelectedTickets([]);
        setSelectedTicketsMap([]);
        setTeam({});
    };

    const ticketBatchBodyTemplate = (rowData, row) => {
        return (
            <div>
                {rowData.ticketBatch.map(ticketGroup => {
                    return (
                        <div className="card p-0 m-1 border-primary-800">
                            {ticketGroup.map(ticket => <Chip className="m-1 bg-primary font-bold" label={ticket}/>)}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <div className="grid p-fluid">
                    <div className="col-12">
                        <Card title="Tickets"
                              subTitle="Select Teams and Tickets to create Ticket Batch and add it to the Plan">
                            <div className="grid justify-content-end">
                                <div className="col-12 md:col-6">
                                    <Dropdown value={team} options={teams} placeholder="Select Team"
                                              className="inputfield w-full"
                                              tooltip="Add more tickets by selecting other teams"
                                              onChange={e => {
                                                  const team = e.target.value;
                                                  setTeam(team);

                                                  const ticketsData = [...team.tickets];

                                                  ticketsData.forEach(ticket => {
                                                      ticket.label = ticket.name;
                                                  });

                                                  setTickets(ticketsData);
                                              }}/>
                                </div>
                                <div className="col-12 md:col-6">
                                    <MultiSelect filter showSelectAll={false} value={selectedTicketsMap[team.id]}
                                                 options={tickets} disabled={!team.name}
                                                 placeholder="Select Ticket(s)" maxSelectedLabels={3}
                                                 onChange={(e) => {
                                                     let newSelectedTicketsMap = {...selectedTicketsMap};

                                                     if (newSelectedTicketsMap[team.id]) {
                                                         newSelectedTicketsMap[team.id]
                                                             .find(selectedTicket => selectedTicket.id === e.selectedOption.id) ? removeTicket(e.selectedOption) : addTicket(e.selectedOption);
                                                     } else {
                                                         addTicket(e.selectedOption);
                                                     }

                                                     newSelectedTicketsMap[team.id] = e.target.value;
                                                     setSelectedTicketsMap(newSelectedTicketsMap);
                                                 }}/>
                                </div>
                                <div className="col-12" hidden={selectedTickets.length < 1}>
                                    <DataTable value={selectedTickets} size="small"
                                               onRowReorder={(e) => setSelectedTickets(e.value)}>
                                        <Column field="join" className="text-center" header="Combine Above"
                                                style={{width: '10rem'}} body={joinBodyTemplate}></Column>
                                        <Column field="ticketLabel" header="Ticket"></Column>
                                        <Column field="estimatedTime" header="Estimated Time"
                                                style={{width: '10rem'}} body={estimatedTimeBodyTemplate}></Column>
                                        <Column style={{width: '3rem'}} body={deleteTicketBodyTemplate}></Column>
                                    </DataTable>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-12 md:col-6">
                        <Button label="Clear" className="p-button-danger font-bold" icon="pi pi-trash"
                                iconPos="right" onClick={clearTicketBatch}/>
                    </div>
                    <div className="col-12 md:col-6">
                        <Button label="Add" className="p-button-success font-bold" icon="pi pi-chevron-right"
                                iconPos="right" onClick={addTicketBatch}/>
                    </div>
                </div>

            </div>
            <div className="col-12 md:col-6">
                <Card title="Plan" subTitle="Observe the Ticket Batches and remove if necessary">
                    <DataTable value={plan}>
                        <Column field="ticketBatch" header="Ticket Batch" body={ticketBatchBodyTemplate}></Column>
                        <Column field="estimatedTime" header="Minimum Estimated Time"
                                style={{width: '10rem', textAlign: 'center', fontWeight: 'bolder'}}></Column>
                        <Column style={{width: '3em'}} body={deleteBatchBodyTemplate}></Column>
                    </DataTable>
                </Card>
            </div>
        </div>
    );
};

export default DevelopmentPlanning;
