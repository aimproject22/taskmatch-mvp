# 기업 과제 기반 인재 매칭 플랫폼 MVP

이 저장소는 두 가지 시연용 MVP를 한 홈페이지에서 관리합니다.

- 루트 홈페이지: `./index.html`
- SaaS형 MVP: `./saas-mvp/`
- 공고형 MVP: `./job-board-mvp/`

## 로컬 실행

루트 홈페이지와 두 하위 MVP를 함께 보려면 저장소 루트에서 실행합니다.

```powershell
cd "C:\Users\Owner\Documents\인재매칭 인포"
npm start
```

접속 주소:

```text
http://127.0.0.1:4173
```

공고형 MVP만 별도 포트로 실행하려면:

```powershell
cd "C:\Users\Owner\Documents\인재매칭 인포\job-board-mvp"
npm start
```

접속 주소:

```text
http://127.0.0.1:4273
```

## GitHub Pages 배포 추천

현재 구조는 정적 HTML/CSS/JS 기반이라 GitHub Pages에 잘 맞습니다.

1. GitHub에서 새 저장소를 만듭니다.
2. 이 폴더 전체를 push합니다.
3. 저장소의 `Settings` → `Pages`로 이동합니다.
4. `Build and deployment`에서 `Deploy from a branch`를 선택합니다.
5. Branch는 `main`, folder는 `/root`를 선택합니다.

배포 후 루트 주소에서 두 MVP로 이동할 수 있습니다.

```text
https://<github-id>.github.io/<repo-name>/
https://<github-id>.github.io/<repo-name>/saas-mvp/
https://<github-id>.github.io/<repo-name>/job-board-mvp/
```

## Vercel로 배포하는 경우

나중에 React, Next.js, API 기능으로 확장할 계획이 강하면 Vercel도 좋습니다.

1. Vercel에서 GitHub 저장소를 Import합니다.
2. Framework Preset은 `Other`로 둡니다.
3. Build Command는 비워둡니다.
4. Output Directory는 `./`로 둡니다.

## 수정 관리 흐름

수정할 때는 각 폴더의 파일을 고치면 됩니다.

- 루트 홈페이지 수정: `index.html`, `styles.css`
- SaaS형 MVP 수정: `saas-mvp/index.html`, `saas-mvp/styles.css`, `saas-mvp/app.js`
- 공고형 MVP 수정: `job-board-mvp/index.html`, `job-board-mvp/styles.css`, `job-board-mvp/app.js`

수정 후 GitHub에 commit/push하면 GitHub Pages 또는 Vercel에서 자동으로 다시 배포됩니다.
