import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';

export const Tile = ({ coffeeData, coffeeType, price, deleting, onDelete }) => {
    const coffee = coffeeData[coffeeType];
    if (!coffee) {
        return null;
    }

    return (
        <Segment>
            <div className="tile">
                <img src={coffee.imgSrc} alt={coffee.title} />
                {deleting && (
                    <div className="icon-container">
                        <Icon className="icon-wrapper trash alternate" onClick={onDelete} />
                    </div>
                )}
                <div className="coffee-info">
                    <span className="tile-title">{coffee.title}</span>
                    <span>{price + ' €'}</span>
                </div>
            </div>
        </Segment>
    );
};