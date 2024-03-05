import React from 'react';
import { Form, Select, Typography } from 'antd';
import { Controller } from 'react-hook-form';

interface SelectInputProps {
  name: string;
  options?: Record<string, unknown>[] | undefined;
  mode?: 'multiple' | 'tags';
  placeholder: string;
  size?: 'large' | 'middle' | 'small';
  disabled?: boolean;
  inputStyle?: React.CSSProperties;
}

function SelectInput({
  name,
  options,
  mode,
  placeholder,
  size,
  disabled,
  inputStyle,
}: SelectInputProps) {
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

export default SelectInput;
