/* eslint-disable import/no-extraneous-dependencies */
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';

declare global {
  interface Console {
    tron: any;
  }
}

// eslint-disable-next-line import/no-mutable-exports
let reactotron;
if (__DEV__) {
  const { scriptURL } = NativeModules.SourceCode;
  const scriptHostname = scriptURL.split('://')[1].split(':')[0];

  reactotron = Reactotron.setAsyncStorageHandler!(AsyncStorage)
    .configure({ host: scriptHostname })
    .use(reactotronRedux())
    .useReactNative({
      networking: {
        ignoreUrls: /symbolicate/,
      },
    })
    .connect();

  console.tron = reactotron;

  reactotron.clear?.();
}
export { reactotron };
