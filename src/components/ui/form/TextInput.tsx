import { Form, Input, Typography } from 'antd';
import { Controller } from 'react-hook-form';

interface TextInputProps {
  type?: string;
  name: string;
  placeholder: string;
  size?: 'large' | 'middle' | 'small';
  inputStyle?: React.CSSProperties;
}

const TextInput = ({
  type,
  name,
  placeholder,
  size,
  inputStyle,
}: TextInputProps) => {
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
                  fontWeight: 500,
                  margin: '3px 0',
                }}
              >
                {error.message}
              </Typography.Paragraph>
            )
          }
        >
          <Input
            type={type}
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
};

export default TextInput;
