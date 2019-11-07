# wp-media-center

A modern media library for WordPress.

## Installation

⚠️ We don't provide an installable release of the plugin at this time.

---

## Contributing

### Installation

```bash
yarn
```

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
