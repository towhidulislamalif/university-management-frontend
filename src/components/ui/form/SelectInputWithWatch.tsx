import React, { useEffect, useCallback } from 'react';
import { Form, Select, Typography } from 'antd';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

interface SelectInputWithWatchProps {
  name: string;
  options?: Record<string, unknown>[];
  onValueChange: React.Dispatch<React.SetStateAction<string>>; // Specify the type for onValueChange
  mode?: 'multiple' | 'tags';
  placeholder: string;
  size?: 'large' | 'middle' | 'small';
  disabled?: boolean;
  inputStyle?: React.CSSProperties;
}

function SelectInputWithWatch({
  name,
  options = [],
  onValueChange,
  mode,
  placeholder,
  size = 'middle',
  disabled = false,
  inputStyle,
}: SelectInputWithWatchProps) {
  const { control } = useFormContext();
  const selectValue = useWatch({
    control,
    name,
  });

  // Memoize the onValueChange callback
  const memoizedOnValueChange = useCallback(
    (value: string) => {
      onValueChange(value);
    },
    [onValueChange]
  );

  useEffect(() => {
    memoizedOnValueChange(selectValue);
  }, [selectValue, memoizedOnValueChange]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          validateStatus={error?.message ? 'error' : 'success'}
          help={
            error?.message && (
              <Typography.Paragraph
                style={{
                  color: 'red',
                  fontSize: '12px',
                  fontWeight: '500',
                  margin: '3px 0',
                }}
              >
                {error.message}
              </Typography.Paragraph>
            )
          }
        >
          <Select
            options={options}
            mode={mode}
            size={size}
            placeholder={placeholder}
            aria-label={placeholder}
            disabled={disabled}
            style={inputStyle}
            {...field}
          />
        </Form.Item>
      )}
    />
  );
}

export default SelectInputWithWatch;
