import React, { useState, useEffect } from 'react';
import { X, Trash2, PencilLine, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../../services/api';
import { Agent } from '../../types/Agent';

interface AgentManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AgentManagementModal: React.FC<AgentManagementModalProps> = ({ isOpen, onClose }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [newAgent, setNewAgent] = useState({ agentName: '', agentEmail: '', agentPhone: '', agentPhoto: '', Tgreranumber: '' });
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'add' | 'update' | 'delete' | null>(null);
  const [targetAgentId, setTargetAgentId] = useState<string | null>(null);

  const fetchAgents = async () => {
    try {
      const res = await apiService.getAgents();
      setAgents(res);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  useEffect(() => {
    if (isOpen) fetchAgents();
  }, [isOpen]);

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone: string) => /^\+?[0-9]{10,15}$/.test(phone);

  const handleDelete = (id: string) => {
    setConfirmAction('delete');
    setTargetAgentId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (targetAgentId) {
      try {
        await apiService.deleteAgent(targetAgentId);
        setAgents(prev => prev.filter(agent => agent.id !== targetAgentId));
        setTargetAgentId(null);
        setShowConfirm(false);
      } catch (error) {
        console.error('Error deleting agent:', error);
      }
    }
  };

  const handleSave = () => {
    if (!newAgent.agentName.trim()) {
      setFormError('Agent name is required.');
      return;
    }
    if (!newAgent.agentEmail.trim() || !isValidEmail(newAgent.agentEmail)) {
      setFormError('A valid email is required.');
      return;
    }
    if (!newAgent.agentPhone.trim() || !isValidPhone(newAgent.agentPhone)) {
      setFormError('A valid phone number is required (10-15 digits).');
      return;
    }
    if (!newAgent.Tgreranumber.trim()) {
      setFormError('TGRERA Number is required.');
      return;
    }
    setFormError(null);
    setConfirmAction(editingAgent ? 'update' : 'add');
    setShowConfirm(true);
  };

  const confirmSave = async () => {
    try {
      const payload = {
        agentName: newAgent.agentName,
        agentEmail: newAgent.agentEmail,
        agentPhone: newAgent.agentPhone,
        agentPhoto: newAgent.agentPhoto,
        Tgreranumber: newAgent.Tgreranumber,
      };

      if (confirmAction === 'update' && editingAgent) {
        const updated = await apiService.updateAgent(editingAgent.id, payload);
        setAgents(prev => prev.map(agent => agent.id === editingAgent.id ? updated : agent));
        setEditingAgent(null);
      } else if (confirmAction === 'add') {
        const created = await apiService.createAgent(payload);
        setAgents(prev => [...prev, created]);
      }
      setNewAgent({ agentName: '', agentEmail: '', agentPhone: '', agentPhoto: '', Tgreranumber: '' });
      setShowConfirm(false);
    } catch (error) {
      console.error('Error saving agent:', error);
    }
  };

  const startEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setNewAgent({
      agentName: agent.agentName,
      agentEmail: agent.agentEmail,
      agentPhone: agent.agentPhone,
      agentPhoto: agent.agentPhoto || '',
      Tgreranumber: agent.Tgreranumber || ''
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl relative"
            initial={{ scale: 0.95, y: -50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -50 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-semibold mb-4">
              {editingAgent ? 'Edit Agent' : 'Add New Agent'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <input
                type="text"
                placeholder="Name"
                className="border rounded px-4 py-2"
                value={newAgent.agentName}
                onChange={(e) => setNewAgent({ ...newAgent, agentName: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="border rounded px-4 py-2"
                value={newAgent.agentEmail}
                onChange={(e) => setNewAgent({ ...newAgent, agentEmail: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone"
                className="border rounded px-4 py-2"
                value={newAgent.agentPhone}
                onChange={(e) => setNewAgent({ ...newAgent, agentPhone: e.target.value })}
              />
              <input
                type="text"
                placeholder="Photo URL (optional)"
                className="border rounded px-4 py-2"
                value={newAgent.agentPhoto}
                onChange={(e) => setNewAgent({ ...newAgent, agentPhoto: e.target.value })}
              />
              <input
                type="text"
                placeholder="TGRERA Number *"
                className="border rounded px-4 py-2"
                value={newAgent.Tgreranumber || ''}
                onChange={(e) => setNewAgent({ ...newAgent, Tgreranumber: e.target.value })}
              />
            </div>

            {formError && <p className="text-red-600 mb-4">{formError}</p>}

            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg mb-6 flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>{editingAgent ? 'Update Agent' : 'Add Agent'}</span>
            </button>

            <div className="border-t pt-4">
              <h3 className="text-xl font-semibold mb-2">All Agents</h3>
              <ul className="space-y-3 max-h-64 overflow-y-auto">
                {agents.map(agent => (
                  <li
                    key={agent.id}
                    className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{agent.agentName}</p>
                      <p className="text-sm text-gray-500">{agent.agentEmail} | {agent.agentPhone}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEdit(agent)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <PencilLine size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(agent.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <AnimatePresence>
              {showConfirm && (
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bg-white rounded-lg p-6 shadow-xl"
                    initial={{ scale: 0.9, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mb-4 text-lg font-medium">
                      {confirmAction === 'delete' && 'Are you sure you want to delete this agent?'}
                      {confirmAction === 'add' && 'Are you sure you want to add this agent?'}
                      {confirmAction === 'update' && 'Are you sure you want to update this agent?'}
                    </p>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setShowConfirm(false)}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      >Cancel</button>
                      <button
                        onClick={confirmAction === 'delete' ? confirmDelete : confirmSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >Confirm</button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AgentManagementModal;
