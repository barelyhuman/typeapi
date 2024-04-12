# typeapi

> A simple web based typescript type definitions parser

- [typeapi](#typeapi)
  - [Usecase](#usecase)
  - [Usage](#usage)
  - [Self Hosting](#self-hosting)
  - [Roadmap](#roadmap)

## Usecase

Need a simple way to find out what types are exposed by a library, kinda like an
API doc.

## Usage

Just visit `https://typeapi.barelyhuman.dev/pkg/<npm-package-name>` to see the
types of a package.

eg:

```
https://typeapi.barelyhuman.dev/pkg/@barelyhuman/tocolor@next
```

## Self Hosting

- typeAPI is available as a runnable docker image that can be run in the
  following manner

```sh
docker pull ghcr.io/barelyhuman/typeapi:<version> # replace <version> with the latest tag from the releases section
docker run -d -p="4321:4321" ghcr.io/barelyhuman/typeapi:<version> # unpersisted version

# persisted version, give save the data in the current folder (if you'd like to replicate the db for backup)
docker run -d -v ${PWD}:/data -e "DB_PATH=/data/data.db" -p="4321:4321" ghcr.io/barelyhuman/typeapi:<version>
```

## Roadmap

- [x] basic one level type definition parser for interfaces, types, and
      functions
- [x] handle `package.exports` fields
      [#3](https://github.com/barelyhuman/typeapi/pull/3)
- [x] astro rewrite
- [ ] cache version type definition instead
- [ ] use a virtual in memory fs to read all `.d.ts` files from the package
- [ ] generate types for packages without any declarations
- [ ] auto redirect to `@types/<pkg>` for known packages
- [x] a friendlier UI
  - [x] Keyboard Accessible (has some points missing)
