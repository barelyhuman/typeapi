# typeapi

> A simple web based typescript type definitions parser

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

### Roadmap

- [x] basic one level type definition parser for interfaces, types, and
      functions
- [ ] cache version type definition instead
- [ ] astro + ssr rewrite
- [ ] use a virtual in memory fs to read all `.d.ts` files from the package
- [ ] generate types for packages without any declarations
- [ ] auto redirect to `@types/<pkg>` for known packages
- [ ] a friendlier UI
