import React, {useState} from 'react';
import KeyboardAvoidWrapper from '../components/KeyboardAvoidWrapper';
import {
  BottomHalf,
  ButtonText,
  Colors,
  EmphasizeText,
  IconBg,
  InfoText,
  PageTitle,
  StyledButton,
  StyledContainer,
  TopHalf,
} from '../styles/style';
import {StatusBar, StyleSheet, ActivityIndicator} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CodeInput from '../components/CodeInputField';

const OtpScreen = () => {
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const MAX_CODE_LENGTH = 4;

  const submitOTPVerification = async () => {
    setVerifying(true);
    setTimeout(() => setVerifying(false), 500);
  };

  return (
    <KeyboardAvoidWrapper>
      <StyledContainer style={styles.container}>
        <TopHalf>
          <IconBg>
            <StatusBar barStyle={'light-content'} backgroundColor="black" />
            <Octicons name="lock" size={125} color={Colors.brand} />
          </IconBg>
        </TopHalf>
        <BottomHalf>
          <PageTitle style={styles.title}>Account Verification</PageTitle>
          <InfoText>
            Please enter the 4-digit code sent to{' '}
            <EmphasizeText>testmail@gmail.com</EmphasizeText>
          </InfoText>

          <CodeInput
            setPinReady={setPinReady}
            code={code}
            setCode={setCode}
            maxLength={MAX_CODE_LENGTH}
          />
          {!verifying && pinReady && (
            <StyledButton style={styles.button} onPress={submitOTPVerification}>
              <ButtonText>Verify </ButtonText>
              <Ionicons
                name="checkmark-circle"
                size={25}
                color={Colors.primary}
              />
            </StyledButton>
          )}
          {!verifying && !pinReady && (
            <StyledButton
              disabled={true}
              style={styles.buttonDisable}
              onPress={submitOTPVerification}>
              <ButtonText style={styles.buttonTextDisable}>Verify </ButtonText>
              <Ionicons name="checkmark-circle" size={25} color={Colors.gray} />
            </StyledButton>
          )}
          {verifying && (
            <StyledButton style={styles.button} onPress={submitOTPVerification}>
              <ActivityIndicator size={'large'} color={Colors.primary} />
            </StyledButton>
          )}
        </BottomHalf>
      </StyledContainer>
    </KeyboardAvoidWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
  },
  button: {
    backgroundColor: Colors.green,
    flexDirection: 'row',
  },
  buttonDisable: {
    backgroundColor: Colors.lightGreen,
    flexDirection: 'row',
  },
  buttonTextDisable: {
    color: Colors.gray,
  },
});

export default OtpScreen;
