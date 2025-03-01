import React, { useEffect } from 'react';
import { Card, Select, Switch, Typography } from '@arco-design/web-react';
import { IconDelete } from '@arco-design/web-react/icon';
import { defaultIgnores } from '../utils/fileUtils';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const IgnoreList = ({ value, onChange, useGitignore, onGitignoreChange }) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (value.length === 0) {
            onChange(defaultIgnores);
        }
    }, []);

    return (
        <Card>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <IconDelete style={{ marginRight: 8, fontSize: 20, color: 'rgb(var(--primary-6))' }} />
                <div>
                    <Title heading={5} style={{ margin: 0 }}>{t('ignoreList')}</Title>
                    <Typography.Text type="secondary">{t('ignoreDescription')}</Typography.Text>
                </div>
            </div>
            
            <Select
                mode="multiple"
                allowCreate
                placeholder={t('ignoreInputPlaceholder')}
                value={value}
                onChange={onChange}
                style={{ width: '100%', marginBottom: 16 }}
            />
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                <Switch
                    checked={useGitignore}
                    onChange={onGitignoreChange}
                    style={{ marginRight: 8 }}
                />
                <Typography.Text>{t('useGitignore')}</Typography.Text>
            </div>
        </Card>
    );
};

export default IgnoreList;