// Mock Data for Templates
// High quality, fast CDN images tailored for Vietnamese celebrations, weddings, holidays, and milestones
const templates = [
    // Wedding (Thiệp cưới)
    {
        id: 'tpl-wed-01',
        title: 'Thanh Xuân Của Ta',
        category: 'wedding',
        layout: 'split',
        theme: 'pink',
        tags: ['cưới', 'wedding', 'áo dài', 'truyền thống', 'đỏ', 'thanh xuân'],
        image: 'https://images.pexels.com/photos/32774014/pexels-photo-32774014.jpeg',
        previewColor: '#9F1239'
    },
    {
        id: 'tpl-wed-02',
        title: 'Chung Tuyến Đường',
        category: 'wedding',
        layout: 'overlay',
        theme: 'dark',
        tags: ['cưới', 'wedding', 'ngoài trời', 'lãng mạn', 'hôn lễ'],
        image: 'https://images.pexels.com/photos/19476300/pexels-photo-19476300.jpeg',
        previewColor: '#2D2833'
    },
    {
        id: 'tpl-wed-03',
        title: 'Hạnh Phúc Trọn Vẹn',
        category: 'wedding',
        layout: 'polaroid',
        theme: 'pink',
        tags: ['cưới', 'wedding', 'váy cưới', 'hoa cưới', 'tinh khôi'],
        image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop',
        previewColor: '#1F1B24'
    },
    {
        id: 'tpl-wed-04',
        title: 'Một Nhà',
        category: 'wedding',
        layout: 'overlay',
        theme: 'yellow',
        tags: ['cưới', 'wedding', 'hoàng hôn', 'nắm tay', 'biển'],
        image: 'https://images.pexels.com/photos/3675699/pexels-photo-3675699.jpeg',
        previewColor: '#000000'
    },
    {
        id: 'tpl-wed-05',
        title: 'Duyên Định Trăm Năm',
        category: 'wedding',
        layout: 'letter',
        theme: 'yellow',
        tags: ['cưới', 'wedding', 'nhẫn cưới', 'hoa hồng', 'trăm năm'],
        image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
        previewColor: '#B45309'
    },
    {
        id: 'tpl-wed-06',
        title: 'Lễ Thành Hôn',
        category: 'wedding',
        layout: 'split',
        theme: 'pink',
        tags: ['cưới', 'wedding', 'thành hôn', 'phu thê', 'truyền thống'],
        image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg',
        previewColor: '#9F1239'
    },

    // Birthday (Thiệp sinh nhật)
    {
        id: 'tpl-bday-01',
        title: 'Tuổi Mới Rực Rỡ',
        category: 'birthday',
        layout: 'split',
        theme: 'pink',
        tags: ['sinh nhật', 'birthday', 'rực rỡ', 'hoa', 'nụ cười'],
        image: 'https://images.pexels.com/photos/3831786/pexels-photo-3831786.jpeg',
        previewColor: '#1F1B24'
    },
    {
        id: 'tpl-bday-02',
        title: 'Tiệc Vui Bất Tận',
        category: 'birthday',
        layout: 'overlay',
        theme: 'dark',
        tags: ['sinh nhật', 'birthday', 'party', 'nâng ly', 'bạn bè'],
        image: 'https://images.pexels.com/photos/4684265/pexels-photo-4684265.jpeg',
        previewColor: '#2D2833'
    },
    {
        id: 'tpl-bday-03',
        title: 'Sweet 18',
        category: 'birthday',
        layout: 'polaroid',
        theme: 'pink',
        tags: ['sinh nhật', 'birthday', 'bánh kem', 'tuổi 18', 'nến'],
        image: 'https://images.pexels.com/photos/7099979/pexels-photo-7099979.jpeg',
        previewColor: '#1F1B24'
    },
    {
        id: 'tpl-bday-04',
        title: 'Khúc Ca Tuổi Trẻ',
        category: 'birthday',
        layout: 'overlay',
        theme: 'blue',
        tags: ['sinh nhật', 'birthday', 'pháo sáng', 'bóng bay', 'party'],
        image: 'https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg',
        previewColor: '#0369A1'
    },
    {
        id: 'tpl-bday-05',
        title: 'Sinh Nhật Ngọt Ngào',
        category: 'birthday',
        layout: 'polaroid',
        theme: 'yellow',
        tags: ['sinh nhật', 'birthday', 'cupcake', 'ngọt ngào', 'ấm áp'],
        image: 'https://images.pexels.com/photos/1405528/pexels-photo-1405528.jpeg',
        previewColor: '#B45309'
    },

    // Graduation (Thiệp tốt nghiệp)
    {
        id: 'tpl-grad-01',
        title: 'Ngày Ra Trường',
        category: 'graduation',
        layout: 'split',
        theme: 'blue',
        tags: ['tốt nghiệp', 'graduation', 'ra trường', 'cử nhân', 'tung mũ'],
        image: 'https://images.pexels.com/photos/22691387/pexels-photo-22691387.png',
        previewColor: '#2D2833'
    },
    {
        id: 'tpl-grad-02',
        title: 'Thời Đại Học',
        category: 'graduation',
        layout: 'polaroid',
        theme: 'pink',
        tags: ['tốt nghiệp', 'graduation', 'sinh viên', 'áo dài', 'kỷ niệm'],
        image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
        previewColor: '#1F1B24'
    },
    {
        id: 'tpl-grad-03',
        title: 'Tân Cử Nhân',
        category: 'graduation',
        layout: 'letter',
        theme: 'blue',
        tags: ['tốt nghiệp', 'graduation', 'cử nhân', 'ước mơ', 'bằng'],
        image: 'https://images.pexels.com/photos/7973215/pexels-photo-7973215.jpeg',
        previewColor: '#0369A1'
    },
    {
        id: 'tpl-grad-04',
        title: 'Thanh Xuân Giảng Đường',
        category: 'graduation',
        layout: 'overlay',
        theme: 'dark',
        tags: ['tốt nghiệp', 'graduation', 'giảng đường', 'bạn thân', 'thanh xuân'],
        image: 'https://images.pexels.com/photos/5940841/pexels-photo-5940841.jpeg',
        previewColor: '#1F1B24'
    },

    // Event (Sự kiện)
    {
        id: 'tpl-evt-01',
        title: 'Hội Nghị Khách Hàng',
        category: 'event',
        layout: 'split',
        theme: 'blue',
        tags: ['sự kiện', 'event', 'hội nghị', 'doanh nghiệp', 'đối tác'],
        image: 'https://images.pexels.com/photos/19905203/pexels-photo-19905203.jpeg',
        previewColor: '#1F1B24'
    },
    {
        id: 'tpl-evt-02',
        title: 'Tất Niên Sum Vầy',
        category: 'event',
        layout: 'overlay',
        theme: 'dark',
        tags: ['sự kiện', 'event', 'tất niên', 'year end party', 'tiệc'],
        image: 'https://images.pexels.com/photos/25949481/pexels-photo-25949481.jpeg',
        previewColor: '#2D2833'
    },
    {
        id: 'tpl-evt-03',
        title: 'Dạ Tiệc Gala',
        category: 'event',
        layout: 'overlay',
        theme: 'yellow',
        tags: ['sự kiện', 'event', 'gala', 'sân khấu', 'tiệc tối'],
        image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
        previewColor: '#B45309'
    },
    {
        id: 'tpl-evt-04',
        title: 'Khai Trương Hồng Phát',
        category: 'event',
        layout: 'letter',
        theme: 'yellow',
        tags: ['sự kiện', 'event', 'khai trương', 'phát tài', 'chúc mừng'],
        image: 'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg',
        previewColor: '#B45309'
    },

    // Anniversary (Kỷ niệm)
    {
        id: 'tpl-ani-01',
        title: 'Đà Lạt Cùng Nhau',
        category: 'anniversary',
        layout: 'polaroid',
        theme: 'dark',
        tags: ['kỷ niệm', 'anniversary', 'đà lạt', 'du lịch', 'bên nhau'],
        image: 'https://images.pexels.com/photos/3571331/pexels-photo-3571331.jpeg',
        previewColor: '#1F1B24'
    },
    {
        id: 'tpl-ani-02',
        title: 'Mãi Mãi Một Tình Yêu',
        category: 'anniversary',
        layout: 'overlay',
        theme: 'pink',
        tags: ['kỷ niệm', 'anniversary', 'tình yêu', 'ôm', 'lãng mạn'],
        image: 'https://images.pexels.com/photos/1024984/pexels-photo-1024984.jpeg',
        previewColor: '#9F1239'
    },
    {
        id: 'tpl-ani-03',
        title: 'Bữa Tối Ánh Nến',
        category: 'anniversary',
        layout: 'letter',
        theme: 'yellow',
        tags: ['kỷ niệm', 'anniversary', 'bữa tối', 'ánh nến', 'rượu vang'],
        image: 'https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg',
        previewColor: '#B45309'
    },
    {
        id: 'tpl-ani-04',
        title: 'Hành Trình Yêu Thương',
        category: 'anniversary',
        layout: 'split',
        theme: 'blue',
        tags: ['kỷ niệm', 'anniversary', 'nắm tay', 'biển', 'hành trình'],
        image: 'https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg',
        previewColor: '#0369A1'
    },

    // Wishes (Lời chúc & Ngày lễ)
    {
        id: 'tpl-wish-01',
        title: 'Xuân Như Ý',
        category: 'wishes',
        layout: 'split',
        theme: 'pink',
        tags: ['lời chúc', 'wishes', 'tết', 'mùa xuân', 'áo dài', 'hoa mai'],
        image: 'https://images.pexels.com/photos/19941549/pexels-photo-19941549.jpeg',
        previewColor: '#9F1239'
    },
    {
        id: 'tpl-wish-02',
        title: 'Giáng Sinh An Lành',
        category: 'wishes',
        layout: 'overlay',
        theme: 'dark',
        tags: ['lời chúc', 'wishes', 'noel', 'giáng sinh', 'cây thông'],
        image: 'https://images.pexels.com/photos/19149264/pexels-photo-19149264.jpeg',
        previewColor: '#2D2833'
    },
    {
        id: 'tpl-wish-03',
        title: '8/3 Yêu Thương',
        category: 'wishes',
        layout: 'polaroid',
        theme: 'pink',
        tags: ['lời chúc', 'wishes', '8/3', '20/10', 'phụ nữ', 'hoa tulip'],
        image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg',
        previewColor: '#9F1239'
    },
    {
        id: 'tpl-wish-04',
        title: 'Tri Ân Thầy Cô',
        category: 'wishes',
        layout: 'letter',
        theme: 'blue',
        tags: ['lời chúc', 'wishes', '20/11', 'thầy cô', 'tri ân', 'nhà giáo'],
        image: 'https://images.pexels.com/photos/1047051/pexels-photo-1047051.jpeg',
        previewColor: '#0369A1'
    },
    {
        id: 'tpl-wish-05',
        title: 'Năm Mới Bình An',
        category: 'wishes',
        layout: 'overlay',
        theme: 'yellow',
        tags: ['lời chúc', 'wishes', 'năm mới', 'tết', 'hoa đào', 'bình an'],
        image: 'https://images.pexels.com/photos/6858607/pexels-photo-6858607.jpeg',
        previewColor: '#B45309'
    },

    // Other (Khác & Tri ân)
    {
        id: 'tpl-other-01',
        title: 'Ký Ức Đáng Nhớ',
        category: 'other',
        layout: 'overlay',
        theme: 'dark',
        tags: ['khác', 'other', 'hoàng hôn', 'ngược sáng', 'ký ức'],
        image: 'https://images.pexels.com/photos/1812527/pexels-photo-1812527.jpeg',
        previewColor: '#2D2833'
    },
    {
        id: 'tpl-other-02',
        title: 'Lời Cảm Ơn Chân Thành',
        category: 'other',
        layout: 'letter',
        theme: 'yellow',
        tags: ['khác', 'other', 'cảm ơn', 'tri ân', 'cafe', 'thư'],
        image: 'https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg',
        previewColor: '#B45309'
    },
    {
        id: 'tpl-other-03',
        title: 'Hướng Về Mặt Trời',
        category: 'other',
        layout: 'polaroid',
        theme: 'yellow',
        tags: ['khác', 'other', 'hướng dương', 'hoa', 'năng lượng', 'tích cực'],
        image: 'https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg',
        previewColor: '#B45309'
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
