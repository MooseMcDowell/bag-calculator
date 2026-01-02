'use client';

// BagCalculator.jsx - Main Component File
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function BagCalculator() {
  const [bagType, setBagType] = useState('custom');
  const [bagWidth, setBagWidth] = useState(12);
  const [bagDepth, setBagDepth] = useState(4);
  const [bagHeight, setBagHeight] = useState(8);
  const [seamAllowance, setSeamAllowance] = useState(0.5);
  const [strapWidth, setStrapWidth] = useState(1.5);
  const [strapLength, setStrapLength] = useState(24);
  const [useMetric, setUseMetric] = useState(false);

  const toMetric = (inches) => (inches * 2.54).toFixed(1);
  const formatDimension = (inches) => useMetric ? `${toMetric(inches)} cm` : `${inches.toFixed(2)}"`;

  const bagPresets = {
    'dopp-kit': {
      name: 'Dopp Kit',
      width: 10,
      depth: 5,
      height: 6,
      strapWidth: 0,
      strapLength: 0,
      description: 'Classic toiletry bag with zipper tabs'
    },
    'cosmetic-bag': {
      name: 'Cosmetic Bag',
      width: 8,
      depth: 3,
      height: 5,
      strapWidth: 0.75,
      strapLength: 8,
      description: 'Small makeup and accessories pouch'
    },
    'tote-bag': {
      name: 'Tote Bag',
      width: 14,
      depth: 5,
      height: 12,
      strapWidth: 2,
      strapLength: 24,
      description: 'Everyday carry bag with long straps'
    },
    'duffel-bag': {
      name: 'Duffel Bag',
      width: 22,
      depth: 11,
      height: 11,
      strapWidth: 3,
      strapLength: 48,
      description: 'Large overnight or gym bag'
    },
    'custom': {
      name: 'Custom',
      width: 12,
      depth: 4,
      height: 8,
      strapWidth: 1.5,
      strapLength: 24,
      description: 'Design your own bag dimensions'
    }
  };

  const handleBagTypeChange = (type) => {
    setBagType(type);
    const preset = bagPresets[type];
    setBagWidth(preset.width);
    setBagDepth(preset.depth);
    setBagHeight(preset.height);
    setStrapWidth(preset.strapWidth);
    setStrapLength(preset.strapLength);
  };

  const cornerSquare = bagDepth / 2;
  const fabricWidth = bagWidth + (2 * bagDepth) + (2 * seamAllowance);
  const fabricHeight = (2 * bagHeight) + bagDepth + (2 * seamAllowance);
  const zipperLength = bagWidth + 2;
  const zipperSideWidth = 2 + (2 * seamAllowance);
  const zipperSideLength = bagWidth + (2 * seamAllowance);
  const tabWidth = 2 + (2 * seamAllowance);
  const tabLength = 3 + (2 * seamAllowance);
  const strapCutWidth = strapWidth * 4;
  const strapCutLength = strapLength + (2 * seamAllowance);

  const BagPreview = ({ type, width, depth, height }) => {
    const scale = 0.8;
    const viewWidth = 200;
    const viewHeight = 180;
    
    const normalizedWidth = (width / 22) * 120 * scale;
    const normalizedHeight = (height / 16) * 100 * scale;
    const normalizedDepth = (depth / 12) * 60 * scale;
    
    const centerX = viewWidth / 2;
    const centerY = viewHeight / 2;

    if (type === 'cosmetic-bag') {
      return (
        <svg width={viewWidth} height={viewHeight} viewBox={`0 0 ${viewWidth} ${viewHeight}`}>
          <ellipse cx={centerX} cy={centerY + 10} rx={normalizedWidth * 0.4} ry={normalizedDepth * 0.3} fill="#e9d5ff" opacity="0.3" />
          <rect x={centerX - normalizedWidth * 0.4} y={centerY - normalizedHeight * 0.3} width={normalizedWidth * 0.8} height={normalizedHeight * 0.6} fill="#c084fc" rx="4" />
          <line x1={centerX - normalizedWidth * 0.4} y1={centerY - normalizedHeight * 0.3} x2={centerX + normalizedWidth * 0.4} y2={centerY - normalizedHeight * 0.3} stroke="#7c3aed" strokeWidth="2" />
          <rect x={centerX - normalizedWidth * 0.35} y={centerY - normalizedHeight * 0.35} width={normalizedWidth * 0.7} height="4" fill="#7c3aed" rx="2" />
          <circle cx={centerX - normalizedWidth * 0.2} cy={centerY - normalizedHeight * 0.35} r="3" fill="#fbbf24" />
        </svg>
      );
    }

    if (type === 'dopp-kit') {
      return (
        <svg width={viewWidth} height={viewHeight} viewBox={`0 0 ${viewWidth} ${viewHeight}`}>
          <ellipse cx={centerX} cy={centerY + 15} rx={normalizedWidth * 0.45} ry={normalizedDepth * 0.35} fill="#e9d5ff" opacity="0.3" />
          <rect x={centerX - normalizedWidth * 0.45} y={centerY - normalizedHeight * 0.35} width={normalizedWidth * 0.9} height={normalizedHeight * 0.7} fill="#a78bfa" rx="6" />
          <line x1={centerX - normalizedWidth * 0.45} y1={centerY - normalizedHeight * 0.35} x2={centerX + normalizedWidth * 0.45} y2={centerY - normalizedHeight * 0.35} stroke="#7c3aed" strokeWidth="2.5" />
          <rect x={centerX - normalizedWidth * 0.4} y={centerY - normalizedHeight * 0.4} width={normalizedWidth * 0.8} height="5" fill="#7c3aed" rx="2" />
          <rect x={centerX - normalizedWidth * 0.5} y={centerY - normalizedHeight * 0.42} width="8" height="12" fill="#fbbf24" rx="2" />
          <rect x={centerX + normalizedWidth * 0.42} y={centerY - normalizedHeight * 0.42} width="8" height="12" fill="#fbbf24" rx="2" />
          <circle cx={centerX - normalizedWidth * 0.25} cy={centerY - normalizedHeight * 0.4} r="3" fill="#fbbf24" />
        </svg>
      );
    }

    if (type === 'tote-bag') {
      return (
        <svg width={viewWidth} height={viewHeight} viewBox={`0 0 ${viewWidth} ${viewHeight}`}>
          <ellipse cx={centerX} cy={centerY + 30} rx={normalizedWidth * 0.45} ry={normalizedDepth * 0.25} fill="#e9d5ff" opacity="0.3" />
          <rect x={centerX - normalizedWidth * 0.45} y={centerY - normalizedHeight * 0.4} width={normalizedWidth * 0.9} height={normalizedHeight * 0.9} fill="#8b5cf6" rx="4" />
          <line x1={centerX - normalizedWidth * 0.45} y1={centerY - normalizedHeight * 0.4} x2={centerX + normalizedWidth * 0.45} y2={centerY - normalizedHeight * 0.4} stroke="#6d28d9" strokeWidth="2" />
          <rect x={centerX - normalizedWidth * 0.4} y={centerY - normalizedHeight * 0.45} width={normalizedWidth * 0.8} height="4" fill="#6d28d9" rx="2" />
          <path d={`M ${centerX - normalizedWidth * 0.25} ${centerY - normalizedHeight * 0.45} Q ${centerX - normalizedWidth * 0.25} ${centerY - normalizedHeight * 0.8} ${centerX - normalizedWidth * 0.15} ${centerY - normalizedHeight * 0.4}`} stroke="#6d28d9" strokeWidth="4" fill="none" />
          <path d={`M ${centerX + normalizedWidth * 0.25} ${centerY - normalizedHeight * 0.45} Q ${centerX + normalizedWidth * 0.25} ${centerY - normalizedHeight * 0.8} ${centerX + normalizedWidth * 0.15} ${centerY - normalizedHeight * 0.4}`} stroke="#6d28d9" strokeWidth="4" fill="none" />
        </svg>
      );
    }

    if (type === 'duffel-bag') {
      return (
        <svg width={viewWidth} height={viewHeight} viewBox={`0 0 ${viewWidth} ${viewHeight}`}>
          <ellipse cx={centerX} cy={centerY + 20} rx={normalizedWidth * 0.5} ry={normalizedDepth * 0.4} fill="#e9d5ff" opacity="0.3" />
          <rect x={centerX - normalizedWidth * 0.5} y={centerY - normalizedHeight * 0.3} width={normalizedWidth} height={normalizedHeight * 0.7} fill="#7c3aed" rx="8" />
          <line x1={centerX - normalizedWidth * 0.5} y1={centerY - normalizedHeight * 0.3} x2={centerX + normalizedWidth * 0.5} y2={centerY - normalizedHeight * 0.3} stroke="#5b21b6" strokeWidth="3" />
          <rect x={centerX - normalizedWidth * 0.45} y={centerY - normalizedHeight * 0.35} width={normalizedWidth * 0.9} height="6" fill="#5b21b6" rx="3" />
          <path d={`M ${centerX - normalizedWidth * 0.3} ${centerY - normalizedHeight * 0.35} Q ${centerX} ${centerY - normalizedHeight * 0.5} ${centerX + normalizedWidth * 0.3} ${centerY - normalizedHeight * 0.35}`} stroke="#5b21b6" strokeWidth="5" fill="none" />
          <circle cx={centerX - normalizedWidth * 0.35} cy={centerY - normalizedHeight * 0.35} r="4" fill="#fbbf24" />
          <circle cx={centerX + normalizedWidth * 0.35} cy={centerY - normalizedHeight * 0.35} r="4" fill="#fbbf24" />
        </svg>
      );
    }

    return (
      <svg width={viewWidth} height={viewHeight} viewBox={`0 0 ${viewWidth} ${viewHeight}`}>
        <ellipse cx={centerX} cy={centerY + 20} rx={normalizedWidth * 0.45} ry={normalizedDepth * 0.3} fill="#e9d5ff" opacity="0.3" />
        <rect x={centerX - normalizedWidth * 0.45} y={centerY - normalizedHeight * 0.35} width={normalizedWidth * 0.9} height={normalizedHeight * 0.7} fill="#a78bfa" rx="6" />
        <line x1={centerX - normalizedWidth * 0.45} y1={centerY - normalizedHeight * 0.35} x2={centerX + normalizedWidth * 0.45} y2={centerY - normalizedHeight * 0.35} stroke="#7c3aed" strokeWidth="2.5" />
        <rect x={centerX - normalizedWidth * 0.4} y={centerY - normalizedHeight * 0.4} width={normalizedWidth * 0.8} height="5" fill="#7c3aed" rx="2" />
        <path d={`M ${centerX - normalizedWidth * 0.25} ${centerY - normalizedHeight * 0.4} Q ${centerX} ${centerY - normalizedHeight * 0.65} ${centerX + normalizedWidth * 0.25} ${centerY - normalizedHeight * 0.4}`} stroke="#7c3aed" strokeWidth="4" fill="none" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      {/* ADD GOOGLE ADSENSE CODE HERE - Example placement for top banner ad */}
      {/* <div className="max-w-4xl mx-auto mb-4">
        <ins className="adsbygoogle"
             style={{display:'block'}}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div> */}

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">Lined Bag Fabric Calculator</h1>
          </div>

          <div className="flex items-center gap-2 mb-6 p-3 bg-purple-50 rounded-lg">
            <input
              type="checkbox"
              id="metric-toggle"
              checked={useMetric}
              onChange={(e) => setUseMetric(e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
            />
            <label htmlFor="metric-toggle" className="text-sm font-medium text-gray-700 cursor-pointer">
              Use Metric (cm)
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Bag Type & Dimensions</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Bag Type
                </label>
                <select
                  value={bagType}
                  onChange={(e) => handleBagTypeChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="cosmetic-bag">Cosmetic Bag</option>
                  <option value="dopp-kit">Dopp Kit</option>
                  <option value="tote-bag">Tote Bag</option>
                  <option value="duffel-bag">Duffel Bag</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-4 flex flex-col items-center">
                <p className="text-sm font-medium text-gray-700 mb-2">{bagPresets[bagType].description}</p>
                <BagPreview type={bagType} width={bagWidth} depth={bagDepth} height={bagHeight} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Width (opening): {useMetric ? toMetric(bagWidth) + ' cm' : bagWidth + '"'}
                </label>
                <input
                  type="range"
                  min="6"
                  max="60"
                  step="0.5"
                  value={bagWidth}
                  onChange={(e) => setBagWidth(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Depth (gusset): {useMetric ? toMetric(bagDepth) + ' cm' : bagDepth + '"'}
                </label>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="0.5"
                  value={bagDepth}
                  onChange={(e) => setBagDepth(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Height: {useMetric ? toMetric(bagHeight) + ' cm' : bagHeight + '"'}
                </label>
                <input
                  type="range"
                  min="4"
                  max="40"
                  step="0.5"
                  value={bagHeight}
                  onChange={(e) => setBagHeight(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Seam Allowance: {useMetric ? toMetric(seamAllowance) + ' cm' : seamAllowance + '"'}
                </label>
                <input
                  type="range"
                  min="0.25"
                  max="1"
                  step="0.125"
                  value={seamAllowance}
                  onChange={(e) => setSeamAllowance(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Strap Dimensions</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Finished Width: {useMetric ? toMetric(strapWidth) + ' cm' : strapWidth + '"'}
                </label>
                <input
                  type="range"
                  min="0.75"
                  max="4"
                  step="0.25"
                  value={strapWidth}
                  onChange={(e) => setStrapWidth(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Length: {useMetric ? toMetric(strapLength) + ' cm' : strapLength + '"'}
                </label>
                <input
                  type="range"
                  min="12"
                  max="72"
                  step="1"
                  value={strapLength}
                  onChange={(e) => setStrapLength(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* ADD GOOGLE ADSENSE CODE HERE - Example placement for middle ad */}
          {/* <div className="mb-8">
            <ins className="adsbygoogle"
                 style={{display:'block'}}
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                 data-ad-slot="XXXXXXXXXX"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div> */}

          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Cutting Instructions</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-lg text-purple-700 mb-2">Main Fabric Pieces (Cut 2 - Outer & Lining)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Width</p>
                    <p className="text-2xl font-bold text-gray-800">{formatDimension(fabricWidth)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Height</p>
                    <p className="text-2xl font-bold text-gray-800">{formatDimension(fabricHeight)}</p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-yellow-50 rounded border border-yellow-200">
                  <p className="text-sm font-semibold text-yellow-800">Corner Squares to Remove:</p>
                  <p className="text-lg font-bold text-yellow-900">{formatDimension(cornerSquare)} × {formatDimension(cornerSquare)}</p>
                  <p className="text-xs text-yellow-700 mt-1">Cut one square from each corner (4 total per piece)</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-lg text-purple-700 mb-2">Zipper</h3>
                <div>
                  <p className="text-sm text-gray-600">Length</p>
                  <p className="text-2xl font-bold text-gray-800">{formatDimension(zipperLength)}</p>
                  <p className="text-xs text-gray-500 mt-1">Buy a zipper at least this long</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-lg text-purple-700 mb-2">Zipper Sides (Cut 2)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Width</p>
                    <p className="text-2xl font-bold text-gray-800">{formatDimension(zipperSideWidth)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Length</p>
                    <p className="text-2xl font-bold text-gray-800">{formatDimension(zipperSideLength)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-lg text-purple-700 mb-2">Zipper Tabs (Cut 2)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Width</p>
                    <p className="text-2xl font-bold text-gray-800">{formatDimension(tabWidth)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Length</p>
                    <p className="text-2xl font-bold text-gray-800">{formatDimension(tabLength)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-lg text-purple-700 mb-2">Straps (Cut 2)</h3>
                {strapWidth > 0 && strapLength > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Cut Width</p>
                      <p className="text-2xl font-bold text-gray-800">{formatDimension(strapCutWidth)}</p>
                      <p className="text-xs text-gray-500">Folds to {formatDimension(strapWidth)} finished</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Cut Length</p>
                      <p className="text-2xl font-bold text-gray-800">{formatDimension(strapCutLength)}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 italic">No straps needed for this bag style</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Assembly Notes</h3>
            <ul className="text-sm text-blue-900 space-y-1">
              <li>• After cutting main fabric pieces, mark and cut {formatDimension(cornerSquare)} squares from all four corners</li>
              <li>• Fold corner edges together and sew to create boxed corners</li>
              <li>• Attach zipper sides to zipper tape, then add tabs to each end</li>
              <li>• For straps: fold in half lengthwise, then fold raw edges to center, press and topstitch</li>
              <li>• Sew outer and lining wrong sides together, leaving opening for turning</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ADD GOOGLE ADSENSE CODE HERE - Example placement for bottom ad */}
      {/* <div className="max-w-4xl mx-auto mt-4">
        <ins className="adsbygoogle"
             style={{display:'block'}}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div> */}
    </div>
  );
}