# Change Log

All notable changes to the "nspin" package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.4.0] - 2025-03-26

### Changed

- Migrate build process to `vite` for improved performance and modern features.

### Removed

- Remove `tsup` as the build tool and replace it with `vite`.

## [1.3.0] - 2025-03-25

### Added

- Add position option to spinner to allow customization of the spinner's position.
- Enhance frame update functionality to support custom frame updates.

## [1.2.0] - 2025-03-23

### Added

- Add `biome` dependency for improved code formatting and linting.

### Changed

- Update imports to use the correct paths for the files in the `src` directory.
- Update `README.md` to reflect the new structure and usage of the package.

### Removed

- Remove barrel files from the `src` directory to simplify the module structure.
- Remove unused `eslint` and `prettier` configurations from the package.

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

[Unreleased]: https://github.com/ManuelGil/nspin/compare/v1.4.0...HEAD
[1.4.0]: https://github.com/ManuelGil/nspin/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/ManuelGil/nspin/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/ManuelGil/nspin/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/ManuelGil/nspin/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/ManuelGil/nspin/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/ManuelGil/nspin/releases/tag/v1.0.0
