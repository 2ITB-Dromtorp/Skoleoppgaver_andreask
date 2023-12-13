import './index.css';

import { useContext } from 'react';
import { CasesContext } from '../../../context';

function Case({ curCase }) {
    const [cases, setCases] = useContext(CasesContext);

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
                        {curCase.date.toString()}
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
                    const newCases = JSON.parse(JSON.stringify(prev));
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
    const [cases, setCases] = useContext(CasesContext);

    const unsolvedCases = cases.filter(c => c.solved === false);
    const solvedCases = cases.filter(c => c.solved === true);

    return (
        <>
            <h1>
                Saker
            </h1>
            <section id='cases_section'>
                <div className='case_section'>
                    <h2>
                        Uløste saker
                    </h2>
                    <div className='cases_list'>
                        {unsolvedCases.length > 0 ? unsolvedCases.map((curCase) => {
                            return (
                                <Case key={curCase.id} curCase={curCase} />
                            );
                        }) : (
                            <div>
                                Ingen uløste saker
                            </div>
                        )}
                    </div>
                </div>
                <div className='case_section'>
                    <h2>
                        Løste saker
                    </h2>
                    <div className='cases_list'>
                        {solvedCases.length > 0 ? unsolvedCases.map((curCase) => {
                            return (
                                <Case key={curCase.id} curCase={curCase} />
                            );
                        }) : (
                            <div>
                                Ingen løste saker
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}