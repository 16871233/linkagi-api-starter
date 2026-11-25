"""Translate selected product titles to English using the LinkAGI DeepSeek group."""
import argparse
import csv
import getpass
import json
import os
from pathlib import Path
import sys
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


ENDPOINT = 'https://api.linktoagi.com/v1/chat/completions'
MODEL = 'deepseek-v4.1-flash'
INSTRUCTION = ('Translate the product title to natural English for a catalog. Preserve brand, '
               'model numbers, quantities, and units. Do not invent features. Return only the title.')


def translate(title, key):
    payload = {'model': MODEL, 'messages': [{'role': 'system', 'content': INSTRUCTION},
                                           {'role': 'user', 'content': title}]}
    req = Request(ENDPOINT, data=json.dumps(payload).encode(), headers={
        'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key})
    with urlopen(req, timeout=90) as response:
        result = json.load(response)['choices'][0]
    text = result['message']['content']
    if result.get('finish_reason') != 'stop' or not isinstance(text, str) or not text.strip():
        raise ValueError('模型没有返回完整标题')
    return text.strip()


def cell(value):
    if value.lstrip().startswith(('=', '+', '-', '@')) or value.startswith(('\t', '\r', '\n')):
        return "'" + value
    return value


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('input', type=Path)
    parser.add_argument('output', type=Path)
    parser.add_argument('--limit', type=int, default=1, help='最多翻译的行数，默认 1')
    args = parser.parse_args()
    if args.limit < 1:
        parser.error('--limit 需要大于 0')
    with args.input.open(encoding='utf-8-sig', newline='') as source:
        reader = csv.DictReader(source)
        if not {'sku', 'title'}.issubset(reader.fieldnames or []):
            parser.error('CSV 表头需要包含 sku,title')
        if args.output.exists():
            parser.error('输出文件已存在，请换一个文件名')
        key = os.environ.get('LINKAGI_API_KEY') or getpass.getpass('DeepSeek 分组 API Key（输入隐藏）: ')
        if not key.strip():
            parser.error('需要 API Key')
        with args.output.open('x', encoding='utf-8-sig', newline='') as out:
            writer = csv.writer(out)
            writer.writerow(('sku', 'title', 'title_en'))
            done = 0
            for row in reader:
                title = (row.get('title') or '').strip()
                if not title:
                    continue
                try:
                    english = translate(title, key.strip())
                except HTTPError as error:
                    sys.exit(f'CSV 第 {reader.line_num} 行收到 HTTP {error.code}，已写入 {done} 条。')
                except (URLError, OSError, ValueError, KeyError, IndexError, TypeError) as error:
                    sys.exit(f'CSV 第 {reader.line_num} 行没有拿到完整结果（{type(error).__name__}），已写入 {done} 条。')
                writer.writerow(cell(v) for v in (row.get('sku') or '', title, english))
                out.flush()
                done += 1
                if done >= args.limit:
                    break
    print(f'已写入 {done} 条：{args.output}')


if __name__ == '__main__':
    main()
