import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

interface UploadImageProps {
  type?: string;
  name: string;
  placeholder: string;
  size?: 'large' | 'middle' | 'small';
  inputStyle?: React.CSSProperties;
}

const UploadImage = ({
  type,
  name,
  placeholder,
  size,
  inputStyle,
}: UploadImageProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { onChange } }) => (
        <Form.Item>
          <Input
            onChange={(e) => onChange(e.target.files?.[0])}
            type={type}
            placeholder={placeholder}
            aria-label={placeholder}
            size={size}
            style={inputStyle}
          />
        </Form.Item>
      )}
    />
  );
};

export default UploadImage;
