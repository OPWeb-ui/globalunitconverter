
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ALL_TOOLS } from '../constants';

const AvailableConvertersDrawer: React.FC = () => {
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/$/, '') || '/';
  
  // Group tools by category for better scanning
  const categories = [
    { id: 'unit', label: 'Unit Converters', tools: ALL_TOOLS.filter(t => t.category === 'unit') },
    { id: 'date', label: 'Date & Time', tools: ALL_TOOLS.filter(t => t.category === 'date') },
    { id: 'finance', label: 'Finance', tools: ALL_TOOLS.filter(t => t.category === 'finance') },
  ];

  return (
    <nav className="w-full flex flex-col gap-8 select-none">
      {categories.map((cat) => (
        <div key={cat.id} className="flex flex-col gap-3">
          <h3 className="text-[10px] font-bold text-textMuted/50 uppercase tracking-widest pl-3">
            {cat.label}
          </h3>
          <div className="flex flex-col border-l border-border/60 ml-3 pl-3 space-y-0.5">
            {cat.tools.map((tool) => {
              const isActive = normalizedPath === `/${tool.id}`;
              return (
                <NavLink
                  key={tool.id}
                  to={`/${tool.id}`}
                  className={`
                    text-[13px] font-medium py-1.5 transition-colors duration-200 block -ml-[13px] pl-[12px] border-l
                    ${isActive 
                      ? 'text-textMain border-primary font-semibold' 
                      : 'text-textMuted hover:text-textMain border-transparent hover:border-border'
                    }
                  `}
                >
                  {tool.name}
                </NavLink>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default AvailableConvertersDrawer;
