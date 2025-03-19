module.exports = {
    default: {
        require: [
            "step-definitions/**/*.ts",   // Chemin vers vos step definitions
            "hooks/**/*.ts"               // Chemin vers vos hooks
        ],
        format: [
            "allure-cucumberjs/reporter",
           "json:reports/cucumber-report.json", // JSON report for analysis
           "html:reports/cucumber-report.html"  // HTML report for human-readable output
          ],
        tags: "@valid or @invalid",  // Exécuter uniquement les tests marqués avec ces tags
        worldParameters: {
            baseUrl: "https://opensource-demo.orangehrmlive.com"
        },
        requireModule: ["ts-node/register"], // Permet l'utilisation de TypeScript
        timeout: 20000 // Timeout étendu pour éviter les timeouts en CI
    }
};
