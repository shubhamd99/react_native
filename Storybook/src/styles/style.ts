import styled from 'styled-components/native';

export const Constants = {
  statusBarHeight: 20,
};

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
  primary: '#ffffff',
  secondary: '#e5e7eb',
  tertiary: '#1f2937',
  darkLight: '#9ca3af',
  brand: '#6d28d9',
  green: '#10b981',
  red: '#ef4444',
  gray: '#6b7280',
  lightGreen: 'rgba(16, 185, 129, 0.1)',
};

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 30}px;
  background-color: ${Colors.primary};
`;

export const TopHalf = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

export const BottomHalf = styled.View`
  justify-content: space-around;
`;

export const IconBg = styled.View`
  width: 250px;
  height: 250px;
  border-radius: 250px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.lightGreen};
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${Colors.brand};
  padding: 10px;

  ${(props: any) => props.welcome && 'font-size: 35px'}
`;

export const InfoText = styled.Text`
  font-size: 15px;
  text-align: center;
  color: ${Colors.gray};
`;

export const EmphasizeText = styled.Text`
  font-weight: bold;
  font-style: italic;
`;

// Pin Input styles

export const CodeInputSection = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const HiddenTextInput = styled.TextInput`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
`;

export const CodeInputsContainer = styled.Pressable`
  width: 70%;
  flex-direction: row;
  justify-content: space-between;
`;

export const CodeInput = styled.View`
  border-color: ${Colors.lightGreen};
  min-width: 15%;
  border-width: 2px;
  border-radius: 5px;
  padding: 12px;
`;

export const CodeInputText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: ${Colors.brand};
`;

export const CodeInputFocused = styled(CodeInput)`
  border-color: ${Colors.green};
`;

// Buttons

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${Colors.brand};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 60px;

  ${(props: any) =>
    props.google === true &&
    `
      background-color: ${Colors.green};
      flex-direction: row;
      justify-content: center;
    `}
`;

export const ButtonText = styled.Text`
  color: ${Colors.primary};
  font-size: 16px;

  ${(props: any) =>
    props.google === true &&
    `
      padding-left: 25px;
    `}
`;
