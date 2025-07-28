import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Check, X, ArrowLeft, Clock, BookOpen, Lightbulb, Target, MessageCircle, Star, Send } from 'lucide-react';
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
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Alex Chen',
      comment: 'Great lab! Really helped me understand file permissions better.',
      rating: 5,
      date: '2024-01-15'
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      comment: 'The real-world examples made this concept much clearer.',
      rating: 4,
      date: '2024-01-14'
    }
  ]);

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
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
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

    // Mock validation logic based on lab content
    let result = '';
    let success = false;

    // Simple validation based on expected patterns in the code
    if (lab.category === 'linux-bash') {
      if (lab.id === 'linux-bash-1' && code.includes('mkdir project') && code.includes('echo "Welcome to OpsCurator"')) {
        result = 'Directory created successfully!\n✅ project/readme.txt contains: Welcome to OpsCurator\n\nGreat job! You\'ve mastered basic file operations.';
        success = true;
      } else if (lab.id === 'linux-bash-2' && code.includes('chmod 755') && code.includes('deploy.sh')) {
        result = '-rwxr-xr-x 1 user user 0 Jan 15 10:30 deploy.sh\n✅ File permissions set correctly!\n\nExcellent! You understand file permissions now.';
        success = true;
      } else if (lab.id === 'linux-bash-3' && code.includes('DEPLOY_ENV') && code.includes('PATH')) {
        result = 'DEPLOY_ENV: production\nPATH: /opt/mytools:/usr/local/bin:/usr/bin:/bin\n✅ Environment variables configured correctly!';
        success = true;
      } else if (code.includes('echo') || code.includes('ls') || code.includes('mkdir')) {
        result = 'Command executed, but doesn\'t match the expected solution.\n💡 Hint: Check the instructions carefully and make sure you\'re following all the steps.';
      } else {
        result = '❌ Please write the required commands. Check the instructions and try again.';
      }
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

  const handleCommentSubmit = () => {
    if (newComment.trim() && rating > 0) {
      const comment = {
        id: comments.length + 1,
        user: user?.name || 'Anonymous',
        comment: newComment,
        rating,
        date: new Date().toISOString().split('T')[0]
      };
      setComments([comment, ...comments]);
      setNewComment('');
      setRating(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
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
                <p className="text-sm text-gray-600 capitalize">{lab.category.replace('-', ' & ')} • {lab.difficulty}</p>
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
              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Comments ({comments.length})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Instructions Panel */}
          <div className="space-y-6">
            {/* Main Instructions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-5 w-5 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Instructions</h2>
              </div>
              
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 mb-4">{lab.description}</p>
                <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-4">
                  <p className="text-purple-800 font-medium">Task:</p>
                  <p className="text-purple-700">{lab.instructions}</p>
                </div>
              </div>
            </div>

            {/* Learning Outcome */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Learning Outcome</h2>
              </div>
              <p className="text-gray-700">{lab.learningOutcome}</p>
            </div>

            {/* Theory */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                <h2 className="text-xl font-bold text-gray-900">Theory & Concepts</h2>
              </div>
              <p className="text-gray-700 mb-4">{lab.theory}</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-800 mb-2">Real-World Application:</p>
                <p className="text-sm text-blue-700">{lab.realWorldUse}</p>
              </div>
            </div>

            {/* Validation Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Validation Criteria:</h3>
              <p className="text-sm text-gray-600">{lab.validation.description}</p>
              
              {!isCompleted && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
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
          </div>

          {/* Code Editor Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-white text-sm font-medium">
                    {lab.category === 'linux-bash' ? 'terminal' : 'editor'}
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

            {/* Comments Section */}
            {showComments && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Comments & Feedback</h3>
                
                {/* Add Comment */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rate this lab:</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className={`${rating >= star ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                        >
                          <Star className="h-5 w-5 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts about this lab..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <button
                    onClick={handleCommentSubmit}
                    disabled={!newComment.trim() || rating === 0}
                    className="mt-2 flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    <span>Post Comment</span>
                  </button>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-200 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{comment.user}</span>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${star <= comment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{comment.date}</span>
                      </div>
                      <p className="text-gray-700">{comment.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}