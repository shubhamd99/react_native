import React, {useState} from 'react';
import {storiesOf} from '@storybook/react-native';

import CodeInputField from './CodeInputField';

export default {
  title: 'CodeInputField',
  component: CodeInputField,
};

storiesOf('CodeInputField', module).add('Default', () => {
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);

  const MAX_CODE_LENGTH = 4;

  return (
    <CodeInputField
      setPinReady={setPinReady}
      code={code}
      setCode={setCode}
      maxLength={MAX_CODE_LENGTH}
    />
  );
});
