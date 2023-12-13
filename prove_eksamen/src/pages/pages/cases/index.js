import './index.css';

import { useContext } from 'react';
import { CasesContext } from '../../../context';

function formatDateSegment(seg) {
    if (seg.toString().length === 1) {
        return '0' + seg;
    }
    return seg;
}

function formatDate(date) {
    return formatDateSegment(formatDateSegment(date.getHours()) + ':' + formatDateSegment(date.getMinutes()) + ':' + formatDateSegment(date.getSeconds()) + ' ' + date.getDate()) + '.' + formatDateSegment(date.getMonth() + 1) + '.' + date.getFullYear();
}

function deepCopyObject(obj) {
    const result = {};
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            result[key] = deepCopyObject(obj[key]);
            continue;
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}

function Case({ curCase }) {
    const { 1: setCases } = useContext(CasesContext);

    return (
        <div className='case'>
            <div className='case_stats'>
                <div className='case_value'>
                    <div className='case_value_key'>
                        Avsender
                    </div>
                    <div className='case_value_value'>
                        {curCase.name}
                    </div>
                </div>
                <div className='case_value'>
                    <div className='case_value_key'>
                        E-post
                    </div>
                    <div className='case_value_value'>
                        {curCase.email}
                    </div>
                </div>
                <div className='case_value'>
                    <div className='case_value_key'>
                        Tlf
                    </div>
                    <div className='case_value_value'>
                        {curCase.phoneNumber}
                    </div>
                </div>
                <div className='case_value'>
                    <div className='case_value_key'>
                        Dato
                    </div>
                    <div className='case_value_value'>
                        {formatDate(curCase.date)}
                    </div>
                </div>
            </div>
            <div className='divider'>
                <div className='divider_line'>

                </div>
                <div className='divider_text'>
                    Problem
                </div>
                <div className='divider_line'>

                </div>
            </div>
            <div className='case_content'>
                <div className='case_title'>
                    {curCase.title}
                </div>
                <div className='case_description'>
                    {curCase.description}
                </div>
            </div>
            <div className='divider'>
                <div className='divider_line'>

                </div>
            </div>
            <button className='case_solve_button' onClick={(e) => {
                setCases(prev => {
                    const newCases = prev.map((checkCase) => {
                        const obj = deepCopyObject(checkCase);
                        obj.date = checkCase.date;
                        return obj;
                    });
                    newCases.find(c => c.id === curCase.id).solved = curCase.solved === false;
                    return newCases;
                });
            }}>
                Marker som {curCase.solved === false ? 'løst' : 'uløst'}
            </button>
        </div>
    );
}

export default function Cases() {
    const { 0: cases } = useContext(CasesContext);

    const unsolvedCases = cases.filter(c => c.solved === false);
    const solvedCases = cases.filter(c => c.solved === true);

    return (
        <>
            <h1>
                Saker
            </h1>
            <section id='cases_section'>
                <div className='case_section'>
                    <h2 className='case_section_header'>
                        Uløste saker
                    </h2>
                    <div className='cases_list'>
                        {unsolvedCases.length > 0 ? unsolvedCases.map((curCase) => {
                            return (
                                <Case key={curCase.id} curCase={curCase} />
                            );
                        }) : (
                            <div className='no_cases_text'>
                                Ingen uløste saker
                            </div>
                        )}
                    </div>
                </div>
                <div className='case_section'>
                    <h2 className='case_section_header'>
                        Løste saker
                    </h2>
                    <div className='cases_list'>
                        {solvedCases.length > 0 ? solvedCases.map((curCase) => {
                            return (
                                <Case key={curCase.id} curCase={curCase} />
                            );
                        }) : (
                            <div className='no_cases_text'>
                                Ingen løste saker
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}