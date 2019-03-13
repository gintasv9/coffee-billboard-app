import React, { useState, useEffect, useRef } from 'react';
import { Segment, Icon, Dropdown } from 'semantic-ui-react';
import uuid from 'uuid-v4';

export const NewTile = ({ coffeeData, existingCoffees, onSave, onCancel }) => {
    const [coffee, setCoffee] = useState(null);
    const [price, setPrice] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    });

    const handleSave = () => {
        if (!isValid) {
            return;
        }

        const item = {
            id: uuid(),
            key: coffee,
            price: price.toFixed(2)
        };

        setCoffee(null);
        setPrice(0);

        onSave(item);
    };

    const getBackgroundStyle = () => {
        if (!coffeeData[coffee]) {
            return {
                backgroundImage: 'none'
            };
        }

        return {
            backgroundImage: `url(${coffeeData[coffee].imgSrc})`,
            opacity: 0.2
        };
    };

    const menuItems = Object.keys(coffeeData)
        .filter(x => !existingCoffees.some(y => x === y.key))
        .map(x => ({ text: coffeeData[x].title, value: x }));

    const isValid = coffee && !isNaN(price) && price !== 0;

    return (
        <Segment>
            <div ref={ref} className="tile">
                <div className="editing-actions" style={getBackgroundStyle()}></div>

                <div className="icon-container" >
                    {isValid && (<Icon className="icon-wrapper save outline" onClick={handleSave} />)}
                    <Icon className="icon-wrapper cancel" onClick={onCancel} />
                </div>

                <div className="coffee-info">
                    <Dropdown
                        placeholder="Choose coffee"
                        value={coffee}
                        options={menuItems}
                        onChange={(e, data) => setCoffee(data.value)}
                    />
                    <input
                        type="number"
                        className="price-input"
                        placeholder="Price"
                        value={price === 0 ? '' : price.toString()}
                        min="0"
                        step="0.1"
                        onChange={e => setPrice(e.target.valueAsNumber)}
                    />
                    {'€'}
                </div>
            </div>
        </Segment>
    );
};