// --- Translations Dictionary ---
const translations = {
    id: {
        nav_home: "Beranda",
        nav_about: "Tentang",
        nav_skills: "Keahlian",
        nav_experience: "Pengalaman",
        nav_projects: "Proyek",
        nav_contact: "Kontak",
        hero_hello: "Halo, Saya",
        hero_im: "Dan saya seorang",
        hero_desc: "Saya seorang mahasiswa S1 Geofisika dengan minat kuat di bidang Geoinformatika, pengembangan WebGIS, dan integrasi Artificial Intelligence. Saya berdedikasi membangun solusi data spasial yang efisien.",
        btn_cv: "Unduh CV",
        btn_contact: "Hubungi Saya",
        about_heading: "Tentang <span>Saya</span>",
        about_subheading: "Mahasiswa Geofisika & Penggiat WebGIS",
        about_desc: "Saya memiliki pengalaman dalam merancang dan mengembangkan platform WebGIS yang dilengkapi chatbot berbasis AI untuk berbagai kebutuhan. Saya mahir menggunakan teknologi GIS modern untuk pemrosesan dan presentasi data spasial. Sebagai mahasiswa Geofisika (S.Si) di Universitas Hasanuddin (lulus 2026), komitmen saya adalah terus mengembangkan solusi inovatif yang menggabungkan GIS dan Kecerdasan Buatan.",
        skills_heading: "<span>Keahlian</span> Saya",
        skills_cat1: "WebGIS & Data Spasial",
        skills_item1: "Pengembangan WebGIS (Flask, Leaflet, Folium)",
        skills_item2: "Analisis & Pemodelan Data Spasial",
        skills_item3: "Interpolasi, Overlay, Buffer, Analisis Raster",
        skills_item4: "Analisis Kecocokan Lahan & Machine Learning Spasial",
        skills_cat2: "Perangkat Lunak & AI",
        skills_item5: "Pemrograman Python untuk GIS",
        skills_item6: "Integrasi Chatbot AI (RAG, n8n, Supabase)",
        skills_item7: "Manajemen Database (PostgreSQL/PostGIS, MySQL)",
        skills_item8: "Pengembangan UI/UX untuk Aplikasi GIS",
        exp_heading: "<span>Pengalaman</span> Saya",
        exp_date1: "2025 - Sekarang",
        exp_title1: "Junior Web Developer",
        exp_desc1: "• Mengembangkan platform WebGIS: GeoAI Barru, Geopangansidrap, dan Sijagung.<br>• Menerapkan fitur chatbot AI via n8n dan Supabase untuk interaktivitas pengguna.<br>• Manajemen data spasial dengan PostgreSQL/PostGIS dan MySQL.<br>• Meningkatkan UI/UX aplikasi GIS menggunakan Leaflet dan Folium.",
        exp_title2: "Intern",
        exp_desc2: "• Membuat peta distribusi spasial Saluran Udara Tegangan Tinggi (SUTT) di Kota Makassar.<br>• Membuat peta kerentanan tanah longsor untuk tiap lokasi SUTT.",
        exp_title3: "Surveyor Lapangan",
        exp_subtitle3: "Proyek OPLAH, Kab. Sidrap",
        exp_desc3: "• Melakukan survei lapangan untuk memetakan kelompok tani (POKTAN) menggunakan teknik pengumpulan data geospasial.<br>• Mengumpulkan dan memvalidasi data spasial dan atribut untuk setiap wilayah.",
        proj_heading: "Proyek <span>Terbaru</span>",
        proj_desc1: "Platform geospasial yang dilengkapi dengan lapisan analisis AI dan elemen peta interaktif.",
        proj_desc2: "Platform WebGIS untuk pemetaan pertanian dan analisis ketahanan pangan.",
        proj_desc3: "WebGIS pertanian yang dirancang untuk melacak dan memonitor produksi jagung.",
        proj_desc4: "Aplikasi manajemen bengkel dengan peran Admin/Mekanik, sistem kasir (POS), dan manajemen inventaris.",
        proj_desc5: "Integrasi API Groq, n8n, dan Supabase vector database untuk kueri data spasial yang cerdas.",
        proj_desc6: "WebGIS analisis kesesuaian lahan budidaya tanaman semangka di Kab. Barru, dilengkapi fitur AI Chatbot untuk analisis dan pemantauan lahan.",
        contact_heading: "Hubungi <span>Saya!</span>",
        contact_phone: "Telepon",
        contact_location: "Lokasi",
        footer_text: "Hak Cipta &copy; 2026 oleh Herfiadi Reski Alviansyah | Hak Cipta Dilindungi Undang-undang.",
        typed_strings: ['Mahasiswa Geofisika', 'Pengembang WebGIS', 'Arsitek Solusi AI', 'Analis Data Spasial']
    },
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_skills: "Skills",
        nav_experience: "Experience",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_hello: "Hello, I'm",
        hero_im: "And I'm a",
        hero_desc: "I am a Geophysics undergraduate with a strong interest in Geoinformatics, WebGIS development, and Artificial Intelligence integration. I'm passionate about building scalable spatial data solutions.",
        btn_cv: "Download CV",
        btn_contact: "Contact Me",
        about_heading: "About <span>Me</span>",
        about_subheading: "Geophysics Undergraduate & WebGIS Enthusiast",
        about_desc: "I have experience in designing and developing WebGIS platforms equipped with AI-based chatbots for various use cases. I am proficient in utilizing modern GIS technologies for processing and presenting spatial data. With a Bachelor of Geophysics (S.Si) from Hasanuddin University (expected 2026), my commitment lies in continuously developing innovative solutions at the intersection of GIS and Artificial Intelligence.",
        skills_heading: "My <span>Skills</span>",
        skills_cat1: "WebGIS & Spatial Data",
        skills_item1: "WebGIS Development (Flask, Leaflet, Folium)",
        skills_item2: "Spatial Data Analysis & Modeling",
        skills_item3: "Interpolation, Overlay, Buffer, Raster Analysis",
        skills_item4: "Suitability Analysis & Geospatial Machine Learning",
        skills_cat2: "Software & AI",
        skills_item5: "Python Programming for GIS",
        skills_item6: "AI Chatbot Integration (RAG, n8n, Supabase)",
        skills_item7: "Database Management (PostgreSQL/PostGIS, MySQL)",
        skills_item8: "UI/UX Development for GIS Applications",
        exp_heading: "My <span>Experience</span>",
        exp_date1: "2025 - Present",
        exp_title1: "Junior Web Developer",
        exp_desc1: "• Developed WebGIS platforms: GeoAI Barru, Geopangansidrap, and Sijagung.<br>• Implemented AI chatbot features via n8n and Supabase to enhance interactivity.<br>• Managed spatial data with PostgreSQL/PostGIS and MySQL.<br>• Improved UI/UX for GIS applications using Leaflet and Folium.",
        exp_title2: "Intern",
        exp_desc2: "• Developed a spatial distribution map of High-Voltage Transmission Towers (SUTT) in Makassar City.<br>• Created a landslide susceptibility map for each SUTT location.",
        exp_title3: "Field Surveyor",
        exp_subtitle3: "OPLAH Project, Kabupaten Sidrap",
        exp_desc3: "• Conducted field surveys mapping agricultural farmer groups (POKTAN) using geospatial data collecting techniques.<br>• Collected and validated spatial and attribute data for mapped areas.",
        proj_heading: "Latest <span>Projects</span>",
        proj_desc1: "Geospatial platform featuring an AI analysis layer and interactive map elements.",
        proj_desc2: "WebGIS platform for agricultural mapping and food security analysis.",
        proj_desc3: "Agricultural WebGIS tailored for tracking and monitoring corn production.",
        proj_desc4: "Workshop management web application with Admin/Mechanic roles, POS workflow, and inventory management.",
        proj_desc5: "Integration of Groq API, n8n, and Supabase vector database for intelligent spatial data queries.",
        proj_desc6: "WebGIS for watermelon cultivation suitability analysis in Barru Regency, equipped with an AI Chatbot for agricultural monitoring and analysis.",
        contact_heading: "Contact <span>Me!</span>",
        contact_phone: "Phone",
        contact_location: "Location",
        footer_text: "Copyright &copy; 2026 by Herfiadi Reski Alviansyah | All Rights Reserved.",
        typed_strings: ['Geophysics Undergraduate', 'WebGIS Developer', 'AI Solutions Architect', 'Spatial Data Analyst']
    },
    jp: {
        nav_home: "ホーム",
        nav_about: "私について",
        nav_skills: "スキル",
        nav_experience: "経歴",
        nav_projects: "プロジェクト",
        nav_contact: "連絡先",
        hero_hello: "こんにちは、私の名前は",
        hero_im: "私は",
        hero_desc: "私は地球物理学を専攻する学部生で、地球情報学、WebGIS開発、人工知能の統合に強い関心を持っています。効率的な空間データソリューションの構築に情熱を注いでいます。",
        btn_cv: "経歴書をダウンロード",
        btn_contact: "お問い合わせ",
        about_heading: "私に<span>ついて</span>",
        about_subheading: "地球物理学専攻 & WebGISエンジニア",
        about_desc: "私は様々な用途に応じたAIチャットボットを備えたWebGISプラットフォームの設計および開発の経験があります。空間データの処理と提示のための最新のGIS技術の活用に熟練しています。ハサヌディン大学（2026年卒業予定）での地球物理学（S.Si）の学位を背景に、GISと人工知能の交差点で革新的なソリューションを開発し続けることに取り組んでいます。",
        skills_heading: "私の<span>スキル</span>",
        skills_cat1: "WebGIS & 空間データ",
        skills_item1: "WebGIS開発 (Flask, Leaflet, Folium)",
        skills_item2: "空間データ分析およびモデリング",
        skills_item3: "内挿、オーバーレイ、バッファ、ラスター解析",
        skills_item4: "適性分析および地理空間機械学習",
        skills_cat2: "ソフトウェア & AI",
        skills_item5: "GIS用Pythonプログラミング",
        skills_item6: "AIチャットボット統合 (RAG, n8n, Supabase)",
        skills_item7: "データベース管理 (PostgreSQL/PostGIS, MySQL)",
        skills_item8: "GISアプリケーションのUI/UX開発",
        exp_heading: "私の<span>経歴</span>",
        exp_date1: "2025年 - 現在",
        exp_title1: "ジュニアWeb開発者",
        exp_desc1: "• WebGISプラットフォーム「GeoAI Barru」「Geopangansidrap」「Sijagung」の開発。<br>• ユーザー対話性を向上させるためのn8nおよびSupabaseを介したAIチャットボット機能の実装。<br>• PostgreSQL/PostGISとMySQLを使用した空間データの管理。<br>• LeafletとFoliumを使用したGISアプリケーションのUI/UXの改善。",
        exp_title2: "インターン",
        exp_desc2: "• マカッサル市における高圧送電塔（SUTT）の空間分布図の作成。<br>• 各SUTT地点の地滑り感受性マップの作成。",
        exp_title3: "フィールドサーベイヤー",
        exp_subtitle3: "OPLAHプロジェクト（シドラップ県）",
        exp_desc3: "• 地理空間データ収集技術を使用した農業農家グループ（POKTAN）のマッピングのための現地調査。<br>• マッピングされた各領域の空間および属性データの収集と検証。",
        proj_heading: "最新の<span>プロジェクト</span>",
        proj_desc1: "AI分析レイヤーとインタラクティブなマップ要素を備えた地理空間プラットフォーム。",
        proj_desc2: "農業マッピングと食料安全保障分析のためのWebGISプラットフォーム。",
        proj_desc3: "トウモロコシ生産の追跡と監視に特化した農業WebGIS。",
        proj_desc4: "管理者/メカニックの役割、POSワークフロー、在庫管理を備えたワークショップ管理Webアプリケーション。",
        proj_desc5: "高度な空間データクエリ用のGroq API、n8n、およびSupabaseベクターデータベースの統合。",
        proj_desc6: "バル県のスイカ栽培適性分析用WebGIS。農地監視と分析を支援するAIチャットボット機能を搭載。",
        contact_heading: "お問い合わせ",
        contact_phone: "電話番号",
        contact_location: "場所",
        footer_text: "Copyright &copy; 2026 by Herfiadi Reski Alviansyah | 全著作権所有.",
        typed_strings: ['地球物理学の学生', 'WebGIS 開発者', 'AI ソリューションアーキテクト', '空間データ アナリスト']
    }
};

let typedInstance = null;

// --- Language Switcher Logic ---
function updateLanguage(lang) {
    const data = translations[lang];
    if (!data) return;

    // Update all static text with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) {
            el.innerHTML = data[key];
        }
    });

    // Update Typed.js dynamically
    if (typedInstance) {
        typedInstance.destroy();
    }
    typedInstance = new Typed('.multiple-text', {
        strings: data.typed_strings,
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 1000,
        loop: true
    });

    // Save language preference
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;
}

const langSwitch = document.getElementById('lang-switch');
langSwitch.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

// --- Theme Toggle Logic ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function updateTheme(isLight) {
    if (isLight) {
        body.classList.add('light-mode');
        themeToggle.classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('portfolio_theme', 'light');
    } else {
        body.classList.remove('light-mode');
        themeToggle.classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('portfolio_theme', 'dark');
    }
}

themeToggle.addEventListener('click', () => {
    const isLightMode = !body.classList.contains('light-mode');
    updateTheme(isLightMode);
});

// --- Initialization ---
// Initialize Theme (Default: Dark unless specified in localStorage)
const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
updateTheme(savedTheme === 'light');

// Initialize Language (Default: ID unless specified in localStorage)
const savedLang = localStorage.getItem('portfolio_lang') || 'id';
langSwitch.value = savedLang;
updateLanguage(savedLang);

// --- Navigation & Animate on Scroll UI ---
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});
