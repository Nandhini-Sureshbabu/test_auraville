"use client";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
};

export function QuantityStepper({ value, onChange, min = 1 }: QuantityStepperProps) {
  return (
    <div className="inline-flex h-11 items-center rounded-lg border border-[var(--line)] bg-white">
      <button
        aria-label="Decrease quantity"
        className="focus-ring h-full w-10 rounded-l-lg text-lg text-[var(--muted)] transition hover:text-[var(--foreground)]"
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        -
      </button>
      <span className="min-w-9 text-center text-sm font-semibold" aria-live="polite">
        {value}
      </span>
      <button
        aria-label="Increase quantity"
        className="focus-ring h-full w-10 rounded-r-lg text-lg text-[var(--muted)] transition hover:text-[var(--foreground)]"
        type="button"
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}
