import React, { useContext } from 'react';
import StoreContext from '../store/StoreContext';
import { Tile } from '../components/Tile';
import { NewTile } from '../components/NewTile';

import '../styles/Billboard.scss';

export const Billboard = () => {
    const [state, dispatch] = useContext(StoreContext);

    const coffeeData = state.coffeeData;
    const addingDisabled = state.items.length === Object.keys(coffeeData).length;

    return (
        <div id="billboard">
            {state.items.map(x => (
                <Tile
                    key={x.id}
                    coffeeData={coffeeData}
                    coffeeType={x.key}
                    price={x.price}
                    deleting={state.deleting}
                    onDelete={() => dispatch({ type: 'REMOVE_TILE', payload: { id: x.id } })}
                />
            ))}
            {state.editing && !addingDisabled && (
                <NewTile
                    coffeeData={coffeeData}
                    existingCoffees={state.items}
                    onSave={(item) => dispatch({ type: 'ADD_TILE', payload: { item } })}
                    onCancel={() => dispatch({ type: 'EDIT_OFF' })}
                />
            )}
        </div>
    );
};