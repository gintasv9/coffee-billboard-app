import React, { useContext } from 'react';
import { Container } from 'semantic-ui-react';
import StoreContext from '../store/StoreContext';
import { Row } from '../components/Row';
import { NewRow } from '../components/NewRow';

import '../styles/ListEditor.scss';

export const ListEditor = () => {
    const [state, dispatch] = useContext(StoreContext);

    return (
        <Container id="list-editor">
            <NewRow onSave={({ key, item }) => dispatch({ type: 'ADD_NEW_COFFEE', payload: { key, item } })} />
            {Object.keys(state.coffeeData).reverse().map(x => (
                <Row
                    key={x}
                    coffeeTitle={state.coffeeData[x].title}
                    imgSrc={state.coffeeData[x].imgSrc}
                    onDelete={() => dispatch({ type: 'REMOVE_COFFEE', payload: { key: x } })}
                />
            ))}
        </Container>
    );
};