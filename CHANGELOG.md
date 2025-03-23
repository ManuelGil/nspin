# Change Log

All notable changes to the "nspin" package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.1] - 2025-03-22

### Fixed

- Fix `tsup` build process to ensure proper handling of ESM and CJS modules.

## [1.1.0] - 2025-03-21

### Changed

- Enhance `package.json` metadata to improve the build process and ensure compatibility ESM and CJS.
- Update `CHANGELOG.md` to include the new versioning format.
- Update `tsconfig.json` to exclude of `declarations` for improved build performance.
- Update `tsup.config.ts` to enable `treeshake` and `sourcemap` options for better performance and smaller bundle size.

## [1.0.0] - 2025-03-19

### Added

- Initial release of the npm package.

[Unreleased]: https://github.com/ManuelGil/nspin/compare/v1.1.1...HEAD
[1.1.1]: https://github.com/ManuelGil/nspin/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/ManuelGil/nspin/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/ManuelGil/nspin/releases/tag/v1.0.0
