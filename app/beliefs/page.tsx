'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ArrowLeft, GitCommit, Plus, Calendar, SignIn, Pencil, Trash, X, Check } from '@phosphor-icons/react';

interface Belief {
  id: string;
  date: string;
  message: string;
  type: 'principle' | 'discovery';
}

export default function BeliefsPage() {
  const { data: session, status } = useSession();
  const [beliefs, setBeliefs] = useState<Belief[]>([]);
  const [newCommit, setNewCommit] = useState('');
  const [beliefType, setBeliefType] = useState<'principle' | 'discovery'>('principle');
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState('');
  const [editType, setEditType] = useState<'principle' | 'discovery'>('principle');
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');

  // Delete state
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const isAuthenticated = status === 'authenticated';

  // Fetch beliefs on mount
  useEffect(() => {
    fetchBeliefs();
  }, []);

  const fetchBeliefs = async () => {
    try {
      const res = await fetch('/api/beliefs');
      if (res.ok) {
        const data = await res.json();
        setBeliefs(data);
      }
    } catch (err) {
      console.error('Failed to fetch beliefs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!newCommit.trim()) return;
    
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/beliefs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: newCommit.trim(),
          type: beliefType,
        }),
      });

      if (res.ok) {
        const newBelief = await res.json();
        setBeliefs([newBelief, ...beliefs]);
        setNewCommit('');
        setShowInput(false);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to add belief');
      }
    } catch (err) {
      setError('Failed to add belief');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (belief: Belief) => {
    setEditingId(belief.id);
    setEditMessage(belief.message);
    setEditType(belief.type);
    setUpdateError('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditMessage('');
    setEditType('principle');
    setUpdateError('');
  };

  const handleUpdate = async (id: string) => {
    if (!editMessage.trim()) return;

    setUpdating(true);
    setUpdateError('');

    try {
      const res = await fetch(`/api/beliefs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: editMessage.trim(),
          type: editType,
        }),
      });

      if (res.ok) {
        const updatedBelief = await res.json();
        setBeliefs(beliefs.map(b => b.id === id ? updatedBelief : b));
        handleCancelEdit();
      } else {
        const data = await res.json();
        setUpdateError(data.error || 'Failed to update belief');
      }
    } catch (err) {
      setUpdateError('Failed to update belief');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id);
    setDeleteError('');
  };

  const handleDeleteConfirm = async (id: string) => {
    setDeleting(true);
    setDeleteError('');

    try {
      const res = await fetch(`/api/beliefs/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setBeliefs(beliefs.filter(b => b.id !== id));
        setDeleteConfirmId(null);
      } else {
        const data = await res.json();
        setDeleteError(data.error || 'Failed to delete belief');
      }
    } catch (err) {
      setDeleteError('Failed to delete belief');
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmId(null);
    setDeleteError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/home"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span style={{ fontFamily: 'monospace' }}>back to home</span>
          </Link>

          {!isAuthenticated && (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
            >
              <SignIn size={20} />
              <span style={{ fontFamily: 'monospace' }}>admin</span>
            </Link>
          )}
        </div>

        <h1 
          className="text-4xl font-bold mb-4"
          style={{ fontFamily: 'monospace' }}
        >
          💭 What I Believe
        </h1>
        
        <p className="text-gray-400 mb-2" style={{ fontFamily: 'monospace' }}>
          A commit history of my evolving principles & discoveries.
        </p>
        <p className="text-gray-500 text-sm mb-8" style={{ fontFamily: 'monospace' }}>
          Like git commits, but for ideas. Each entry is timestamped and immutable.
        </p>

        {/* Commit-style timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700" />

          {/* Add new commit button - only show when authenticated */}
          {isAuthenticated && (
            <div className="relative mb-6">
              {!showInput ? (
                <button
                  onClick={() => setShowInput(true)}
                  className="flex items-center gap-3 ml-0 pl-10 py-3 text-gray-400 hover:text-green-400 transition-colors group"
                  style={{ fontFamily: 'monospace' }}
                >
                  <div className="absolute left-2 w-5 h-5 rounded-full bg-gray-800 border-2 border-gray-600 group-hover:border-green-500 flex items-center justify-center">
                    <Plus size={12} className="text-gray-500 group-hover:text-green-400" />
                  </div>
                  Add a new belief...
                </button>
              ) : (
                <div className="ml-10 mb-4">
                  <textarea
                    value={newCommit}
                    onChange={(e) => setNewCommit(e.target.value)}
                    placeholder="What do you believe today?"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none resize-none"
                    rows={3}
                    style={{ fontFamily: 'monospace' }}
                  />
                  
                  {/* Type selector */}
                  <div className="flex gap-2 mt-2 mb-2">
                    <button
                      onClick={() => setBeliefType('principle')}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        beliefType === 'principle'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-400 hover:text-white'
                      }`}
                      style={{ fontFamily: 'monospace' }}
                    >
                      principle
                    </button>
                    <button
                      onClick={() => setBeliefType('discovery')}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        beliefType === 'discovery'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-400 hover:text-white'
                      }`}
                      style={{ fontFamily: 'monospace' }}
                    >
                      discovery
                    </button>
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm mb-2" style={{ fontFamily: 'monospace' }}>
                      {error}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={handleSubmit}
                      disabled={submitting || !newCommit.trim()}
                      className="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded text-sm transition-colors"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {submitting ? 'Committing...' : 'Commit belief'}
                    </button>
                    <button
                      onClick={() => {
                        setNewCommit('');
                        setShowInput(false);
                        setError('');
                      }}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                      style={{ fontFamily: 'monospace' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="ml-10 text-gray-500 py-4" style={{ fontFamily: 'monospace' }}>
              Loading beliefs...
            </div>
          )}

          {/* Commit entries */}
          {!loading && beliefs.map((belief) => (
            <div key={belief.id} className="relative mb-6 group">
              {/* Commit dot */}
              <div className="absolute left-2 w-5 h-5 rounded-full bg-gray-800 border-2 border-green-500 flex items-center justify-center">
                <GitCommit size={10} className="text-green-400" />
              </div>

              {/* Commit content */}
              <div className="ml-10 bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                {editingId === belief.id ? (
                  // Edit mode - expandable form
                  <div>
                    <textarea
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                      placeholder="What do you believe?"
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none resize-none mb-2"
                      rows={3}
                      style={{ fontFamily: 'monospace' }}
                    />
                    
                    {/* Type selector */}
                    <div className="flex gap-2 mb-2">
                      <button
                        onClick={() => setEditType('principle')}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          editType === 'principle'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-400 hover:text-white'
                        }`}
                        style={{ fontFamily: 'monospace' }}
                      >
                        principle
                      </button>
                      <button
                        onClick={() => setEditType('discovery')}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          editType === 'discovery'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-700 text-gray-400 hover:text-white'
                        }`}
                        style={{ fontFamily: 'monospace' }}
                      >
                        discovery
                      </button>
                    </div>

                    {updateError && (
                      <p className="text-red-400 text-sm mb-2" style={{ fontFamily: 'monospace' }}>
                        {updateError}
                      </p>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(belief.id)}
                        disabled={updating || !editMessage.trim()}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded text-sm transition-colors flex items-center gap-1"
                        style={{ fontFamily: 'monospace' }}
                      >
                        <Check size={14} />
                        {updating ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={updating}
                        className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded text-sm transition-colors flex items-center gap-1"
                        style={{ fontFamily: 'monospace' }}
                      >
                        <X size={14} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar size={14} />
                        <span style={{ fontFamily: 'monospace' }}>{belief.date}</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          belief.type === 'principle' 
                            ? 'bg-blue-900/50 text-blue-400' 
                            : 'bg-purple-900/50 text-purple-400'
                        }`}>
                          {belief.type}
                        </span>
                      </div>

                      {/* Edit/Delete buttons - only show when authenticated */}
                      {isAuthenticated && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(belief)}
                            className="p-1.5 text-gray-500 hover:text-blue-400 transition-colors rounded"
                            title="Edit belief"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(belief.id)}
                            className="p-1.5 text-gray-500 hover:text-red-400 transition-colors rounded"
                            title="Delete belief"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                    <p 
                      className="text-gray-200"
                      style={{ fontFamily: 'monospace', lineHeight: '1.6' }}
                    >
                      &quot;{belief.message}&quot;
                    </p>
                  </>
                )}
              </div>

              {/* Delete confirmation dialog */}
              {deleteConfirmId === belief.id && (
                <div className="ml-10 mt-2 bg-gray-900 border border-red-500 rounded-lg p-4">
                  <p className="text-gray-300 mb-3 text-sm" style={{ fontFamily: 'monospace' }}>
                    Are you sure you want to delete this belief? This action cannot be undone.
                  </p>
                  {deleteError && (
                    <p className="text-red-400 text-sm mb-2" style={{ fontFamily: 'monospace' }}>
                      {deleteError}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteConfirm(belief.id)}
                      disabled={deleting}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded text-sm transition-colors flex items-center gap-1"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                    <button
                      onClick={handleDeleteCancel}
                      disabled={deleting}
                      className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded text-sm transition-colors"
                      style={{ fontFamily: 'monospace' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Empty state */}
          {!loading && beliefs.length === 0 && (
            <div className="ml-10 text-gray-500 py-4" style={{ fontFamily: 'monospace' }}>
              No beliefs recorded yet.
            </div>
          )}

          {/* End of history marker */}
          {!loading && beliefs.length > 0 && (
            <div className="relative">
              <div className="absolute left-2 w-5 h-5 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gray-600" />
              </div>
              <p className="ml-10 text-gray-600 text-sm py-2" style={{ fontFamily: 'monospace' }}>
                Beginning of belief history
              </p>
            </div>
          )}
        </div>

        {/* Footer note */}
        <div className="mt-12 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'monospace' }}>
            💡 <strong>Time Capsule Concept:</strong> This page tracks the evolution of beliefs over time, 
            like git commits for ideas. Each entry is dated and preserved, allowing you to see how 
            thinking evolves.
          </p>
        </div>
      </div>
    </div>
  );
}
