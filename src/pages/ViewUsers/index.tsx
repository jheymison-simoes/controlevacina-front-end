import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAccountCircle, MdEmail, MdInfo, MdInsertInvitation, MdReply  } from "react-icons/md";

// APi
import api from '../../services/api';

// Style
import './style.css';

interface iUsers {
    id: number,
    name: string,
    email: string,
    cpf: number,
    dateBirth: string
}

export default function ViewUsers() {

    const [users, setUsers] = useState<iUsers[]>([]);

    // Função que chama a API
    useEffect(() => {
        async function getApiProducts() {

            await api.get(`users`).then( (response) => {
                const status = response.status;
    
                if(status != null){
                    setUsers(response.data);
                }
            }).catch(()=> {
                setUsers([]);
            });

        }
        getApiProducts();
    }, []);

    console.log(users);


    return (
        <div className="container-view">

            <Link to="/registeruser" className="icon-user">
                <MdReply />
            </Link>

            <div className="content-view">
                <div className="body-view">
                    <h1 className="title-view">Vaccination <br></br>Control</h1>
                    <div className="description-view">
                        Usuários Cadastrados
                    </div>
                </div>

                <div className="users-view">

                    {users.map( data => {


                        let cpf = data.cpf.toString();
                        const cpfFormat = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

                        let date = data.dateBirth;
                        const dateFormat = date.split('-').reverse().join('/');

                        return (

                            <div className="info-view" key={data.id}>
                                <p className="name-view">
                                    <MdAccountCircle />
                                    <span>{data.name}</span>
                                </p>
                                <p className="email-view">
                                    <MdEmail />
                                    <span>{data.email}</span>
                                </p>
                                <p className="cpf-view">
                                    <MdInfo />
                                    <span>{cpfFormat}</span>
                                </p>
                                <p className="birth-view">
                                    <MdInsertInvitation />
                                    <span>{dateFormat}</span>
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
            
        </div>
    );
}