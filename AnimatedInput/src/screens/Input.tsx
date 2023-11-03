import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  KeyboardType,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './styles';

type IProps = {
  value: string;
  label: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  showFocus?: boolean;
  hideLabelOnFocus?: boolean;
  inputColor?: string;
  blurInputColor?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  keyboardType?: KeyboardType;
  inputMaxLength?: number;
};

const Input: React.FC<IProps> = ({
  value,
  label,
  onChange,
  disabled,
  showFocus,
  hideLabelOnFocus,
  inputColor,
  blurInputColor,
  onBlur,
  onFocus,
  keyboardType,
  inputMaxLength,
}) => {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showFocus) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setIsFocused(true);
    }
  }, [showFocus]);

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: !hideLabelOnFocus ? 150 : 0,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, hideLabelOnFocus, isFocused, value]);

  const onFocusHandler = useCallback(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const labelAnimation = [
    {
      scale: focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, hideLabelOnFocus ? 0 : 0.75],
      }),
    },
    {
      translateY: focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [20, -12],
      }),
    },
    {
      translateX: focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [10, -10],
      }),
    },
  ];

  const disableColor = 'rgba(2, 6, 12, 0.30)';
  const disableInputBorderColor = '#E2E2E7';
  const focusColor = 'purple';

  const color = disabled
    ? disableInputBorderColor
    : isFocused
    ? inputColor || focusColor
    : blurInputColor || disableInputBorderColor;
  const inputTextColor = disabled ? disableColor : 'rgba(2, 6, 12, 0.92)';
  const labelTextColor = disabled
    ? disableColor
    : isFocused
    ? focusColor
    : 'rgba(2, 6, 12, 0.60)';

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: color,
            color: inputTextColor,
          },
        ]}
        ref={inputRef}
        value={value}
        onChangeText={onChange}
        onBlur={() => {
          setIsFocused(false);
          onBlur && onBlur();
        }}
        onFocus={() => {
          setIsFocused(true);
          onFocus && onFocus();
        }}
        editable={!disabled}
        keyboardType={keyboardType}
        maxLength={inputMaxLength}
      />
      <TouchableWithoutFeedback onPress={onFocusHandler}>
        <Animated.View
          style={[
            styles.labelContainer,
            {
              transform: labelAnimation,
            },
          ]}>
          <Text
            style={[
              styles.label,
              {
                color: labelTextColor,
              },
            ]}>
            {label}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Input;
