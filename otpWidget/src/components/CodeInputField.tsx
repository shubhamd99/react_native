import React, {useEffect, useRef, useState} from 'react';
import {
  CodeInput,
  CodeInputFocused,
  CodeInputSection,
  CodeInputText,
  CodeInputsContainer,
  HiddenTextInput,
} from '../styles/style';
import {TextInput} from 'react-native/types';

type IProps = {
  setPinReady: React.Dispatch<React.SetStateAction<boolean>>;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  maxLength: number;
};

const CodeInputBox: React.FC<IProps> = ({
  code,
  setCode,
  maxLength,
  setPinReady,
}) => {
  const codeDigitsArray = new Array(maxLength).fill(0);
  const textInputRef = useRef<TextInput>(null);

  const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);

  useEffect(() => {
    setPinReady(code.length === maxLength);
    return () => setPinReady(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code.length, maxLength]);

  const handleOnBlur = () => {
    setInputContainerIsFocused(false);
  };

  const handleOnPress = () => {
    setInputContainerIsFocused(true);
    textInputRef.current?.focus();
  };

  const toCodeDigitInput = (_value: number, index: number) => {
    const emptyInputChar = ' ';
    const digit = code[index] || emptyInputChar;

    const isCurrentDigit = index === code.length;
    const isLastDigit = index === maxLength - 1;
    const isCodeFull = code.length === maxLength;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const StyledCodeInput =
      inputContainerIsFocused && isDigitFocused ? CodeInputFocused : CodeInput;

    return (
      <StyledCodeInput key={index}>
        <CodeInputText>{digit}</CodeInputText>
      </StyledCodeInput>
    );
  };

  return (
    <CodeInputSection>
      <CodeInputsContainer onPress={handleOnPress}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </CodeInputsContainer>
      <HiddenTextInput
        ref={textInputRef}
        value={code}
        onChangeText={setCode}
        onSubmitEditing={handleOnBlur}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={maxLength}
      />
    </CodeInputSection>
  );
};

export default CodeInputBox;
