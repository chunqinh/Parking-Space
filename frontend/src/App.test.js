import React from 'react';
import renderer from 'react-test-renderer';

import index from './components/pages/home.jsx';
import dashboard from './components/pages/dashboard.jsx';

it('Home Page test', () => {
    const tree = renderer.create(<index />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('dashboard test', () => {
    const tree = renderer.create(<dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
});

