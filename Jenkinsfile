pipeline {
    agent any

    stages {
        stage('build and install') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.51.0-noble'
                    args '-u root:root'
                }
            }

            steps {
                script {

                    sh 'npm ci'
                    // def tagToUse = params.String_TAG ?: params.CHOICE_TAG
                    // sh "npx cucumber-js --format json:reports/cucumber-report.json --tags '${params.CHOICE_TAG}'"
                    // sh "npm run only '${params.CHOICE_TAG}'"
                    sh 'npx cucumber-js --format json:reports/cucumber-report.json'
                    stash name: 'allure-results', includes: 'allure-results/*'

                }
            }

        }
    }
    post {
        always {
            unstash 'allure-results'
            script {
                allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }