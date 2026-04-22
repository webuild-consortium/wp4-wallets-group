# Wallet Capabilities Viewer

A live UI fed with data from the Wallet Providers on-boarding questionnaire that allows interactive navigation and filtering of wallet solutions provided by the group members.

## Access

The UI is available via GitHub Pages at: https://webuild-consortium.github.io/wp4-wallets-group/

## Disclaimer

The data presented in this UI are based on self-declarations by each wallet provider and may be outdated. Please verify information directly with wallet providers for the most current details.

## Development Setup

This project is a single-page application built using **React**, **TypeScript**, and **Vite**.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Running Locally

1.  Clone the repository.
2.  Navigate to the `wallet-capabilities` directory.
3.  Install dependencies:
    ```bash
    npm install
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```

5.  Open your browser at the URL shown in the terminal (typically `http://localhost:5173`).

> **Note:** The application expects the [`wallet capabilities.csv`](https://github.com/webuild-consortium/wp4-wallets-group/blob/main/wallet-capabilities/public/wallet%20capabilities.csv) file to be in the `public` directory.

### Data
The application fetches data from the `wallet-capabilities/public/wallet capabilities.csv` [file](https://github.com/webuild-consortium/wp4-wallets-group/blob/main/wallet-capabilities/public/wallet%20capabilities.csv).
To update the data, you will need to update this CSV file, ensuring that it adheres to the expected format and structure.


### Data Validation

To ensure the integrity of the data source, a validation script is included. This script is automatically executed via a GitHub Action on Pull Requests and before any deployment to the `main` branch.

The script is located at `scripts/validate-csv.mjs` and can be run manually:

```bash
npm run validate
```

The validation script performs the following structural and content checks:
- **Mandatory Fields:** Ensures that `nr in Portal`, `Short name`, and `Organizations (Legal Name)` are present for every entry.
- **ID Format:** Verifies that `nr in Portal` contains only numbers and periods.
- **Recognized Vocabularies:** Validates that `Kind of wallet`, `Standards supported`, and `Encoding formats` only contain allowed values matching the project's configuration (`src/config.ts`).
- **Boolean Values:** Checks that `Has response ?` is strictly "TRUE", "FALSE", or empty.
- **Maximum Length Constraints:** Ensures that the `Other input (wallet)`, `Other input (participation)`, and `Previous LSP experience` fields do not exceed 500 characters.

This validation guarantees that malformed data will not break the UI or be inadvertently deployed.

### Building for Production

To create a production-ready build of the application:

```bash
npm run build
```

This command bundles all the code and assets into the `dist/` directory.

### Deploying to GitHub Pages

The project can be easily deployed to GitHub Pages.

**1. Configure `vite.config.ts`**

Ensure the `base` property in `vite.config.ts` is set to your repository name. For this project, it is set to:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/wp4-wallets-group/', 
})
```

**2. Build and Deploy**

A `deploy` script has been added to `package.json` to simplify the process.

1.  Run the deploy script:
    ```bash
    npm run deploy
    ```

This script will first validate the CSV data, then build the project, and finally push the contents of the `dist` directory to a special `gh-pages` branch on your repository. This branch is then automatically hosted by GitHub Pages.
After the script is completed, the updated site will be available at your GitHub pages URL.
