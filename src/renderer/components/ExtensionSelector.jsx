import React, { useState } from 'react';
import { Card, Checkbox, Typography, Space, Empty, Input } from '@arco-design/web-react';
import { IconCode, IconSearch } from '@arco-design/web-react/icon';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const ExtensionSelector = ({ extensions, selected, onSelect }) => {
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState('');

    const filteredExtensions = extensions.filter(ext => 
        ext.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <Card>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <IconCode style={{ marginRight: 8, fontSize: 20, color: 'rgb(var(--primary-6))' }} />
                <div>
                    <Title heading={5} style={{ margin: 0 }}>{t('fileTypes')}</Title>
                    <Typography.Text type="secondary">{t('selectFileTypes')}</Typography.Text>
                </div>
            </div>

            <Input
                allowClear
                placeholder={t('searchFileTypes')}
                style={{ marginBottom: 16 }}
                prefix={<IconSearch />}
                value={searchText}
                onChange={setSearchText}
            />

            {filteredExtensions.length > 0 ? (
                <Space wrap size={16}>
                    {filteredExtensions.map(ext => (
                        <Checkbox
                            key={ext}
                            checked={selected.includes(ext)}
                            onChange={(checked) => {
                                if (checked) {
                                    onSelect([...selected, ext]);
                                } else {
                                    onSelect(selected.filter(e => e !== ext));
                                }
                            }}
                        >
                            {ext}
                        </Checkbox>
                    ))}
                </Space>
            ) : (
                <Empty
                    description={searchText ? t('noMatchingTypes') : t('selectFolder')}
                    style={{ margin: '24px 0' }}
                />
            )}
        </Card>
    );
};

export default ExtensionSelector;