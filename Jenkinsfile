pipeline {
  agent any
  environment {
    VITE_API_BASE_URL='http://ip-address:1200'
  }
  
  stages {
    stage('Checkout code') {
      steps {
        git branch: 'main', changelog: false, url: 'https://github.com/kushvahasumit/Bllege.git'
      }
    }
    
    stage('verify docker enviroment') {
        steps {
            sh '''
            docker --version
            docker-compose --version
            '''
        }
    }

    stage('Deploy') {
      steps {
        sh '''
        docker-compose down
        export VITE_API_BASE_URL=$VITE_API_BASE_URL
        docker-compose up -d --build
        '''
      }
    }
    
    stage('Check containers') {
        steps {
            sh '''
            docker ps
            docker images
            '''
        }
    }
    
    stage('Test against container') {
        steps {
            sh '''
            curl http://ip-address:1200
            '''
        }
    }
  }
  
 post {
        always {
            // pipeline will fail with exit code 1 if steps not true
            sh 'docker system prune -af || true '
        }
        success {
            echo "Pipeline ran successfully"
        }
        failure {
            echo "Pipeline failed"
        }
    }
}
