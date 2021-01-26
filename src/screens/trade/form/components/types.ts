export interface HelpText {
  title: string;
  subtitle: string;
}

export interface TextInputProps {
  onChange(text: string): void;
  helpText?: HelpText;
  isMutable: boolean;
  isNumber?: boolean;
  value: any;
  label: string;
}
