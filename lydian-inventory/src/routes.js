import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Private from './components/Private/Private';
import InstInv from './components/instruments/InstInv/InstInv';
import AddInst from './components/instruments/AddInst/AddInst';
import AssignInst from './components/instruments/AssignInst/AssignInst';
import UpdateInst from './components/instruments/UpdateInst/UpdateInst';
import ReturnInst from './components/instruments/ReturnInst/ReturnInst';
import ViewInst from './components/instruments/ViewInst/ViewInst';
import ViewOut from './components/instruments/ViewOut/ViewOut';
import StudentView from './components/students/StudentView/StudentView';
import AddStudent from './components/students/AddStudent/AddStudent';
import UpdateStudent from './components/students/UpdateStudent/UpdateStudent';



export default (
    <div>
        <Switch>
            <Route path='/' component={Login} exact />
            <Route path='/private' component={Private} />
            <Route path='/instruments' component={InstInv} exact />
            <Route path='/instrument/add' component={AddInst} />
            <Route path='/instrument/assign/:id' component={AssignInst} />
            <Route path='/instrument/update/:id' component={UpdateInst} />
            <Route path='/instrument/return/:id' component={ReturnInst} />
            <Route path='/instruments/view' component={ViewInst} />
            {/* <Route path='/instruments/out' component={ViewOut}/> */}

            <Route path='/students' component={StudentView} exact />
            <Route path='/student/add' component={AddStudent} />
            <Route path='/student/update/:id' component={UpdateStudent} />
        </Switch>
    </div>
)