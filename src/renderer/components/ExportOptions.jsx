import React from 'react';
import { Card, Input, Button, Typography } from '@arco-design/web-react';
import { IconSave } from '@arco-design/web-react/icon';
import { selectSavePath } from '../utils/electronUtils';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const ExportOptions = ({ outputPath, onPathChange }) => {
    const { t } = useTranslation();

    const handleSelectPath = async () => {
        try {
            const result = await selectSavePath(outputPath);
            if (!result.canceled && result.filePath) {
                onPathChange(result.filePath);
            }
        } catch (error) {
            console.error(t('errors.selectExportPath'), error);
        }
    };

    return (
        <Card>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <IconSave style={{ marginRight: 8, fontSize: 20, color: 'rgb(var(--primary-6))' }} />
                <div>
                    <Title heading={5} style={{ margin: 0 }}>{t('exportSettings')}</Title>
                    <Typography.Text type="secondary">{t('exportLocation')}</Typography.Text>
                </div>
            </div>

            <Input.Search
                value={outputPath}
                onChange={onPathChange}
                placeholder={t('selectExportPath')}
                searchButton={
                    <Button type="primary">
                        {t('browse')}
                    </Button>
                }
                onSearch={handleSelectPath}
            />
        </Card>
    );
};

export default ExportOptions;