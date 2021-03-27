import React, { useState, FormEvent, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';



// APi
import api from '../../services/api';

// icons
import { MdReply } from 'react-icons/md';

// Styles
import './style.css';
import 'react-toastify/dist/ReactToastify.css';



interface iUsers {
    name: string,
    email: string,
    cpf: number,
    date_birth: string
}

export default function RegisterUser() {

    const { register, handleSubmit, errors } = useForm();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [dateBirth, setDateBirth] = useState('');


    function alertSucess(code: number) {
        const text = `SUCESSO! Usuário foi Cadastrado - Status Code ${code}`

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
        const text = `ERRO! Usuário Já Cadastrado - Status Code ${code}`

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

    function onSubmit(data: iUsers) {      

        api.post('users', data)
            .then(respose => {
                
                const statusCode = respose.status;
                console.log(`Status Code = ${statusCode}`);
                if(statusCode === 201){
                    alertSucess(statusCode);
                    setName('');
                    setEmail('');
                    setCpf('');
                    setDateBirth('');
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
        <div className="container-user">
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
            <Link to="/" className="icon-user">
                <MdReply />
            </Link>
            
            <div className="body-user">
                <div className="content-user">
                    <h1 className="title-user">Vaccination <br></br>Control</h1>
                    <div className="description-user">
                        Cadastre usuários <br></br>para o controle de<br></br> vacinas
                    </div>
                </div>

                <form  onSubmit={handleSubmit(onSubmit) } className="form-user">
                    <div className="form-floating mb-3 input-form-user">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="input-name" 
                            placeholder="Teste" 
                            value={name}
                            onChange={event => setName(event.target.value)}
                            name="name"
                            ref={register({
                                required: true,
                            })}
                        />
                        <label htmlFor="name">Nome Completo</label>
                        {errors.name && <span className="error">Entre com seu nome Completo!</span>}
                    </div>

                    <div className="form-floating mb-3 input-form-user">
                        <input 
                            type="email" 
                            className="form-control" 
                            id="input-email" 
                            placeholder="Teste" 
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            name="email"
                            ref={register({
                                required: true,
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                  message: 'Enter a valid e-mail address',
                                },
                            })}
                        />
                        <label htmlFor="email">E-mail</label>
                        {errors.email && <span className="error">Entre com um e-mail valido!</span>}
                    </div>

                    <div className="form-floating mb-3 input-form-user">
                        <input 
                            type="number" 
                            className="form-control" 
                            id="input-cpf" 
                            placeholder="Teste" 
                            value={cpf}
                            onChange={event => setCpf(event.target.value)}
                            name="cpf"
                            maxLength={11}
                            ref={register({
                                required: true,
                                maxLength: 11
                            })}
                        />
                        <label htmlFor="cpf">CPF</label>
                        {errors.cpf && <span className="error">Entre com um CPF valido!</span>}
                    </div>

                    <div className="form-floating mb-3 input-form-user">
                        <input 
                            type="date" 
                            className="form-control" 
                            id="input-date-birth"
                            placeholder="Teste"
                            value={dateBirth}
                            onChange={event => setDateBirth(event.target.value)}
                            name="dateBirth"
                            ref={register({
                                required: true,
                            })}
                        />
                        <label htmlFor="dateBirth">Data de Nascimento</label>
                        {errors.dateBirth && <span className="error">Entre com uma data válida!</span>}
                    </div>

                    <button type="submit" className="btn btn-user">Save</button>
                    <Link to="/viewusers" className="view-users">Visualizar Usuários</Link>
                </form>

                
            </div>
            <div className="footer-user">
                #zupchallenge
            </div>
        </div>
    )
}