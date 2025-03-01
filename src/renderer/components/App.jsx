import React, { useState, useEffect } from 'react';
import { Typography, Message, Select, Spin } from '@arco-design/web-react';  // 添加 Spin
import { useTranslation } from 'react-i18next';
import FileSelector from './FileSelector';
import ExtensionSelector from './ExtensionSelector';
import IgnoreList from './IgnoreList';
import ExportOptions from './ExportOptions';
import ActionBar from './ActionBar';
import { readConfig, getExtensions, exportFiles } from '../utils/electronUtils';

const App = () => {
    const { t, i18n } = useTranslation();
    const [extensionsLoading, setExtensionsLoading] = useState(false);
    const [loading, setLoading] = useState(true);  // 添加加载状态
    const [folderPath, setFolderPath] = useState('');
    const [extensions, setExtensions] = useState([]);
    const [selectedExtensions, setSelectedExtensions] = useState([]);
    const [ignoreList, setIgnoreList] = useState([]);
    const [useGitignore, setUseGitignore] = useState(true);
    const [outputPath, setOutputPath] = useState('');

    const handleLanguageChange = async (value) => {
        await i18n.changeLanguage(value);
        await window.electron.setLanguage(value);
    };

    useEffect(() => {
        const initLanguage = async () => {
            try {
                const savedLang = await window.electron.getLanguage();
                if (savedLang) {
                    await i18n.changeLanguage(savedLang);
                } else {
                    const systemLang = await window.electron.getSystemLanguage();
                    await i18n.changeLanguage(systemLang);
                    await window.electron.setLanguage(systemLang);
                }
            } catch (error) {
                console.error('Language initialization failed:', error);
            } finally {
                setLoading(false);
            }
        };
        initLanguage();
    }, []);

    const handleExport = async () => {
        if (!folderPath) {
            Message.error(t('errors.selectPath'));
            return;
        }

        if (selectedExtensions.length === 0) {
            Message.error(t('errors.selectType'));
            return;
        }

        try {
            const result = await exportFiles({
                folderPath,
                selectedExtensions,
                ignoreList,
                useGitignore,
                outputPath
            });
            if (result) {
                Message.success(t('success.exported', { path: result }));
                await window.electron.openFolder(result);
            }
        } catch (error) {
            Message.error(t('errors.exportFailed') + error.message);
        }
    };

    const isExportDisabled = !folderPath || selectedExtensions.length === 0 || !outputPath;

    const loadConfig = async (path) => {
        try {
            const config = await readConfig(path);
            if (config) {
                setSelectedExtensions(config.selectedExtensions || []);
                setIgnoreList(config.ignoreList || []);
                setUseGitignore(config.useGitignore ?? true);
                setOutputPath(config.outputPath || '');
            }
        } catch (error) {
            console.error(t('errors.loadConfig'), error);
        }
    };

    if (loading) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'var(--color-bg-1)'
            }}>
                <Spin dot size={40} />
            </div>
        );
    }
    const handleFolderChange = async (path) => {
        try {
            setLoading(true);
            const extensions = await getExtensions(path);
            setExtensions(extensions);
        } catch (error) {
            Message.error(t('errors.loadExtensions') + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ActionBar 
                onExport={handleExport}
                disabled={isExportDisabled}
            />
            <div style={{ padding: '32px', marginTop: '60px' }}>
                <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                    <Select
                        defaultValue="zh"
                        style={{ width: 120 }}
                        onChange={handleLanguageChange}
                    >
                        <Select.Option value="zh">中文</Select.Option>
                        <Select.Option value="en">English</Select.Option>
                    </Select>
                </div>
                
                <FileSelector 
                    onSelect={setFolderPath}
                    onFolderChange={async (path) => {
                        try {
                            setExtensionsLoading(true);  // 使用专门的加载状态
                            const exts = await getExtensions(path);
                            setExtensions(exts);
                            await loadConfig(path);
                        } catch (error) {
                            Message.error(t('errors.loadExtensions') + error.message);
                        } finally {
                            setExtensionsLoading(false);
                        }
                    }}
                />
                
                <ExtensionSelector
                    extensions={extensions}
                    selected={selectedExtensions}
                    onSelect={setSelectedExtensions}
                    loading={extensionsLoading}
                />
                
                <IgnoreList
                    value={ignoreList}
                    onChange={setIgnoreList}
                    useGitignore={useGitignore}
                    onGitignoreChange={setUseGitignore}
                />
                
                <ExportOptions 
                    outputPath={outputPath} 
                    onPathChange={setOutputPath} 
                />
            </div>
        </>
    );
};

export default App;