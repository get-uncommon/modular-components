# Working with modular components

## Installation
In order to install this package, you need to be authorized.
- Run `yarn add @get-uncommon/modular-components` in order to install this package.

## Setup
There are a few things that you need to do before you can use this package in the way it is intended.

### Importing style
The package has global css. This needs to be imported in to your Nuxt project.

In your `config.js` add the following code to the default export
```javascript
export default {
  css: [
    '@get-uncommon/modular-components/src/assets/scss/main.scss',
    '~assets/scss/[YOUR_OWN_PROJECT_STYLING]',
  ]
}
```
This will import the package's global styling first, Then you should import your own project styling where the css variables can be overwritten. It is important that you import the global package styling first and your own styling later.

The package does not require bootstrap to run, however it does use bootstrap classes for the grid. So **in order for the package to look good, you should import the Bootstrap grid**.

## Importing components
You can import components with the following code:
```javascript
import { Button, Footer, PhotoSlider } from '@get-uncommon/modular-components/src/components/index.vue';
```
These components are currently available for import:
- Button
- FeaturedHeaderBlock
- PhotoSlider
- TextBlocks
- StaticCards
- NewsLetterForm
- VideoPlayer
- ContactForm
- FeaturedDouble
- FeaturedSingle
- ContentBlock
- TextBlock
- Menubar
- Footer
- CardSlider
- CardList

## Overriding css variables
You can simply override css variables in your styling. The only important thing is that you override them after you imported the global packaging style. I imported the style in the same way as I did under the *Importing style* header.

Then you can use the following styling in your own imported style like this in order to override other styling:

```scss
:root {
  --color-primary: #f00;
  --button-background-color: #f00;
  --color-secondary: #ff0;
  --color-tirtiary: #00f;
  --color-light: #fff;
  --color-dark: #000;
}
```

These are the variables that you can override, and their default values
```scss
:root {
  // Text
  --font-family-base: #{$open-sans};
  --font-family-secondary: #{$open-sans};
  --font-family-monospace: 'Courier New', courier, monospace;
  --font-weight-bold: 600;

  // Headings
  --headings-margin-bottom: .5em;
  --headings-font-family: $font-family-base;
  --headings-font-weight: bold;
  --headings-line-height: 1;

  // Margins and padding
  --spacing-sm: 12px;
  --spacing-md: 24px;
  --spacing-lg: 50px;
  --spacing-xl: 100px;

  // Buttons
  --button-height: 62px;
  --button-border-radius: 31px;
  --button-padding: 55px;
  --button-color: #{$white};
  --button-background-color: #{$kelp};
  --button-hover-color: #{$black};

  // Messages
  --message-height: var(--button-height);
  --message-border-radius: var(--button-border-radius);
  --message-padding: var(--button-padding);

  // Inputs
  --input-padding: 4px 6px;
  --input-color: var(--color-secondary);
  --input-color-active: var(--color-primary);

  // Anchors
  --anchor-color: $kelp;

  // Actions
  --action-font-weight: bold;

  // Menubar
  --menu-bar-height: 100px;
  --menu-bar-negative-height: -100px;
  --menu-bar-color: var(--color-tertiary);
  --menu-bar-link-dropdown-color: var(--color-primary);
  --menu-bar-link-color: var(--color-primary);
  --menu-container-width: 1370px;
  --menu-overlay-width: 650px;
  --menu-logo-height: 100px;

  // Transitions
  --transition-base: all .2s ease-in-out;
  --transition-page: 1s;
  --transition-page-fast: .5s;

  // Colors
  --color-primary: #{$kelp};
  --color-secondary: #{$grey};
  --color-tertiary: #{$beige};
  --color-light: #{$white};
  --color-dark: #{$black};
  --color-danger: #{$red};
  --color-success: #{$green};

  // Font sizes
  --font-size-h1: #{$h1 + 'px'};
  --font-size-h2: #{$h2 + 'px'};
  --font-size-h3: #{$h3 + 'px'};
  --font-size-h4: #{$h4 + 'px'};
  --font-size-h5: #{$h5 + 'px'};
  --font-size-h6: #{$h6 + 'px'};
  --font-size-button: #{$button + 'px'};
  --font-size-base: #{$base + 'px'};
  --font-size-input: #{$input + 'px'};

  // Responsive font sizes
  --font-size-h1-responsive: calc(#{$h1 / 2 + px} + 100vw / 1200 * #{$h1} / 2);
  --font-size-h2-responsive: calc(#{$h2 / 2 + px} + 100vw / 1200 * #{$h2} / 2);
  --font-size-h3-responsive: calc(#{$h3 / 2 + px} + 100vw / 1200 * #{$h3} / 2);
  --font-size-h4-responsive: calc(#{$h4 / 2 + px} + 100vw / 1200 * #{$h4} / 2);
  --font-size-h5-responsive: calc(#{$h5 / 2 + px} + 100vw / 1200 * #{$h5} / 2);
  --font-size-h6-responsive: calc(#{$h6 / 2 + px} + 100vw / 1200 * #{$h6} / 2);

  // Line heights
  --line-height-h1: 1;
  --line-height-h2: 1.28;
  --line-height-h3: 1.32;
  --line-height-h4: 1.52;
  --line-height-h5: 1.9;
  --line-height-h6: #{$line-height-base};
  --line-height-base: #{$line-height-base};
  
  // Footer
  --footer-color: var(--color-primary);
  --footer-link-color: var(--color-light);
}
```

# Working on modular-components

## Project setup
- Run `yarn` in order to install dependencies.
- Run `yarn serve` in order to run the application.

## Publishing
- Run `yarn publish` in order to publish the package.
- Run `yarn publsh:login` when you are not logged in to NPM yet.

## Generating
- Run `yarn svg` in order to generate use able SVGs from the `static/svg/src` directory 

## Building
Currently, we do not building a dist for the application, but we import the actual vue components. This means that a build command is not necessary at the moment, however there is one might you need it in the future.
- Run `yarn build` in order to build a `dist` for production.

## Bootstrap
We do use bootstrap classes, however we cannot use their utilies and mixins because this will not work when you export the package.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
