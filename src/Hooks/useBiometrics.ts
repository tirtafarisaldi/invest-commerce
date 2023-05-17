import {saveCredential} from '@Actions/biometrics';
import {useEffect, useState} from 'react';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/Redux/Reducers';
import {IBiometricsState} from 'src/Redux/Reducers/biometrics';

const rnBiometrics = new ReactNativeBiometrics();

const useBiometrics = () => {
  const dispatch = useDispatch();
  const {biometrics} = useSelector((state: RootState) => state);
  const [availableBiometry, setAvailableBiometry] = useState<
    'TouchID' | 'FaceID' | 'Biometrics' | 'none'
  >('none');
  const [isKeyExist, setIsKeyExist] = useState<boolean>(false);

  const registerBiometrics = (payload: Partial<IBiometricsState>) => {
    return new Promise((resolve, reject) => {
      rnBiometrics
        .createKeys()
        .then(res => {
          dispatch(saveCredential({...payload, publicKey: res.publicKey}));
          return res.publicKey;
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  };

  const verifyBiometrics = (
    credentialToGet: 'password' | 'pin',
  ): Promise<Partial<IBiometricsState>> => {
    return new Promise((resolve, reject) => {
      rnBiometrics
        .createSignature({
          promptMessage: 'Seeds Biometric Login',
          payload: 'Seeds',
        })
        .then(({success, signature}) => {
          if (success) {
            // signature can be verified with public key if later BE provides api
            let payload: Partial<IBiometricsState> = {
              phoneNumber: biometrics.phoneNumber,
            };
            payload[credentialToGet] = biometrics[credentialToGet];

            resolve(payload);
          }
        })
        .catch(err => reject(err));
    });
  };

  const deletePublicKey = async () => {
    try {
      const {keysDeleted} = await rnBiometrics.deleteKeys();

      if (!keysDeleted) return Promise.reject('No key to delete');
      return Promise.resolve('Key Deleted');
    } catch (error) {
      return Promise.reject(error);
      // TODO: handle error
    }
  };

  const _checkBiometrics = async () => {
    try {
      const {available, biometryType} = await rnBiometrics.isSensorAvailable();
      if (available && biometryType === BiometryTypes.TouchID) {
        setAvailableBiometry('TouchID');
      } else if (available && biometryType === BiometryTypes.FaceID) {
        setAvailableBiometry('FaceID');
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        setAvailableBiometry('Biometrics');
      } else {
        setAvailableBiometry('none');
      }
    } catch (error) {
      setAvailableBiometry('none');
    }
  };

  const _checkIfPublicKeyExist = async () => {
    const {keysExist} = await rnBiometrics.biometricKeysExist();
    if (keysExist) {
      setIsKeyExist(true);
    } else {
      setIsKeyExist(false);
    }
  };

  useEffect(() => {
    _checkBiometrics();
    _checkIfPublicKeyExist();
  }, []);

  return {
    availableBiometry,
    isKeyExist,
    registerBiometrics,
    verifyBiometrics,
    deletePublicKey,
  };
};

export default useBiometrics;
