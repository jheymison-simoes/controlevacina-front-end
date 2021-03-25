import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import RegisterUser from './pages/RegisterUser';
import ViewUsers from './pages/ViewUsers';
import VaccineAplication from './pages/VaccineAplication';
import ViewVaccination from './pages/ViewVaccination';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/registeruser" component={RegisterUser} />
            <Route path="/viewusers" component={ViewUsers} />
            <Route path="/vaccineaplication" component={VaccineAplication} />
            <Route path="/viewvaccination" component={ViewVaccination} />
        </BrowserRouter>
    );
}