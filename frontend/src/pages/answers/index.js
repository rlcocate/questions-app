import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaThumbsUp } from 'react-icons/fa';

import AnswerService from '../../services/answer-service';
import logoImg from '../../assets/write.png';
import img from '../../assets/qa.png';

import './styles.css';

export default function AnswersList(obj) {
    const [answers, setAnswers] = useState([]);
    const [text, setText] = useState('');
    const [user, setUser] = useState('');
    const [answering, setAnswering] = useState(false);
    const [liked, setLiked] = useState(-1);

    const questionId = obj.match.params.questionId;

    useEffect(() => {
        const service = new AnswerService('answers');
        try {
            service.index(questionId).then(res => setAnswers(res.data));
        } catch (error) {
            console.log(error);
        }
    }, [questionId, liked, answering]);

    async function like(answerId, liked) {
        try {
            const service = new AnswerService('answers');
            await service.like(answerId, liked).then(res => { setLiked({ answerId, liked }); });
        } catch (error) {
            console.log(error);
            alert(`${error}`)
        }
    }

    async function newAnswer(event) {
        event.preventDefault();
        setAnswering(true);
        const data = { text, user, questionId };
        try {
            const service = new AnswerService('answers');
            await service.create(data).then(res => {
                clearFieldsNewAnswer();
                alert('Resposta gravada com sucesso!');
            });
        } catch (error) {
            console.log(error)
            alert(error);
        }
    }

    function createAnswer() {
        setAnswering(true);
    }

    function clearFieldsNewAnswer(params) {
        setText('');
        setUser('');
        setAnswering(false);
    }

    return (
        <div className="container">
            <header>
                <img src={logoImg} alt="Respostas" />
                <button disabled={answering} className="button new-button" onClick={createAnswer}>Inserir nova resposta</button>
            </header>
            <h1>Respostas</h1>
            <ul>
                {answers.map(answer => (
                    <li key={answer._id}>
                        <div className='card answer'>
                            <div className='answer-image'>
                                <img src={img} alt='Pergunta' />
                            </div>
                            <div className='answer-details'>
                                <div className='answer-text'>{answer.text}</div>
                                <div className='answer-user'>{answer.user}</div>
                            </div>
                            <div title={(!answer.like ? 'Curtir...' : 'Descurtir...')} className='answer-liked'
                                style={{ cursor: 'pointer', opacity: (!answer.like ? '0.5' : '1') }}
                                onClick={async () => await like(answer._id, !answer.like ? 1 : 0)}>
                                <FaThumbsUp size={18} color='#393939' />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {answering && <div className='new-answer'>
                <form onSubmit={newAnswer}>
                    <textarea
                        autoFocus={answering}
                        placeholder="Insira aqui sua resposta..."
                        value={text}
                        onChange={e => setText(e.target.value || '')}
                    />
                    <input
                        placeholder="Seu nome..."
                        value={user}
                        onChange={e => setUser(e.target.value || '')}
                    />
                    <button className="button send-button" type="submit">Enviar</button>
                    <button className="button cancel-button" onClick={clearFieldsNewAnswer}>Cancelar</button>
                </form>
            </div>}
            <Link className="back-link" to="/">
                <FaArrowLeft size={16} color="#FFB957" /> Retornar as perguntas
            </Link>
        </div>);
}