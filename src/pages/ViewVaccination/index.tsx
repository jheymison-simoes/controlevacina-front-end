import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAnnouncement, MdEmail, MdInsertInvitation, MdReply  } from "react-icons/md";

// APi
import api from '../../services/api';

// Style
import './style.css';

interface iVaccination {
    id: number,
    nameVaccine: string,
    dateVaccination: string,
    emailUser: number,
}

export default function ViewVaccination() {

    const [vaccination, setVaccination] = useState<iVaccination[]>([]);

    // Função que chama a API
    useEffect(() => {
        async function getApiProducts() {

            await api.get(`vaccinations`).then( (response) => {
                const status = response.status;
    
                if(status != null){
                    setVaccination(response.data);
                }
            }).catch(()=> {
                setVaccination([]);
            });

        }
        getApiProducts();
    }, []);

    console.log(vaccination);


    return (
        <div className="container-vaccine">

            <Link to="/vaccineaplication" className="icon-user">
                <MdReply />
            </Link>

            <div className="content-vaccine-view">
                <div className="body-view-vaccine">
                    <h1 className="title-vaccine">Vaccination <br></br>Control</h1>
                    <div className="description-vaccine">
                        Usuários Vacinados
                    </div>
                </div>

                <div className="users-vaccine">

                    {vaccination.map( data => {


                        let date = data.dateVaccination;
                        const dateFormat = date.split('-').reverse().join('/');

                        return (

                            <div className="info-vaccine" key={data.id}>
                                <p className="name-vaccine">
                                    <MdAnnouncement />
                                    <span>{data.nameVaccine}</span>
                                </p>
                                <p className="email-vaccine">
                                    <MdEmail />
                                    <span>{data.emailUser}</span>
                                </p>
                                <p className="birth-vaccine">
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