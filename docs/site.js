'use strict';

// Keep a campaign's source when a visitor continues to signup or pricing.
const incomingCampaign = new URLSearchParams(window.location.search);
document.querySelectorAll('a[href]').forEach((anchor) => {
  const destination = new URL(anchor.href, window.location.href);
  if (destination.origin !== 'https://api.linktoagi.com' || !destination.searchParams.has('utm_campaign')) return;
  ['utm_source', 'utm_medium', 'utm_campaign'].forEach((key) => {
    const value = incomingCampaign.get(key);
    if (value && value.length <= 100) destination.searchParams.set(key, value);
  });
  anchor.href = destination.href;
});

document.querySelectorAll('[data-preset]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('#input-price').value = button.dataset.inputPrice;
    document.querySelector('#output-price').value = button.dataset.outputPrice;
    document.querySelector('#selected-preset').textContent = '已选：' + button.dataset.preset + '（2026-10-10 价格）';
    document.querySelector('#cost-result').textContent = '已带入单价，请填写 Token 数后计算';
    document.querySelector('#cost').scrollIntoView({ block: 'start' });
    document.querySelector('#input-tokens').focus({ preventScroll: true });
  });
});

['input-price', 'output-price'].forEach((id) => {
  document.getElementById(id).addEventListener('input', () => {
    document.querySelector('#selected-preset').textContent = '正在使用手动填写的单价。';
    document.querySelector('#cost-result').textContent = '单价已修改，请重新计算';
  });
});

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
