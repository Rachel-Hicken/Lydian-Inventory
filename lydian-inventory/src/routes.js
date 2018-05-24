import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Private from '../src/components/Private/Private';
import InstInv from '../src/components/instruments/InstInv/InstInv';
import AddInst from '../src/components/instruments/AddInst/AddInst';
import AssignInst from '../src/components/instruments/AssignInst/AssignInst';
import UpdateInst from '../src/components/instruments/UpdateInst/UpdateInst';



export default (
    <div>
        <Switch>
            <Route path='/' component={Login} exact />
            <Route path='/private' component={Private} />
            <Route path='/instruments' component={InstInv} />
            <Route path='/instrument/add' component={AddInst} />
            <Route path='/instrument/assign' component={AssignInst} />
            <Route path='/instrument/update/:id' component={UpdateInst} />
        </Switch>
    </div>
)