import SongGio from '../assets/sg.jpg';
import HayTraoChoAnh from '../assets/hay-trao-cho-anh.jpg';
import BacPhan from '../assets/bacphan.jpg';
import Trinh from '../assets/trinh.jpg';
import SomMuonThi from '../assets/sommuonthi.jpg';
import GioThi from '../assets/giothi.jpg';
import PhiaSau from '../assets/phiasau.jpg';
import Lancuoi from '../assets/lancuoi.jpg';
import Lacloi from '../assets/lacloi.jpg';
import Duyenphan from '../assets/duyenphan.jpg';
import Vedau from '../assets/vedau.jpg';
import Chaulenba from '../assets/chaulenba.jpg';
import Canha from '../assets/canhathuongnhau.jpg';
import Backimthang from '../assets/bac-kim-thang.jpg';
import Conco from '../assets/concobebe.jpg';
import Emyeutruongem from '../assets/emyeutruongem.jpg';
import Shapeofyou from '../assets/shape.jpg';



export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  coverUrl: string;
  videoUrl?: string; // e.g., YouTube embed or a placeholder video
  isFavorite?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  coverUrl: string;
}

export interface Category {
  id: string;
  title: string;
  songs: Song[];
}

export const DUMMY_SONGS: Song[] = [
  { id: '1', title: 'Sóng gió', artist: 'Jack, K-ICM', duration: '4:14', coverUrl: SongGio, isFavorite: true, videoUrl: 'https://www.youtube.com/embed/2-k2ziSu9b8?autoplay=1' },
  { id: '2', title: 'Hãy trao cho anh', artist: 'Sơn Tùng M-TP', duration: '4:05', coverUrl: HayTraoChoAnh, isFavorite: true, videoUrl: 'https://www.youtube.com/embed/4q-OkPsdpsM?autoplay=1' },
  { id: '3', title: 'Bạc Phận', artist: 'Jack, K-ICM', duration: '4:30', coverUrl: BacPhan, videoUrl: 'https://www.youtube.com/embed/cdk2mDuKm38?autoplay=1' },
  { id: '4', title: 'Trình', artist: 'HieuThuHai', duration: '3:45', coverUrl: Trinh, isFavorite: true, videoUrl: 'https://www.youtube.com/embed/ZIB1PqX3zs0?autoplay=1' },
  { id: '5', title: 'Sớm muộn thì', artist: 'Anh Trai Say Hi', duration: '3:20', coverUrl: SomMuonThi, videoUrl: 'https://www.youtube.com/embed/FRieZiAcA1U?autoplay=1' },
  { id: '6', title: 'Giờ thì', artist: 'buitruonglinh', duration: '4:10', coverUrl: GioThi, isFavorite: true, videoUrl: 'https://www.youtube.com/embed/dNyjt0iuv-o?autoplay=1' },
  { id: '7', title: 'Phía sau một cô gái', artist: 'Soobin Hoàng Sơn', duration: '4:00', coverUrl: PhiaSau, isFavorite: true, videoUrl: 'https://www.youtube.com/embed/oqjM7Rf6Sxg?autoplay=1' },
  { id: '8', title: 'Lần cuối', artist: 'Ngọt', duration: '4:00', coverUrl: Lancuoi, isFavorite: true, videoUrl: 'https://www.youtube.com/embed/N0DKWNB-Zyc?si=Sb_f7JKqSmuKToZc?autoplay=1' },
  { id: '9', title: 'Lạc lối', artist: 'The Men', duration: '3:50', coverUrl: Lacloi, videoUrl: 'https://www.youtube.com/embed/Ha6YBnQo2sA?si=N4iooL5Lv23gOcW8?autoplay=1' },
  { id: '10', title: 'Duyên phận', artist: 'Như Quỳnh', duration: '5:45', coverUrl: Duyenphan, videoUrl: '' },
  { id: '11', title: 'Về đâu mái tóc người thương', artist: 'Quang Lê', duration: '4:55', coverUrl: Vedau, videoUrl: '' },
  { id: '12', title: 'Cháu lên ba', artist: 'Xuân Mai', duration: '2:30', coverUrl: Chaulenba, videoUrl: 'https://www.youtube.com/embed/jL0gFOYHsK0?autoplay=1' },
  { id: '13', title: 'Con cò bé bé', artist: 'Xuân Mai', duration: '2:15', coverUrl: Conco, videoUrl: 'https://www.youtube.com/embed/fH3tFr5LQAY?autoplay=1' },
  { id: '14', title: 'Bắc kim thang', artist: 'Bé Bào Ngư', duration: '2:45', coverUrl: Backimthang, videoUrl: 'https://www.youtube.com/embed/CyO3P_s8fLo?autoplay=1' },
  { id: '15', title: 'Em yêu trường em', artist: 'Bé Xuân Mai', duration: '3:00', coverUrl: Emyeutruongem, videoUrl: '' },
  { id: '16', title: 'Cả nhà thương nhau', artist: 'Bé Bào Ngư', duration: '2:20', coverUrl: Canha, videoUrl: '' },
  { id: '17', title: 'Shape of You', artist: 'Ed Sheeran', duration: '3:53', coverUrl: Shapeofyou, videoUrl: 'https://www.youtube.com/embed/JGwWNGJdvx8?autoplay=1' },
  { id: '18', title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20', coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80', videoUrl: 'https://www.youtube.com/embed/4NRXx6U8ABQ?autoplay=1' },
  { id: '19', title: 'Levitating', artist: 'Dua Lipa', duration: '3:23', coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&q=80', videoUrl: 'https://www.youtube.com/embed/TUVcZfQe-Kw?autoplay=1' },
  { id: '20', title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', duration: '2:21', coverUrl: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300&q=80', videoUrl: 'https://www.youtube.com/embed/kTJczUoc26U?autoplay=1' },
  { id: '21', title: 'As It Was', artist: 'Harry Styles', duration: '2:47', coverUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&q=80', videoUrl: 'https://www.youtube.com/embed/H5v3kku4y6Q?autoplay=1' },
  { id: '22', title: 'See Tình', artist: 'Hoàng Thùy Linh', duration: '3:05', coverUrl: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?w=300&q=80', videoUrl: 'https://www.youtube.com/embed/gJHSDZfJrRY?autoplay=1' },
  { id: '23', title: 'Để Mị nói cho mà nghe', artist: 'Hoàng Thùy Linh', duration: '3:20', coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=80' },
  { id: '24', title: 'Mang Chủng', artist: 'Âm Khuyết Thi Thính', duration: '3:40', coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&q=80', videoUrl: 'https://www.youtube.com/embed/pS0OidjlJ1c?autoplay=1' },
  { id: '25', title: 'Tay Trái Chỉ Trăng', artist: 'Tát Đỉnh Đỉnh', duration: '4:20', coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80' },
  { id: '26', title: 'Dynamite', artist: 'BTS', duration: '3:19', coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80', videoUrl: 'https://www.youtube.com/embed/gdZLi9oWNZg?autoplay=1' },
  { id: '27', title: 'How You Like That', artist: 'BLACKPINK', duration: '3:01', coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80' }


];

export const CATEGORIES: Category[] = [
  {
    id: 'xu-huong',
    title: 'Xu hướng',
    songs: [
      DUMMY_SONGS[0], DUMMY_SONGS[1], DUMMY_SONGS[2], DUMMY_SONGS[3], DUMMY_SONGS[4], DUMMY_SONGS[5], DUMMY_SONGS[6], DUMMY_SONGS[7]
    ]
  },
  {
    id: 'moi',
    title: 'Mới',
    songs: [
      DUMMY_SONGS[3], DUMMY_SONGS[8], DUMMY_SONGS[10]
    ]
  },
  {
    id: 'nhac-tre',
    title: 'Nhạc trẻ',
    songs: [
      DUMMY_SONGS[0], DUMMY_SONGS[1], DUMMY_SONGS[3]
    ]
  },
  {
    id: 'nhac-bolero',
    title: 'Nhạc Bolero',
    songs: [
      DUMMY_SONGS[9], DUMMY_SONGS[10]
    ]
  },
  {
    id: 'nhac-thieu-nhi',
    title: 'Nhạc thiếu nhi',
    songs: [
      DUMMY_SONGS[11], DUMMY_SONGS[12], DUMMY_SONGS[13], DUMMY_SONGS[14], DUMMY_SONGS[15]
    ]
  },
  {
    id: 'nhac-us-uk',
    title: 'Nhạc US-UK',
    songs: [
      DUMMY_SONGS[16], DUMMY_SONGS[17], DUMMY_SONGS[18], DUMMY_SONGS[19], DUMMY_SONGS[20]
    ]
  },
  {
    id: 'nhac-vpop',
    title: 'Nhạc VPOP',
    songs: [
      DUMMY_SONGS[21], DUMMY_SONGS[22]
    ]
  },
  {
    id: 'nhac-china',
    title: 'Nhạc China',
    songs: [
      DUMMY_SONGS[23], DUMMY_SONGS[24]
    ]
  },
  {
    id: 'nhac-kpop',
    title: 'Nhạc KPOP',
    songs: [
      DUMMY_SONGS[25], DUMMY_SONGS[26]
    ]
  }
];

export const PLAYLISTS: Playlist[] = [
  { id: '1', name: 'Playlist1', coverUrl: '/images/shape.jpg' },
  { id: '2', name: 'Nhạc Chill', coverUrl: '/images/lancuoi.jpg' },
  { id: '3', name: 'Nhạc Sôi Động', coverUrl: '/images/hay-trao-cho-anh.jpg' }
];
