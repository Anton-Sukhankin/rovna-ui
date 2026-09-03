# Public Runtime Configuration

## Purpose

Rovna UI must not contain working defaults for unavailable corporate services. Public and local consumers provide their own URLs; missing optional URLs keep the related action disabled or same-origin.

No value in this document requires access to a closed registry, Git host, API or CDN.

## SamoletHeader

Configure the header before rendering it:

```tsx
import {
  configureSamoletHeader,
  SamoletHeader,
} from '@rovna-ui/header';

configureSamoletHeader({
  servicesApi: {
    stage: '/api/services/header/',
    prod: '/api/services/header/',
  },
  personalAccount: {
    stage: '/account',
    prod: '/account',
  },
  servicesPage: {
    stage: '/services',
    prod: '/services',
  },
  analytics: {
    stage: '/analytics',
    prod: '/analytics',
  },
  support: {
    stage: '/support',
    prod: '/support',
  },
  avatarBaseUrl: '/avatars/',
  profileUrl: '/profile',
  serviceIconBaseUrl: '/service-icons',
});
```

All fields are optional. Without `servicesApi`, the services menu is not rendered. Missing support or analytics URLs disable the corresponding action. Missing avatar, profile or icon URLs do not trigger a remote request.

## Legacy Layout Header

The older `Layout.Header` components accept explicit URLs:

```tsx
<Layout.Header.Info href='/info' />
<Layout.Header.Support href='/support' />
<Layout.Header.Analytics href='/analytics' />
<Layout.Header.Apps
  hrefs={{
    's.pro': '/products/pro',
    's.team': '/products/team',
  }}
  allAppsHref='/products'
/>
<Layout.Header.Profile
  avatarBaseUrl='/avatars/'
  profileUrl='/profile'
  logoutUrl='/logout'
/>
```

Catalog entries without a URL remain visible but disabled. Custom wrapper components remain supported by Info, Support and Analytics.

## Service Packages And Fonts

Notifications, search assistant and fonts read an optional global object at module initialization:

```html
<script>
  globalThis.__ROVNA_UI_RUNTIME_CONFIG__ = {
    notifications: {
      apiUrl: '/notifications',
      webSocketUrl: 'ws://localhost:8080/connection/websocket',
    },
    searchAssistant: {
      apiUrl: '/search',
    },
    fonts: {
      baseUrl: '/fonts',
    },
  };
</script>
```

Set this object before loading the package bundle. Without an API URL, HTTP requests use same-origin paths. The notification WebSocket defaults to the current browser origin. Fonts default to `/fonts`.

The supplied source archive does not contain the referenced font binaries. A consumer must provide licensed font files at the configured path or omit `MuseoSansCyrl` and use its own font stack.

## Favicons

`FaviconProvider` uses a same-origin `/favicons` path by default and accepts an explicit base URL:

```tsx
<FaviconProvider type='pass-10D' baseUrl='/assets/favicons' />
```

The consumer is responsible for serving the favicon files.

## Storybook And Vite Environment

Optional local environment variables:

| Variable | Purpose |
| --- | --- |
| `ROVNA_UI_STORYBOOK_BRAND_URL` | Manager brand link; defaults to `/`. |
| `ROVNA_UI_STORYBOOK_BRAND_IMAGE_URL` | Optional manager logo. |
| `ROVNA_UI_STORYBOOK_API_URL` | Optional `/api` proxy target. |
| `ROVNA_UI_NOTIFICATIONS_API_URL` | Optional Vite `/api/sn` proxy target. |
| `ROVNA_UI_SEARCH_API_URL` | Optional Vite `/api/v1` proxy target. |
| `ROVNA_UI_SERVICES_API_URL` | Optional Vite `/api/services` proxy target. |

If a proxy variable is absent, that proxy is not registered. Do not place secrets in these values or commit environment files.

## Safety Rule

- Active source and config may not contain closed corporate hosts.
- Storybook stories, tests and rendered examples use local or neutral data only.
- Changelogs and completed dependency diagnostics may retain inert historical references only when their exact file path is reviewed in `github-internal-reference-allowlist.json`.
- Active source can never be allowlisted.

