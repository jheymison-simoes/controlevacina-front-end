import React, { useState, FormEvent, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';


// APi
import api from '../../services/api';

// icons
import { MdReply } from 'react-icons/md';

// style
import './style.css';
import 'react-toastify/dist/ReactToastify.css';


interface IVaccine {
    nameVaccine: string,
    dateVaccination: string,
    emailUser: string,
}

export default function VaccineAplication() {

    const { register, handleSubmit, errors } = useForm();

    const [nameVaccine, setNameVaccine] = useState('');
    const [dateVaccination, setDateVaccination] = useState('');
    const [emailUser, setEmailUser] = useState('');


    function alertSucess(code: number) {
        const text = `SUCESSO! Usuário foi Vacinado - Status Code ${code}`

        toast.success(text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    function alertError(code: number) {
        const text = `ERRO! Usuário não Cadastrado ou Já vacinado - Status Code ${code}`

        toast.error(text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    function onSubmit(data: IVaccine) {      

        api.post('vaccinations', data)
            .then(respose => {
                
                const statusCode = respose.status;
                console.log(`Status Code = ${statusCode}`);
                if(statusCode === 201){
                    alertSucess(statusCode);
                    setNameVaccine('');
                    setDateVaccination('');
                    setEmailUser('');
                }
            })
            .catch(function (error) {
                if(error.response){
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);

                    const statusCode = error.response.status;
                    if(statusCode === 400){
                        alertError(statusCode);
                        console.log(`Status Code = ${statusCode}`);
                    }
                }
            })
    }

    return (
        <div className="container-vaccine">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
                
            <ToastContainer />
            <Link to="/" className="icon-vaccine">
                <MdReply />
            </Link>
            
            <div className="body-vaccine">
                <div className="content-vaccine">
                    <h1 className="title-vaccine">Vaccination <br></br>Control</h1>
                    <div className="description-vaccine">
                        Cadastro de aplicação <br></br>de Vacinas
                    </div>
                </div>

                <form  onSubmit={handleSubmit(onSubmit) } className="form-vaccine">
                    <div className="form-floating mb-3 input-form-vaccine">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="input-nameVaccine" 
                            placeholder="Teste" 
                            value={nameVaccine}
                            onChange={event => setNameVaccine(event.target.value)}
                            name="nameVaccine"
                            ref={register({
                                required: true,
                            })}
                        />
                        <label htmlFor="name">Nome da Vacina</label>
                        {errors.nameVaccine && <span className="error">Entre o nome da Vacina!</span>}
                    </div>

                    <div className="form-floating mb-3 input-form-vaccine">
                        <input 
                            type="date" 
                            className="form-control" 
                            id="input-date" 
                            placeholder="Teste" 
                            value={dateVaccination}
                            onChange={event => setDateVaccination(event.target.value)}
                            name="dateVaccination"
                            ref={register({
                                required: true,
                            })}
                        />
                        <label htmlFor="email">Data da Vacinação</label>
                        {errors.dateVaccination && <span className="error">Entre com a data da vacinação!</span>}
                    </div>

                    <div className="form-floating mb-3 input-form-vaccine">
                        <input 
                            type="email" 
                            className="form-control" 
                            id="input-user" 
                            placeholder="Teste" 
                            value={emailUser}
                            onChange={event => setEmailUser(event.target.value)}
                            name="emailUser"
                            ref={register({
                                required: true,
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                  message: 'Enter a valid e-mail address',
                                },
                            })}
                        />
                        <label htmlFor="emailUser">Email do Usuário</label>
                        {errors.emailUser && <span className="error">Entre com um Email válido!</span>}
                    </div>

                    <button type="submit" className="btn btn-vaccine">Save</button>
                    <Link to="/viewvaccination" className="view-vaccine">Visualizar Usuários Vacinados</Link>
                </form>

            </div>
            <div className="footer-vaccine">
                #zupchallenge
            </div>
        </div>
    );
}