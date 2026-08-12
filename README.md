# Modular Components

Reusable Vue 3 components for Uncommon websites.

## Requirements

- Node.js 24
- Corepack
- Yarn 4.14.1
- Vue 3.5 or newer
- A `NODE_AUTH_TOKEN` with read access to the `@get-uncommon` GitHub Packages scope

Enable Corepack and install the dependencies:

```sh
corepack enable
yarn install --immutable
```

The token must be provided through the environment. It must not be committed to this repository.

## Installation

```sh
yarn add @get-uncommon/modular-components
```

Import the package CSS before application-specific overrides:

```ts
import '@get-uncommon/modular-components/dist/modular-components.css';
import '~/assets/scss/main.scss';
```

The CSS includes Normalize, RFS, and the required Swiper base, navigation, and pagination styles. Components use Bootstrap grid class names, but Bootstrap itself is not bundled.

## Components

All components are available as named exports. The default export remains a component map for backwards compatibility.

```ts
import {
  Button,
  Footer,
  PhotoSlider,
} from '@get-uncommon/modular-components';
```

The public exports are:

- `AdvancedImage`
- `Button`
- `CardList`
- `CardSlider`
- `ContactForm`
- `ContentBlock`
- `FeaturedDouble`
- `FeaturedHeaderBlock`
- `FeaturedSingle`
- `Footer`
- `Input`
- `Menubar`
- `Message`
- `NewsLetterForm`
- `PhotoCard`
- `PhotoSlider`
- `StaticCards`
- `TextBlock`
- `TextBlocks`
- `VideoPlayer`

## Dynamic component contract

Native elements remain string values, for example `as: 'a'` or `as: 'button'`. Framework links must be passed as component objects. Vue 3 does not resolve strings such as `'nuxt-link'` in this package.

```vue
<script setup lang="ts">
import { NuxtLink } from '#components';
import { Button } from '@get-uncommon/modular-components';
</script>

<template>
  <Button
    :as="NuxtLink"
    :props="{ to: '/contact' }"
  >
    Contact
  </Button>
</template>
```

## Development

```sh
yarn lint
yarn stylelint
yarn typecheck
yarn test
yarn build
```

The library build writes ESM, CommonJS, declarations, and `dist/modular-components.css` to `dist/`.

## Publishing

Release candidates use the `next` dist-tag. Publication is performed only after the packed artifact has passed the consumer checks.

```sh
yarn npm publish --tag next
```
