# Wallet Capabilities Viewer

A live UI fed with data from the Wallet Providers on-boarding questionnaire that allows interactive navigation and filtering of wallet solutions provided by the group members.

## Access

The UI is available via GitHub Pages at: https://webuild-consortium.github.io/wp4-wallets-group/wallet-capabilities/

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

> **Note:** The application expects the `wallet capabilities.csv` file to be in the root of the `wallet-capabilities` directory.

### Data Validation

To ensure the integrity of the data source, a validation script is included. This script checks that the `wallet capabilities.csv` file can be read and parsed correctly before any deployment.

The script is located at `scripts/validate-csv.mjs` and can be run manually:

```bash
npm run validate
```

This validation is also automatically executed as part of the deployment process.

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
