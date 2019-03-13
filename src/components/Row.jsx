import React from 'react';
import { Segment, Label, Button } from 'semantic-ui-react';

export const Row = ({ coffeeTitle, imgSrc, onDelete }) => {
    return (
        <Segment>
            <div className="editor-row">
                <img src={imgSrc} alt={coffeeTitle} />
                <div className="coffee-data">
                    <Segment.Group horizontal>
                        <Segment className="title-segment">
                            <Label attached='top'>Title</Label>
                            <div className="break-word">{coffeeTitle}</div>
                        </Segment>
                        <Segment className="url-segment">
                            <Label attached='top'>Url</Label>
                            <div className="break-word">{imgSrc}</div>
                        </Segment>
                    </Segment.Group>
                </div>
                <Button
                    className="coffee-delete-button"
                    icon="trash alternate outline"
                    onClick={onDelete}
                />
            </div>
        </Segment>
    );
};