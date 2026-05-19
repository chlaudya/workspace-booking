'use client';

import { SelectedItem } from '@/lib/workspace-data';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkspacePreviewProps {
  selectedItems: SelectedItem[];
}

export function WorkspacePreview({ selectedItems }: WorkspacePreviewProps) {
  const desk = selectedItems.find((item) => item.category === 'desk');
  const chair = selectedItems.find((item) => item.category === 'chair');
  const monitors = selectedItems.filter((item) => item.category === 'monitor');
  const accessories = selectedItems.filter((item) => item.category === 'accessory');
  const lighting = selectedItems.filter((item) => item.category === 'lighting');
  const plants = selectedItems.filter((item) => item.category === 'plant');
  const coffee = selectedItems.filter((item) => item.category === 'coffee');

  const hasItems = selectedItems.length > 0;

  // Define fixed positions for a realistic workspace layout
  const deskTop = 55; // percentage from bottom where desk surface is

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] rounded-3xl overflow-hidden">
      {/* Room Background - Gradient wall */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-orange-50/80 to-amber-100/60" />
      
      {/* Subtle wall texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 0.5px, transparent 0.5px)`,
          backgroundSize: '16px 16px',
        }} />
      </div>

      {/* Floor - Wooden floor effect */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%]">
        <div className="absolute inset-0 bg-gradient-to-t from-amber-200/80 via-amber-100/60 to-transparent" />
        {/* Floor line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-amber-300/40" />
      </div>

      {/* Window light effect */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-white/40 to-transparent" />

      {/* Empty State */}
      <AnimatePresence>
        {!hasItems && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-50"
          >
            <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Start Building Your Workspace</h3>
            <p className="text-muted-foreground max-w-xs">
              Pick items from the catalog to see your dream office come to life
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Workspace Scene */}
      {hasItems && (
        <div className="absolute inset-0">
          {/* === LAYER 1: Plants (background, sides of desk) === */}
          <AnimatePresence>
            {plants.map((plant, index) => (
              <motion.div
                key={`${plant.id}-${index}`}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                className="absolute z-[5]"
                style={{
                  bottom: '18%',
                  right: index === 0 ? '8%' : '3%',
                }}
              >
                <div className="relative w-16 h-20 sm:w-20 sm:h-24 lg:w-24 lg:h-28">
                  <Image
                    src={plant.image}
                    alt={plant.name}
                    fill
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* === LAYER 2: Coffee Machine (left side) === */}
          <AnimatePresence>
            {coffee.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="absolute z-[5]"
                style={{
                  bottom: '20%',
                  left: '5%',
                }}
              >
                <div className="relative w-14 h-18 sm:w-16 sm:h-20 lg:w-20 lg:h-24">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* === LAYER 3: Desk (center foundation) === */}
          <AnimatePresence>
            {desk && (
              <motion.div
                key={desk.id}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="absolute z-[10]"
                style={{
                  bottom: '12%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                <div className="relative w-56 h-36 sm:w-72 sm:h-44 lg:w-80 lg:h-48">
                  <Image
                    src={desk.image}
                    alt={desk.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* === LAYER 4: Items ON the desk surface === */}
          
          {/* Monitors - centered on desk */}
          <AnimatePresence>
            {monitors.map((monitor, index) => {
              const totalMonitors = monitors.reduce((sum, m) => sum + m.quantity, 0);
              const monitorIndex = monitors.slice(0, index).reduce((sum, m) => sum + m.quantity, 0);
              
              return Array.from({ length: monitor.quantity }).map((_, qIndex) => {
                const currentIndex = monitorIndex + qIndex;
                const offset = (currentIndex - (totalMonitors - 1) / 2) * 70;
                
                return (
                  <motion.div
                    key={`${monitor.id}-${index}-${qIndex}`}
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    transition={{ type: 'spring', delay: currentIndex * 0.1 }}
                    className="absolute z-[20]"
                    style={{
                      bottom: desk ? `${deskTop}%` : '45%',
                      left: `calc(50% + ${offset}px)`,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <div className="relative w-20 h-16 sm:w-28 sm:h-20 lg:w-32 lg:h-24">
                      <Image
                        src={monitor.image}
                        alt={monitor.name}
                        fill
                        className="object-contain drop-shadow-xl"
                      />
                    </div>
                  </motion.div>
                );
              });
            })}
          </AnimatePresence>

          {/* Lighting - desk lamp on right side of desk */}
          <AnimatePresence>
            {lighting.map((light, index) => (
              <motion.div
                key={`${light.id}-${index}`}
                initial={{ opacity: 0, y: -15, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', delay: 0.15 }}
                className="absolute z-[25]"
                style={{
                  bottom: desk ? `${deskTop - 2}%` : '43%',
                  right: '22%',
                }}
              >
                <div className="relative w-12 h-16 sm:w-14 sm:h-20 lg:w-16 lg:h-24">
                  <Image
                    src={light.image}
                    alt={light.name}
                    fill
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Accessories - spread across desk surface */}
          <AnimatePresence>
            {accessories.map((accessory, index) => {
              // Position accessories in a natural layout on the desk
              const positions = [
                { bottom: desk ? `${deskTop - 8}%` : '38%', left: '35%' }, // keyboard
                { bottom: desk ? `${deskTop - 6}%` : '40%', left: '55%' }, // mouse
                { bottom: desk ? `${deskTop - 3}%` : '42%', left: '28%' }, // laptop stand
                { bottom: desk ? `${deskTop + 2}%` : '47%', left: '68%' }, // headphones
                { bottom: desk ? `${deskTop - 4}%` : '41%', left: '72%' }, // webcam
                { bottom: desk ? `${deskTop - 5}%` : '40%', left: '25%' }, // monitor stand
              ];
              const pos = positions[index % positions.length];
              
              return (
                <motion.div
                  key={`${accessory.id}-${index}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: 'spring', delay: 0.1 + index * 0.05 }}
                  className="absolute z-[22]"
                  style={pos}
                >
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14">
                    <Image
                      src={accessory.image}
                      alt={accessory.name}
                      fill
                      className="object-contain drop-shadow-md"
                    />
                  </div>
                  {accessory.quantity > 1 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground rounded-full text-[9px] flex items-center justify-center font-bold shadow-sm">
                      {accessory.quantity}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* === LAYER 5: Chair (in front of desk) === */}
          <AnimatePresence>
            {chair && (
              <motion.div
                key={chair.id}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
                className="absolute z-[30]"
                style={{
                  bottom: '5%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                <div className="relative w-28 h-36 sm:w-32 sm:h-44 lg:w-40 lg:h-52">
                  <Image
                    src={chair.image}
                    alt={chair.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Ambient lighting effects */}
      <div className="absolute top-10 left-1/4 w-32 h-32 rounded-full bg-amber-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
    </div>
  );
}
