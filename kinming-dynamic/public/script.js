// 前端动态渲染器
let currentPage = 'home';

async function fetchData(url) {
    const res = await fetch(url);
    return res.json();
}

// 渲染“关于井明”页面（包含hero+公司简介+发展历程）
async function renderHome() {
    const company = await fetchData('/api/company');
    const timeline = await fetchData('/api/timeline');
    return `
        <section class="hero">
            <div class="container">
                <div class="hero-content">
                    <div class="hero-text">
                        <span class="hero-badge"><i class="fas fa-microchip"></i> ${company.heroBadge}</span>
                        <h2>${company.heroTitle}</h2>
                        <p>${company.heroDesc}</p>
                        <a href="#" data-page="products" class="btn-outline"><i class="fas fa-arrow-down"></i> 探索产品</a>
                    </div>
                    <div style="background:#ffffffcc; backdrop-filter:blur(4px); border-radius:32px; padding:28px; flex:0.8;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                            <div><strong>${company.years}</strong><br>年经验沉淀</div>
                            <div><strong>${company.maxLayers}</strong><br>最高层数</div>
                            <div><strong>${company.aspectRatio}</strong><br>纵横比能力</div>
                        </div>
                        <div style="font-size: 0.9rem; color: #2d4a8c;">川渝首家专业沉金工艺企业 · 国家级产业园智能基地</div>
                    </div>
                </div>
            </div>
        </section>
        <section style="padding: 60px 0;">
            <div class="container">
                <div class="section-title">关于井明</div>
                <div style="background: white; border-radius: 28px; padding: 32px; margin-bottom: 48px;">
                    <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;"><strong>${company.name}</strong> ${company.shortIntro}</p>
                    <p style="color:#2563eb;"><i class="fas fa-chart-line"></i> 企业使命：${company.mission}</p>
                </div>
                <div class="section-title" style="margin-bottom: 32px;">发展历程</div>
                <div class="timeline">
                    ${timeline.map(item => `
                        <div class="timeline-item">
                            <div class="timeline-year">${item.year}</div>
                            <h4>${item.title}</h4>
                            <p>${item.desc}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

// 行业市场
async function renderIndustry() {
    const industries = await fetchData('/api/industries');
    return `
        <div class="container">
            <div class="section-title">行业市场</div>
            <p style="text-align: center; margin-bottom: 40px;">井明电子深度服务五大战略行业，提供高可靠性PCB解决方案。</p>
            <div class="card-grid">
                ${industries.map(ind => `
                    <div class="card">
                        <i class="${ind.icon}" style="font-size: 2rem; color: #2563eb;"></i>
                        <h3>${ind.title}</h3>
                        <p>${ind.desc}</p>
                        <div class="device-params">${ind.param}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// 产品页面
async function renderProducts() {
    const products = await fetchData('/api/products');
    const caps = await fetchData('/api/capabilities');
    return `
        <div class="container">
            <div class="section-title">产品 • 精密制程</div>
            <div class="card-grid" style="margin-bottom: 48px;">
                ${products.map(p => `
                    <div class="card">
                        <h3><i class="fas fa-microchip"></i> ${p.title}</h3>
                        <p>${p.desc}</p>
                    </div>
                `).join('')}
            </div>
            <div class="section-title" style="margin-bottom: 30px;">核心制程能力</div>
            <div class="table-wrapper">
                <table class="capability-table">
                    <thead><tr>${caps.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
                    <tbody>
                        ${caps.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 供应链页面
async function renderSupply() {
    const equipment = await fetchData('/api/equipment');
    const instruments = await fetchData('/api/qc-instruments');
    return `
        <div class="container">
            <div class="section-title">供应链 • 智能制造保障</div>
            <div class="card-grid" style="margin-bottom: 48px;">
                ${equipment.map(eq => `
                    <div class="card">
                        <div class="device-icon"><i class="${eq.icon}"></i></div>
                        <h3>${eq.name}</h3>
                        <div class="device-params">${eq.params}</div>
                    </div>
                `).join('')}
            </div>
            <div style="background: white; border-radius: 28px; padding: 28px; margin-top: 20px;">
                <h3 style="text-align:center; margin-bottom:24px;"><i class="fas fa-flask"></i> 全流程质检实验室</h3>
                <div class="qc-badges">
                    ${instruments.map(inst => `<span class="qc-badge">${inst}</span>`).join('')}
                </div>
                <p style="text-align: center; margin-top: 24px;">从原材料入厂IQC → 过程SPC → 成品可靠性测试，供应链数字化追溯。</p>
            </div>
        </div>
    `;
}

// 新闻中心
async function renderNews() {
    const news = await fetchData('/api/news');
    return `
        <div class="container">
            <div class="section-title">新闻中心</div>
            ${news.map(n => `
                <div class="news-item">
                    <div style="display: flex; justify-content: space-between; flex-wrap:wrap;">
                        <span><i class="far fa-calendar-alt"></i> ${n.date}</span>
                        <span style="color:#2563eb;">${n.category}</span>
                    </div>
                    <h3 style="margin: 10px 0;">${n.title}</h3>
                    <p>${n.content}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// 联系我们
async function renderContact() {
    const contact = await fetchData('/api/contact');
    return `
        <div class="container">
            <div class="section-title">联系我们</div>
            <div class="contact-grid">
                <div class="contact-card">
                    <i class="fas fa-map-marker-alt fa-2x" style="color:#2563eb;"></i>
                    <h3>生产基地</h3>
                    <p>${contact.address}</p>
                </div>
                <div class="contact-card">
                    <i class="fas fa-phone-alt fa-2x" style="color:#2563eb;"></i>
                    <h3>业务咨询</h3>
                    <p>电话：${contact.phone}<br>传真：${contact.fax}</p>
                </div>
                <div class="contact-card">
                    <i class="fas fa-envelope fa-2x" style="color:#2563eb;"></i>
                    <h3>电子邮箱</h3>
                    <p>${contact.email}<br>${contact.supportEmail}</p>
                </div>
            </div>
            <div style="background: white; border-radius: 32px; padding: 32px; margin-top: 40px; text-align: center;">
                <i class="fas fa-handshake fa-2x" style="color:#2563eb;"></i>
                <h3 style="margin: 16px 0;">合作共赢 · 智创未来</h3>
                <p>面对PCB行业趋势，井明电子坚守“诚信创新、协作共赢”核心价值观，以定制化方案+全周期服务响应需求。</p>
                <a href="mailto:${contact.email}" class="btn-outline"><i class="fas fa-paper-plane"></i> 立即询盘</a>
            </div>
        </div>
    `;
}

// 主渲染函数
async function loadPage(page) {
    currentPage = page;
    const app = document.getElementById('app');
    let html = '';
    switch(page) {
        case 'home': html = await renderHome(); break;
        case 'industry': html = await renderIndustry(); break;
        case 'products': html = await renderProducts(); break;
        case 'supply': html = await renderSupply(); break;
        case 'news': html = await renderNews(); break;
        case 'contact': html = await renderContact(); break;
        default: html = await renderHome();
    }
    app.innerHTML = `<div class="page-section active-page">${html}</div>`;
    // 重新绑定页面内链接（如hero中的探索产品）
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-page');
            if(target) setActivePage(target);
        });
    });
}

function setActivePage(page) {
    // 更新URL hash（可选）
    window.history.pushState({}, '', `#${page}`);
    loadPage(page);
    // 高亮导航
    document.querySelectorAll('.nav-links a').forEach(a => {
        const pg = a.getAttribute('data-page');
        if(pg === page) a.classList.add('active');
        else a.classList.remove('active');
    });
}

// 事件绑定
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        if(page) setActivePage(page);
    });
});
const menuToggle = document.getElementById('menuToggle');
menuToggle.addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('show');
});
// 初始加载
const initialPage = window.location.hash.slice(1) || 'home';
setActivePage(initialPage);