'use strict';

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      status.textContent = '已复制：' + button.dataset.copy;
    } catch {
      status.textContent = '浏览器未允许复制，请手动选中上方地址复制。';
    }
  });
});

document.querySelector('#cost-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = ['input-price', 'output-price', 'input-tokens', 'output-tokens', 'request-count'];
  const values = fields.map((id) => document.getElementById(id).valueAsNumber);
  const output = document.querySelector('#cost-result');
  if (!values.every((value) => Number.isFinite(value) && value >= 0) || values[4] < 1) {
    output.textContent = '请填写有效的单价、Token 数量与请求次数。';
    return;
  }
  const [inputPrice, outputPrice, inputTokens, outputTokens, requests] = values;
  const cost = (inputPrice * inputTokens + outputPrice * outputTokens) * requests / 1e6;
  if (!Number.isFinite(cost)) {
    output.textContent = '数值过大，请减小输入后重试。';
    return;
  }
  output.textContent = cost > 0 && cost < 0.000001
    ? '基础估算：小于 ¥0.000001'
    : '基础估算：¥' + cost.toLocaleString('zh-CN', { maximumFractionDigits: 6 });
});
