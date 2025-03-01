import React from 'react';
import { Button, Select } from '@arco-design/web-react';
import { IconDownload } from '@arco-design/web-react/icon';
import { useTranslation } from 'react-i18next';

const ActionBar = ({ onExport, disabled }) => {
    const { t, i18n } = useTranslation();
    const handleLanguageChange = async (value) => {
        await i18n.changeLanguage(value);
        await window.electron.setLanguage(value);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: '16px',
            backgroundColor: 'var(--color-bg-2)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Button
                type="primary"
                icon={<IconDownload />}
                disabled={disabled}
                onClick={onExport}
            >
                {t('confirmExport')}
            </Button>

            <Select
                defaultValue="zh"
                style={{ width: 120 }}
                onChange={handleLanguageChange}
            >
                <Select.Option value="zh">中文</Select.Option>
                <Select.Option value="en">English</Select.Option>
            </Select>
        </div>
    );
};

export default ActionBar;