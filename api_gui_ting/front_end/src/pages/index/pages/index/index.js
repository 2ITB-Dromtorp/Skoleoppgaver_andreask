import './index.css';

import { useEffect, useState } from 'react';

//user id *wink* *wink* JNIJCSeziCBeIW7J

function getAdditionalClassName(className) {
    return className ? ` ${className}` : '';
}

function FancyButton({ children, className, ...props }) {
    return (
        <button className={`fancy_button${getAdditionalClassName(className)}`} {...props}>
            {children}
        </button>
    );
}

function getIsEdited(item, origItem, curFields) {
    let isEdited = false;
    if (item.isNew) {
        isEdited = true;
    } else if (item.flaggedForDelete === true) {
        isEdited = true;
    } else {
        for (const fieldName of Object.keys(curFields)) {
            if (item.data[fieldName] !== origItem[fieldName]) {
                isEdited = true;
                break;
            }
        }
    }
    return isEdited;
}

function ApiGuiRow({ refreshData, curData, editedData, setEditedData, fields, item, saveStatus, ...props }) {
    const content = [];

    for (const [fieldName, field] of Object.entries(fields)) {
        const fieldValue = item.data[fieldName];
        content.push((
            <td key={fieldName}>
                {field.editable ? (
                    <input type={field.type === 'number' ? 'number' : field.type === 'string' ? 'text' : 'text'} value={fieldValue} onChange={(e) => {
                        const newData = [...editedData];
                        const newItem = JSON.parse(JSON.stringify(item));
                        newItem.data[fieldName] = e.target.value;
                        newData[editedData.indexOf(item)] = newItem;
                        setEditedData(newData);
                    }}
                    />
                ) : (
                    <>
                        {fieldValue}
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

    const isDelete = item.flaggedForDelete;
    const isEdited = getIsEdited(item, curData[editedData.indexOf(item)], fields);

    return (
        <tr className={`api_gui_row${isDelete ? ' delete' : isEdited ? ' edited' : ''}`}>
            <td className='api_gui_row_modification' key='modifications'>
                {isDelete ? '🗑️' : isEdited ? '✏️' : ''}
            </td>
            <td key='actions'>
                <FancyButton className={`api_gui_row_delete_button ${item.flaggedForDelete ? 'delete' : 'cancel'}`} onClick={(e) => {
                    if (item.isNew) {
                        setEditedData(editedData.filter((checkItem) => {
                            return checkItem !== item;
                        }));
                    } else {
                        const newItem = JSON.parse(JSON.stringify(item));
                        newItem.flaggedForDelete = newItem.flaggedForDelete !== undefined ? newItem.flaggedForDelete === false : true;
                        setEditedData(editedData.map((checkItem) => {
                            if (checkItem === item) {
                                return newItem;
                            } else {
                                return checkItem;
                            }
                        }));
                    }
                }}>
                    {item.flaggedForDelete ? 'Cancel' : 'Delete'}
                </FancyButton>
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

    const [lastId, setLastId] = useState(0);

    const refreshData = () => {
        setCurFields();
        setCurData();
        setEditedData();
        setLastId(0);
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
                    const newEditedData = [];
                    for (let i = 0; i < data.data.length; i++) {
                        setLastId(prev => {
                            const newItem = {
                                isNew: false,
                                flaggedForDelete: false,
                                data: JSON.parse(JSON.stringify(data.data[i])),
                                id: prev.toString(),
                            };
                            newEditedData[i] = newItem;
                            return prev += 1;
                        });
                    }
                    setEditedData(newEditedData);
                });
            }
        });
    }

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <>
            <section id='api_gui_section'>
                <h1>
                    API DATABASE GUI v4.0.0
                </h1>
                <div id='api_gui_buttons'>
                    <FancyButton onClick={(e) => {
                        refreshData();
                    }}>
                        Refresh
                    </FancyButton>
                    <FancyButton onClick={(e) => {
                        const newItem = {
                            isNew: true,
                            flaggedForDelete: false,
                            data: {},
                            id: lastId.toString(),
                        };
                        setLastId(prev => prev + 1);
                        for (const [fieldName, field] of Object.entries(curFields)) {
                            if (field.serverProvided === false) {
                                let initialValue;
                                if (field.type === 'number') {
                                    initialValue = 0;
                                } else if (field.type === 'string') {
                                    initialValue = '';
                                }
                                newItem.data[fieldName] = initialValue;
                            } else {
                                newItem.data[fieldName] = 'Server provided';
                            }
                        }
                        setEditedData([
                            ...editedData,
                            newItem,
                        ]);
                    }}>
                        Insert
                    </FancyButton>
                    <FancyButton onClick={(e) => {
                        setSavingItems(true);
                        const itemsToSave = [];
                        const newItemSaveStatus = {};
                        for (let i = 0; i < editedData.length; i++) {
                            const item = editedData[i];
                            let saveStatus;

                            const isEdited = getIsEdited(item, curData[i], curFields);

                            if (isEdited) {
                                saveStatus = 'pending';
                                itemsToSave.push(item);
                            } else {
                                saveStatus = 'no_changes';
                            }
                            newItemSaveStatus[item.id] = saveStatus;
                        }
                        setItemSaveStatus(newItemSaveStatus);

                        const changeItemSaveStatus = (id, newStatus) => {
                            setItemSaveStatus((prev) => {
                                const newItemSaveStatus = {};
                                for (const [curId, status] of Object.entries(prev)) {
                                    let newCurStatus;

                                    if (curId === id) {
                                        newCurStatus = newStatus;
                                    } else {
                                        newCurStatus = status;
                                    }
                                    newItemSaveStatus[curId] = newCurStatus;
                                }
                                return newItemSaveStatus;
                            });
                        }
                        const loop = (i) => {
                            return new Promise((resolve, reject) => {
                                if (i === itemsToSave.length) {
                                    resolve();
                                    return;
                                }
                                const continueLoop = () => {
                                    loop(i + 1).then(() => {
                                        resolve();
                                    });
                                }
                                const item = itemsToSave[i];
                                changeItemSaveStatus(item.id, 'saving');
                                let dataToSave;
                                if (item.flaggedForDelete === false) {
                                    dataToSave = {};
                                    for (const [fieldName, field] of Object.entries(curFields)) {
                                        if (field.serverProvided === false && field.editable === true) {
                                            dataToSave[fieldName] = item.data[fieldName];
                                        }
                                    }
                                }
                                const body = {};
                                if (item.isNew === false) {
                                    body.id = item.data.id;
                                }
                                if (item.flaggedForDelete === false) {
                                    body.data = dataToSave;
                                }
                                fetch(`/api/${item.flaggedForDelete ? 'deleteitem' : item.isNew ? 'createitem' : 'updateitem'}`, {
                                    method: item.flaggedForDelete ? 'DELETE' : item.isNew ? 'POST' : 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(body),
                                }).then((res) => {
                                    if (res.status === 200) {
                                        changeItemSaveStatus(item.id, 'saved');
                                        continueLoop();
                                    } else {
                                        changeItemSaveStatus(item.id, 'failed');
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
                    </FancyButton>
                </div>
                <div id='api_gui_table_container'>
                    <table id='api_gui_table'>
                        <thead id='api_gui_header'>
                            <tr className='api_gui_row'>
                                <th key='modifications'>

                                </th>
                                <th key='actions'>
                                    Actions
                                </th>
                                {curFields ? (() => {
                                    const fields = [];
                                    for (const key in curFields) {
                                        fields.push((
                                            <th key={key}>
                                                <div className='api_gui_table_head_container'>
                                                    <div className='api_gui_table_head_text'>
                                                        {key}
                                                    </div>
                                                    <button className='sort_button'>
                                                        <div className='sort_arrow'>

                                                        </div>
                                                    </button>
                                                </div>
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
                            {editedData ? editedData.map((item, index) => {
                                return (
                                    <ApiGuiRow key={index} refreshData={refreshData} curData={curData} editedData={editedData} setEditedData={setEditedData} fields={curFields} item={item} saveStatus={itemSaveStatus?.[item.id]} />
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

                                </td>
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
            </section>
        </>
    );
}