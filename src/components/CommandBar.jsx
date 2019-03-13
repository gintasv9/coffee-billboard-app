import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import StoreContext from '../store/StoreContext';

export const CommandBar = () => {
    const [state, dispatch] = useContext(StoreContext);
    const coffeeData = state.coffeeData;

    const addingDisabled = state.items.length === Object.keys(coffeeData).length || state.view !== 'billboard';
    const deletingDisabled = !state.items || state.items.length === 0 || state.view !== 'billboard';

    return (
        <Menu id="command-bar" fixed="top" position="right">
            <img src="https://img.icons8.com/ios/50/000000/cafe.png" alt="Coffee icon" />
            <Menu.Item header >
                Welcome, grab a coffee!
            </Menu.Item>
            <Menu.Item
                key="editList"
                name="Edit available coffees"
                icon={state.view === 'listEditor' ? 'close' : 'pencil'}
                active={state.view === 'listEditor'}
                onClick={() => dispatch({ type: 'OPEN_VIEW', payload: { view: state.view === 'listEditor' ? 'billboard' : 'listEditor' } })}
            />

            <Menu.Menu position="right" >
                <Menu.Item
                    key="new"
                    name="Add Coffee"
                    icon={state.editing ? 'close' : 'plus square outline'}
                    active={state.editing}
                    disabled={addingDisabled}
                    onClick={() => dispatch({ type: state.editing ? 'EDIT_OFF' : 'EDIT_ON' })}
                />
                <Menu.Item
                    key="delete"
                    name={state.deleting && !deletingDisabled ? 'Done removing' : 'Remove coffees'}
                    icon={state.deleting ? 'close' : 'trash alternate outline'}
                    active={state.deleted}
                    disabled={deletingDisabled}
                    onClick={() => dispatch({ type: state.deleting ? 'DELETE_OFF' : 'DELETE_ON' })}
                />
            </Menu.Menu>
        </Menu>
    );
};