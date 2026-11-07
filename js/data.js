// Mock Data for Templates
// High quality, fast CDN images tailored for Vietnamese celebrations, weddings, holidays, and milestones
const templates = [
    // Wedding (Thiệp cưới truyền thống & hiện đại Việt Nam)
    {
        id: 'tpl-wed-01',
        title: 'Thanh Xuân Của Ta',
        category: 'wedding',
        layout: 'split',
        theme: 'pink',
        tags: ['cưới', 'wedding', 'áo dài', 'truyền thống', 'đỏ', 'thanh xuân', 'hạnh phúc'],
        image: 'https://images.pexels.com/photos/19343360/pexels-photo-19343360.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#9F1239'
    },
    {
        id: 'tpl-wed-02',
        title: 'Duyên Định Trăm Năm',
        category: 'wedding',
        layout: 'overlay',
        theme: 'dark',
        tags: ['cưới', 'wedding', 'áo dài đỏ', 'trăm năm', 'hạnh phúc', 'phu thê'],
        image: 'https://images.pexels.com/photos/38765177/pexels-photo-38765177.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#9F1239'
    },
    {
        id: 'tpl-wed-03',
        title: 'Hoàng Gia Thanh Lịch',
        category: 'wedding',
        layout: 'polaroid',
        theme: 'yellow',
        tags: ['cưới', 'wedding', 'áo dài vàng', 'hoàng gia', 'cổ điển', 'lễ cưới'],
        image: 'https://images.pexels.com/photos/10788647/pexels-photo-10788647.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#B45309'
    },
    {
        id: 'tpl-wed-04',
        title: 'Nàng Dâu Duyên Dáng',
        category: 'wedding',
        layout: 'letter',
        theme: 'pink',
        tags: ['cưới', 'wedding', 'cô dâu', 'áo dài', 'duyên dáng', 'nụ cười'],
        image: 'https://images.pexels.com/photos/28945487/pexels-photo-28945487.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#9F1239'
    },
    {
        id: 'tpl-wed-05',
        title: 'Lễ Thành Hôn',
        category: 'wedding',
        layout: 'overlay',
        theme: 'pink',
        tags: ['cưới', 'wedding', 'thành hôn', 'phu thê', 'truyền thống', 'rạng rỡ'],
        image: 'https://images.pexels.com/photos/28945492/pexels-photo-28945492.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#9F1239'
    },
    {
        id: 'tpl-wed-06',
        title: 'Lễ Hằng Thuận & Sen Trắng',
        category: 'wedding',
        layout: 'split',
        theme: 'yellow',
        tags: ['cưới', 'wedding', 'hoa sen', 'hằng thuận', 'thanh tịnh', 'an nhiên'],
        image: 'https://images.pexels.com/photos/29483429/pexels-photo-29483429.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#B45309'
    },

    // Birthday (Thiệp sinh nhật ấm cúng & ngọt ngào)
    {
        id: 'tpl-bday-01',
        title: 'Bánh Kem Dâu Ngọt Ngào',
        category: 'birthday',
        layout: 'split',
        theme: 'pink',
        tags: ['sinh nhật', 'birthday', 'bánh kem', 'dâu tây', 'ngọt ngào', 'nến'],
        image: 'https://images.pexels.com/photos/35174350/pexels-photo-35174350.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#9F1239'
    },
    {
        id: 'tpl-bday-02',
        title: 'Tiệc Vui Bất Tận',
        category: 'birthday',
        layout: 'overlay',
        theme: 'dark',
        tags: ['sinh nhật', 'birthday', 'party', 'nâng ly', 'bạn bè', 'chúc mừng'],
        image: 'https://images.pexels.com/photos/4684265/pexels-photo-4684265.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#2D2833'
    },
    {
        id: 'tpl-bday-03',
        title: 'Tuổi Mới Rạng Rỡ',
        category: 'birthday',
        layout: 'polaroid',
        theme: 'pink',
        tags: ['sinh nhật', 'birthday', 'rực rỡ', 'hoa tươi', 'nụ cười', 'tuổi mới'],
        image: 'https://images.pexels.com/photos/3831786/pexels-photo-3831786.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#1F1B24'
    },
    {
        id: 'tpl-bday-04',
        title: 'Khúc Ca Tuổi Trẻ',
        category: 'birthday',
        layout: 'overlay',
        theme: 'blue',
        tags: ['sinh nhật', 'birthday', 'pháo sáng', 'bóng bay', 'party', 'lung linh'],
        image: 'https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#0369A1'
    },
    {
        id: 'tpl-bday-05',
        title: 'Ấm Áp Tuổi Thần Tiên',
        category: 'birthday',
        layout: 'letter',
        theme: 'yellow',
        tags: ['sinh nhật', 'birthday', 'bánh kem', 'tuổi mới', 'ấm áp', 'yêu thương'],
        image: 'https://images.pexels.com/photos/7099979/pexels-photo-7099979.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#B45309'
    },

    // Graduation (Thiệp tốt nghiệp & cử nhân Việt Nam)
    {
        id: 'tpl-grad-01',
        title: 'Lễ Tốt Nghiệp Hà Nội',
        category: 'graduation',
        layout: 'split',
        theme: 'blue',
        tags: ['tốt nghiệp', 'graduation', 'hà nội', 'cử nhân', 'kỷ yếu', 'ra trường'],
        image: 'https://images.pexels.com/photos/33361953/pexels-photo-33361953.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#0369A1'
    },
    {
        id: 'tpl-grad-02',
        title: 'Ngày Tung Mũ Rạng Rỡ',
        category: 'graduation',
        layout: 'overlay',
        theme: 'dark',
        tags: ['tốt nghiệp', 'graduation', 'ra trường', 'tung mũ', 'tương lai', 'thành công'],
        image: 'https://images.pexels.com/photos/33361971/pexels-photo-33361971.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#2D2833'
    },
    {
        id: 'tpl-grad-03',
        title: 'Bó Hoa Tân Cử Nhân',
        category: 'graduation',
        layout: 'polaroid',
        theme: 'yellow',
        tags: ['tốt nghiệp', 'graduation', 'hoa hướng dương', 'bó hoa', 'cử nhân', 'chúc mừng'],
        image: 'https://images.pexels.com/photos/32696660/pexels-photo-32696660.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#B45309'
    },
    {
        id: 'tpl-grad-04',
        title: 'Nụ Cười Giảng Đường',
        category: 'graduation',
        layout: 'letter',
        theme: 'blue',
        tags: ['tốt nghiệp', 'graduation', 'nụ cười', 'giảng đường', 'thanh xuân', 'bạn thân'],
        image: 'https://images.pexels.com/photos/30355866/pexels-photo-30355866.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#0369A1'
    },

    // Event (Sự kiện & Hội nghị Việt Nam)
    {
        id: 'tpl-evt-01',
        title: 'Không Gian Lễ Hội Trang Trọng',
        category: 'event',
        layout: 'split',
        theme: 'pink',
        tags: ['sự kiện', 'event', 'trang trọng', 'lễ hội', 'truyền thống', 'không gian'],
        image: 'https://images.pexels.com/photos/31849180/pexels-photo-31849180.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#9F1239'
    },
    {
        id: 'tpl-evt-02',
        title: 'Tất Niên Sum Vầy',
        category: 'event',
        layout: 'overlay',
        theme: 'dark',
        tags: ['sự kiện', 'event', 'tất niên', 'year end party', 'tiệc', 'sum họp'],
        image: 'https://images.pexels.com/photos/25949481/pexels-photo-25949481.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#2D2833'
    },
    {
        id: 'tpl-evt-03',
        title: 'Dạ Tiệc Gala Sân Khấu',
        category: 'event',
        layout: 'overlay',
        theme: 'yellow',
        tags: ['sự kiện', 'event', 'gala', 'sân khấu', 'tiệc tối', 'ánh sáng'],
        image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#B45309'
    },
    {
        id: 'tpl-evt-04',
        title: 'Khai Trương Hồng Phát',
        category: 'event',
        layout: 'letter',
        theme: 'yellow',
        tags: ['sự kiện', 'event', 'khai trương', 'phát tài', 'chúc mừng', 'lẵng hoa'],
        image: 'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#B45309'
    },

    // Anniversary (Kỷ niệm & Danh thắng Việt Nam: Hội An, Đà Lạt)
    {
        id: 'tpl-ani-01',
        title: 'Hội An Đêm Hoa Đăng',
        category: 'anniversary',
        layout: 'overlay',
        theme: 'dark',
        tags: ['kỷ niệm', 'anniversary', 'hội an', 'hoa đăng', 'lãng mạn', 'đèn lồng', 'bên nhau'],
        image: 'https://images.pexels.com/photos/29920017/pexels-photo-29920017.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#2D2833'
    },
    {
        id: 'tpl-ani-02',
        title: 'Góc Phố Đèn Lồng Hội An',
        category: 'anniversary',
        layout: 'split',
        theme: 'yellow',
        tags: ['kỷ niệm', 'anniversary', 'phố cổ', 'hội an', 'hoa giấy', 'đèn lồng'],
        image: 'https://images.pexels.com/photos/13830717/pexels-photo-13830717.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#B45309'
    },
    {
        id: 'tpl-ani-03',
        title: 'Lễ Hội Đèn Hoa Lung Linh',
        category: 'anniversary',
        layout: 'polaroid',
        theme: 'dark',
        tags: ['kỷ niệm', 'anniversary', 'lung linh', 'ánh sáng', 'tình yêu', 'hội an'],
        image: 'https://images.pexels.com/photos/30932979/pexels-photo-30932979.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#1F1B24'
    },
    {
        id: 'tpl-ani-04',
        title: 'Đà Lạt Chiều Hoàng Hôn',
        category: 'anniversary',
        layout: 'letter',
        theme: 'yellow',
        tags: ['kỷ niệm', 'anniversary', 'đà lạt', 'hoàng hôn', 'bên nhau', 'đồi thông'],
        image: 'https://images.pexels.com/photos/3571331/pexels-photo-3571331.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#B45309'
    },

    // Wishes (Lời chúc & Ngày lễ truyền thống Việt Nam: Tết, 20/10, 8/3, 20/11)
    {
        id: 'tpl-wish-01',
        title: 'Tết Giáp Thìn - Xuân Như Ý',
        category: 'wishes',
        layout: 'split',
        theme: 'pink',
        tags: ['lời chúc', 'wishes', 'tết', 'mùa xuân', 'lì xì', 'câu đối', 'năm mới', 'may mắn'],
        image: 'https://images.pexels.com/photos/30249090/pexels-photo-30249090.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#9F1239'
    },
    {
        id: 'tpl-wish-02',
        title: 'Xuân Sắc Áo Dài & Hoa Sen',
        category: 'wishes',
        layout: 'overlay',
        theme: 'pink',
        tags: ['lời chúc', 'wishes', 'hoa sen', 'áo dài', 'mùa xuân', 'dân tộc', 'nữ tính'],
        image: 'https://images.pexels.com/photos/30638792/pexels-photo-30638792.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#9F1239'
    },
    {
        id: 'tpl-wish-03',
        title: 'Phụ Nữ Việt Nam 20/10 & 8/3',
        category: 'wishes',
        layout: 'polaroid',
        theme: 'pink',
        tags: ['lời chúc', 'wishes', '20/10', '8/3', 'phụ nữ', 'bó hoa', 'yêu thương'],
        image: 'https://images.pexels.com/photos/28682180/pexels-photo-28682180.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#9F1239'
    },
    {
        id: 'tpl-wish-04',
        title: 'Tri Ân Thầy Cô 20/11',
        category: 'wishes',
        layout: 'letter',
        theme: 'blue',
        tags: ['lời chúc', 'wishes', '20/11', 'thầy cô', 'tri ân', 'nhà giáo', 'trường học', 'lớp học'],
        image: 'https://images.pexels.com/photos/35131382/pexels-photo-35131382.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#0369A1'
    },
    {
        id: 'tpl-wish-05',
        title: 'Duyên Dáng Nét Xuân Việt',
        category: 'wishes',
        layout: 'overlay',
        theme: 'yellow',
        tags: ['lời chúc', 'wishes', 'áo dài', 'năm mới', 'duyên dáng', 'bình an', 'mùa xuân'],
        image: 'https://images.pexels.com/photos/30372338/pexels-photo-30372338.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#B45309'
    },

    // Other (Văn hóa & Cảm xúc đời sống Việt Nam)
    {
        id: 'tpl-other-01',
        title: 'Cà Phê Phin Thư Thái',
        category: 'other',
        layout: 'split',
        theme: 'dark',
        tags: ['khác', 'other', 'cà phê', 'vietnam coffee', 'thư thái', 'bình yên', 'góc phố'],
        image: 'https://images.pexels.com/photos/36433563/pexels-photo-36433563.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#2D2833'
    },
    {
        id: 'tpl-other-02',
        title: 'Hoa Sen Trắng Tinh Khiết',
        category: 'other',
        layout: 'letter',
        theme: 'yellow',
        tags: ['khác', 'other', 'sen trắng', 'cảm ơn', 'tri ân', 'chân thành', 'thanh khiết'],
        image: 'https://images.pexels.com/photos/30305012/pexels-photo-30305012.jpeg?auto=compress&cs=tinysrgb&w=800',
        previewColor: '#B45309'
    },
    {
        id: 'tpl-other-03',
        title: 'Hướng Về Ánh Mặt Trời',
        category: 'other',
        layout: 'polaroid',
        theme: 'yellow',
        tags: ['khác', 'other', 'hướng dương', 'thăng tiến', 'tích cực', 'năng lượng'],
        image: 'https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&w=800',
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
