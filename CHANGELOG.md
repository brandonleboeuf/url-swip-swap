# Changelog

All notable changes to this project will be documented in this file.

## [url-swip-swap@1.1.1] - 2024-05-07

### Fixed
- Fixed input field focus outline being cut off in the options page

## [url-swip-swap@1.1.0] - 2024-05-07

### Added
- Support for unlimited URL pairs (previously limited to 3)
- Smooth animations when adding/removing URL pairs
- Improved UI with clearer labels and descriptions
- Added helpful tagline and description text
- Visual separators between URL pairs

### Changed
- Renamed "Sets" to "URL Pairs" for clarity
- Updated placeholder text to be more descriptive
- Improved remove button UI with fade in/out effect

## [url-swip-swap@1.0.1] - 2024-05-07

### Changed
- UI updated to focus on pivots and sets

### Fixed
- Fixed bog that would not allow swapping between localhost and deployed site due to the missing www.
-

## [url-swip-swap@1.0.0] - 2024-05-06

### Changed

- Added button to open Options page from extension.
- Updated messaging on extension.

## [url-swip-swap@0.1.4] - 2024-04-24

### Fixed

- Bug that was causing the state to be reset if the options page was visited but no changes were made.

### Changed

- Updated UI to have sliders for checkbox.

## [url-swip-swap@0.1.3] - 2024-04-22

### Changed

- Adjusted error messaging from using alerts to instead altering the html of the chrome popup.
- Removed save button in favor of auto save functionality.

### Added

- Auto save functionality.
- Displays version on the Options page.
