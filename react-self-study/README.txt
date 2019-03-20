https://pro-self-studier.tistory.com/128?category=658753

안녕하세요, 프로독학러 입니다.

이번 포스팅에서는 프론트앤드에 React.js 를 사용하고, 백앤드에는 Node.js(Express) 를 사용하는 프로젝트의 초기 설정법에 대해서 알아보도록하겠습니다.

사실 본 카테고리의 첫 번째 포스팅에서 리액트 환경을 설정하는 법에 대해 다뤄본 적이 있었는데요, 해당 포스팅에서는 프로젝트를 production 모드로 빌드하고 실제로 서비스하기위한 코드가 빠져있었습니다. (백앤드에 대한 설정도 빠져 있습니다)

따라서 새로운 프로젝트를 빠르게 만들어가면서 알아보도록 하겠습니다.

1. 프로젝트 디렉토리 생성

가장 먼저 해야할 작업은 프로젝트 디렉토리를 생성하는 것입니다.

명령창에서 mkdir 을 이용하여 새로운 디렉토리를 생성하고, cd 를 이용하여 해달 디렉토리에 접근하도록 하겠습니다.

*저는 e 드라이브에 scratch_start 라는 이름으로 프로젝트를 생성하도록 하겠습니다.

mkdir scratch_start

cd scratch_start

scratch_start 라는 디렉토리를 e 드라이브에 생성하고 scratch_start 디렉토리로 이동했습니다.

프로젝트 폴더를 생성했으므로 해당 디렉토리를 initialize 하도록 하겠습니다.

npm init -y

* -y 를 사용해서 디폴트 설정으로 프로젝트를 initialize 할 수 있습니다. (-y 를 사용하지 않고 스스로 설정하도 무방합니다)

2. 프로젝트에 기본적으로 사용되는 dependecies 설치

프로젝트를 initialize 했으므로, 이제 프로젝트에 필요한 로컬 dependencies 를 설치해 주도록 하겠습니다.

npm i --save express react react-dom

위의 명령어를 통해 로컬 dependencies 를 설치합니다.

설치한 모듈은 다음과 같습니다.

express: Node.js 웹 프레임워크
react: javascript 라이브러리
react-dom: 리액트를 브라우저에 렌더링하기 위한 모듈

npm i -D babel-core babel-loader babel-plugin-transform-class-properties babel-preset-env babel-preset-react babel-preset-stage-2 clean-webpack-plugin concurrently css-loader style-loader html-webpack-plugin nodemon webpack webpack-cli webpack-dev-server

위의 명령어를 통해 devDependencies 를 설치합니다.

* -D 는 --save-dev 와 같습니다.

설치한 모듈은 다음과 같습니다.

babel-(***): 바벨은 모던 자바스크립트 문법을 지원하지 않는 브라우저에서 내용을 제대로 표기하기 위해 자동으로 해당 브라우저가 해석가능한 문법으로 변환시켜주는 모듈입니다.
* preset-stage-2 를 통해 실험적인 문법을 사용할 수 있습니다. (ex-리액트 컴포넌트 state 를 정의할 때 class 안에 state={...} 로 간단하게 정의 할 수 있음)
clean-webpack-plugin: 프로젝트를 배포하기 위해 build 할 때, 기존에 만들어져 있던 build 폴더를 삭제하고 새로 build 하도록 도와주는 모듈입니다. 이를 사용하지 않으면 build 를 여러번 했을 경우 코드가 꼬이는 현상이 발생할 수 있습니다.
concurrently: npm scripts 안에서 다른 스크립트를 사용할 수 있도록 하는 모듈입니다.
css-loader, style-loader: CSS 스타일을 프로젝트에서 불러와 사용할 수 있도록 하는 모듈입니다.
html-webpack-plugin: build 과정을 통해 html 파일로 번들링하는 모듈입니다.
nodemon: 서버측 코드의 변화가 있을 때 마다 서버를 자동으로 재시작해주는 모듈입니다.
webpack: entry 포인트를 기점으로 연결된 많은 파일들을 하나 또는 소수의 파일로 번들링해 주는 모듈 번들러입니다.
webpack-cli: webpack 에 관한 설정을 설정파일(webpack.config.js)을 통해 적용할 수 있도록 하는 모듈입니다.
webpack-dev-server: 웹팩의 개발전용 서버입니다.

3. babel 설정 파일 생성

babel 에 사용할 presets 를 적용하기 위해서 프로젝트의 루트 경로에 .babelrc 파일을 생성합니다.
(확장자명은 없습니다)

(./.babelrc)
{
    "presets": ["env", "react", "stage-2"]
}

위의 설정을 통해 babel 이 env, react, stage-2 의 프리셋을 적용합니다.

4. 디렉토리 구조 이해

이제 프로젝트를 위해 사용할 디렉토리를 생성해 보도록 하겠습니다.

프로젝트의 루트 디렉토리 안에 src 폴더를 생성하고 src 하위에 client, server 폴더를 각각 생성합니다.

client 폴더는 front-end 와 관련된 파일들이 위치하고, server 폴더에는 서버와 관련된 파일들이 위치할 것입니다.

그리고 루트 디렉토리에서 public 디렉토리를 생성한 뒤, 리액트가 렌더링할 대상인 index.html 파일을 만들어 줍니다.

파일의 내용은 아래와 같습니다.

(./public/index.html)
<!DOCTYPE html>
<html>
 
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>start_from_scratch</title>
</head>
 
<body>
    <div id="root"></div>
</body>
 
</html>

생성한 디렉토리 및 파일은 위 그림과 같습니다.

5. webpack 설정 파일 생성

webapack 이 참조할 설정 파일을 생성해 보도록 하겠습니다.

프로젝트의 루트 경로에 webpack.config.js 파일을 생성합니다.

(./webpack.config.js)
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
 
const outputDirectory = "dist";
 
module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};

코드의 8 번째 줄에서 번들링을 시작할 엔트리 포인트를 지정해 줍니다. 

여기서는 src/client/index.js 파일로 지정했습니다. 해당 파일부터 require, import 되는 파일들을 하나의 파일로 번들링합니다.

9 번째 줄은 번들링 되서 나오는 결과물에 대한 설정입니다.

output.path 는 번들링되는 파일이 위치할 디렉토리를 설정하는 것으로, 5번째 줄에서 정의한 dist 라는 이름을 가진 경로에 output 을 위치시키겠다는 설정입니다.

output.filename 은 번들링되서 나오는 결과물의 이름을 지정하는 설정입니다. 여기서는 bundle.js 로 지정했습니다.

13 번째 줄의module 설정은 어떤 로더를 사용하여 파일을 읽어오는지 설정하는 부분입니다. rules 의 첫 번째 아이템은 js 파일을 babel-loader 를 통해 읽어오겠다는 설정이며, 두 번째 아이템은 css 파일을 css-loader, style-loader 를 통해 읽어오겠다는 설정입니다.

28 번째 줄의 devServer 설정은 개발모드일 때 적용되는 설정으로, devServer.port 는 개발 포트를 지정하는 설정입니다.

devServer.open 은 bool 값으로, true 라면 개발 서버가 실행됐을 때 자동으로 브라우저를 열어 표시합니다.

devServer.proxy 설정은 개발서버에서 백앤드 API 의 서버 주소가 다를경우 사용하는 옵션입니다.

35 번째 줄의 plugins 는 webpack 의 추가적인 플러그인을 사용하도록 설정하는 부분입니다.

36 번째 줄에서는 clean-webpack-plugin 을 사용하여 build 시 기존에 있던 build 폴더를 삭제하고 새롭게 build 하도록 설정했고,

37 번째 줄에서는 html-webpack-plugin 을 사용하여 html 로 번들링하도록 설정했습니다.

* html-webpack-plugin 을 통해 페이지에 아이콘을 삽입하고 싶다면 

favicon: "./public/favicon.ico"

구문을 통해 삽입할 수 있습니다. (template 속성 이후에 , 하고 삽입)

6. nodemon 을 위한 설정 파일 생성

루트 디렉토리에 nodemon 을 위한 설정 파일, nodemon.json 파일을 생성합니다.

(./nodemon.json)
{
  "watch": ["src/server/"]
}

해당 코드는 src/server 하위에 있는 파일들을 감시하여 변화가 생길 시 서버를 재시작 하도록 하는 설정입니다.

7. 서버 측 Express 파일 작성

src/server 디렉토리에 index.js 파일을 생성하고 아래와 같이 코드를 작성합니다.

(./src/server/index.js)
const express = require("express");
 
const app = express();
 
app.use(express.static("dist"));
 
app.get("/api/getUsername", (req, res) =>
  res.send("Hi!")
);
app.listen(8080, () => console.log("Listening on port 8080!"));

코드의 5 번째 줄에서 번들링을 통해 생성된 dist 폴더의 파일들을 서비스하도록 설정했습니다.

* 개발 모드일 때는 정적으로 서비스하지 않고 클라이언트와 서버를 동시에 실행합니다.

7 번째 줄은 API 를 예시로 적은 것으로, 위와 같이 API 를 생성하면 됩니다.

10 번째 줄은 서버가 리스닝하는 포트입니다. 위의 코드에서는 8080 포트를 리스닝했습니다.

* proxy 와 연관

8. 클라이언트 측 코드 작성

가장 먼저 App 컴포넌트를 만들어 보겠습니다.

(./src/client/App.js)
import React, { Component } from 'react';
import './app.css';

class MyComponent extends Component {
    state={
      hi:"hello!"
    }
    render() {
        return(
            <div>
              <h1>{this.state.hi}</h1>
            </div>
        );
    }
}
 
export default MyComponent;

h1 태그를 이용하여 컴포넌트 state 의 내용을 렌더링하는 간단한 컴포넌트입니다.

h1 태그에 스타일을 주기 위해 app.css 파일을 생성합니다.

(./src/client/app.css)
h1 {
  color: green;
  text-align: center;
}

css 는 App 에서 import 해여 사용한 바 있습니다. (App.js 의 두 번째 줄에서 import)

App 컴포넌트를 이전에 생성한 public/index.html 에 렌더링하기 위한 파일을 생성하도록 하겠습니다.

(./src/client/index.js)
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
 
ReactDOM.render(<App />, document.getElementById('root'));

react-dom 을 이용해 public/index.html 의 root 라는 이름의 id 를 가진 태그 위치에 App 컴포넌트를 렌더링 했습니다.

9. npm script 수정

package.json 파일의 script 부분을 수정하여 명령창에서 개발서버를 실행시키거나 build 를 하거나 어플리케이션을 시작할 수 있도록 하겠습니다.

(./package.json)
...
  "scripts": {
    "start": "babel-node src/server/index.js",
    "build": "webpack --mode production",
    "client": "webpack-dev-server --mode development --devtool inline-source-map --hot",
    "server": "nodemon --exec babel-node src/server/index.js",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }
...

먼저 위의 코드의 5 번째 줄을 살펴보도록 하겠습니다.

5 번째 줄은 npm run client 의 명령어를 입력했을 때의 코드로, webpack dev-server 를 싱행하는 코드입니다. (--mode development)

6 번째 줄은 개발 모드일 때 서버를 실행시키는 코드로, nodemon 을 통해 파일변화가 일어나면 자동으로 서버를 재시작합니다.

7 번째 줄은 개발모드일 때 클라이언트측 개발서버를 실행하고, 서버를 실행하는 코드를 동시에 진행하는 스크립트입니다.

concurrently 모듈을 이용하여 npm run server 명령어와 npm run client 를 동시에 실행시키는 코드입니다.

이를 통해 개발모드일 때 npm run dev 를 통해 클라이언트와 서버를 같이 실행시킬 수 있습니다.

코드의 4 번째 줄은 배포모드로, 코드를 번들링하는 스크립트입니다. npm run build 명령어를 통해 모든 코드를 번들링하여 dist 파일에 번들링 된 파일들을 생성합니다.

3 번째 줄의 start 를 통해서 서버를 실행합니다. (서버측 코드에서 번들링된 html 파일을 정적으로 서비스하기 때문에 서버만 실행해도 정상적으로 클라이언트 컴포넌트들이 렌더링 됩니다)

이제 npm run dev 를 통해 개발서버를 실행해 보시고, 이상 없다면 npm run build, npm run start 를 통해 번들링, 시작 해 보세요.

어떤가요 제대로 작동하나요?

여기까지...

webpack4 를 이용하여 React, Node.js 를 사용하는 어플리케이션의 기본 설정을 진행해 보았습니다.

간단한 예제였지만 제대로 적용하기까지 꽤나 오랜시간이 걸렸습니다.

본 포스팅을 보는 여러분들은 시행착오 없이 즐거운 개발을 하시길 바라겠습니다.

* 위에서 진행한 예제의 코드는 github 에 올려두도록 하겠습니다. 참고바랍니다.

<https://github.com/2nnovate/start_from_scratch>

감사합니다.

**참고 자료 (항상 감사드립니다)

https://hackernoon.com/full-stack-web-application-using-react-node-js-express-and-webpack-97dbd5b9d708
