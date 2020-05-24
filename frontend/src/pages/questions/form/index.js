import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../../config/api';
import logoImg from '../../../assets/logo.png';

import './styles.css';

export default function QuestionForm() {

    const history = useHistory();

    const [text, setText] = useState('');
    const [user, setUser] = useState('');

    async function newQuestion(event) {
        event.preventDefault();
        const data = { text, user };
        try {
            api.post('questions', data)
                .then(res => {
                    history.push('/');
                    alert('Pergunta gravada com sucesso!');
                })
                .catch(err => { checkError(err) });
        } catch (error) {
            console.log(error)
            alert(`${error}`);
        }
    }

    function checkError(err) {
        if (err.message === 'Network Error') {
            alert(`Atenção!! Verifique se o servidor ou o banco de dados estão no ar.`);
        }
        else {
            alert(`${err.response.status} - ${err.response.data.error}`)
        }
    }

    return (
        <div className="container-form">
            <div className="form-content">
                <section>
                    <h1>Inclua uma nova pergunta!</h1>
                    <p>Descreva detalhadamente a sua dúvida pra que outras pessoas possam te ajudar</p>
                    <img src={logoImg} alt="Cadastrar Pergunta" />
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#FFB957" />Voltar para perguntas
                         </Link>
                </section>
                <form onSubmit={newQuestion}>
                    <textarea
                        placeholder="Insira aqui sua pergunta..."
                        value={text}
                        onChange={e => setText(e.target.value || '')}
                    />
                    <input
                        placeholder="Seu nome..."
                        value={user}
                        onChange={e => setUser(e.target.value || '')}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}