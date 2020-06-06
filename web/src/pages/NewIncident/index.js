import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('/incidents', data, {
        headers: {
          Authorization: ongId
        }
      });

      alert('Novo caso cadastro com sucesso!');
      history.push('/profile');
    } catch (err) {
      alert('Erro ao cadastrar novo caso, tente novamente.');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input
            placeholder="Valor em reais"
            type="currency"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
