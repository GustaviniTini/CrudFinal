import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineGroup } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const apiClient = axios.create({
    withCredentials: true,
  });

const Home = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        apiClient
            .get('http://localhost:5555/api/players')
            .then((response) => {
                setPlayers(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);
    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Players List</h1>
                <Link to='/players/new'>
                    <MdOutlineAddBox className='text-sky-800 text-4x1' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>Nombre</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Posicion</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Edad</th>
                            <th className='border border-slate-600 rounded-md '>Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => (
                            <tr key={player._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {player.nombre}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {player.posicion}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {player.edad}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/players/details/${player._id}`}>
                                            <BsInfoCircle className='text-2x1 text-green-800' />
                                        </Link>
                                        <Link to={`/players/edit/${player._id}`}>
                                            <AiOutlineEdit className='text-2x1 text-yellow-600' />
                                        </Link>
                                        <Link to={`/players/delete/${player._id}`}>
                                            <MdOutlineDelete className='text-2x1 text-red-600' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};









export default Home