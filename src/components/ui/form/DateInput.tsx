import React from 'react';
import { DatePicker, Form, Typography } from 'antd';
import { Controller } from 'react-hook-form';

interface DateInputProps {
  name: string;
  placeholder: string;
  size?: 'large' | 'middle' | 'small';
  inputStyle?: React.CSSProperties;
}

function DateInput({ name, placeholder, size, inputStyle }: DateInputProps) {
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
          <DatePicker
            placeholder={placeholder}
            aria-label={placeholder}
            size={size}
            style={inputStyle}
            {...field}
          />
        </Form.Item>
      )}
    />
  );
}

export default DateInput;
