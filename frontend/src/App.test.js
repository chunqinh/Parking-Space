import React from 'react';
import renderer from 'react-test-renderer';

import index1 from './components/pages/home.jsx';
import dashboard from './components/pages/dashboard.jsx';

it('Home Page test', () => {
    const tree = renderer.create(<index1 />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('dashboard test', () => {
    const tree = renderer.create(<dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
});

