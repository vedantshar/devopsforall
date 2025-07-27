import React, { createContext, useContext, ReactNode } from 'react';

export interface Lab {
  id: string;
  title: string;
  category: 'bash' | 'python' | 'ansible';
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  instructions: string;
  starterCode: string;
  solution: string;
  validation: {
    type: 'output' | 'file' | 'function';
    expected: string;
    description: string;
  };
}

const labs: Lab[] = [
  {
    id: 'bash-1',
    title: 'File Manipulation',
    category: 'bash',
    description: 'Learn to create files and add content using Bash commands',
    difficulty: 'beginner',
    estimatedTime: 15,
    instructions: 'Write a Bash script to create a file called "hello.txt" and add the text "Hello DevOps!" to it.',
    starterCode: '#!/bin/bash\n\n# Create a file and add content\n# Your code here',
    solution: '#!/bin/bash\n\necho "Hello DevOps!" > hello.txt',
    validation: {
      type: 'file',
      expected: 'Hello DevOps!',
      description: 'Check if hello.txt exists and contains "Hello DevOps!"'
    }
  },
  {
    id: 'bash-2',
    title: 'Directory Navigation',
    category: 'bash',
    description: 'Master directory navigation and file listing commands',
    difficulty: 'beginner',
    estimatedTime: 20,
    instructions: 'Write commands to list all files in the current directory and then navigate to a subdirectory called "projects".',
    starterCode: '#!/bin/bash\n\n# List files and navigate\n# Your code here',
    solution: '#!/bin/bash\n\nls -la\nmkdir -p projects\ncd projects\npwd',
    validation: {
      type: 'output',
      expected: '/projects',
      description: 'Verify directory listing and navigation to projects folder'
    }
  },
  {
    id: 'python-1',
    title: 'Basic Calculator',
    category: 'python',
    description: 'Create a simple calculator function in Python',
    difficulty: 'beginner',
    estimatedTime: 10,
    instructions: 'Write a Python function called "add" that takes two numbers and returns their sum.',
    starterCode: 'def add(a, b):\n    # Your code here\n    pass\n\n# Test your function\nresult = add(2, 3)\nprint(result)',
    solution: 'def add(a, b):\n    return a + b\n\nresult = add(2, 3)\nprint(result)',
    validation: {
      type: 'function',
      expected: '5',
      description: 'Test if add(2, 3) returns 5'
    }
  },
  {
    id: 'python-2',
    title: 'String Manipulation',
    category: 'python',
    description: 'Learn string manipulation techniques in Python',
    difficulty: 'beginner',
    estimatedTime: 15,
    instructions: 'Write a Python script that reverses a string. The input string is "hello".',
    starterCode: 'text = "hello"\n# Reverse the string\n# Your code here\nprint(reversed_text)',
    solution: 'text = "hello"\nreversed_text = text[::-1]\nprint(reversed_text)',
    validation: {
      type: 'output',
      expected: 'olleh',
      description: 'Check if output is the reversed string "olleh"'
    }
  },
  {
    id: 'ansible-1',
    title: 'Install Package',
    category: 'ansible',
    description: 'Write an Ansible task to install software packages',
    difficulty: 'beginner',
    estimatedTime: 25,
    instructions: 'Create an Ansible task to install the "curl" package using the apt module.',
    starterCode: '---\n- name: Install package\n  hosts: localhost\n  tasks:\n    # Your task here',
    solution: '---\n- name: Install package\n  hosts: localhost\n  tasks:\n    - name: Install curl\n      apt:\n        name: curl\n        state: present\n        update_cache: yes',
    validation: {
      type: 'output',
      expected: 'curl installed successfully',
      description: 'Verify curl package installation task'
    }
  },
  {
    id: 'ansible-2',
    title: 'Create File',
    category: 'ansible',
    description: 'Use Ansible to create files with specific content',
    difficulty: 'beginner',
    estimatedTime: 20,
    instructions: 'Write an Ansible task to create a file at "/tmp/devops.txt" with the content "DevOps is awesome!".',
    starterCode: '---\n- name: Create file\n  hosts: localhost\n  tasks:\n    # Your task here',
    solution: '---\n- name: Create file\n  hosts: localhost\n  tasks:\n    - name: Create DevOps file\n      file:\n        path: /tmp/devops.txt\n        state: touch\n    - name: Add content to file\n      lineinfile:\n        path: /tmp/devops.txt\n        line: "DevOps is awesome!"',
    validation: {
      type: 'file',
      expected: 'DevOps is awesome!',
      description: 'Check if /tmp/devops.txt exists with correct content'
    }
  }
];

interface LabsContextType {
  labs: Lab[];
  getLabById: (id: string) => Lab | undefined;
  getLabsByCategory: (category: string) => Lab[];
}

const LabsContext = createContext<LabsContextType | undefined>(undefined);

export function LabsProvider({ children }: { children: ReactNode }) {
  const getLabById = (id: string) => labs.find(lab => lab.id === id);
  const getLabsByCategory = (category: string) => labs.filter(lab => lab.category === category);

  return (
    <LabsContext.Provider value={{ labs, getLabById, getLabsByCategory }}>
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