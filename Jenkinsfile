pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('vercel-token')
    }

    stages {
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'No test script'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                bat 'npx vercel --prod --yes --token=%VERCEL_TOKEN%'
            }
        }
    }
}