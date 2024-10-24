import React, { useState } from 'react';
import { Brain, Star, MessageCircle, CheckCircle } from 'lucide-react';
import NewLead from './NewLead'; // Importa el componente modal

interface FunnelStageProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  leads: Array<{ name: string; contact: string; social: string }>;
}

const FunnelStage: React.FC<FunnelStageProps> = ({ title, count, icon, leads }) => (
  <div className="flex-1 min-w-[200px]">
    <div className="border-b-2 border-blue-600 pb-2 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          {icon}
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-400">{count}</span>
        </div>
      </div>
    </div>
    <div className="min-h-[400px] space-y-2">
      {leads.map((lead, index) => (
        <div key={index} className="border p-2 rounded">
          <p className="font-semibold">{lead.name}</p>
          <p className="text-sm text-gray-500">{lead.contact}</p>
          <p className="text-sm text-gray-500">{lead.social}</p>
        </div>
      ))}
    </div>
  </div>
);

const SalesFunnel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prospects, setProspects] = useState<Array<{ name: string; contact: string; social: string }>>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSaveLead = (lead: { name: string; contact: string; social: string }) => {
    setProspects([...prospects, lead]); // Agregar el nuevo lead a la lista de prospectos
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-pink-500" />
          <h1 className="text-xl font-semibold">Ventas</h1>
          <Star className="w-5 h-5 text-yellow-400" />
          <button className="text-blue-600 text-sm hover:underline ml-2">
            Editar embudo
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <Star className="w-5 h-5" />
            Auto asignación
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-8">
        Descripción del embudo
      </div>

      {/* Botón "Agregar nuevo lead" */}
      <div className="mb-8">
        <button 
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={openModal}
        >
          Agregar nuevo lead
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        <FunnelStage 
          title="Prospectos" 
          count={prospects.length}
          icon={<Star className="w-4 h-4" />}
          leads={prospects}
        />
        {/* Otras etapas */}
        <FunnelStage 
          title="Asignados" 
          count={0}
          icon={<MessageCircle className="w-4 h-4" />}
          leads={[]}
        />
        <FunnelStage 
          title="Contactados" 
          count={0}
          icon={<MessageCircle className="w-4 h-4" />}
          leads={[]}
        />
        <FunnelStage 
          title="Cierre" 
          count={0}
          icon={<CheckCircle className="w-4 h-4" />}
          leads={[]}
        />
      </div>

      {/* Modal para agregar nuevo lead */}
      <NewLead isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveLead} />
    </div>
  );
};

export default SalesFunnel;
