pipeline {
    agent {
        docker {
            image 'node:16'
            args '-u root:root'
        }
    }
    
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npx cucumber-js --config cucumber.js'
                stash name: 'allure-results', includes: 'allure-results/**'
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
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
            }
            archiveArtifacts artifacts: 'allure-results/**', fingerprint: true
        }
    }
}
