import * as React from 'react';
import { Button, ButtonProps } from './button';
import { FaRegCopy } from 'react-icons/fa';

interface CopyButtonProps extends ButtonProps {
  text: string;
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ text, ...props }, ref) => {
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    };

    return (
      <Button ref={ref} {...props} onClick={handleCopy}>
        <FaRegCopy />
        {props.children}
      </Button>
    );
  }
);

CopyButton.displayName = 'CopyButton';

export default CopyButton;
