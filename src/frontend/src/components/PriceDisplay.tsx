interface PriceDisplayProps {
  paisa: bigint;
  className?: string;
  showSymbol?: boolean;
}

/** Converts paisa (smallest unit) to rupees. 100 paisa = ₹1 */
export function PriceDisplay({
  paisa,
  className = "",
  showSymbol = true,
}: PriceDisplayProps) {
  const rupees = Number(paisa) / 100;
  const formatted = rupees.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return (
    <span className={className}>
      {showSymbol ? "₹" : ""}
      {formatted}
    </span>
  );
}

export function paisaToRupees(paisa: bigint): number {
  return Number(paisa) / 100;
}

export function rupeesToPaisa(rupees: number): bigint {
  return BigInt(Math.round(rupees * 100));
}
