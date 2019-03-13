import React, { useState } from 'react';
import { Segment, Label, Button, Input } from 'semantic-ui-react';
import uuid from 'uuid-v4';

export const NewRow = ({ onSave }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [urlInvalid, setUrlInvalid] = useState(true);

    const backupUrl = "https://www.bormel-grice.com/sites/all/themes/riley_sub/img/nopicture.png";
    const itemInvalid = title === '' || url === '' || urlInvalid;

    const handleImageError = (e) => {
        e.target.src = backupUrl;
        setUrlInvalid(true);
    };

    const handleImageLoad = (e) => {
        if (e.target.src === backupUrl) {
            setUrlInvalid(true);
            return;
        }

        setUrlInvalid(false);
    };

    const handleSave = () => {
        if (itemInvalid) {
            return;
        }

        onSave({
            key: uuid(),
            item: {
                title,
                imgSrc: url
            }
        });

        setTitle('');
        setUrl('');
    };

    return (
        <Segment>
            <div className="editor-row">
                <img
                    src={url}
                    alt="New coffee"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                />
                <div className="coffee-data">
                    <Segment.Group horizontal>
                        <Segment className="title-segment">
                            <Label attached='top'>Title</Label>
                            <Input
                                value={title}
                                label={{ icon: 'asterisk' }}
                                labelPosition='left corner'
                                placeholder='Max 50 symbols'
                                maxLength="50"
                                onChange={e => setTitle(e.target.value)}
                            />
                        </Segment>
                        <Segment className="url-segment">
                            <Label attached='top'>Url</Label>
                            <Input
                                value={url}
                                label={{ icon: 'asterisk' }}
                                labelPosition='left corner'
                                onChange={e => setUrl(e.target.value)}
                            />
                        </Segment>
                    </Segment.Group>
                </div>
                <Button
                    className="coffee-save-button"
                    icon="plus"
                    disabled={itemInvalid}
                    onClick={handleSave}
                />
            </div>
        </Segment>
    );
};