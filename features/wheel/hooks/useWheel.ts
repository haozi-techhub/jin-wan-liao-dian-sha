import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { drawWheelOnCanvas } from '@/features/wheel/lib/wheelCanvas';
import { easeOut, getWinnerIndex, parseWheelOptions } from '@/features/wheel/lib/wheelMath';

interface UseWheelResult {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  inputValue: string;
  players: string[];
  isSpinning: boolean;
  isResultOpen: boolean;
  winner: string;
  setInputValue: (value: string) => void;
  startWheel: () => void;
  spinWheel: () => void;
  resetWheel: () => void;
  closeResult: () => void;
  spinAgain: () => void;
}

export function useWheel(): UseWheelResult {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spinTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startAngleRef = useRef(0);
  const spinAngleRef = useRef(0);
  const spinTimeRef = useRef(0);
  const spinTimeTotalRef = useRef(0);

  const [inputValue, setInputValue] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [winner, setWinner] = useState('');

  const arc = useMemo(() => {
    if (players.length === 0) {
      return 0;
    }

    return (Math.PI * 2) / players.length;
  }, [players.length]);

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    drawWheelOnCanvas(canvas, players, arc, startAngleRef.current);
  }, [arc, players]);

  const showResult = useCallback((selectedWinner: string) => {
    setWinner(selectedWinner);
    setIsResultOpen(true);
  }, []);

  const stopRotateWheel = useCallback(() => {
    if (spinTimeoutRef.current) {
      clearTimeout(spinTimeoutRef.current);
      spinTimeoutRef.current = null;
    }

    setIsSpinning(false);
    showResult(players[getWinnerIndex(startAngleRef.current, arc)] ?? '');
  }, [arc, players, showResult]);

  const rotateWheel = useCallback(() => {
    spinTimeRef.current += 30;

    if (spinTimeRef.current >= spinTimeTotalRef.current) {
      stopRotateWheel();
      return;
    }

    const spinAngleIncrement =
      spinAngleRef.current -
      easeOut(spinTimeRef.current, 0, spinAngleRef.current, spinTimeTotalRef.current);

    startAngleRef.current += (spinAngleIncrement * Math.PI) / 180;
    drawWheel();
    spinTimeoutRef.current = setTimeout(rotateWheel, 30);
  }, [drawWheel, stopRotateWheel]);

  const spinWheel = useCallback(() => {
    if (isSpinning || players.length < 2) {
      return;
    }

    setIsSpinning(true);
    spinAngleRef.current = Math.random() * 10 + 20;
    spinTimeRef.current = 0;
    spinTimeTotalRef.current = Math.random() * 2000 + 4000;
    rotateWheel();
  }, [isSpinning, players.length, rotateWheel]);

  const startWheel = useCallback(() => {
    const trimmedInput = inputValue.trim();

    if (!trimmedInput) {
      alert('请至少输入 2 个选项。');
      return;
    }

    const nextPlayers = parseWheelOptions(trimmedInput);
    if (nextPlayers.length < 2) {
      alert('请至少输入 2 个选项。');
      return;
    }

    startAngleRef.current = 0;
    setPlayers(nextPlayers);
  }, [inputValue]);

  const closeResult = useCallback(() => {
    setIsResultOpen(false);
  }, []);

  const spinAgain = useCallback(() => {
    closeResult();
    setTimeout(() => spinWheel(), 300);
  }, [closeResult, spinWheel]);

  const resetWheel = useCallback(() => {
    if (spinTimeoutRef.current) {
      clearTimeout(spinTimeoutRef.current);
      spinTimeoutRef.current = null;
    }

    setPlayers([]);
    setInputValue('');
    setWinner('');
    setIsSpinning(false);
    setIsResultOpen(false);
    startAngleRef.current = 0;
  }, []);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current);
      }
    };
  }, []);

  return {
    canvasRef,
    inputValue,
    players,
    isSpinning,
    isResultOpen,
    winner,
    setInputValue,
    startWheel,
    spinWheel,
    resetWheel,
    closeResult,
    spinAgain
  };
}
