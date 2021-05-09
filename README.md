### Instalação

1 - Clone o projeto

```
git clone <project_url>
```

2 - Entre na pasta do projeto

```
cd <project_folder>
```

3 - Instale as bibliotecas do projeto

```
npm install
```

4 - Instale as dependência do IOS

*certifique-se de está com a versão 1.10.0 do pod instalado na máquina*

```
cd ios && pod install

ou

./resetLibs.sh
```

## Rodar o Projeto

Na raiz do projeto

#### IOS

```
npm run ios
```

#### Android

```
npm run android
```

## Gerar o bundle React-Native

#### IOS

```
npm run bundle:ios
```

#### Android

```
npm run bundle:android
```

## Gerar APK (Android)

```
cd android
./gradlew clean
./gradlew assembleRelease
```

*O APK vai está na pasta `android/app/build/outputs/apk/release/app-release.apk`*

## Teste

Para executar os testes rode
```
npm run test
```

#### Versionamento e changelog

* ``npm run release``
