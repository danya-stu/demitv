import React, { useState, useEffect } from 'react';

export const SelectionBox: React.FC = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      // Игнорируем правый клик
      if (e.button !== 0) return;
      
      // Игнорируем клики по интерактивным элементам (кнопки, ссылки, свайпер и т.д.)
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, textarea, select, [role="button"], .swiper-wrapper')) return;

      setIsSelecting(true);
      setStartPos({ x: e.clientX, y: e.clientY });
      setCurrentPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isSelecting) return;
      // Предотвращаем стандартное выделение текста при перетаскивании,
      // если мы рисуем нашу рамку выделения
      e.preventDefault();
      setCurrentPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsSelecting(false);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove, { passive: false });
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSelecting]);

  if (!isSelecting) return null;

  const left = Math.min(startPos.x, currentPos.x);
  const top = Math.min(startPos.y, currentPos.y);
  const width = Math.abs(currentPos.x - startPos.x);
  const height = Math.abs(currentPos.y - startPos.y);

  // Не показываем рамку, если это просто обычный клик (маленькое смещение)
  if (width < 5 && height < 5) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: 'rgba(0, 91, 255, 0.2)', // Полупрозрачный синий (RuStore)
        border: '1px solid rgba(0, 229, 255, 0.6)', // Бирюзовая обводка
        pointerEvents: 'none',
        zIndex: 9999,
        borderRadius: '2px', // Немного скруглим края
      }}
    />
  );
};
