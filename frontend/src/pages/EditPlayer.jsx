import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const apiClient = axios.create({
  withCredentials: true,
});

const EditPlayer = () => {
  const [nombre, setNombre] = useState('');
  const [posicion, setPosicion] = useState('');
  const [edad, setEdad] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    apiClient.get(`http://localhost:5555/api/players/${id}`)
    .then((response) => {
        setPosicion(response.data.posicion);
        setEdad(response.data.edad)
        setNombre(response.data.nombre)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])

  const handleEditPlayer = () => {
    const data = {
      nombre,
      posicion,
      edad,
    };
    setLoading(true);
    apiClient
      .put(`http://localhost:5555/api/players/${id}`, data)
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
          <h1 className='text-3xl my-4'>Edit Player</h1>
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
            <button className='p-2 bg-sky-300 m-8' onClick={handleEditPlayer}>
              Save
            </button>
          </div>
        </div>
      );

}

export default EditPlayer