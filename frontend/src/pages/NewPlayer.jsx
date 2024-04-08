import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiClient = axios.create({
  withCredentials: true,
});

const NewPlayer = () => {
  const [nombre, setNombre] = useState('');
  const [posicion, setPosicion] = useState('');
  const [edad, setEdad] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSavePlayer = () => {
    const data = {
      nombre,
      posicion,
      edad,
    };
    setLoading(true);
    apiClient
      .post('http://localhost:5555/api/players', data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  };
      return (
        <div className='p-4'>
          <BackButton />
          <h1 className='text-3xl my-4'>Create Player</h1>
          {loading ? <Spinner /> : ''}
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Nombre</label>
              <input
                type='text'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Posicion</label>
              <input
                type='text'
                value={posicion}
                onChange={(e) => setPosicion(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2  w-full '
              />
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Edad</label>
              <input
                type='number'
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2  w-full '
              />
            </div>
            <button className='p-2 bg-sky-300 m-8' onClick={handleSavePlayer}>
              Save
            </button>
          </div>
        </div>
      );

}

export default NewPlayer