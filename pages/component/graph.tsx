import React, { useEffect, useRef } from 'react';

export default function DesmosGraph({ Fx, points }) {
  const eltRef = useRef(null);
  const calculatorRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && eltRef.current) {
      import('desmos').then(Desmos => {
        // ถ้า calculator ยังไม่ถูกสร้าง → สร้างใหม่
        if (!calculatorRef.current) {
          calculatorRef.current = Desmos.GraphingCalculator(eltRef.current, {
            expressions: false,
            grid: false,
          });
        }

        const calculator = calculatorRef.current;

        // เคลียร์กราฟทุกครั้งก่อน plot ใหม่
        calculator.setExpressions([]);

        // plot equation
        if (Fx && typeof Fx === 'string' && Fx.trim() !== '') {
          calculator.setExpression({
            id: 'graph',
            latex: Fx,
            color: Desmos.Colors.BLUE,
          });
        }

        // plot table
        const x = Array.isArray(Fx?.result?.x) ? Fx.result.x : [Fx?.result?.x ?? 0];
        const fx = Array.isArray(Fx?.result?.fx) ? Fx.result.fx : [Fx?.result?.fx ?? 0];
        calculator.setExpression({
          id: 'table',
          type: 'table',
          columns: [
            { latex: 'x', values: x.map(String) },
            { latex: 'f(x)', values: fx.map(String) },
          ],
        });

        // plot points
        if (Array.isArray(points)) {
          points.forEach((pt, idx) => {
            if (pt.x !== undefined && pt.y !== undefined) {
              calculator.setExpression({
                id: `pt${idx}`,
                latex: `(${pt.x},${pt.y})`,
                color: Desmos.Colors.RED,
              });
            }
          });
        }

        // resize ให้ตรง container ปัจจุบัน
        calculator.resize();
      });
    }
  }, [Fx, points]);

  // 🔑 fix ขนาด container ให้แน่นอน
  return (
    <div
      ref={eltRef}
      style={{ width: '600px', height: '400px', border: '1px solid #ccc' }}
    />
  );
}
