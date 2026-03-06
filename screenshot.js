const puppeteer = require('puppeteer');

(async () => {
  // 启动浏览器，配置针对 GitHub Action 优化的参数
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // 设置为 KPW3 的原生分辨率 (竖屏)
  await page.setViewport({ width: 1072, height: 1448 });

  // ⚠️ 在这里替换成你想要截图的网页地址
  const targetUrl = 'https://teojs.github.io/clock-dashboard/';

  console.log(`正在访问网页: ${targetUrl} ...`);
  // waitUntil: 'networkidle2' 意味着等待网络请求基本结束后再继续
  await page.goto(targetUrl, { waitUntil: 'networkidle2' });

  // 额外等待 5 秒钟，确保网页上的天气数据、时钟特效完全加载出来
  await new Promise(resolve => setTimeout(resolve, 5000));

  console.log('正在截图...');
  // 保存截图到当前目录
  await page.screenshot({ path: 'dashboard.png' });

  await browser.close();
  console.log('截图成功并保存为 dashboard.png !');
})();
