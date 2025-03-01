const fs = require('fs').promises;

async function isBinaryFile(filePath) {
    try {
        const buffer = Buffer.alloc(4096);
        const fd = await fs.open(filePath, 'r');
        const { bytesRead } = await fd.read(buffer, 0, 4096, 0);
        await fd.close();

        // 检查是否包含空字节或常见的二进制文件标记
        for (let i = 0; i < bytesRead; i++) {
            if (buffer[i] === 0) return true;
        }

        // 检查非打印字符的比例
        let nonPrintable = 0;
        for (let i = 0; i < bytesRead; i++) {
            if (buffer[i] < 32 && buffer[i] !== 9 && buffer[i] !== 10 && buffer[i] !== 13) {
                nonPrintable++;
            }
        }
        return (nonPrintable / bytesRead) > 0.3;
    } catch (error) {
        console.error('Error checking binary file:', error);
        return false;
    }
}

module.exports = {
    isBinaryFile
};