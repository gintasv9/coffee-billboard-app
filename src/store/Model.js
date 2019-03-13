import {
    coffees
} from '../coffeeData.json';

export const initialState = {
    view: '',
    items: [],
    coffeeData: {},
    itemsLoaded: false,
    editing: false,
    deleting: false
};

export const reducer = (state, action) => {
    let items;
    let coffeeData;

    switch (action.type) {
        case 'INIT':
            const savedCoffeeData = localStorage.getItem('coffeeData');
            if (savedCoffeeData == null) {
                localStorage.setItem('coffeeData', JSON.stringify(coffees));
            }

            return {
                ...state,
                view: 'billboard',
                items: JSON.parse(localStorage.getItem('items')) || initialState.items,
                coffeeData: savedCoffeeData ? JSON.parse(savedCoffeeData) : coffees,
                itemsLoaded: true
            };
        case 'EDIT_ON': 
            return {
                ...state,
                view: 'billboard',
                editing: true,
                deleting: false
            };
        case 'EDIT_OFF':
            return {
                ...state,
                editing: false
            };
        case 'DELETE_ON':
            return {
                ...state,
                view: 'billboard',
                editing: false,
                deleting: true
            };
        case 'DELETE_OFF':
            return {
                ...state,
                deleting: false
            };
        case 'ADD_TILE':
            items = [...state.items, action.payload.item];
            localStorage.setItem('items', JSON.stringify(items));

            return {
                ...state,
                items
            };
        case 'REMOVE_TILE':
            items = state.items.filter(x => x.id !== action.payload.id);
            localStorage.setItem('items', JSON.stringify(items));

            return {
                ...state,
                items
            };
        case 'OPEN_VIEW':
            return {
                ...state,
                view: action.payload.view,
                editing: false,
                deleting: false
            };
        case 'ADD_NEW_COFFEE':
            coffeeData = {
                ...state.coffeeData,
                [action.payload.key]: action.payload.item
            };

            localStorage.setItem('coffeeData', JSON.stringify(coffeeData));

            return {
                ...state,
                coffeeData
            };
        case 'REMOVE_COFFEE':
            coffeeData = {
                ...state.coffeeData
            };
            items = state.items.filter(x => x.key !== action.payload.key);
            localStorage.setItem('items', JSON.stringify(items));

            delete coffeeData[action.payload.key];
            localStorage.setItem('coffeeData', JSON.stringify(coffeeData));

            return {
                ...state,
                items,
                coffeeData
            };
        default:
            return state;
    }
};