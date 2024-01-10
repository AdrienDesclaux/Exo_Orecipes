// == Import : npm
// == Import : local
import { ChangeEvent, useId } from 'react';
import './styles.scss';

interface FieldProps {
  value: string;
  type?: string;
  placeholder: string;
  onChange: (event: string) => void;
}
// == Composant
function Field({ value, type, placeholder, onChange }: FieldProps) {
  const inputId = useId();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <div className={value.length > 0 ? 'field field--has-content' : 'field'}>
      <input
        // React - state
        value={value}
        onChange={handleChange}
        // infos de base
        id={inputId}
        type={type}
        className="field-input"
        placeholder={placeholder}
      />

      <label htmlFor={inputId} className="field-label">
        {placeholder}
      </label>
    </div>
  );
}

// Valeurs par défaut pour les props
Field.defaultProps = {
  type: 'text',
};

// == Export
export default Field;
