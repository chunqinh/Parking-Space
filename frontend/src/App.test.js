import React from 'react';
import renderer from 'react-test-renderer';


import index1 from './components/pages/home.jsx';
import dashboard from './components/pages/dashboard.jsx';
import {useAuth} from "context/AuthContext";


const projectId = 'firebasetest';
process.env.GCLOUD_PROJECT = projectId;
process.env.FIRESTORE_EMULATOE_HOST = "localhost:8080";
let app2 = admin.initializeApp();
let db = firebase.firestore(app2);

it('Home Page test', () => {
    const tree = renderer.create(<index1 />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('dashboard test', () => {
    const tree = renderer.create(<dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('dashboard test', () => {
    const {login} = useAuth();
    try {

        login(usernameRef.current.value, passwordRef.current.value)
        history.push('/dashboard')
    } catch{
        return setError("Failed to login")
    }

    const tree = renderer.create(<dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
});


