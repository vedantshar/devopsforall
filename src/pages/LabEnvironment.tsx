import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Check, X, ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { useLabs } from '../contexts/LabsContext';
import { useAuth } from '../contexts/AuthContext';

export function LabEnvironment() {
  const { labId } = useParams<{ labId: string }>();
  const { getLabById } = useLabs();
  const { user, updateProgress } = useAuth();
  const navigate = useNavigate();
  
  const lab = getLabById(labId!);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    if (lab) {
      setCode(lab.starterCode);
      setIsCompleted(user?.completedLabs.includes(lab.id) || false);
    }
  }, [lab, user]);

  if (!lab) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lab not found</h2>
          <button
            onClick={() => navigate('/labs')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Labs
          </button>
        </div>
      </div>
    );
  }

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');

    // Simulate code execution
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock validation logic
    let result = '';
    let success = false;

    switch (lab.category) {
      case 'bash':
        if (code.includes('echo "Hello DevOps!" > hello.txt')) {
          result = 'File created successfully!\n✅ hello.txt contains: Hello DevOps!';
          success = true;
        } else if (code.includes('ls') && code.includes('cd projects')) {
          result = 'total 8\ndrwxr-xr-x 2 user user 4096 Jan 15 10:30 .\ndrwxr-xr-x 3 user user 4096 Jan 15 10:29 ..\n\n✅ Successfully navigated to /projects';
          success = true;
        } else {
          result = '❌ Task not completed correctly. Check your code and try again.';
        }
        break;
      
      case 'python':
        if (code.includes('return a + b')) {
          result = '5\n✅ Function works correctly! add(2, 3) = 5';
          success = true;
        } else if (code.includes('[::-1]') || code.includes('reversed(')) {
          result = 'olleh\n✅ String reversed successfully!';
          success = true;
        } else {
          result = '❌ Function not implemented correctly. Check your code and try again.';
        }
        break;
      
      case 'ansible':
        if (code.includes('apt:') && code.includes('name: curl')) {
          result = 'PLAY [Install package] ***************************************\n\nTASK [Install curl] ***************************************\nok: [localhost]\n\n✅ Package installed successfully!';
          success = true;
        } else if (code.includes('file:') && code.includes('lineinfile:')) {
          result = 'PLAY [Create file] *******************************************\n\nTASK [Create DevOps file] *********************************\nchanged: [localhost]\n\nTASK [Add content to file] ********************************\nchanged: [localhost]\n\n✅ File created with content successfully!';
          success = true;
        } else {
          result = '❌ Ansible task not configured correctly. Check your playbook syntax.';
        }
        break;
    }

    setOutput(result);
    setIsRunning(false);

    if (success && !isCompleted) {
      setIsCompleted(true);
      updateProgress(lab.id);
      setTimeout(() => {
        alert('🎉 Congratulations! You completed this lab!');
      }, 500);
    }
  };

  const resetCode = () => {
    setCode(lab.starterCode);
    setOutput('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/labs')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Labs</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{lab.title}</h1>
                <p className="text-sm text-gray-600 capitalize">{lab.category} • {lab.difficulty}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{lab.estimatedTime} min</span>
              </div>
              {isCompleted && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  <Check className="h-4 w-4" />
                  <span>Completed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Instructions Panel */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Instructions</h2>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 mb-4">{lab.description}</p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <p className="text-blue-800 font-medium">Task:</p>
                <p className="text-blue-700">{lab.instructions}</p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Validation:</p>
                <p className="text-sm text-gray-600">{lab.validation.description}</p>
              </div>
            </div>

            {!isCompleted && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {showSolution ? 'Hide Solution' : 'Need Help? Show Solution'}
                </button>
                {showSolution && (
                  <div className="mt-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800 mb-2">Solution:</p>
                    <pre className="text-xs text-yellow-700 bg-yellow-100 p-2 rounded overflow-x-auto">
                      <code>{lab.solution}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Code Editor Panel */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-white text-sm font-medium">
                  {lab.category === 'bash' ? 'terminal' : lab.category === 'python' ? 'main.py' : 'playbook.yml'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={resetCode}
                  className="px-3 py-1 text-xs text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center space-x-2 px-4 py-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-sm font-medium rounded transition-colors"
                >
                  {isRunning ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Running...</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Run</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col h-96">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 p-4 font-mono text-sm bg-gray-900 text-gray-100 resize-none focus:outline-none"
                placeholder="Write your code here..."
                spellCheck={false}
              />
              
              {output && (
                <div className="border-t border-gray-300">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
                    <span className="text-sm font-medium text-gray-700">Output:</span>
                  </div>
                  <pre className="p-4 bg-black text-green-400 text-sm font-mono whitespace-pre-wrap overflow-auto max-h-32">
                    {output}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}