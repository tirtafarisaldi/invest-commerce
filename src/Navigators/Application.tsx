import React, {createRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigate, navigationRef} from './utils';
import {AuthorizedScreen, UnauthorizedScreen, LoginOptional} from './config';
import {useDispatch, useSelector} from 'react-redux';
import {setNavigationState} from '@Actions/main';
import SplashScreen from 'react-native-splash-screen';
import {SplashScreen as SplashScreenVideo} from '@Container/SplashScreen';
import {AppState, Linking} from 'react-native';
import URI from 'urijs';
import Toast, {ToastProvider} from 'react-native-toast-notifications';
import {Toast as CustomToast} from '@Molecule/Toast';
import ToastContainer from 'react-native-toast-notifications/lib/typescript/toast-container';

const Stack = createStackNavigator();
export const toastProviderRef = createRef<ToastContainer>();

const ApplicationNavigator = () => {
  const isLoggedIn = useSelector(
    ({auth}: {auth: any}): boolean => auth.isLogin,
  );
  const dispatch = useDispatch();
  const appState = React.useRef(AppState.currentState);
  const deeplinkUrlOpened = React.useRef('');

  const [isLoading, setIsLoading] = React.useState(true);
  const [showSplashScreenVideo, setShowSplashScreenVideo] =
    React.useState(false);

  const _onNavigationStateChanges = (navState: any) => {
    if (navState.hasOwnProperty('index')) {
      dispatch(setNavigationState(navState));
    }
    return;
  };

  React.useEffect(() => {
    const initializer = async () => {
      setIsLoading(true);
      // …do multiple sync or async tasks
      setIsLoading(false);
    };

    initializer().finally(async () => {
      setShowSplashScreenVideo(!isLoggedIn && !(await Linking.getInitialURL()));
      SplashScreen.hide();
    });
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        if (appState.current !== 'active' && nextAppState === 'active') {
          handleDeepLink();
        }
        appState.current = nextAppState;
      },
    );

    return () => {
      appStateListener.remove();
    };
  }, []);

  if (showSplashScreenVideo) {
    return <SplashScreenVideo onEnd={() => setShowSplashScreenVideo(false)} />;
  }

  return (
    // <ToastProvider ref renderToast={props => <Toast {...props} />}>
    <NavigationContainer
      // TODO: implement general deeplinking
      ref={navigationRef}>
      {/* <StatusBar /> */}
      <Stack.Navigator
        screenListeners={{
          state: (e: any) => {
            _onNavigationStateChanges(e.data?.state);
          },
        }}
        screenOptions={{
          keyboardHandlingEnabled: true,
          title: '',
          headerTitle: '',
        }}
        initialRouteName={isLoggedIn ? 'HomeScreen' : 'OnboardingScreen'}>
        {isLoggedIn ? (
          <Stack.Group>
            {LoginOptional.map((i, idx): JSX.Element => {
              return (
                <Stack.Screen
                  key={idx}
                  name={i.name}
                  component={i.component}
                  options={i.options}
                />
              );
            })}
            {AuthorizedScreen.map((i, idx): JSX.Element => {
              return (
                <Stack.Screen
                  key={idx}
                  name={i.name}
                  component={i.component}
                  options={i.options}
                />
              );
            })}
          </Stack.Group>
        ) : (
          <Stack.Group>
            {UnauthorizedScreen.map((i, idx): JSX.Element => {
              return (
                <Stack.Screen
                  key={idx}
                  name={i.name}
                  component={i.component}
                  options={i.options}
                />
              );
            })}
            {LoginOptional.map((i, idx): JSX.Element => {
              return (
                <Stack.Screen
                  key={idx}
                  name={i.name}
                  component={i.component}
                  options={i.options}
                />
              );
            })}
          </Stack.Group>
        )}
      </Stack.Navigator>
      <Toast
        ref={toastProviderRef}
        renderToast={props => <CustomToast {...props} />}
      />
    </NavigationContainer>
    // </ToastProvider>
  );

  async function handleDeepLink() {
    const deeplinkUrl = await Linking.getInitialURL();

    if (!deeplinkUrl || deeplinkUrl === deeplinkUrlOpened.current) {
      // setShowSplashScreenVideo(!isLoggedIn);
      return;
    }

    const url = URI(deeplinkUrl);
    const key = url.protocol() === 'https' ? url.segment(0) : url.hostname();
    const queries = url.search(true);

    // console.log('q', queries, key);

    switch (key) {
      case 'resetpassword':
        navigate('ForgotPasswordScreen', {step: 3, ...queries});
        break;
    }
    deeplinkUrlOpened.current = deeplinkUrl;
  }
};

export default ApplicationNavigator;
