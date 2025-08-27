# AI Integration Hub - ChatGPT ve Stability AI Entegrasyonu

Bu plan, ChatGPT ve Stability AI'yı bir Next.js uygulamasında entegre etme sürecini adım adım açıklar. Hedef, kullanıcıların hem ChatGPT ile konuşabilecekleri hem de AI ile görsel içerik üretebilecekleri kapsamlı bir AI hub'ı oluşturmaktır.

## Genel Bakış
Bu entegrasyon iki ana AI hizmeti içerir:
- **ChatGPT**: Metin tabanlı konuşma ve soru-cevap
- **Stability AI**: Metin-tabanlı görsel içerik üretimi

## Teknoloji Stack
- Next.js 15+ (App Router)
- TypeScript
- OpenAI API (ChatGPT)
- Stability AI API
- Tailwind CSS (stil için)
- Jest (test için)

## Özellikler

### ✅ Tamamlanan Özellikler

#### ChatGPT Entegrasyonu
- OpenAI API anahtarı konfigürasyonu
- `/api/chat` endpoint'i
- Gerçek zamanlı mesajlaşma arayüzü
- Rate limiting (10 istek/dakika)
- Input validation ve hata yönetimi
- Unit testler

#### Stability AI Entegrasyonu  
- Stability AI API anahtarı konfigürasyonu
- `/api/generate-image` endpoint'i
- Text-to-image generation
- Base64 image handling
- Rate limiting (5 istek/dakika)
- Input validation ve hata yönetimi
- Unit testler

#### Frontend Özellikleri
- Tab-based interface (Chat / Image Generation)
- Responsive tasarım
- Loading durumları
- Hata mesajları
- Görsel önizleme
- Modern UI/UX

### 🔧 Güvenlik Özellikleri
- Environment variables ile API key yönetimi
- Rate limiting
- Input validation (mesaj/prompt uzunluğu)
- Hata yakalama ve logging

### 📋 API Endpoints

#### POST /api/chat
- **Açıklama**: ChatGPT ile metin konuşması
- **Giriş**: `{ message: string }`
- **Çıkış**: `{ reply: string }`
- **Rate Limit**: 10 istek/dakika

#### POST /api/generate-image  
- **Açıklama**: Stability AI ile görsel üretimi
- **Giriş**: `{ prompt: string }`
- **Çıkış**: `{ imageUrl: string }` (base64 encoded)
- **Rate Limit**: 5 istek/dakika

### 🚀 Kullanım

1. **Environment Setup**:
   ```bash
   OPENAI_API_KEY=your_openai_key
   STABILITY_API_KEY=your_stability_key
   ```

2. **Development Server**:
   ```bash
   npm run dev
   ```

3. **Tests**:
   ```bash
   npm test
   ```

### 📝 Gelecek İyileştirmeler
- Görsel galerisi ve kaydetme
- Mesaj geçmişi persistence
- Kullanıcı kimlik doğrulama
- Webhook entegrasyonları
- Daha fazla AI model seçeneği
- Real-time collaboration
