import './index.css';

import { useEffect, useState } from 'react';

function ApiGuiRow({ refreshData, editedData, setEditedData, fields, item, saveStatus, ...props }) {
    const content = [];

    for (const [fieldName, field] of Object.entries(fields)) {
        content.push((
            <td key={fieldName}>
                {field.editable ? (
                    <input type='text' value={item[fieldName]} onChange={(e) => {
                        const newData = [...editedData];
                        newData[editedData.indexOf(item)] = {
                            ...item,
                            [fieldName]: e.target.value,
                        };
                        setEditedData(newData);
                    }}
                    />
                ) : (
                    <>
                        {item[fieldName]}
                    </>
                )}
            </td>
        ));
    }

    if (saveStatus) {
        let icon;
        if (saveStatus === 'no_changes') {
            icon = ''
        } if (saveStatus === 'pending') {
            icon = '⏳';
        } else if (saveStatus === 'saving') {
            icon = '⬆️';
        } else if (saveStatus === 'saved') {
            icon = '✅';
        } else if (saveStatus === 'failed') {
            icon = '❌';
        }

        content.push((
            <td key='save_status'>
                {icon}
            </td>
        ));
    }

    return (
        <tr className='api_gui_row'>
            <td key='actions'>
                <button onClick={(e) => {
                    fetch(`/api/deleteitem`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: item.id,
                        }),
                    }).then((res) => {
                        if (res.status === 200) {
                            refreshData();
                        }
                    });
                }}>
                    Delete
                </button>
            </td>
            {content}
        </tr>
    );
}

export default function Index() {
    const [curFields, setCurFields] = useState();
    const [curData, setCurData] = useState();

    const [editedData, setEditedData] = useState();

    const [savingItems, setSavingItems] = useState(false);
    const [itemSaveStatus, setItemSaveStatus] = useState();

    const refreshData = () => {
        setCurFields();
        setCurData();
        setEditedData();
        fetch(`/api/getdata`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setCurFields(data.fields);
                    setCurData(data.data);
                    setEditedData(JSON.parse(JSON.stringify(data.data)));
                });
            }
        });
    }

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <div>
            <h1>
                API DATABASE GUI Thing v1.0.0
            </h1>
            <div id='api_gui_buttons'>
                <button onClick={(e) => {
                    refreshData();
                }}>
                    Refresh
                </button>
                <button onClick={(e) => {
                    const newItem = {};
                    for (const [fieldName, field] of Object.entries(curFields)) {
                        if (field.serverProvided === false) {
                            let initialValue;
                            if (field.type === 'number') {
                                initialValue = 0;
                            } else if (field.type === 'string') {
                                initialValue = '';
                            }
                            newItem[fieldName] = initialValue;
                        }
                    }
                    setEditedData([
                        ...editedData,
                        newItem,
                    ]);
                }}>
                    Insert
                </button>
                <button onClick={(e) => {
                    setSavingItems(true);
                    const newItemSaveStatus = [];
                    for (let i = 0; i < editedData.length; i++) {
                        const item = editedData[i];
                        let saveStatus;
                        if (JSON.stringify(item) === JSON.stringify(curData[i])) {
                            saveStatus = 'no_changes';
                        } else {
                            saveStatus = 'pending';
                        }
                        newItemSaveStatus.push(saveStatus);
                    }
                    setItemSaveStatus(newItemSaveStatus);

                    const changeItemSaveStatus = (i, newStatus) => {
                        setItemSaveStatus((prev) => {
                            return prev.map((status, index) => {
                                if (index === i) {
                                    return newStatus;
                                }
                                return status;
                            });
                        });
                    }
                    const loop = (i) => {
                        return new Promise((resolve, reject) => {
                            if (i === editedData.length) {
                                resolve();
                                return;
                            }
                            const continueLoop = () => {
                                loop(i + 1).then(() => {
                                    resolve();
                                });
                            }
                            const item = editedData[i];
                            if (JSON.stringify(item) === JSON.stringify(curData[i])) {
                                continueLoop();
                                return;
                            }
                            changeItemSaveStatus(i, 'saving');
                            fetch(`/api/updateitem`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    id: item.id,
                                    data: item,
                                }),
                            }).then((res) => {
                                if (res.status === 200) {
                                    changeItemSaveStatus(i, 'saved');
                                    continueLoop();
                                } else {
                                    changeItemSaveStatus(i, 'failed');
                                    continueLoop();
                                }
                            });
                        });
                    }
                    loop(0).then(() => {
                        setSavingItems(false);
                        setItemSaveStatus();
                        refreshData();
                    });
                }}>
                    Save
                </button>
            </div>
            <table id='api_gui'>
                <thead id='api_gui_header'>
                    <tr className='api_gui_row'>
                        <th>
                            Actions
                        </th>
                        {curFields ? (() => {
                            const fields = [];
                            for (const key in curFields) {
                                fields.push((
                                    <th key={key}>
                                        {key}
                                    </th>
                                ));
                            }
                            return fields;
                        })() : (
                            <td key='loading'>
                                Loading...
                            </td>
                        )}
                        {itemSaveStatus && (
                            <th>
                                Save status
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody id='api_gui_rows'>
                    {editedData ? editedData.map((row, index) => {
                        return (
                            <ApiGuiRow key={index} refreshData={refreshData} editedData={editedData} setEditedData={setEditedData} fields={curFields} item={row} saveStatus={itemSaveStatus?.[index]} />
                        );
                    }) : (
                        <tr className='api_gui_row'>
                            <td>
                                Loading...
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot id='api_gui_footer'>
                    <tr className='api_gui_row'>
                        <td>
                            Entries: {editedData ? editedData.length : 'Loading...'}
                        </td>
                        {(() => {
                            const placeholders = [];
                            if (curFields) {
                                for (let i = 0; i < Object.keys(curFields).length; i++) {
                                    placeholders.push((
                                        <td key={i}>

                                        </td>
                                    ));
                                }
                            }
                            if (savingItems) {
                                placeholders.push((
                                    <td key='saving'>

                                    </td>
                                ));
                            }
                            return placeholders;
                        })()}
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}