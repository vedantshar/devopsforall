import React, { createContext, useContext, ReactNode } from 'react';

export interface Lab {
  id: string;
  title: string;
  category: 'linux-bash' | 'python' | 'docker' | 'kubernetes' | 'terraform' | 'ansible' | 'jenkins' | 'aws';
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  instructions: string;
  theory: string;
  learningOutcome: string;
  realWorldUse: string;
  starterCode: string;
  solution: string;
  validation: {
    type: 'output' | 'file' | 'function';
    expected: string;
    description: string;
  };
}

const labs: Lab[] = [
  // Linux & Bash Labs (10 labs with increasing complexity)
  {
    id: 'linux-bash-1',
    title: 'Basic File Operations',
    category: 'linux-bash',
    description: 'Master fundamental file operations in Linux',
    difficulty: 'beginner',
    estimatedTime: 15,
    instructions: 'Create a directory called "project", navigate into it, create a file called "readme.txt" with the content "Welcome to OpsCurator", and list all files with detailed information.',
    theory: 'File operations are the foundation of Linux system administration. The commands mkdir, cd, touch, echo, and ls are essential for managing files and directories. Understanding file permissions, ownership, and directory structure is crucial for any DevOps engineer.',
    learningOutcome: 'You will learn basic file system navigation, file creation, and directory management - skills used daily in DevOps workflows.',
    realWorldUse: 'These commands are used constantly in DevOps for setting up project structures, creating configuration files, and navigating server file systems during deployments and troubleshooting.',
    starterCode: '#!/bin/bash\n\n# Create project directory and files\n# Your code here',
    solution: '#!/bin/bash\n\nmkdir project\ncd project\necho "Welcome to OpsCurator" > readme.txt\nls -la',
    validation: {
      type: 'file',
      expected: 'Welcome to OpsCurator',
      description: 'Check if project/readme.txt exists and contains the correct content'
    }
  },
  {
    id: 'linux-bash-2',
    title: 'File Permissions and Ownership',
    category: 'linux-bash',
    description: 'Learn to manage file permissions and ownership',
    difficulty: 'beginner',
    estimatedTime: 20,
    instructions: 'Create a script file called "deploy.sh", make it executable, change its ownership to the current user, and set permissions to 755 (rwxr-xr-x).',
    theory: 'Linux file permissions control who can read, write, or execute files. The chmod command changes permissions using octal notation (755) or symbolic notation (rwx). Understanding permissions is critical for security and proper system administration.',
    learningOutcome: 'Master file permissions, ownership concepts, and security best practices for script files.',
    realWorldUse: 'DevOps engineers constantly manage permissions for deployment scripts, configuration files, and application binaries to ensure security and proper execution.',
    starterCode: '#!/bin/bash\n\n# Create and configure script file\n# Your code here',
    solution: '#!/bin/bash\n\ntouch deploy.sh\nchmod +x deploy.sh\nchown $USER deploy.sh\nchmod 755 deploy.sh\nls -la deploy.sh',
    validation: {
      type: 'output',
      expected: '-rwxr-xr-x',
      description: 'Verify deploy.sh has correct permissions (755)'
    }
  },
  {
    id: 'linux-bash-3',
    title: 'Environment Variables and PATH',
    category: 'linux-bash',
    description: 'Work with environment variables and system PATH',
    difficulty: 'beginner',
    estimatedTime: 25,
    instructions: 'Create a custom environment variable called "DEPLOY_ENV" with value "production", add a custom directory "/opt/mytools" to the PATH, and display both the variable and updated PATH.',
    theory: 'Environment variables store configuration data that programs can access. The PATH variable tells the shell where to find executable programs. Managing environment variables is essential for configuring applications and development environments.',
    learningOutcome: 'Understand how to set, modify, and use environment variables for application configuration.',
    realWorldUse: 'DevOps teams use environment variables to configure applications for different environments (dev, staging, prod) and to set up tool paths in CI/CD pipelines.',
    starterCode: '#!/bin/bash\n\n# Set environment variables\n# Your code here',
    solution: '#!/bin/bash\n\nexport DEPLOY_ENV="production"\nexport PATH="/opt/mytools:$PATH"\necho "DEPLOY_ENV: $DEPLOY_ENV"\necho "PATH: $PATH"',
    validation: {
      type: 'output',
      expected: 'DEPLOY_ENV: production',
      description: 'Check if DEPLOY_ENV is set correctly and PATH is updated'
    }
  },
  {
    id: 'linux-bash-4',
    title: 'Process Management Basics',
    category: 'linux-bash',
    description: 'Learn to monitor and manage system processes',
    difficulty: 'intermediate',
    estimatedTime: 30,
    instructions: 'Write a script that starts a background process (sleep 60), captures its PID, displays running processes containing "sleep", and then terminates the process by PID.',
    theory: 'Process management is crucial for system administration. Commands like ps, jobs, kill, and nohup help manage running processes. Understanding PIDs, process states, and signals is essential for troubleshooting and automation.',
    learningOutcome: 'Master process monitoring, background job management, and process termination techniques.',
    realWorldUse: 'DevOps engineers regularly monitor application processes, restart failed services, and manage long-running background tasks in production environments.',
    starterCode: '#!/bin/bash\n\n# Process management script\n# Your code here',
    solution: '#!/bin/bash\n\nsleep 60 &\nPID=$!\necho "Started process with PID: $PID"\nps aux | grep sleep | grep -v grep\nkill $PID\necho "Process $PID terminated"',
    validation: {
      type: 'output',
      expected: 'Process terminated',
      description: 'Verify process was started, monitored, and terminated correctly'
    }
  },
  {
    id: 'linux-bash-5',
    title: 'Log File Analysis',
    category: 'linux-bash',
    description: 'Analyze and process log files using command-line tools',
    difficulty: 'intermediate',
    estimatedTime: 35,
    instructions: 'Create a sample log file with various entries, then write commands to find all ERROR entries, count total lines, display the last 10 lines, and extract unique IP addresses from the logs.',
    theory: 'Log analysis is a critical DevOps skill. Tools like grep, awk, sed, tail, head, and sort help process large log files efficiently. Regular expressions and text processing are essential for troubleshooting and monitoring.',
    learningOutcome: 'Develop skills in log file analysis, pattern matching, and text processing for system monitoring.',
    realWorldUse: 'DevOps engineers analyze application logs, web server logs, and system logs daily to troubleshoot issues, monitor performance, and ensure system health.',
    starterCode: '#!/bin/bash\n\n# Log analysis script\n# Your code here',
    solution: '#!/bin/bash\n\ncat > app.log << EOF\n2024-01-15 10:30:15 INFO User login successful\n2024-01-15 10:31:22 ERROR Database connection failed\n2024-01-15 10:32:10 INFO Processing request from 192.168.1.100\n2024-01-15 10:33:45 ERROR Timeout occurred\n2024-01-15 10:34:12 INFO Request completed for 10.0.0.50\nEOF\n\necho "ERROR entries:"\ngrep ERROR app.log\necho "Total lines: $(wc -l < app.log)"\necho "Last 10 lines:"\ntail -10 app.log\necho "Unique IPs:"\ngrep -oE "([0-9]{1,3}\\.){3}[0-9]{1,3}" app.log | sort -u',
    validation: {
      type: 'output',
      expected: 'ERROR entries:',
      description: 'Verify log analysis commands work correctly'
    }
  },
  {
    id: 'linux-bash-6',
    title: 'System Monitoring Script',
    category: 'linux-bash',
    description: 'Create a comprehensive system monitoring script',
    difficulty: 'intermediate',
    estimatedTime: 40,
    instructions: 'Write a script that displays system uptime, CPU usage, memory usage, disk space, and running processes. Format the output nicely and save it to a monitoring report file.',
    theory: 'System monitoring involves collecting metrics about CPU, memory, disk, and network usage. Commands like uptime, free, df, top, and iostat provide system statistics. Automated monitoring is essential for maintaining system health.',
    learningOutcome: 'Build comprehensive system monitoring capabilities and learn to format and save system reports.',
    realWorldUse: 'DevOps teams create monitoring scripts to track system health, generate reports, and trigger alerts when resources exceed thresholds.',
    starterCode: '#!/bin/bash\n\n# System monitoring script\n# Your code here',
    solution: '#!/bin/bash\n\nREPORT_FILE="system_report.txt"\n\necho "=== SYSTEM MONITORING REPORT ===" > $REPORT_FILE\necho "Generated: $(date)" >> $REPORT_FILE\necho "" >> $REPORT_FILE\n\necho "UPTIME:" >> $REPORT_FILE\nuptime >> $REPORT_FILE\necho "" >> $REPORT_FILE\n\necho "MEMORY USAGE:" >> $REPORT_FILE\nfree -h >> $REPORT_FILE\necho "" >> $REPORT_FILE\n\necho "DISK USAGE:" >> $REPORT_FILE\ndf -h >> $REPORT_FILE\necho "" >> $REPORT_FILE\n\necho "TOP PROCESSES:" >> $REPORT_FILE\nps aux --sort=-%cpu | head -10 >> $REPORT_FILE\n\necho "Report saved to $REPORT_FILE"\ncat $REPORT_FILE',
    validation: {
      type: 'file',
      expected: 'SYSTEM MONITORING REPORT',
      description: 'Check if system_report.txt contains monitoring data'
    }
  },
  {
    id: 'linux-bash-7',
    title: 'Automated Backup Script',
    category: 'linux-bash',
    description: 'Create an automated backup solution with compression',
    difficulty: 'advanced',
    estimatedTime: 45,
    instructions: 'Write a script that creates a timestamped backup of a directory, compresses it using tar and gzip, moves it to a backup location, and removes backups older than 7 days.',
    theory: 'Backup automation is crucial for data protection. The tar command creates archives, gzip provides compression, and find with -mtime helps manage old files. Timestamping ensures unique backup names.',
    learningOutcome: 'Master backup automation, file compression, and retention policy implementation.',
    realWorldUse: 'DevOps engineers implement automated backup solutions for databases, application data, and configuration files to ensure business continuity.',
    starterCode: '#!/bin/bash\n\n# Automated backup script\n# Your code here',
    solution: '#!/bin/bash\n\nSOURCE_DIR="/tmp/data"\nBACKUP_DIR="/tmp/backups"\nTIMESTAMP=$(date +"%Y%m%d_%H%M%S")\nBACKUP_NAME="backup_$TIMESTAMP.tar.gz"\n\n# Create source directory with sample data\nmkdir -p $SOURCE_DIR\necho "Important data" > $SOURCE_DIR/file1.txt\necho "More data" > $SOURCE_DIR/file2.txt\n\n# Create backup directory\nmkdir -p $BACKUP_DIR\n\n# Create compressed backup\ntar -czf $BACKUP_DIR/$BACKUP_NAME -C /tmp data\n\necho "Backup created: $BACKUP_NAME"\n\n# Remove backups older than 7 days\nfind $BACKUP_DIR -name "backup_*.tar.gz" -mtime +7 -delete\n\necho "Cleanup completed"\nls -la $BACKUP_DIR',
    validation: {
      type: 'output',
      expected: 'Backup created:',
      description: 'Verify backup was created and cleanup executed'
    }
  },
  {
    id: 'linux-bash-8',
    title: 'Service Health Check Script',
    category: 'linux-bash',
    description: 'Monitor service health and implement automatic restart',
    difficulty: 'advanced',
    estimatedTime: 50,
    instructions: 'Create a script that checks if a service is running, monitors its resource usage, logs the status, and automatically restarts the service if it becomes unresponsive or uses too much memory.',
    theory: 'Service monitoring involves checking process status, resource consumption, and responsiveness. Commands like systemctl, pgrep, and ps help monitor services. Automated recovery improves system reliability.',
    learningOutcome: 'Implement service monitoring, health checks, and automated recovery mechanisms.',
    realWorldUse: 'Production environments require automated service monitoring to ensure high availability and quick recovery from failures.',
    starterCode: '#!/bin/bash\n\n# Service health check script\n# Your code here',
    solution: '#!/bin/bash\n\nSERVICE_NAME="nginx"\nLOG_FILE="/tmp/service_monitor.log"\nMAX_MEMORY_MB=500\n\nlog_message() {\n    echo "$(date): $1" >> $LOG_FILE\n}\n\ncheck_service() {\n    if pgrep $SERVICE_NAME > /dev/null; then\n        PID=$(pgrep $SERVICE_NAME)\n        MEMORY=$(ps -p $PID -o rss= 2>/dev/null)\n        MEMORY_MB=$((MEMORY / 1024))\n        \n        log_message "Service $SERVICE_NAME is running (PID: $PID, Memory: ${MEMORY_MB}MB)"\n        \n        if [ $MEMORY_MB -gt $MAX_MEMORY_MB ]; then\n            log_message "Memory usage too high, restarting service"\n            sudo systemctl restart $SERVICE_NAME\n        fi\n    else\n        log_message "Service $SERVICE_NAME is not running, attempting restart"\n        sudo systemctl start $SERVICE_NAME\n    fi\n}\n\ncheck_service\necho "Health check completed. Log:"\ntail -5 $LOG_FILE',
    validation: {
      type: 'output',
      expected: 'Health check completed',
      description: 'Verify service monitoring and logging works'
    }
  },
  {
    id: 'linux-bash-9',
    title: 'Network Connectivity Monitor',
    category: 'linux-bash',
    description: 'Monitor network connectivity and diagnose issues',
    difficulty: 'advanced',
    estimatedTime: 45,
    instructions: 'Create a script that tests connectivity to multiple hosts, measures response times, checks DNS resolution, and generates a network health report with recommendations.',
    theory: 'Network monitoring uses tools like ping, nslookup, netstat, and ss to test connectivity and diagnose issues. Understanding network troubleshooting is essential for maintaining distributed systems.',
    learningOutcome: 'Develop network monitoring and troubleshooting skills for distributed infrastructure.',
    realWorldUse: 'DevOps engineers monitor network connectivity between services, databases, and external APIs to ensure system reliability.',
    starterCode: '#!/bin/bash\n\n# Network connectivity monitor\n# Your code here',
    solution: '#!/bin/bash\n\nHOSTS=("google.com" "github.com" "stackoverflow.com")\nREPORT_FILE="/tmp/network_report.txt"\n\necho "=== NETWORK CONNECTIVITY REPORT ===" > $REPORT_FILE\necho "Generated: $(date)" >> $REPORT_FILE\necho "" >> $REPORT_FILE\n\nfor host in "${HOSTS[@]}"; do\n    echo "Testing connectivity to $host..." >> $REPORT_FILE\n    \n    # Test ping\n    if ping -c 3 $host > /dev/null 2>&1; then\n        avg_time=$(ping -c 3 $host | tail -1 | awk -F\'/\' \'{print $5}\')\n        echo "✓ $host is reachable (avg: ${avg_time}ms)" >> $REPORT_FILE\n    else\n        echo "✗ $host is unreachable" >> $REPORT_FILE\n    fi\n    \n    # Test DNS resolution\n    if nslookup $host > /dev/null 2>&1; then\n        ip=$(nslookup $host | grep "Address:" | tail -1 | awk \'{print $2}\')\n        echo "  DNS: $host resolves to $ip" >> $REPORT_FILE\n    else\n        echo "  DNS: Failed to resolve $host" >> $REPORT_FILE\n    fi\n    echo "" >> $REPORT_FILE\ndone\n\necho "Network report generated:"\ncat $REPORT_FILE',
    validation: {
      type: 'file',
      expected: 'NETWORK CONNECTIVITY REPORT',
      description: 'Check if network report contains connectivity tests'
    }
  },
  {
    id: 'linux-bash-10',
    title: 'Complete System Administration Script',
    category: 'linux-bash',
    description: 'Build a comprehensive system administration toolkit',
    difficulty: 'advanced',
    estimatedTime: 60,
    instructions: 'Create a master script that combines user management, system monitoring, log rotation, backup automation, and security checks. Include a menu system for different operations and comprehensive logging.',
    theory: 'Advanced system administration combines multiple skills: user management, monitoring, automation, and security. A well-designed admin script provides a centralized interface for common tasks and ensures consistent execution.',
    learningOutcome: 'Integrate multiple system administration concepts into a comprehensive automation toolkit.',
    realWorldUse: 'Senior DevOps engineers create comprehensive automation scripts that handle multiple administrative tasks, reducing manual work and ensuring consistency across environments.',
    starterCode: '#!/bin/bash\n\n# System administration toolkit\n# Your code here',
    solution: '#!/bin/bash\n\nLOG_FILE="/tmp/sysadmin.log"\n\nlog_action() {\n    echo "$(date): $1" >> $LOG_FILE\n}\n\nshow_menu() {\n    echo "=== SYSTEM ADMINISTRATION TOOLKIT ==="\n    echo "1. System Health Check"\n    echo "2. User Management"\n    echo "3. Backup Operations"\n    echo "4. Log Analysis"\n    echo "5. Security Audit"\n    echo "6. Exit"\n    echo "======================================"\n}\n\nsystem_health() {\n    log_action "Running system health check"\n    echo "System Uptime: $(uptime)"\n    echo "Memory Usage: $(free -h | grep Mem)"\n    echo "Disk Usage: $(df -h / | tail -1)"\n    echo "Load Average: $(cat /proc/loadavg)"\n}\n\nuser_management() {\n    log_action "Displaying user information"\n    echo "Currently logged in users:"\n    who\n    echo "Recent logins:"\n    last | head -5\n}\n\nbackup_operations() {\n    log_action "Running backup operations"\n    BACKUP_DIR="/tmp/admin_backup"\n    mkdir -p $BACKUP_DIR\n    tar -czf $BACKUP_DIR/system_config_$(date +%Y%m%d).tar.gz /etc/passwd /etc/group 2>/dev/null\n    echo "System configuration backed up to $BACKUP_DIR"\n}\n\nlog_analysis() {\n    log_action "Analyzing system logs"\n    echo "Recent system errors:"\n    grep -i error /var/log/syslog 2>/dev/null | tail -5 || echo "No recent errors found"\n}\n\nsecurity_audit() {\n    log_action "Running security audit"\n    echo "Checking for users with empty passwords:"\n    awk -F: \'($2 == "") {print $1}\' /etc/shadow 2>/dev/null || echo "Cannot access shadow file"\n    echo "Checking file permissions on critical files:"\n    ls -l /etc/passwd /etc/shadow 2>/dev/null\n}\n\nwhile true; do\n    show_menu\n    read -p "Select an option (1-6): " choice\n    \n    case $choice in\n        1) system_health ;;\n        2) user_management ;;\n        3) backup_operations ;;\n        4) log_analysis ;;\n        5) security_audit ;;\n        6) echo "Exiting..."; break ;;\n        *) echo "Invalid option" ;;\n    esac\n    \n    echo ""\n    read -p "Press Enter to continue..."\n    clear\ndone\n\necho "Admin toolkit session completed. Check log: $LOG_FILE"',
    validation: {
      type: 'output',
      expected: 'SYSTEM ADMINISTRATION TOOLKIT',
      description: 'Verify the admin toolkit menu system works correctly'
    }
  }
];

interface LabsContextType {
  labs: Lab[];
  getLabById: (id: string) => Lab | undefined;
  getLabsByCategory: (category: string) => Lab[];
  categories: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    status: 'active' | 'construction';
    topics: string[];
  }>;
}

const categories = [
  {
    id: 'foundational',
    name: 'Foundational Topics',
    description: 'Essential skills every DevOps engineer needs',
    icon: '🔹',
    status: 'active' as const,
    topics: [
      'Linux & Bash - Bash scripting, file permissions, package management, cron jobs, process management',
      'Python for DevOps - Automating infra tasks, parsing YAML/JSON, using subprocess, API calls, writing CLIs',
      'Version Control - Git, branching, merges, rebases, Git hooks, GitOps basics'
    ]
  },
  {
    id: 'containerization',
    name: 'Containerization & Orchestration',
    description: 'Master containers and orchestration platforms',
    icon: '🐳',
    status: 'construction' as const,
    topics: [
      'Docker - Images, containers, volumes, networks, Dockerfiles, docker-compose',
      'Kubernetes - Pods, Deployments, Services, ConfigMaps, Secrets, Ingress, Namespaces',
      'Helm - Charts, templating, chart repos, values overrides',
      'Kustomize - Patch-based K8s customization'
    ]
  },
  {
    id: 'iac',
    name: 'Infrastructure as Code (IaC)',
    description: 'Automate infrastructure provisioning and configuration',
    icon: '⚙️',
    status: 'construction' as const,
    topics: [
      'Terraform - Providers, variables, modules, state mgmt, remote backends',
      'Ansible - Playbooks, roles, inventory, variables, handlers, Ansible Vault',
      'Chef / Puppet / SaltStack - Configuration management alternatives'
    ]
  },
  {
    id: 'cicd',
    name: 'CI/CD Pipelines',
    description: 'Build robust continuous integration and deployment pipelines',
    icon: '🚀',
    status: 'construction' as const,
    topics: [
      'Jenkins - Pipelines, plugins, agents, declarative vs scripted',
      'GitHub Actions - Jobs, workflows, secrets, self-hosted runners',
      'GitLab CI / CircleCI - YAML-based pipelines, auto deployments',
      'ArgoCD / FluxCD - Declarative GitOps CD on Kubernetes'
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud & Deployment',
    description: 'Deploy and manage applications in the cloud',
    icon: '☁️',
    status: 'construction' as const,
    topics: [
      'AWS - EC2, S3, IAM, VPC, EKS, CodePipeline',
      'GCP / Azure - Multi-cloud deployment strategies',
      'CloudFormation - Infrastructure provisioning with templates'
    ]
  },
  {
    id: 'security',
    name: 'Security & Observability',
    description: 'Secure and monitor your infrastructure',
    icon: '🔒',
    status: 'construction' as const,
    topics: [
      'Secrets Management - HashiCorp Vault, K8s Secrets, SOPS',
      'Monitoring & Logging - Prometheus, Grafana, ELK stack, Loki',
      'Alerting & Incident Mgmt - Alertmanager, Opsgenie, Sentry, PagerDuty',
      'Scanning & Compliance - Trivy, Aqua, SonarQube, Checkov, tfsec'
    ]
  }
];

const LabsContext = createContext<LabsContextType | undefined>(undefined);

export function LabsProvider({ children }: { children: ReactNode }) {
  const getLabById = (id: string) => labs.find(lab => lab.id === id);
  const getLabsByCategory = (category: string) => labs.filter(lab => lab.category === category);

  return (
    <LabsContext.Provider value={{ labs, getLabById, getLabsByCategory, categories }}>
      {children}
    </LabsContext.Provider>
  );
}

export function useLabs() {
  const context = useContext(LabsContext);
  if (context === undefined) {
    throw new Error('useLabs must be used within a LabsProvider');
  }
  return context;
}