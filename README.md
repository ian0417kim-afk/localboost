# LocalBoost

제주 소상공인을 위한 디지털 전단지·홈페이지·홍보영상 서비스 랜딩 페이지.

**Live**: https://ian0417kim-afk.github.io/localboost/

---

## 폴더 구조

```
localboost/
├── index.html            마크업만 (이 파일은 거의 건드릴 일 없음)
├── README.md
├── css/
│   └── styles.css        모든 스타일
├── js/
│   ├── data.js           ★ 콘텐츠 편집 지점 — 서비스/사례 배열
│   └── main.js           렌더러 + 핸들러 (수정 불필요)
└── assets/
    └── images/           사례 썸네일 이미지
```

---

## 자주 하는 수정

### 1. 제작 사례(Works) 추가·수정

`js/data.js` 의 `WORKS` 배열만 편집하면 됩니다.

```js
{
  name: '업체명',
  client: 'English Name',
  tag: '업종',
  status: 'Live',          // Live / Sample / 제작중
  desc: '업체 설명',
  url: 'https://링크주소',
  location: '지역명',
  img: '파일명.png',        // 없으면 이 줄 삭제
},
```

이미지는 `assets/images/` 폴더에 업로드한 뒤, `img:` 필드에 **파일명만** 적으면 됩니다. (경로 `assets/images/` 는 `main.js` 가 자동으로 붙입니다.)

### 2. 서비스 카드 수정

`js/data.js` 의 `SERVICES` 배열을 편집. 순서 = 사이트 노출 순서.

### 3. 스타일·색상

`css/styles.css` 최상단 `:root` 의 CSS 변수만 바꿔도 톤을 크게 조정할 수 있습니다.

```css
:root {
  --paper: #FAF8F4;   /* 배경 */
  --ink:   #0F1B2E;   /* 잉크 네이비 액센트 */
  ...
}
```

### 4. 연락처·폼

`index.html` 의 `contact-section` 내부에서 전화번호, 카톡 링크, Formspree 엔드포인트를 수정.

---

## 외부 의존성

- **Fraunces** / **Pretendard** — Google Fonts + jsDelivr
- **qrcodejs** — cdnjs (하단 고정 바 QR)
- **Formspree** — 상담 폼 전송 엔드포인트 (`xykdqnbw`)

## 로컬에서 확인

단순 정적 파일이라 어떤 HTTP 서버든 OK:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

GitHub Pages는 루트의 `index.html` 을 자동 서빙합니다.
