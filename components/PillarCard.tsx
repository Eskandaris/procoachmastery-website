'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PillarCardProps {
  number: number;
  title: string;
  goal: string;
  modules: string[];
  result: string;
}

export function PillarCard({ number, title, goal, modules, result }: PillarCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="card border-none">
      {/* Titel met nummer */}
      <h3 className="text-xl font-bold text-primary mb-4">{number}) {title}</h3>
      
      {/* Doel sectie */}
      <div className="mb-4">
        <p className="text-gray-700 text-sm">{goal}</p>
      </div>
      
      {/* Modules en resultaat sectie */}
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-primary mb-2 hover:opacity-80 transition-opacity bg-transparent border-none outline-none"
          style={{ fontSize: '1.125rem' }}
        >
          <span>Modules en resultaat</span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-primary" />
          ) : (
            <ChevronDown className="w-5 h-5 text-primary" />
          )}
        </button>
        {isExpanded && (
          <div className="bg-transparent">
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-3">
              {modules.map((module, i) => (
                <li key={i}>{module}</li>
              ))}
            </ul>
            <p className="text-gray-700 text-sm italic">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

