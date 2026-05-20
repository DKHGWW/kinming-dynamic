const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ---------- 模拟数据库 ----------
const db = {
  company: {
    name: '四川井明电子有限公司',
    shortIntro: '拥有标准化生产基地与高精度设备集群，可大批量交付2-24层印制电路板，是PCB产品优质提供商。',
    mission: '诚信创新、协作共赢，以定制化方案+全周期服务响应需求',
    years: '15+',
    maxLayers: '30',
    aspectRatio: '25:1',
    heroBadge: '高精密PCB智造商',
    heroTitle: '2-24层印制电路板<br>专业解决方案',
    heroDesc: '标准化生产基地 · 高精度设备集群 · 航空/通讯/汽车/AI/医疗全领域覆盖'
  },
  timeline: [
    { year: '2011-2013', title: '奠基起步', desc: '前身成立，专注双面/多层沉金工艺，成为川渝首家专业沉金加工企业，工艺实现突破。' },
    { year: '2014-2018', title: '市场突破', desc: '西南地区化金工艺主要加工商，月销售额突破500万元，规模持续扩大。' },
    { year: '2018-2021', title: '规模扩张', desc: '入驻遂宁国家级产业园PCB基地，销售网络覆盖全国，现代化产线投产。' },
    { year: '2021至今', title: '智能转型', desc: '引入国内外自动化智能设备，布局航空、光模通讯、智能汽车、AI服务器、医疗器械等高端市场。' }
  ],
  industries: [
    { icon: 'fas fa-rocket', title: '航空航天', desc: '高层数、高TG、高可靠性板材，应用于航空控制器、导航系统，符合严苛军标。', param: '10L 沉金板 / 铜厚2oz' },
    { icon: 'fas fa-network-wired', title: '光模通讯', desc: '镀金手指+镍钯金工艺，信号完整性卓越，应用于高速光模块、通讯基站。', param: '8层板 / 1.2mm / 阻抗控制±7%' },
    { icon: 'fas fa-car', title: '智能汽车', desc: '总成控制器、BMS、车规级PCB，满足IATF16949品质体系，沉金工艺高可靠性。', param: '4层 / 1.6mm / 铜厚2oz' },
    { icon: 'fas fa-brain', title: 'AI服务器', desc: '高层数、背板技术，支持AI加速卡及服务器主板，低损耗材料。', param: '10L / 2.0mm / 纵横比20:1' },
    { icon: 'fas fa-heartbeat', title: '医疗影像', desc: 'X光控制器、超声设备，严苛清洁度与稳定性，沉金工艺保证信号精度。', param: '6层 / 1.2mm / 镀厚金可选' }
  ],
  products: [
    { title: '多层板专家', desc: '2-30层，最小板厚0.3mm，最大板厚8.0mm，埋盲孔、HDI、任意层互连。' },
    { title: '高频高速板', desc: '罗杰斯/高频混压，严格控制介电常数，适用于5G通信、雷达系统。' },
    { title: '金属基板 & 陶瓷基板', desc: '铝基/铜基/陶瓷，优异散热性能，大功率LED及电源模组。' },
    { title: '特种表面处理', desc: '沉金、沉银、OSP、沉锡、电镀金、镍钯金、选择性沉金+OSP等。' }
  ],
  capabilities: {
    headers: ['核心技术项', '井明标准能力', '特级能力'],
    rows: [
      ['最大生产层数', '24层', '30层'],
      ['最小线宽/线距', '75/75μm', '60/60μm'],
      ['最小机械孔径', '0.2mm', '0.15mm'],
      ['最大纵横比', '20:1', '25:1'],
      ['阻抗控制公差', '±10%', '±7%'],
      ['板翘控制', '&lt;0.75%', '&lt;0.5%'],
      ['表面处理能力', '喷锡、沉金、沉银、OSP、沉锡、选择性沉金+OSP、蓝胶、碳油、喷锡+金手指、电镀金、电镀银、沉镍钯金', ''],
      ['板材类型', 'FR-4(普通TG/中TG/高TG)、无卤、金属基板、陶瓷、高频、复合基(CEM系列)', '']
    ]
  },
  equipment: [
    { icon: 'fas fa-microchip', name: '数字钻孔机', params: '板厚0.075-6.0mm · 孔径精度±50um · 日产能充沛' },
    { icon: 'fas fa-bolt', name: '填孔脉冲电镀', params: '纵横比25:1 · Dimple≤5um · 镀铜均匀性COV<10%' },
    { icon: 'fas fa-water', name: '真空蚀刻+DES线', params: '蚀刻均匀性≥90% · 线宽精度2.5/2.5mil · 高良率' },
    { icon: 'fas fa-layer-group', name: '高层压合机', params: '4-24L · 压合公差±5% · 高温压合无分层' },
    { icon: 'fas fa-chart-line', name: 'LDI曝光+飞针测试', params: '全自动光学检测+电测，保障100%电气可靠性' }
  ],
  qcInstruments: ['原子吸收分光光度计', '扫描电镜(SEM)', '全相显微镜', 'AOI自动光学检测', '牛津X-strata920', 'CV5药水分析', '电子天平/热冲击箱'],
  news: [
    { date: '2025.03.20', category: '企业动态', title: '井明电子荣获国家级“专精特新”小巨人企业称号', content: '专注高精密PCB细分领域，持续创新沉金+镍钯金工艺，获得工信部认可，为航空航天及AI服务器提供核心支撑。' },
    { date: '2025.02.10', category: '技术突破', title: '成功量产25:1超高纵横比电镀填孔工艺', content: '脉冲电镀线升级，实现通讯背板及厚铜板高可靠性互连，已通过头部通讯厂商认证。' },
    { date: '2024.12.05', category: '行业展会', title: '井明电子亮相2024国际电子电路(深圳)展览会', content: '现场展示AI服务器主板、光模块PCB及汽车激光雷达板，吸引众多客户洽谈合作。' },
    { date: '2024.09.18', category: '质量体系', title: '通过IATF16949:2023汽车行业质量管理体系换版审核', content: '标志着井明电子车规级PCB制程能力迈入国际一流行列，为新能源汽车客户提供坚实保障。' }
  ],
  contact: {
    address: '四川省遂宁市国家级经济技术开发区PCB产业园 四川井明电子有限公司',
    phone: '+86 0825-2815888',
    fax: '+86 0825-2815666',
    email: 'sales@kinmingelec.com',
    supportEmail: 'support@kinmingelec.com'
  }
};

// ---------- API 路由 ----------
app.get('/api/company', (req, res) => res.json(db.company));
app.get('/api/timeline', (req, res) => res.json(db.timeline));
app.get('/api/industries', (req, res) => res.json(db.industries));
app.get('/api/products', (req, res) => res.json(db.products));
app.get('/api/equipment', (req, res) => res.json(db.equipment));
app.get('/api/capabilities', (req, res) => res.json(db.capabilities));
app.get('/api/qc-instruments', (req, res) => res.json(db.qcInstruments));
app.get('/api/news', (req, res) => res.json(db.news));
app.get('/api/contact', (req, res) => res.json(db.contact));

// 所有其他请求返回 index.html（支持前端路由）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`动态网站已启动: http://localhost:${PORT}`);
});