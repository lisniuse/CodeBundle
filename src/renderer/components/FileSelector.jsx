import React, { useState } from 'react';
import { Card, Input, Button, Typography, Message } from '@arco-design/web-react';
import { IconFolder } from '@arco-design/web-react/icon';
import { selectDirectory } from '../utils/electronUtils';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const FileSelector = ({ onSelect, onFolderChange }) => {
    const { t } = useTranslation();
    const [currentPath, setCurrentPath] = useState('');

    const handleClick = async () => {
        try {
            const result = await window.electron.invoke('select-directory');
            if (!result.canceled && result.filePath) {
                setCurrentPath(result.filePath);
                onSelect(result.filePath);
                await onFolderChange(result.filePath);
            }
        } catch (error) {
            Message.error(t('errors.selectFolder') + error.message);
        }
    };

    return (
        <Card>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <IconFolder style={{ marginRight: 8, fontSize: 20, color: 'rgb(var(--primary-6))' }} />
                <div>
                    <Title heading={5} style={{ margin: 0 }}>{t('projectPath')}</Title>
                    <Typography.Text type="secondary">{t('selectProject')}</Typography.Text>
                </div>
            </div>

            <Input.Search
                value={currentPath}
                onChange={(value) => {
                    setCurrentPath(value);
                    if (value) {
                        onSelect(value);
                        onFolderChange(value);
                    }
                }}
                placeholder={t('enterPath')}
                searchButton={
                    <Button type="primary">
                        {t('browse')}
                    </Button>
                }
                onSearch={handleClick}
            />
        </Card>
    );
};

export default FileSelector;