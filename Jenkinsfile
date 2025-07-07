// Jenkinsfile for deploying a React app to Vercel

pipeline {
    // Defines where the pipeline will run.
    // 'any' means Jenkins will use any available agent.
    // For production, you might want to specify a label like 'agent { label 'nodejs-agent' }'
    agent any

    // Define environment variables used in the pipeline.
    // VERCEL_DEPLOY_HOOK_URL will be fetched from Jenkins Credentials.
    environment {
        // IMPORTANT: Store your Vercel Deploy Hook URL as a Jenkins Secret Text credential.
        // Go to Jenkins Dashboard -> Manage Jenkins -> Manage Credentials -> Add Credentials.
        // Type: Secret text, ID: VERCEL_DEPLOY_HOOK_URL (or whatever you prefer), Secret: Your actual Vercel Deploy Hook URL.
        VERCEL_HOOK_URL = credentials('https://api.vercel.com/v1/integrations/deploy/prj_eaXWcjC4lpHKimRJN2B0XZ5L6KqQ/OBFh3XcS9E')
    }

    // Define the stages of your CI/CD pipeline
    stages {
        stage('Checkout Code') {
            steps {
                script {
                    // Check if a specific branch is passed, otherwise use 'main'
                    def gitBranch = env.BRANCH_NAME ?: 'main'
                    echo "Checking out branch: ${gitBranch}"
                    git branch: gitBranch, url: 'https://github.com/your-username/your-frontend-repo.git'
                    // IMPORTANT: Replace with your actual GitHub repository URL
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo "Installing Node.js dependencies..."
                    // Assuming you use npm. If you use yarn, change to 'yarn install'
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    echo "Building React application..."
                    // This command runs your React build process.
                    // It typically creates a 'build' or 'dist' folder.
                    // Ensure your package.json has a "build" script like "react-scripts build"
                    sh 'npm run build'
                }
            }
        }

        stage('Trigger Vercel Deployment') {
            steps {
                script {
                    echo "Triggering Vercel deployment via Deploy Hook..."
                    // Send a POST request to the Vercel Deploy Hook URL.
                    // Vercel will then pull the latest code from your Git repository (from the branch
                    // specified when you created the Deploy Hook) and deploy it.
                    sh "curl -X POST ${VERCEL_HOOK_URL}"
                    echo "Vercel deployment initiated. Check your Vercel dashboard for status."
                }
            }
        }
    }

    // Post-build actions (optional)
    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Deployment pipeline successful!'
            // You could add notifications here, e.g., Slack, Email
        }
        failure {
            echo 'Deployment pipeline failed!'
            // You could add error notifications here
        }
    }
}
