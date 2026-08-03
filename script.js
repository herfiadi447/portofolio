// --- Translations Dictionary ---
const translations = {
    id: {
        nav_home: "Beranda",
        nav_about: "Tentang",
        nav_skills: "Keahlian",
        nav_experience: "Pengalaman",
        nav_projects: "Proyek",
        nav_awards: "Prestasi",
        nav_contact: "Kontak",
        hero_hello: "Halo, Saya",
        hero_im: "Dan saya seorang",
        hero_desc: "Saya seorang Sarjana Geofisika (S.Si) dengan minat kuat di bidang Geoinformatika, pengembangan WebGIS, dan integrasi Artificial Intelligence. Saya berdedikasi membangun solusi data spasial yang efisien.",
        btn_cv: "Unduh CV",
        btn_projects: "Lihat Proyek",
        about_heading: "◉ DATASET_01: PROFIL",
        about_desc: "Saya memiliki pengalaman dalam merancang dan mengembangkan platform WebGIS yang dilengkapi chatbot berbasis AI untuk berbagai kebutuhan. Saya mahir menggunakan teknologi GIS modern untuk pemrosesan dan presentasi data spasial. Sebagai lulusan Geofisika (S.Si) dari Universitas Hasanuddin dengan GPA 3.81, komitmen saya adalah terus mengembangkan solusi inovatif yang menggabungkan GIS dan Kecerdasan Buatan.",
        about_edu_title: "PENDIDIKAN",
        about_edu_val: "Geofisika",
        about_edu_inst: "Universitas Hasanuddin",
        about_loc_title: "DOMISILI",
        about_loc_val: "Makassar, Indonesia",
        about_loc_tz: "Waktu Indonesia Tengah",
        skills_heading: "◉ LEGEND: KEAHLIAN",
        skills_cat1: "WebGIS & Data Spasial",
        skills_item1: "Perangkat Lunak GIS: ArcMap/ArcGIS, QGIS",
        skills_item2: "Pengembangan WebGIS (Flask, Leaflet, Folium)",
        skills_item3: "Analisis Spasial: Overlay, Buffer, Interpolasi, Analisis Raster, Terrain Analysis, Suitability Analysis",
        skills_item4: "Geospatial Machine Learning untuk Pemodelan Kesesuaian Lahan",
        skills_cat2: "Perangkat Lunak & AI",
        skills_item5: "Pemrograman Python untuk GIS (GeoPandas, Rasterio, GDAL, PyGMT)",
        skills_item6: "Integrasi Chatbot AI (RAG, n8n, Supabase)",
        skills_item7: "Manajemen Database (PostgreSQL/PostGIS, MySQL)",
        skills_item8: "Pengembangan UI/UX untuk Aplikasi GIS",
        skills_cat3: "Bahasa",
        skills_item9: "Bahasa Indonesia — Penutur Asli (Native)",
        skills_item10: "Bahasa Inggris — Upper-Intermediate (CEFR, EF SET)",
        exp_heading: "◉ TIMELINE: PENGALAMAN",
        exp_date1: "2025",
        exp_title1: "Junior Web Developer",
        exp_desc1: "• Mengembangkan platform WebGIS: GeoAI Barru, Geopangansidrap, dan Sijagung.<br>• Menerapkan fitur chatbot AI via n8n dan Supabase untuk interaktivitas pengguna.<br>• Manajemen data spasial dengan PostgreSQL/PostGIS dan MySQL.<br>• Meningkatkan UI/UX aplikasi GIS menggunakan Leaflet dan Folium.",
        exp_date2: "2025",
        exp_title2: "GIS Transmission Planning Intern",
        exp_subtitle2: "UPT PLN Makassar",
        exp_desc2: "• Membuat peta distribusi spasial Saluran Udara Tegangan Tinggi (SUTT) di Kota Makassar.<br>• Membuat peta kerentanan tanah longsor untuk tiap lokasi SUTT.",
        exp_date3: "2025",
        exp_title3: "Surveyor Lapangan",
        exp_subtitle3: "Hasanuddin University – LPPM Witaris",
        exp_desc3: "• Melakukan survei lapangan untuk memetakan kelompok tani (POKTAN) menggunakan teknik pengumpulan data geospasial.<br>• Mengumpulkan dan memvalidasi data spasial dan atribut untuk setiap wilayah yang dipetakan.",
        exp_date4: "2024",
        exp_title4: "Data Entry Intern",
        exp_subtitle4: "Kedaireka MBKM, Kabupaten Barru",
        exp_desc4: "• Berkolaborasi dengan Pemerintah Kabupaten Barru dalam program Kedaireka MBKM untuk mengembangkan platform WebGIS analisis kesesuaian lahan pertanian.<br>• Membantu membangun sistem WebGIS interaktif untuk mendukung pemangku kepentingan lokal dalam efisiensi sumber daya pertanian dan pengambilan keputusan tata guna lahan.<br>• Berkontribusi dalam entry, organisasi, dan verifikasi data spasial dan atribut di dalam platform.",
        proj_heading: "◉ LAYERS: PROYEK TERBARU",
        proj_desc1: "Platform geospasial yang dilengkapi dengan lapisan analisis AI dan elemen peta interaktif.",
        proj_desc2: "Platform WebGIS untuk pemetaan pertanian dan analisis ketahanan pangan.",
        proj_desc3: "WebGIS pertanian yang dirancang untuk melacak dan memonitor produksi jagung.",
        proj_desc4: "Aplikasi manajemen bengkel dengan peran Admin/Mekanik, sistem kasir (POS), dan manajemen inventaris.",
        proj_desc5: "Integrasi API Groq, n8n, dan Supabase vector database untuk kueri data spasial yang cerdas.",
        proj_desc6: "WebGIS analisis kesesuaian lahan budidaya tanaman semangka di Kab. Barru, dilengkapi fitur AI Chatbot untuk analisis dan pemantauan lahan.",
        awards_heading: "Penghargaan & Prestasi",
        award_title1: "Gold Prize – ACRS 2025 (Asian Association on Remote Sensing)",
        award_desc1: "Diberikan untuk proyek \"WebGIS-Based GeoAI Application for Agricultural Land Governance in Barru Regency, South Sulawesi, Indonesia\" yang dipresentasikan pada 44th Asian Conference on Remote Sensing (ACRS 2025).",
        contact_heading: "Hubungi Saya!",
        contact_sub: "Silakan hubungi saya melalui saluran komunikasi di bawah ini.",
        footer_text: "© 2026 GEOPHYSICS_LAB. Hak Cipta Dilindungi Undang-undang.",
        typed_strings: ['Sarjana Geofisika', 'Pengembang WebGIS', 'Arsitek Solusi AI', 'Analis Data Spasial'],
        chat_welcome: "<span class='text-secondary font-bold'>[SYS]:</span> Terminal siap. Ada yang bisa saya bantu terkait keahlian, proyek, atau pengalaman Herfiadi?",
        chat_suggest_1: "Apa saja proyek WebGIS Herfiadi?",
        chat_suggest_2: "Bagaimana latar belakang pendidikannya?",
        chat_suggest_3: "Bagaimana cara menghubungi Herfiadi?",
        chat_placeholder: "Kirim query...",
        side_home: "Home Base",
        side_about: "Dataset: Profil",
        side_skills: "Legend: Keahlian",
        side_experience: "Timeline: Pengalaman",
        side_projects: "Layers: Proyek",
        side_awards: "Prestasi",
        side_contact: "Hubungi",
        side_send: "KIRIM PESAN",
        side_linkedin: "LinkedIn",
        side_github: "GitHub"
    },
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_skills: "Skills",
        nav_experience: "Experience",
        nav_projects: "Projects",
        nav_awards: "Achievements",
        nav_contact: "Contact",
        hero_hello: "Hello, I'm",
        hero_im: "And I'm a",
        hero_desc: "I hold a Bachelor's degree (S.Si) in Geophysics with a strong interest in Geoinformatics, WebGIS development, and Artificial Intelligence integration. I'm passionate about building scalable spatial data solutions.",
        btn_cv: "Download CV",
        btn_projects: "View Projects",
        about_heading: "◉ DATASET_01: PROFILE",
        about_desc: "I have experience in designing and developing WebGIS platforms equipped with AI-based chatbots for various use cases. I am proficient in utilizing modern GIS technologies for processing and presenting spatial data. As a Geophysics graduate (S.Si) from Hasanuddin University with a GPA of 3.81, my commitment lies in continuously developing innovative solutions at the intersection of GIS and Artificial Intelligence.",
        about_edu_title: "EDUCATION",
        about_edu_val: "Geophysics",
        about_edu_inst: "Hasanuddin University",
        about_loc_title: "LOCATION",
        about_loc_val: "Makassar, Indonesia",
        about_loc_tz: "Central Indonesia Time",
        skills_heading: "◉ LEGEND: SKILLS",
        skills_cat1: "WebGIS & Spatial Data",
        skills_item1: "GIS Software: ArcMap/ArcGIS, QGIS",
        skills_item2: "WebGIS Development (Flask, Leaflet, Folium)",
        skills_item3: "Spatial Analysis: Overlay, Buffer, Interpolation, Raster Analysis, Terrain Analysis, Suitability Analysis",
        skills_item4: "Geospatial Machine Learning for Land Suitability Modeling",
        skills_cat2: "Software & AI",
        skills_item5: "Python Programming for GIS (GeoPandas, Rasterio, GDAL, PyGMT)",
        skills_item6: "AI Chatbot Integration (RAG, n8n, Supabase)",
        skills_item7: "Database Management (PostgreSQL/PostGIS, MySQL)",
        skills_item8: "UI/UX Development for GIS Applications",
        skills_cat3: "Languages",
        skills_item9: "Indonesian — Native",
        skills_item10: "English — Upper-Intermediate (CEFR, EF SET)",
        exp_heading: "◉ TIMELINE: EXPERIENCE",
        exp_date1: "2025",
        exp_title1: "Junior Web Developer",
        exp_desc1: "• Developed WebGIS platforms: GeoAI Barru, Geopangansidrap, and Sijagung.<br>• Implemented AI chatbot features via n8n and Supabase to enhance interactivity.<br>• Managed spatial data with PostgreSQL/PostGIS and MySQL.<br>• Improved UI/UX for GIS applications using Leaflet and Folium.",
        exp_date2: "2025",
        exp_title2: "GIS Transmission Planning Intern",
        exp_subtitle2: "UPT PLN Makassar",
        exp_desc2: "• Developed a spatial distribution map of High-Voltage Transmission Towers (SUTT) in Makassar City.<br>• Created a landslide susceptibility map for each SUTT location.",
        exp_date3: "2025",
        exp_title3: "Field Surveyor",
        exp_subtitle3: "Hasanuddin University – LPPM Witaris",
        exp_desc3: "• Conducted field surveys to map agricultural farmer groups (POKTAN) using geospatial data collection techniques.<br>• Collected and validated spatial and attribute data for each mapped area.",
        exp_date4: "2024",
        exp_title4: "Data Entry Intern",
        exp_subtitle4: "Kedaireka MBKM, Kabupaten Barru",
        exp_desc4: "• Collaborated with the Barru Regency Government under the Kedaireka MBKM program to develop a WebGIS platform for agricultural land suitability analysis.<br>• Assisted in building an interactive WebGIS system to support local stakeholders in agricultural resource efficiency and land-use decision-making.<br>• Contributed to spatial and attribute data entry, organization, and verification within the platform.",
        proj_heading: "◉ LAYERS: LATEST PROJECTS",
        proj_desc1: "Geospatial platform featuring an AI analysis layer and interactive map elements.",
        proj_desc2: "WebGIS platform for agricultural mapping and food security analysis.",
        proj_desc3: "Agricultural WebGIS tailored for tracking and monitoring corn production.",
        proj_desc4: "Workshop management web application with Admin/Mechanic roles, POS workflow, and inventory management.",
        proj_desc5: "Integration of Groq API, n8n, and Supabase vector database for intelligent spatial data queries.",
        proj_desc6: "WebGIS for watermelon cultivation suitability analysis in Barru Regency, equipped with an AI Chatbot for agricultural monitoring and analysis.",
        awards_heading: "Awards & Achievements",
        award_title1: "Gold Prize – ACRS 2025 (Asian Association on Remote Sensing)",
        award_desc1: "Awarded for the project \"WebGIS-Based GeoAI Application for Agricultural Land Governance in Barru Regency, South Sulawesi, Indonesia\" presented at the 44th Asian Conference on Remote Sensing (ACRS 2025).",
        contact_heading: "Contact Me!",
        contact_sub: "Please feel free to contact me through the communication channels below.",
        footer_text: "© 2026 GEOPHYSICS_LAB. All Rights Reserved.",
        typed_strings: ['Geophysics Graduate', 'WebGIS Developer', 'AI Solutions Architect', 'Spatial Data Analyst'],
        chat_welcome: "<span class='text-secondary font-bold'>[SYS]:</span> Terminal ready. How can I assist with your spatial data exploration?",
        chat_suggest_1: "What WebGIS projects has Herfiadi built?",
        chat_suggest_2: "What is his educational background?",
        chat_suggest_3: "How can I contact Herfiadi?",
        chat_placeholder: "Enter query...",
        side_home: "Home Base",
        side_about: "Dataset: Profile",
        side_skills: "Legend: Skills",
        side_experience: "Timeline: Experience",
        side_projects: "Layers: Projects",
        side_awards: "Achievements",
        side_contact: "Connect",
        side_send: "SEND MESSAGE",
        side_linkedin: "LinkedIn",
        side_github: "GitHub"
    },
    jp: {
        nav_home: "ホーム",
        nav_about: "私について",
        nav_skills: "スキル",
        nav_experience: "経歴",
        nav_projects: "プロジェクト",
        nav_awards: "実績",
        nav_contact: "連絡先",
        hero_hello: "こんにちは、私の名前は",
        hero_im: "私は",
        hero_desc: "私は地球物理学の学士号（S.Si）を取得しており、地球情報学、WebGIS開発、人工知能の統合に強い関心を持っています。効率的な空間データソリューションの構築に情熱を注いでいます。",
        btn_cv: "経歴書をダウンロード",
        btn_projects: "プロジェクト表示",
        about_heading: "◉ DATASET_01: プロフィール",
        about_desc: "私は様々な用途に応じたAIチャットボットを備えたWebGISプラットフォームの設計および開発の経験があります。空間データの処理と提示のための最新のGIS技術の活用に熟練しています。ハサヌディン大学をGPA 3.81で卒業した地球物理学（S.Si）の学位を背景に、GISと人工知能の交差点で革新的なソリューションを開発し続けることに取り組んでいます。",
        about_edu_title: "学歴",
        about_edu_val: "地球物理学",
        about_edu_inst: "ハサヌディン大学",
        about_loc_title: "所在地",
        about_loc_val: "マカッサル、インドネシア",
        about_loc_tz: "中部インドネシア時間",
        skills_heading: "◉ LEGEND: スキル",
        skills_cat1: "WebGIS & 空間データ",
        skills_item1: "GISソフトウェア: ArcMap/ArcGIS, QGIS",
        skills_item2: "WebGIS開発 (Flask, Leaflet, Folium)",
        skills_item3: "空間解析: オーバーレイ、バッファ、内挿、ラスター解析、地形解析 (Terrain Analysis), 適性分析 (Suitability Analysis)",
        skills_item4: "土地適性モデリングのための地理空間機械学習",
        skills_cat2: "ソフトウェア & AI",
        skills_item5: "GIS用Pythonプログラミング (GeoPandas, Rasterio, GDAL, PyGMT)",
        skills_item6: "AIチャットボット統合 (RAG, n8n, Supabase)",
        skills_item7: "データベース管理 (PostgreSQL/PostGIS, MySQL)",
        skills_item8: "GISアプリケーションのUI/UX開発",
        skills_cat3: "言語",
        skills_item9: "インドネシア語 — 母国語 (Native)",
        skills_item10: "英語 — 中上級 (CEFR, EF SET)",
        exp_heading: "◉ TIMELINE: 経歴",
        exp_date1: "2025",
        exp_title1: "ジュニアWeb開発者",
        exp_desc1: "• WebGISプラットフォーム「GeoAI Barru」「Geopangansidrap」「Sijagung」の開発。<br>• ユーザー対話性を向上させるためのn8nおよびSupabaseを介したAIチャットボット機能の実装。<br>• PostgreSQL/PostGISとMySQLを使用した空間データの管理。<br>• LeafletとFoliumを使用したGISアプリケーションのUI/UXの改善。",
        exp_date2: "2025",
        exp_title2: "GIS送電計画インターン",
        exp_subtitle2: "UPT PLNマカッサル",
        exp_desc2: "• 各SUTT地点の地滑り感受性マップの作成。<br>• マカッサル市における高圧送電塔（SUTT）の空間分布図の作成。",
        exp_date3: "2025",
        exp_title3: "フィールドサーベイヤー",
        exp_subtitle3: "ハサヌディン大学 – LPPM Witaris",
        exp_desc3: "• 地理空間データ収集技術を使用した農業農家グループ（POKTAN）のマッピングのための現地調査。<br>• マッピングされた各領域の空間および属性データの収集と検証。",
        exp_date4: "2024",
        exp_title4: "データ入力インターン",
        exp_subtitle4: "Kedaireka MBKM、バル県",
        exp_desc4: "• 農業適地分析のためのWebGISプラットフォーム開発に向け、Kedaireka MBKMプログラムのもとでバル県政府と協働。<br>• 農業資源の効率化および土地利用の意思決定において、地域のステークホルダーを支援するインタラクティブなWebGISシステムの構築を補助。<br>• プラットフォーム内における空間および属性データの入力、整理、検証に貢献。",
        proj_heading: "◉ LAYERS: 最新のプロジェクト",
        proj_desc1: "AI分析レイヤーとインタラクティブなマップ要素を備えた地理空間プラットフォーム。",
        proj_desc2: "農業マッピングと食料安全保障分析のためのWebGISプラットフォーム。",
        proj_desc3: "トウモロコシ生産の追跡と監視に特化した農業WebGIS。",
        proj_desc4: "管理者/メカニックの役割、POSワークフロー、在庫管理を備えたワークショップ管理Webアプリケーション。",
        proj_desc5: "高度な空間データクエリ用のGroq API、n8n、およびSupabaseベクターデータベースの統合。",
        proj_desc6: "バル県のスイカ栽培適性分析用WebGIS。農地監視と分析を支援するAIチャットボット機能を搭載。",
        awards_heading: "受賞 & 実績",
        award_title1: "ゴールドプライズ（最優秀賞） – ACRS 2025 (アジア遠隔探査協会)",
        award_desc1: "第44回アジア遠隔探査会議（ACRS 2025）にて発表されたプロジェクト「WebGIS-Based GeoAI Application for Agricultural Land Governance in Barru Regency, South Sulawesi, Indonesia」に対して授与されました。",
        contact_heading: "お問い合わせ",
        contact_sub: "以下の連絡先からお気軽にお問い合わせください。",
        footer_text: "© 2026 GEOPHYSICS_LAB. All Rights Reserved.",
        typed_strings: ['地球物理学卒業生', 'WebGIS 開発者', 'AI ソリューションアーキテクト', '空間データ アナリスト'],
        chat_welcome: "<span class='text-secondary font-bold'>[SYS]:</span> ターミナル準備完了。空間データの探索をどのようにサポートできますか？",
        chat_suggest_1: "ヘルフィアディはどのようなWebGISプロジェクトを構築しましたか？",
        chat_suggest_2: "彼の学歴はどうなっていますか？",
        chat_suggest_3: "ヘルフィアディに連絡するにはどうすればいいですか？",
        chat_placeholder: "クエリを入力...",
        side_home: "ホームベース",
        side_about: "データセット: プロフィール",
        side_skills: "凡例: スキル",
        side_experience: "タイムライン: 経歴",
        side_projects: "レイヤー: プロジェクト",
        side_awards: "実績",
        side_contact: "コネクト",
        side_send: "メッセージ送信",
        side_linkedin: "LinkedIn",
        side_github: "GitHub"
    },
    zh: {
        nav_home: "首页",
        nav_about: "关于",
        nav_skills: "技能",
        nav_experience: "经历",
        nav_projects: "项目",
        nav_awards: "成就",
        nav_contact: "联系",
        hero_hello: "你好，我是",
        hero_im: "我是一名",
        hero_desc: "我持有地球物理学学士学位（S.Si），对地理信息学、WebGIS 开发及人工智能集成有浓厚兴趣。我致力于构建高效且可扩展的空间数据解决方案。",
        btn_cv: "下载简历",
        btn_projects: "查看项目",
        about_heading: "◉ 数据集_01: 个人简介",
        about_desc: "我拥有为各类需求设计和开发集成 AI 聊天机器人的 WebGIS 平台的丰富经验，熟练运用现代 GIS 技术进行空间数据的处理与可视化呈现。作为哈萨努丁大学地球物理学（S.Si）毕业生，GPA 3.81，我致力于持续探索 GIS 与人工智能交叉领域的创新解决方案。",
        about_edu_title: "教育背景",
        about_edu_val: "地球物理学",
        about_edu_inst: "哈萨努丁大学",
        about_loc_title: "所在地",
        about_loc_val: "望加锡，印度尼西亚",
        about_loc_tz: "印度尼西亚中部时间",
        skills_heading: "◉ 图例: 技能",
        skills_cat1: "WebGIS 与空间数据",
        skills_item1: "GIS 软件：ArcMap/ArcGIS、QGIS",
        skills_item2: "WebGIS 开发（Flask、Leaflet、Folium）",
        skills_item3: "空间分析：叠加分析、缓冲区、插值、栅格分析、地形分析、适宜性分析",
        skills_item4: "面向土地适宜性建模的地理空间机器学习",
        skills_cat2: "软件与人工智能",
        skills_item5: "面向 GIS 的 Python 编程（GeoPandas、Rasterio、GDAL、PyGMT）",
        skills_item6: "AI 聊天机器人集成（RAG、n8n、Supabase）",
        skills_item7: "数据库管理（PostgreSQL/PostGIS、MySQL）",
        skills_item8: "GIS 应用 UI/UX 开发",
        skills_cat3: "语言能力",
        skills_item9: "印度尼西亚语 — 母语",
        skills_item10: "英语 — 中高级（CEFR, EF SET）",
        exp_heading: "◉ 时间轴: 工作经历",
        exp_date1: "2025",
        exp_title1: "初级 Web 开发工程师",
        exp_desc1: "• 开发 WebGIS 平台：GeoAI Barru、Geopangansidrap 和 Sijagung。<br>• 通过 n8n 和 Supabase 实现 AI 聊天机器人功能，提升用户交互体验。<br>• 使用 PostgreSQL/PostGIS 和 MySQL 进行空间数据管理。<br>• 借助 Leaflet 和 Folium 优化 GIS 应用的 UI/UX。",
        exp_date2: "2025",
        exp_title2: "GIS 输电规划实习生",
        exp_subtitle2: "UPT PLN 望加锡",
        exp_desc2: "• 制作望加锡市高压输电塔（SUTT）空间分布图。<br>• 为各 SUTT 站点创建山体滑坡易发性评估地图。",
        exp_date3: "2025",
        exp_title3: "野外测量员",
        exp_subtitle3: "哈萨努丁大学 – LPPM Witaris",
        exp_desc3: "• 运用地理空间数据采集技术开展农业农户群组（POKTAN）野外调查与制图。<br>• 针对每个制图区域收集并验证空间数据与属性数据。",
        exp_date4: "2024",
        exp_title4: "数据录入实习生",
        exp_subtitle4: "Kedaireka MBKM，巴鲁县",
        exp_desc4: "• 在 Kedaireka MBKM 计划框架下与巴鲁县政府合作，开发农业用地适宜性分析 WebGIS 平台。<br>• 协助构建交互式 WebGIS 系统，支持当地利益相关方优化农业资源配置与土地利用决策。<br>• 参与平台内空间及属性数据的录入、整理与核实工作。",
        proj_heading: "◉ 图层: 最新项目",
        proj_desc1: "集成 AI 分析图层与交互式地图元素的地理空间平台。",
        proj_desc2: "用于农业制图和粮食安全分析的 WebGIS 平台。",
        proj_desc3: "专为玉米生产追踪与监测设计的农业 WebGIS。",
        proj_desc4: "具备管理员/技师角色、POS 收银工作流及库存管理功能的汽修门店管理 Web 应用。",
        proj_desc5: "集成 Groq API、n8n 和 Supabase 向量数据库，实现智能化空间数据查询。",
        proj_desc6: "巴鲁县西瓜种植适宜性分析 WebGIS，内置 AI 聊天机器人，支持农业监测与分析。",
        awards_heading: "奖项与成就",
        award_title1: "金奖 – ACRS 2025（亚洲遥感协会）",
        award_desc1: "凭借项目 \"WebGIS-Based GeoAI Application for Agricultural Land Governance in Barru Regency, South Sulawesi, Indonesia\" 在第 44 届亚洲遥感大会（ACRS 2025）上荣获金奖。",
        contact_heading: "联系我！",
        contact_sub: "欢迎通过以下渠道与我取得联系。",
        footer_text: "© 2026 GEOPHYSICS_LAB. 版权所有。",
        typed_strings: ['地球物理学毕业生', 'WebGIS 开发工程师', 'AI 解决方案架构师', '空间数据分析师'],
        chat_welcome: "<span class='text-secondary font-bold'>[SYS]:</span> 终端已就绪。请问有什么关于 Herfiadi 的技能、项目或经历想了解的吗？",
        chat_suggest_1: "Herfiadi 开发了哪些 WebGIS 项目？",
        chat_suggest_2: "他的教育背景是什么？",
        chat_suggest_3: "如何联系 Herfiadi？",
        chat_placeholder: "输入查询...",
        side_home: "首页基地",
        side_about: "数据集: 个人简介",
        side_skills: "图例: 技能",
        side_experience: "时间轴: 工作经历",
        side_projects: "图层: 最新项目",
        side_awards: "成就",
        side_contact: "联系",
        side_send: "发送消息",
        side_linkedin: "LinkedIn",
        side_github: "GitHub"
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

    // Update all placeholders with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (data[key]) {
            el.placeholder = data[key];
        }
    });

    // Update Typed.js dynamically
    if (typedInstance) {
        typedInstance.destroy();
    }
    
    // Safety check for typing animation element
    if (document.querySelector('.multiple-text')) {
        typedInstance = new Typed('.multiple-text', {
            strings: data.typed_strings,
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 1000,
            loop: true
        });
    }

    // Save language preference
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;
}

const langSwitch = document.getElementById('lang-switch');
if (langSwitch) {
    langSwitch.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });
}

// --- Theme Toggle Logic (Preserved for codebase stability, safely skipped if toggle icon is absent) ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function updateTheme(isLight) {
    if (isLight) {
        body.classList.add('light-mode');
        if (themeToggle) themeToggle.classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('portfolio_theme', 'light');
    } else {
        body.classList.remove('light-mode');
        if (themeToggle) themeToggle.classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('portfolio_theme', 'dark');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLightMode = !body.classList.contains('light-mode');
        updateTheme(isLightMode);
    });
}

// Initialize Theme (Default: Light for Technical Cartography design style)
const savedTheme = localStorage.getItem('portfolio_theme') || 'light';
updateTheme(savedTheme === 'light');

// Initialize Language (Default: ID unless specified in localStorage)
const savedLang = localStorage.getItem('portfolio_lang') || 'id';
if (langSwitch) {
    langSwitch.value = savedLang;
}
updateLanguage(savedLang);

// --- Navigation & Animate on Scroll UI ---
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('nav a');

// --- Reusable Smooth Scroll Helper ---
function scrollToSection(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}
window.scrollToSection = scrollToSection;

// Bind smooth scroll to top navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // Update Top Navigation
            navLinks.forEach(links => {
                links.classList.remove('active');
                const linkSelector = 'nav a[href*=' + id + ']';
                const linkEl = document.querySelector(linkSelector);
                if (linkEl) {
                    linkEl.classList.add('active');
                }
            });

            // Update Sidebar Navigation
            const sidebarLinks = document.querySelectorAll('[id^="sidebar-link-"]');
            sidebarLinks.forEach(link => {
                link.classList.remove('bg-secondary/10', 'text-secondary');
                link.classList.add('text-on-surface-variant');
                if (link.getAttribute('id') === 'sidebar-link-' + id) {
                    link.classList.remove('text-on-surface-variant');
                    link.classList.add('bg-secondary/10', 'text-secondary');
                }
            });
        };
    });

    let header = document.querySelector('nav');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
    }

    if (menuIcon && navbar) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
};

// --- Chatbot Logic (Configured for Stitch's new widget IDs) ---
const chatWindow = document.getElementById('ai-chat');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const chatSuggestions = document.getElementById('chat-suggestions');

let chatHistory = [];

// Toggle Chat Window
function toggleChat() {
    if (chatWindow) {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            scrollToBottom();
        }
    }
}

// Scroll to bottom
function scrollToBottom() {
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Expose toggleChat to window so HTML onclick handlers can trigger it
window.toggleChat = toggleChat;

// Parse basic Markdown (bold, lists, links, paragraphs) into safe HTML
function parseMarkdown(text) {
    // 1. Escape HTML tags to prevent injection
    let html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // 2. Inline Code: `code` -> <code>code</code>
    html = html.replace(/`(.*?)`/g, '<code style="background: rgba(22, 35, 46, 0.05); border: 1px solid rgba(22, 35, 46, 0.1); padding: 0.1rem 0.3rem; font-family: monospace; font-size: 0.9em; color: #A6673A;">$1</code>');

    // 3. Bold: **text** -> <strong>text</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 4. Links: [text](url) -> <a href="$2" target="_blank" style="color: #A6673A; text-decoration: underline; font-weight: 600;">$1</a>
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color: #A6673A; text-decoration: underline; font-weight: 600;">$1</a>');

    // 5. Line-by-line parsing for lists and paragraphs
    const lines = html.split('\n');
    let inBulletList = false;
    let inNumList = false;
    let result = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        
        // Match bullet list (* or -)
        const bulletMatch = line.match(/^[\*\-]\s+(.*)$/);
        // Match numbered list (1., 2., etc.)
        const numListMatch = line.match(/^(\d+)\.\s+(.*)$/);

        if (bulletMatch) {
            if (inNumList) {
                result.push('</ol>');
                inNumList = false;
            }
            if (!inBulletList) {
                result.push('<ul style="margin-left: 1.5rem; margin-top: 0.3rem; margin-bottom: 0.3rem; list-style-type: disc;">');
                inBulletList = true;
            }
            result.push(`<li style="margin-bottom: 0.3rem; line-height: 1.4;">${bulletMatch[1]}</li>`);
        } else if (numListMatch) {
            if (inBulletList) {
                result.push('</ul>');
                inBulletList = false;
            }
            if (!inNumList) {
                result.push('<ol style="margin-left: 1.5rem; margin-top: 0.3rem; margin-bottom: 0.3rem; list-style-type: decimal;">');
                inNumList = true;
            }
            result.push(`<li style="margin-bottom: 0.3rem; line-height: 1.4;">${numListMatch[2]}</li>`);
        } else {
            if (inBulletList) {
                result.push('</ul>');
                inBulletList = false;
            }
            if (inNumList) {
                result.push('</ol>');
                inNumList = false;
            }
            
            if (line === '') {
                result.push('<div style="height: 0.6rem;"></div>');
            } else {
                result.push(`<p style="margin-bottom: 0.4rem; line-height: 1.4;">${line}</p>`);
            }
        }
    }

    if (inBulletList) result.push('</ul>');
    if (inNumList) result.push('</ol>');

    return result.join('');
}

// Append message
function appendMessage(sender, text) {
    if (!chatMessages) return;
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`, 'self-start', 'max-w-[85%]', 'p-2', 'border', 'font-label-data', 'text-xs');
    
    if (sender === 'bot') {
        messageDiv.classList.add('bg-[#16232e]/5', 'border-outline/10');
        messageDiv.innerHTML = parseMarkdown(text);
    } else {
        messageDiv.classList.replace('self-start', 'self-end');
        messageDiv.classList.add('bg-[#A6673A]/10', 'border-[#A6673A]/35', 'text-secondary');
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        messageDiv.appendChild(paragraph);
    }
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Show Typing Indicator
function showTypingIndicator() {
    if (!chatMessages) return;
    const indicatorDiv = document.createElement('div');
    indicatorDiv.classList.add('message', 'bot-message', 'typing-indicator-container', 'self-start', 'bg-[#16232e]/5', 'border', 'border-outline/10', 'p-2');
    indicatorDiv.id = 'typing-indicator';
    
    indicatorDiv.innerHTML = `
        <div style="display: flex; gap: 4px; padding: 4px 8px;">
            <div style="width: 6px; height: 6px; background-color: #A6673A; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both;"></div>
            <div style="width: 6px; height: 6px; background-color: #A6673A; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; animation-delay: 0.2s;"></div>
            <div style="width: 6px; height: 6px; background-color: #A6673A; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; animation-delay: 0.4s;"></div>
        </div>
        <style>
            @keyframes bounce {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1.0); }
            }
        </style>
    `;
    chatMessages.appendChild(indicatorDiv);
    scrollToBottom();
}

// Remove Typing Indicator
function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Send message to serverless API
async function sendMessage(text) {
    if (!text.trim()) return;

    // Append user message
    appendMessage('user', text);
    if (chatInput) chatInput.value = '';
    
    // Hide suggestions after the first message
    if (chatSuggestions) chatSuggestions.style.display = 'none';

    // Show typing indicator
    showTypingIndicator();

    try {
        const activeLang = document.documentElement.lang || 'id';
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: text,
                history: chatHistory,
                language: activeLang
            })
        });

        removeTypingIndicator();

        if (!response.ok) {
            let errorMessage = 'Gagal terhubung ke asisten AI';
            try {
                const errorData = await response.json();
                if (errorData && errorData.error) {
                    errorMessage = errorData.error;
                }
            } catch (e) {}
            throw new Error(errorMessage);
        }

        const data = await response.json();
        
        // Append bot reply
        appendMessage('bot', data.reply);

        // Update history
        chatHistory.push({ role: 'user', content: text });
        chatHistory.push({ role: 'assistant', content: data.reply });

        // Keep history size small (last 6 messages)
        if (chatHistory.length > 12) {
            chatHistory = chatHistory.slice(-12);
        }

    } catch (error) {
        removeTypingIndicator();
        
        let displayError = 'Maaf, terjadi gangguan koneksi. Silakan coba lagi nanti atau hubungi Herfiadi secara langsung.';
        if (error.message.includes('Groq API Key is not configured')) {
            displayError = '<strong>Konfigurasi Diperlukan:</strong> Groq API Key belum dikonfigurasi di dashboard Vercel.<br><br>Silakan tambahkan environment variable <code>GROQ_API_KEY</code> di pengaturan proyek Vercel Anda, lalu lakukan redeploy.';
        } else if (error.message.includes('Groq API Error')) {
            displayError = `<strong>Groq API Error:</strong> ${error.message}`;
        }
        
        appendMessage('bot', displayError);
        console.error(error);
    }
}

// Form Submit
if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (chatInput) {
            const text = chatInput.value;
            sendMessage(text);
        }
    });
}

// Suggestions click handler
document.querySelectorAll('.suggestion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.textContent;
        sendMessage(text);
    });
});

// Technical console text effect
const logData = () => {
    const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    console.log(`[${timestamp}] GEO_SYSTEM_IDLE: Awaiting spatial input...`);
};
setInterval(logData, 10000);
logData();

// --- Lightbox Modal Logic ---
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, alt, captionText) {
    if (lightboxModal && lightboxImg && lightboxCaption) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightboxCaption.textContent = captionText || alt || "IMAGE_PREVIEW";
        lightboxModal.classList.remove('hidden');
        lightboxModal.classList.add('flex');
        document.body.style.overflow = 'hidden'; // Disable background scroll
    }
}

function closeLightbox() {
    if (lightboxModal) {
        lightboxModal.classList.remove('flex');
        lightboxModal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore background scroll
    }
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Expose openLightbox to window for inline onclick triggers
window.openLightbox = openLightbox;
