# Project Specification: Wallet Capabilities Viewer

## 1. Project Overview

The Wallet Capabilities Viewer is a client-side, single-page application (SPA) designed to parse, validate, and dynamically display structural data regarding digital wallet providers. It translates a complex, semicolon-delimited CSV dataset into an interactive, highly readable interface featuring a filtering sidebar and a detailed, responsive card layout.

## 2. Architecture and Technology

The application is built using a modern frontend stack to ensure maintainability, type safety, and performance.

*   **Build Tool:** Vite
*   **Framework:** React (v18+)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Data Parsing:** PapaParse library

The application was recently refactored from a single-file vanilla JS application to a modern React application.

## 3. Project Structure

The project follows a standard structure for a React + Vite application:

*   `wallet-capabilities/`
    *   `src/`: Contains all the application's source code.
        *   `assets/`: CSS files and other static assets.
        *   `components/`: React components (e.g., `App`, `Sidebar`, `WalletCard`).
        *   `services/`: Business logic for data parsing (`DataService`) and filtering (`FilterService`).
        *   `types/`: TypeScript type definitions, including the main `WalletEntry` class.
        *   `main.tsx`: The main entry point of the application.
        *   `config.ts`: Centralized configuration for CSV headers, vocabularies, etc.
    *   `index.html`: The main HTML file.
    *   `package.json`: Project dependencies and scripts.
    *   `vite.config.ts`: Vite configuration.
    *   `tsconfig.json`: TypeScript configuration.

## 4. Data Ingestion and Validation

*   **Default Data Source:** The application attempts to automatically fetch `wallet capabilities.csv` (defined in `src/config.ts`) upon initialization.
*   **Fallback Mechanism:** If the fetch fails, a manual file upload UI is presented.
*   **Dynamic Header Detection:** The `DataService` scans the CSV to dynamically locate the header row.
*   **Strict Validation:** `WalletEntry` class validates specific fields against predefined vocabularies in `src/config.ts`. Entries that fail validation are discarded.
*   **Error Logging:** Discarded entries generate a console warning.

## 5. CSV Data Model (`WalletEntry`)

The `WalletEntry` class in `src/types/WalletEntry.ts` maps CSV rows to a structured object.

*   **Primary Identifiers:** `id`, `shortName`, `legalName`.
*   **Boolean Indicators:** `hasResponse`, `providesWallets`.
*   **Multi-Value Enumerations:** `typologies`, `protocols`, `encodings`, etc. are parsed from semicolon-separated strings into arrays.
*   **Unstructured Data:** Free-form text fields and links.

## 6. Functional Requirements

### Sidebar & Filtering

*   A sticky sidebar displays a scrollable list of wallet entries.
*   **Filtering Engine (`FilterService`):**
    *   Filter by response status ("All", "Yes", "No").
    *   Filter by `typologies`, `protocols`, and `encodings` using multi-select checkboxes. Filters use AND logic.

### Main Card Interface

*   A responsive card layout displays the details of the selected wallet.
*   The header shows primary identifiers and status badges.
*   Data is presented using icons and color-coded chips.
*   Long text fields are truncated and can be expanded in a modal view.
*   A "No Response" overlay is shown for entries that have not provided a response.
*   An empty state is shown when filters result in no matches.
