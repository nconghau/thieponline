// Mock Data for Templates
// Using local assets from cinelove.me directories
const templates = [
    {
        id: 'tpl-wed-01',
        title: 'Wedding Classic',
        category: 'wedding',
        image: 'cinelove.me/assets.cinelove.me/templates/long_thumbnail/47b0118b-1f91-4622-8061-f7002f6d5aaf.webp',
        previewColor: '#1F1B24',
        demoUrl: '#'
    },
    {
        id: 'tpl-wed-02',
        title: 'Elegant Love',
        category: 'wedding',
        image: 'cinelove.me/assets.cinelove.me/templates/long_thumbnail/5a508f27-c1b9-442f-8a28-2aaf51016367.webp',
        previewColor: '#2D2833',
        demoUrl: '#'
    },
    {
        id: 'tpl-bday-01',
        title: 'Sinh Nhật 12',
        category: 'birthday',
        image: 'cinelove.me/assets.cinelove.me/pages/featured_thumbnail/5cfab020-67dc-4f23-92c1-0b229244b00f.webp',
        previewColor: '#1F1B24',
        demoUrl: '#'
    },
    {
        id: 'tpl-bday-02',
        title: 'Space Party',
        category: 'birthday',
        image: 'cinelove.me/assets.cinelove.me/pages/featured_thumbnail/6a6b2d79-46ab-4295-813c-eb760c79b222.webp',
        previewColor: '#2D2833',
        demoUrl: '#'
    },
    {
        id: 'tpl-love-01',
        title: 'We Got Married',
        category: 'love',
        image: 'cinelove.me/assets.cinelove.me/pages/featured_thumbnail/c1d49baa-0dd0-4f5c-b9c4-52d02ffe53c0.webp',
        previewColor: '#000000',
        demoUrl: '#'
    },
    {
        id: 'tpl-love-02',
        title: 'Love Story',
        category: 'love',
        image: 'cinelove.me/assets.cinelove.me/templates/long_thumbnail/c6238e18-d92b-4eea-ba14-3fe832517e62_1762512018.webp',
        previewColor: '#1F1B24',
        demoUrl: '#'
    },
    {
        id: 'tpl-wed-03',
        title: 'Save The Date',
        category: 'wedding',
        image: 'cinelove.me/assets.cinelove.me/templates/long_thumbnail/e554cdff-72d4-4657-863a-68cf83b61fe3.webp',
        previewColor: '#1F1B24',
        demoUrl: '#'
    },
    {
        id: 'tpl-love-03',
        title: 'Cinematic Mood',
        category: 'love',
        image: 'cinelove.me/assets.cinelove.me/templates/long_thumbnail/f4b65e20983dd71aa541.webp',
        previewColor: '#2D2833',
        demoUrl: '#'
    }
];

// Mock Music List using external URLs
const musicTracks = [
    { name: "Đừng Làm Trái Tim Anh Đau - Sơn Tùng M-TP", url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/fc/af/2a/fcaf2a66-0b90-22e1-2feb-7e7c7a03fb21/mzaf_13024672062350311939.plus.aac.p.m4a" },
    { name: "Nơi Này Có Anh - Sơn Tùng M-TP", url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/f2/21/32/f2213295-7ed0-8f89-241b-65fd8b3c9bcf/mzaf_12974028685809599192.plus.aac.p.m4a" },
    { name: "Buông Đôi Tay Nhau Ra - Sơn Tùng M-TP", url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/23/f6/72/23f672bb-0595-8e9f-9f73-cda18d8fe2b9/mzaf_17417350362825732465.plus.aac.p.m4a" },
    { name: "Âm Thầm Bên Em - Sơn Tùng M-TP", url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/30/17/56/301756c9-b595-315b-7bf1-9df606bb5691/mzaf_12243219979032571872.plus.aac.p.m4a" },
    { name: "Nắng Ấm Xa Dần - Sơn Tùng M-TP", url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/d1/61/9e/d1619e03-2043-3431-53d9-a503d02083d1/mzaf_2343307954993525954.plus.aac.p.m4a" },
    { name: "Em Của Ngày Hôm Qua - Sơn Tùng M-TP", url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/7f/54/06/7f5406ed-d80f-d32e-24e3-6b22e1fbb8e6/mzaf_4230613258807290007.plus.aac.p.m4a" },
    { name: "Hãy Trao Cho Anh - Sơn Tùng M-TP (feat. Snoop Dogg)", url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/05/c0/1f/05c01ff1-22b4-ba07-632c-2d3981e65b3f/mzaf_3609042650695046593.plus.aac.p.m4a" },
    { name: "Có Chắc Yêu Là Đây - Sơn Tùng M-TP", url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/6b/33/47/6b3347f9-5f44-1113-bca6-8bfb5e817f7c/mzaf_3553385474030559880.plus.aac.p.m4a" },
    { name: "Chúng Ta Của Hiện Tại - Sơn Tùng M-TP", url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/5b/d0/fc/5bd0fc2a-dae0-c762-1041-411355cec2d2/mzaf_3081635390039473234.plus.aac.p.m4a" },
    { name: "Chúng Ta Của Tương Lai - Sơn Tùng M-TP", url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b3/68/33/b36833e0-8ace-1303-6328-2a22e0ff0ac7/mzaf_5433348825881119564.plus.aac.p.m4a" }
];
