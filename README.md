# wp-media-center

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Actions Status](https://github.com/salad-ui/wp-media-center/workflows/main/badge.svg)](https://github.com/salad-ui/wp-media-center/actions)

A modern media library for WordPress.

## Installation

⚠️ We don't provide an installable release of the plugin at this time.

---

## Contributing

### Installation

```bash
yarn
```

> Make sure you've already checked out `@salad-ui/components` in the parent directory because we're linking to the local checkout of `@salad-ui/components` while it remains heavily unstable.

### Development

To develop the UI by itself:

1. Run `yarn start:app`
2. Browse to `http://localhost:8081/chooser` or `http://localhost:8081/manager`

To develop the plugin within WordPress:

1. Run `yarn start:wordpress`

   > Make sure you have [`docker`](https://docs.docker.com/docker-for-mac/install/) installed!

2. Browse to `http://localhost:8000/`
3. Setup WordPress and log in:

- username: `admin`
- password: `admin`

4. Go to the plugins page and enable the plugin
