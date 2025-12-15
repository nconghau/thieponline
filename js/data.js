// Mock Data for Templates
// Using curated Unsplash images specific to VIETNAMESE culture (Ao Dai, Tet, Hoi An, etc.)
const templates = [
    // Wedding (Thiệp cưới)
    {
        id: 'tpl-wed-01',
        title: 'Thanh Xuân Của Ta',
        category: 'wedding',
        image: 'https://images.pexels.com/photos/32774014/pexels-photo-32774014.jpeg', // Couple in Traditional Ao Dai (Red/Gold)
        previewColor: '#9F1239', // Dark Red
        demoUrl: '#'
    },
    {
        id: 'tpl-wed-02',
        title: 'Chung Tuyến Đường',
        category: 'wedding',
        image: 'https://images.pexels.com/photos/19476300/pexels-photo-19476300.jpeg', // Outdoor Wedding in Vietnam
        previewColor: '#2D2833',
        demoUrl: '#'
    },
    {
        id: 'tpl-wed-03',
        title: 'Hạnh Phúc Trọn Vẹn',
        category: 'wedding',
        image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop', // Bridal details (Universal but elegant)
        previewColor: '#1F1B24',
        demoUrl: '#'
    },
    {
        id: 'tpl-wed-04',
        title: 'Một Nhà',
        category: 'wedding',
        image: 'https://images.pexels.com/photos/3675699/pexels-photo-3675699.jpeg', // Couple holding hands
        previewColor: '#000000',
        demoUrl: '#'
    },

    // Birthday (Thiệp sinh nhật)
    {
        id: 'tpl-bday-01',
        title: 'Tuổi Mới Rực Rỡ',
        category: 'birthday',
        image: 'https://images.pexels.com/photos/3831786/pexels-photo-3831786.jpeg', // Asian girl portrait with flowers/mood
        previewColor: '#1F1B24',
        demoUrl: '#'
    },
    {
        id: 'tpl-bday-02',
        title: 'Tiệc Vui Bất Tận',
        category: 'birthday',
        image: 'https://images.pexels.com/photos/4684265/pexels-photo-4684265.jpeg', // Group party cheering
        previewColor: '#2D2833',
        demoUrl: '#'
    },
    {
        id: 'tpl-bday-03',
        title: 'Sweet 18',
        category: 'birthday',
        image: 'https://images.pexels.com/photos/7099979/pexels-photo-7099979.jpeg', // Asian girl with cake
        previewColor: '#1F1B24',
        demoUrl: '#'
    },

    // Graduation (Thiệp tốt nghiệp)
    {
        id: 'tpl-grad-01',
        title: 'Ngày Ra Trường',
        category: 'graduation',
        image: 'https://images.pexels.com/photos/22691387/pexels-photo-22691387.png', // Asian Graduates Group
        previewColor: '#2D2833',
        demoUrl: '#'
    },
    {
        id: 'tpl-grad-02',
        title: 'Thời Đại Học',
        category: 'graduation',
        image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg', // Vietnamese Students in Uniform/Ao Dai
        previewColor: '#1F1B24',
        demoUrl: '#'
    },

    // Event (Sự kiện)
    {
        id: 'tpl-evt-01',
        title: 'Hội Nghị Khách Hàng',
        category: 'event',
        image: 'https://images.pexels.com/photos/19905203/pexels-photo-19905203.jpeg', // Corporate handshake
        previewColor: '#1F1B24',
        demoUrl: '#'
    },
    {
        id: 'tpl-evt-02',
        title: 'Tất Niên Sum Vầy',
        category: 'event',
        image: 'https://images.pexels.com/photos/25949481/pexels-photo-25949481.jpeg', // Partying/Cheers (Beer/Wine)
        previewColor: '#2D2833',
        demoUrl: '#'
    },

    // Anniversary (Kỷ niệm)
    {
        id: 'tpl-ani-01',
        title: 'Đà Lạt cùng nhau',
        category: 'anniversary',
        image: 'https://images.pexels.com/photos/3571331/pexels-photo-3571331.jpeg', // Couple in Hoi An/Da Lat style setting
        previewColor: '#1F1B24',
        demoUrl: '#'
    },
    {
        id: 'tpl-ani-02',
        title: 'Mãi Mãi Một Tình Yêu',
        category: 'anniversary',
        image: 'https://images.pexels.com/photos/1024984/pexels-photo-1024984.jpeg', // Couple Hug
        previewColor: '#000000',
        demoUrl: '#'
    },

    // Wishes (Lời chúc -> Vietnamese Holiday Themes)
    {
        id: 'tpl-wish-01',
        title: 'Xuân Như Ý',
        category: 'wishes',
        image: 'https://images.pexels.com/photos/19941549/pexels-photo-19941549.jpeg', // Girl in Ao Dai with Flowers (Tet)
        previewColor: '#9F1239',
        demoUrl: '#'
    },
    {
        id: 'tpl-wish-02',
        title: 'Giáng Sinh An Lành',
        category: 'wishes',
        image: 'https://images.pexels.com/photos/19149264/pexels-photo-19149264.jpeg', // Family/Group at Christmas
        previewColor: '#2D2833',
        demoUrl: '#'
    },

    // Other (Khác)
    {
        id: 'tpl-other-01',
        title: 'Ký Ức Đáng Nhớ',
        category: 'other',
        image: 'https://images.pexels.com/photos/1812527/pexels-photo-1812527.jpeg', // Cinematic Silhouette
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
