import os
import re

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 替换 t('common.xxx') 模式
    content = re.sub(r"t\('common\.([^']+)'\)", r"t('\1')", content)
    # 替换 t("common.xxx") 模式
    content = re.sub(r't\("common\.([^"]+)"\)', r't("\1")', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def scan_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(('.js', '.jsx')):
                file_path = os.path.join(root, file)
                print(f'处理文件: {file_path}')
                process_file(file_path)

if __name__ == '__main__':
    # 指定要扫描的目录
    src_dir = os.path.join(os.path.dirname(__file__), 'src')
    scan_directory(src_dir)
    print('完成！所有 common. 前缀已被移除。')