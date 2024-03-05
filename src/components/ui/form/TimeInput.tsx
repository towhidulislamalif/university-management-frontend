import React from 'react';
import { Form, TimePicker, Typography } from 'antd';
import { Controller } from 'react-hook-form';

interface TimeInputProps {
  name: string;
  format: string;
  placeholder: string;
  size?: 'large' | 'middle' | 'small';
  disabled?: boolean;
  inputStyle?: React.CSSProperties;
}

function TimeInput({
  name,
  format,
  placeholder,
  size,
  disabled,
  inputStyle,
}: TimeInputProps) {
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
          <TimePicker
            format={format}
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

export default TimeInput;
