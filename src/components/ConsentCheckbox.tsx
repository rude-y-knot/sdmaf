import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface ConsentCheckboxProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  theme?: 'light' | 'dark';
  onOpenPrivacy?: () => void;
  onOpenOffer?: () => void;
  showOffer?: boolean;
}

export const ConsentCheckbox: React.FC<ConsentCheckboxProps> = ({
  id = 'consent-checkbox',
  checked,
  onChange,
  required = true,
  theme = 'light',
  onOpenPrivacy,
  onOpenOffer,
  showOffer = false,
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="flex items-start gap-2.5 pt-1 text-left select-none">
      <div className="flex items-center h-4 mt-0.5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          required={required}
          onChange={(e) => onChange(e.target.checked)}
          className={`w-3.5 h-3.5 rounded-none cursor-pointer accent-black transition-all ${
            isDark 
              ? 'border-neutral-700 bg-neutral-900 text-white focus:ring-neutral-400' 
              : 'border-neutral-300 bg-white text-black focus:ring-black'
          }`}
        />
      </div>
      <label 
        htmlFor={id} 
        className={`text-[11px] leading-snug cursor-pointer font-light ${
          isDark ? 'text-neutral-400' : 'text-neutral-600'
        }`}
      >
        <span>Я соглашаюсь на обработку персональных данных в соответствии с </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onOpenPrivacy) {
              onOpenPrivacy();
            }
          }}
          className={`underline cursor-pointer font-normal hover:opacity-80 transition-opacity ${
            isDark ? 'text-neutral-200' : 'text-neutral-900'
          }`}
        >
          Политикой конфиденциальности (152-ФЗ)
        </button>
        {showOffer && onOpenOffer && (
          <>
            <span> и принимаю условия </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenOffer();
              }}
              className={`underline cursor-pointer font-normal hover:opacity-80 transition-opacity ${
                isDark ? 'text-neutral-200' : 'text-neutral-900'
              }`}
            >
              Публичной оферты
            </button>
          </>
        )}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    </div>
  );
};
