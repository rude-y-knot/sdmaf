import React from 'react';

interface BlueprintVisualizerProps {
  type: string;
  ralColorHex?: string;
  className?: string;
  dimensions?: { length: number; width: number; height: number };
}

export const BlueprintVisualizer: React.FC<BlueprintVisualizerProps> = ({
  type,
  ralColorHex = '#55AA53',
  className = 'w-full h-full',
  dimensions = { length: 2000, width: 620, height: 850 },
}) => {
  return (
    <div className={`relative bg-[#1A202C] text-[#E2E8F0] overflow-hidden rounded-2xl flex items-center justify-center p-4 select-none ${className}`}>
      {/* Grid Pattern simulating CAD engineering coordinate grid */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`cadGrid-${type}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#60A5FA" strokeWidth="0.5" />
          </pattern>
          <pattern id={`cadGridMajor-${type}`} width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill={`url(#cadGrid-${type})`} />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#60A5FA" strokeWidth="1" strokeOpacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#cadGridMajor-${type})`} />
      </svg>

      {/* CAD Overlay Corner Stamps */}
      <div className="absolute top-3 left-3 flex items-center gap-2 text-[10px] font-mono tracking-wider text-emerald-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>CAD 2D/3D WIREFRAME • М 1:20</span>
      </div>

      <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
        ГОСТ 2.102 • КМД
      </div>

      {/* SVG Schematics based on product type */}
      <svg viewBox="0 0 600 360" className="w-full h-full max-h-[280px] drop-shadow-lg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#60A5FA" />
          </marker>
        </defs>

        {type === 'bench' && (
          <g>
            {/* Dimension Lines */}
            <line x1="80" y1="50" x2="520" y2="50" stroke="#60A5FA" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
            <text x="300" y="42" fill="#93C5FD" fontSize="12" fontFamily="monospace" textAnchor="middle">L = {dimensions.length} мм</text>
            <line x1="60" y1="90" x2="60" y2="290" stroke="#60A5FA" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
            <text x="45" y="195" fill="#93C5FD" fontSize="12" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 45,195)">H = {dimensions.height} мм</text>

            {/* Bench Legs Laser cut Steel */}
            <path d="M 120 290 L 140 180 L 120 120 L 180 120 L 200 180 L 190 290 Z" fill="none" stroke={ralColorHex} strokeWidth="3" strokeLinejoin="round" />
            <path d="M 420 290 L 440 180 L 420 120 L 480 120 L 500 180 L 490 290 Z" fill="none" stroke={ralColorHex} strokeWidth="3" strokeLinejoin="round" />

            {/* Wooden slats */}
            <rect x="90" y="115" width="420" height="12" rx="2" fill="#D97706" opacity="0.8" stroke="#F59E0B" strokeWidth="1" />
            <rect x="90" y="132" width="420" height="12" rx="2" fill="#D97706" opacity="0.8" stroke="#F59E0B" strokeWidth="1" />
            <rect x="90" y="149" width="420" height="12" rx="2" fill="#D97706" opacity="0.8" stroke="#F59E0B" strokeWidth="1" />
            <rect x="90" y="166" width="420" height="12" rx="2" fill="#D97706" opacity="0.8" stroke="#F59E0B" strokeWidth="1" />

            {/* Backrest slats */}
            <rect x="90" y="85" width="420" height="12" rx="2" fill="#D97706" opacity="0.8" stroke="#F59E0B" strokeWidth="1" />
            <rect x="90" y="68" width="420" height="12" rx="2" fill="#D97706" opacity="0.8" stroke="#F59E0B" strokeWidth="1" />

            {/* Laser cut side ribs */}
            <line x1="160" y1="180" x2="460" y2="180" stroke={ralColorHex} strokeWidth="2.5" strokeDasharray="6,4" />
            <circle cx="155" cy="290" r="4" fill="#60A5FA" />
            <circle cx="455" cy="290" r="4" fill="#60A5FA" />
            <text x="300" y="325" fill="#94A3B8" fontSize="11" fontFamily="monospace" textAnchor="middle">Анкерное основание 4х М12 DIN 933</text>
          </g>
        )}

        {type === 'urn' && (
          <g>
            <line x1="180" y1="40" x2="420" y2="40" stroke="#60A5FA" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
            <text x="300" y="32" fill="#93C5FD" fontSize="12" fontFamily="monospace" textAnchor="middle">Ø = {dimensions.width} мм</text>
            <line x1="140" y1="60" x2="140" y2="290" stroke="#60A5FA" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
            <text x="125" y="180" fill="#93C5FD" fontSize="12" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 125,180)">H = {dimensions.height} мм</text>

            {/* Outer body */}
            <rect x="220" y="80" width="160" height="200" rx="8" fill="none" stroke={ralColorHex} strokeWidth="3" />
            {/* Inner bin */}
            <rect x="235" y="95" width="130" height="175" rx="4" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4,4" />
            {/* Stainless ash hood */}
            <path d="M 210 78 L 300 48 L 390 78 Z" fill="none" stroke="#E2E8F0" strokeWidth="2.5" />
            <line x1="220" y1="78" x2="380" y2="78" stroke="#E2E8F0" strokeWidth="2" />
            {/* Axis pivot */}
            <circle cx="300" cy="170" r="6" fill="#F59E0B" />
            <text x="320" y="174" fill="#F59E0B" fontSize="10" fontFamily="monospace">Ось откидывания</text>
            {/* Base leg */}
            <line x1="300" y1="280" x2="300" y2="330" stroke={ralColorHex} strokeWidth="6" />
            <rect x="260" y="326" width="80" height="8" fill="#64748B" />
          </g>
        )}

        {type === 'pergola' && (
          <g>
            <line x1="80" y1="40" x2="520" y2="40" stroke="#60A5FA" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
            <text x="300" y="32" fill="#93C5FD" fontSize="12" fontFamily="monospace" textAnchor="middle">L = {dimensions.length} мм</text>
            {/* Columns */}
            <rect x="120" y="70" width="16" height="230" fill={ralColorHex} />
            <rect x="464" y="70" width="16" height="230" fill={ralColorHex} />
            {/* Main beam */}
            <rect x="90" y="70" width="420" height="22" rx="2" fill="none" stroke={ralColorHex} strokeWidth="3" />
            {/* Wooden shadow louvers */}
            {Array.from({ length: 9 }).map((_, i) => (
              <rect key={i} x={110 + i * 44} y="55" width="10" height="42" rx="1" fill="#D97706" opacity="0.85" stroke="#F59E0B" strokeWidth="1" transform={`rotate(20 ${110 + i * 44} 55)`} />
            ))}
            {/* Footing anchors */}
            <rect x="100" y="295" width="56" height="15" fill="#475569" stroke="#94A3B8" />
            <rect x="444" y="295" width="56" height="15" fill="#475569" stroke="#94A3B8" />
            <text x="300" y="335" fill="#94A3B8" fontSize="11" fontFamily="monospace" textAnchor="middle">Закладные под бетонирование h=600 мм</text>
          </g>
        )}

        {type === 'gazebo' && (
          <g>
            <line x1="80" y1="35" x2="520" y2="35" stroke="#60A5FA" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
            <text x="300" y="28" fill="#93C5FD" fontSize="12" fontFamily="monospace" textAnchor="middle">L = {dimensions.length} мм</text>
            {/* Gazebo Roof Truss */}
            <polygon points="120 100 300 45 480 100 460 115 300 70 140 115" fill={ralColorHex} stroke="#60A5FA" strokeWidth="1.5" />
            {/* Columns */}
            <rect x="140" y="115" width="16" height="175" fill={ralColorHex} />
            <rect x="444" y="115" width="16" height="175" fill={ralColorHex} />
            <rect x="292" y="115" width="16" height="175" fill={ralColorHex} />
            {/* Floor deck */}
            <rect x="100" y="280" width="400" height="12" rx="2" fill="#D97706" opacity="0.85" stroke="#F59E0B" strokeWidth="1" />
            <line x1="80" y1="292" x2="520" y2="292" stroke="#64748B" strokeWidth="4" />
          </g>
        )}

        {type === 'light' && (
          <g>
            <line x1="180" y1="50" x2="180" y2="290" stroke="#60A5FA" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
            <text x="165" y="175" fill="#93C5FD" fontSize="12" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 165,175)">H = {dimensions.height} мм</text>
            {/* Pole Mast */}
            <polygon points="296 70 304 70 310 290 290 290" fill={ralColorHex} stroke="#60A5FA" strokeWidth="1" />
            {/* Luminaire Console */}
            <path d="M 300 70 C 300 40, 360 40, 390 60 L 400 80 L 350 80 Z" fill={ralColorHex} stroke="#60A5FA" strokeWidth="1.5" />
            <ellipse cx="375" cy="80" rx="20" ry="6" fill="#FDE047" opacity="0.8" />
            {/* Flange base */}
            <rect x="270" y="288" width="60" height="10" fill="#475569" stroke="#94A3B8" />
            <circle cx="280" cy="293" r="3" fill="#60A5FA" />
            <circle cx="320" cy="293" r="3" fill="#60A5FA" />
          </g>
        )}

        {type === 'art' && (
          <g>
            <line x1="120" y1="45" x2="480" y2="45" stroke="#60A5FA" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
            <text x="300" y="36" fill="#93C5FD" fontSize="12" fontFamily="monospace" textAnchor="middle">L = {dimensions.length} мм</text>
            {/* Geometric Art Portal / Polyline */}
            <polygon points="300 70 420 160 380 280 220 280 180 160" fill="none" stroke={ralColorHex} strokeWidth="3.5" />
            <polygon points="300 110 380 175 350 250 250 250 220 175" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="6,4" />
            <line x1="300" y1="70" x2="300" y2="110" stroke="#60A5FA" strokeWidth="1.5" />
            <line x1="420" y1="160" x2="380" y2="175" stroke="#60A5FA" strokeWidth="1.5" />
            <line x1="380" y1="280" x2="350" y2="250" stroke="#60A5FA" strokeWidth="1.5" />
            <line x1="220" y1="280" x2="250" y2="250" stroke="#60A5FA" strokeWidth="1.5" />
            <line x1="180" y1="160" x2="220" y2="175" stroke="#60A5FA" strokeWidth="1.5" />
            <line x1="140" y1="285" x2="460" y2="285" stroke="#64748B" strokeWidth="4" />
          </g>
        )}

        {type === 'sport' && (
          <g>
            <line x1="100" y1="40" x2="500" y2="40" stroke="#60A5FA" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
            <text x="300" y="32" fill="#93C5FD" fontSize="12" fontFamily="monospace" textAnchor="middle">L = {dimensions.length} мм</text>
            {/* Workout Racks */}
            <rect x="140" y="60" width="12" height="230" fill={ralColorHex} />
            <rect x="280" y="60" width="12" height="230" fill={ralColorHex} />
            <rect x="440" y="90" width="12" height="200" fill={ralColorHex} />
            {/* Horizontal bars */}
            <line x1="140" y1="75" x2="292" y2="75" stroke="#E2E8F0" strokeWidth="5" />
            <line x1="280" y1="105" x2="452" y2="105" stroke="#E2E8F0" strokeWidth="5" />
            {/* Parallel Bars */}
            <line x1="320" y1="180" x2="420" y2="180" stroke="#E2E8F0" strokeWidth="4" />
            <line x1="100" y1="290" x2="480" y2="290" stroke="#64748B" strokeWidth="4" />
          </g>
        )}

        {(type === 'bike' || type === 'fence' || type === 'grate') && (
          <g>
            <line x1="100" y1="45" x2="500" y2="45" stroke="#60A5FA" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
            <text x="300" y="36" fill="#93C5FD" fontSize="12" fontFamily="monospace" textAnchor="middle">L = {dimensions.length} мм</text>

            {type === 'bike' && (
              <g>
                <path d="M 140 280 C 140 120, 200 100, 240 100 C 280 100, 340 120, 340 280" fill="none" stroke={ralColorHex} strokeWidth="5" />
                <path d="M 280 280 C 280 120, 340 100, 380 100 C 420 100, 480 120, 480 280" fill="none" stroke={ralColorHex} strokeWidth="5" />
                <line x1="100" y1="280" x2="520" y2="280" stroke="#64748B" strokeWidth="4" />
              </g>
            )}

            {type === 'fence' && (
              <g>
                <rect x="120" y="70" width="360" height="200" fill="none" stroke={ralColorHex} strokeWidth="3" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={i} x1={150 + i * 40} y1="70" x2={150 + i * 40} y2="270" stroke={ralColorHex} strokeWidth="2" strokeDasharray="10,5" />
                ))}
                <circle cx="300" cy="170" r="35" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
              </g>
            )}

            {type === 'grate' && (
              <g>
                <circle cx="300" cy="180" r="110" fill="none" stroke={ralColorHex} strokeWidth="4" />
                <circle cx="300" cy="180" r="45" fill="none" stroke="#60A5FA" strokeWidth="2" strokeDasharray="4,4" />
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 300 + 45 * Math.cos(angle);
                  const y1 = 180 + 45 * Math.sin(angle);
                  const x2 = 300 + 110 * Math.cos(angle);
                  const y2 = 180 + 110 * Math.sin(angle);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ralColorHex} strokeWidth="2" />;
                })}
              </g>
            )}
          </g>
        )}
      </svg>

      {/* Bottom status line */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-700/60 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ralColorHex }}></span>
          <span>Цвет покрытия: {ralColorHex}</span>
        </div>
        <div>Точность геометрии: 0,5 мм</div>
      </div>
    </div>
  );
};
