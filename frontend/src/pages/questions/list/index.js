import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaReply, FaThumbsUp } from 'react-icons/fa';

import QuestionService from '../../../services/question-service';
import logoImg from '../../../assets/logo.png';
import questionImg from '../../../assets/qa.png';

import './styles.css';

export default function QuestionList() {
    const history = useHistory();
    const [questions, setQuestions] = useState([]);
    const [liked, setLiked] = useState(-1);
    const [search, setSearch] = useState('');
    const [notAnsw, setNotAnsw] = useState(1);
    const [sort, setSort] = useState('asc');

    const keyPress = (e) => {
        let key = e.charCode || e.keyCode || 0;
        if (key === 13) {
            setQuestions(questions.filter(s => String(s.text).includes(search)));
        }
    }

    const notAnswered = (e) => {
        setNotAnsw(Number(e.target.value))
    }

    useEffect(() => {
        const service = new QuestionService('questions');
        service.index().then(res => {
            const questions = res.data;
            let filtered = questions;
            filtered = questions.filter((s => String(s.text).includes(search)));
            if (notAnsw === 0) {
                filtered = filtered.filter((s => String(s.total_answers).includes(notAnsw)));
            }
            let result = filtered;
            const sortResults = col => {
                if (col === 'asc') {
                    result = [...filtered].sort((a, b) => { return new Date(a.creationDate) - new Date(b.creationDate) });
                } else {
                    result = [...filtered].sort((a, b) => { return new Date(b.creationDate) - new Date(a.creationDate) });
                }
                setQuestions(result);
            }
            sortResults(sort);
        });
    }, [search, notAnsw, sort, liked]);

    function createQuestion() {
        history.push('/questions/new');
    };

    function listAnswers(questionId) {
        history.push(`/answers/${questionId}`);
    };

    async function like(questionId, liked) {
        try {
            const service = new QuestionService('questions');
            await service.like(questionId, liked).then(res => setLiked({ questionId, liked }));
        } catch (error) {
            console.log(error);
            alert(`${error}`)
        }
    }

    return (
        <div className='container'>
            <header>
                <img src={logoImg} alt='Perguntas e Respostas' />
                <input name='search' className='search' placeholder='Faça sua pesquisa...'
                    value={search} onChange={e => setSearch(e.target.value)} onKeyPress={keyPress}></input>
                <select className='not-answered' onChange={notAnswered}>
                    <option value='1'>Todas</option>
                    <option value='0'>Não respondidas</option>
                </select>
                <button className='sort-button' onClick={() => setSort(sort === 'asc' ? 'desc' : 'asc')}>Ordenar por data</button>
                <Link className='button' onClick={createQuestion} to='/questions/new'>Cadastrar nova pergunta</Link>
            </header>
            <h1>Perguntas</h1>
            <ul>
                {questions.map(question => (
                    <li key={question._id}>
                        <div className='card question'>
                            <div className='question-image'>
                                <img src={questionImg} alt='Pergunta' />
                            </div>
                            <div className='question-details'>
                                <div className='question-text'>{question.text}</div>
                                <div className='question-user'>
                                    por <b>{question.user}</b><span>
                                        em {Intl.DateTimeFormat('pt-BR', {
                                    day: 'numeric',
                                    month: 'numeric',
                                    year: 'numeric'
                                }).format(Date.parse(question.creationDate))}</span>
                                as <span>{Intl.DateTimeFormat('pt-BR', {
                                    hour: 'numeric',
                                    minute: 'numeric'
                                }).format(Date.parse(question.creationDate))}
                                    </span>
                                </div>
                                <div className='question-total-answers'>{question.total_answers} resposta(s)</div>
                            </div>
                            <div title={(!question.like ? 'Curtir...' : 'Descurtir...')} className='question-liked'
                                style={{ cursor: 'pointer', opacity: (!question.like ? '0.5' : '1') }}
                                onClick={async () => await like(question._id, !question.like ? 1 : 0)}>
                                <FaThumbsUp size={18} color='#393939' />
                            </div>

                            <div title='Ver respostas...' className='question-answer'
                                style={{ cursor: 'pointer' }} onClick={() => listAnswers(question._id)}>
                                <FaReply size={18} color='#393939' />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>);
}