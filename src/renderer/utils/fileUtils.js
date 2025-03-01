// 处理文本变更，过滤空行
export const processTextChange = (text) => {
    return text.split('\n').filter(line => line.trim() !== '');
};

// 默认的忽略列表
export const defaultIgnores = [
    '*.jpg',
    '*.jpeg',
    '*.png',
    '*.gif',
    '*.bmp',
    '*.ico',
    '*.svg',
    '*.webp',
    'package-lock.json',
    '.codebundle',
    'code_bundle.txt'
];