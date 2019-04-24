노트:
•자바스크립트는 그 이름에서 알 수 있듯이 자바 프로그램 언어의 기본적인 문법의 영향을 받음
    •ECMA International에서 자바스크립트 표준을 관리함
•코드탄생 목적은 웹페이지를 동적으로 프로그래밍적으로 제어가기 위해서 고안됨
•하지만 현재 웹페이지를 동적으로 제어하는 것 뿐 아니라 다양한 용도로 이용되고 있음
    •예) node.js 서버측에서 실행되는 자바스크립트, node.js를 사용하는 자바스크립트와 유사한 언어로 PHP가 있음
•호스트 환경 필요, 이 때 호스트 환경이란 자바스크립트가 구동되는 환경을 의미함
    •예) 웹브라우저, node.js 둘다 자바스크립트가 실행되기 위한 호스트 환경임
•크롬의 경우 Ctrl+Shift+j 를 누르면 자바스크립트 오류로그를 볼 수 있는 창을 열 수 있음
•V8 엔진은 구글이 만들었으며 오픈소스이고 C++로 제작되었음
    •현재 구글의 V8이 가장 많이 사용되는 자바스크립트 엔진
    •구글 크롬에서 사용 중, MS Edge도 V8을 사용할 예정이라고 함
    •node.js의 런타임으로 사용됨
•자바스크립트 IDE: Visual Studio Code 추천
    •Microsoft Open Source IDE Project + 웹으로 개발됨 (크롬기반)
    •eg. Help → Toggle Developer Tools (크롬과 동일한 개발자환경 볼 수 있음)

문법:
•자바스크립트에서는 큰따옴표나 작은따옴표가 붙지 않은 숫자는 숫자로 인식한다.
•JavaScript에서 변수는 var로 시작한다. var은 변수를 선언하겠다는 것을 의미한다.
•JavaScript에서는 세미콜론을 생략할 수 있는데, 이 경우 줄바꿈을 명령의 끝으로 간주하게 된다.
•===는 서로 같은 수를 표현하고 있더라도 데이터 형이 같은 경우에만 같다고 판단한다. ==의 경우 숫자 1과 문자 1을 같게 인식한다.
•while 루프, for 루프, break, continue 키워드 자바와 동일
•함수의 경우 함수 선언부와 함수 호출부의 선후관계 무시해도 됨, 즉 함수가 호출전 먼저 선언되어야 할 필요 없음
•같은 이름의 지역변수와 전역변수가 동시에 정의되어 있다면 지역변수가 우선
•var 키워드를 사용하지 않은 지역변수는 전역변수가 된다 (함수 내부에서 전역변수 변경가능)
•내부함수에서는 외부함수의 지역변수에 접근할 수 있음, 이 때 외부함수가 소멸된 이후에도 내부함수가 외부함수의 변수에 접근 할 수 있음
    •외부함수는 외부함수의 지역변수를 사용하는 내부함수가 소멸될 때까지 소멸되지 않는다.
•불가피하게 전역변수를 사용해야 하는 경우는 하나의 객체를 전역변수로 만들고 객체의 속성으로 변수를 관리하는 방법 추천
•함수도 객체다. function이라는 객체의 인스턴스다. 다시 말해서 일종의 값이다.
    •배열의 값으로, 다른 함수의 인자로, 그리고 리턴값으로 사용할 수도 있다.
•JavaScript는 기본적으로 Private한 속성을 지원하지 않는다.
•arguments는 함수안에서 사용할 수 있도록 그 이름이나 특성이 약속되어 있는 배열처럼 사용할 수 있는 객체의 인스턴스이다.
    •arguments[0]은 함수로 전달된 첫번째 인자를 알아낼 수 있다. 또 arguments.length를 이용해서 함수로 전달된 인자의 개수를 알아낼 수도 있다.
•위에서부터 아래로 파싱하면서 실행 (함수인 경우만 제외) 변수들을 사용하기 위해선 윗 줄에서 먼저 선언되어야 한다.

객체:
•JavaScript Object는 JSON(JavaScript Object Notation) 형식으로 이루어져 있다.
    •JSON can be loaded into a JavaScript object by using the JSON.parse() function.
•객체란 상태(state)와 행위(behave)로 이루어진 로직, 프로퍼티와 메소드를 그룹핑 한 것
•new Object() 생성한 객체내 변수에는 배열이나 맵(키:값) 또는 함수가 할당될 수 있다.
•복잡함 속에서 필요한 관점만을 추출하는 행위를 추상화라고 한다.
•객체 지향은 부품화의 정점이라고 할 수 있다.
•함수에 new를 붙이는 것을 통해서 객체(클래스)를 만들 수 있음, 자바스크립트는 Class도 function을 사용해서 만든다.
    •function을 사용한 Class를 만들기위한 함수는 일반함수와 구분하기 위해서 함수명 첫글자를 대문자로 표시
    •new를 안쓰면 그냥 함수를 호출한 것이고, new를 쓰면 그 함수를 객체의 생성자로서 호출한 것
•전역객체(Global object)는 특수한 객체다. 모든 객체는 이 전역객체의 프로퍼티다.
    •모든 전역변수와 함수도 전역객체(window)의 프로퍼티다.
    •웹브라우저에서 전역객체는 window 이지만 node.js 에서는 global 이다.
•함수를 호출했을 때 this는 전역객체인 window를 가리킨다.
    •객체의 소속인 메소드의 this는 그 객체를 가리킨다.
    •함수의 메소드인 apply, call을 이용하면 this의 값을 제어할 수 있다.
•prototype 키워드를 사용하여 상속 가능
    •객체 내 prototype 으로 정의된 프로퍼티 및 메소드를 새로운 객체가 prototype 으로 받아서 사용가능
•자바스크립트 내장 객체들, 이 객체들에 prototype을 사용하여 유용한 객체확장 가능
    •Object
    •Function
    •Array
    •String
    •Boolean
    •Number
    •Math
    •Date
    •RegExp
•참조(reference)를 통해 변수 b와 변수 a에 담긴 객체가 서로 같고 값을 공유할 수 있다.

데이터 타입:
•데이터의 형태, 객체와 객체가 아닌 것으로 나눌 수 있다.
•자바스크립트 원시 데이터 타입 (Primary Type), 이 외 모든 데이터 타입들은 객체다.
    •숫자
    •문자열
    •불리언(true/false)
    •null
    •undefined
•문자열의 경우 자바스크립트는 임시로 문자열 객체를 만들고 사용이 끝나면 제거한다.
•원시 데이터 타입을 객체지향적으로 제공해야 할때 레퍼객체(Wrapper Object)를 사용할 수 있다.
    •레퍼객체 예) String, Number, Boolean

모듈:
•코드를 여러개 파일들로 분리함으로써 재활용성 및 유지보수 향상
    •예) <script src="helloworld.js"></script>
•프로그램을 구성하는 작은 부품으로서의 로직
•라이브러리의 경우 로직을 재사용하기 편리하도록 잘 정리한 코드들의 집합

디버깅:
C:\>npm -g install weinre
C:\>weinre --boundHost -all- --httpPort 8080
    1.위 명령 실행 후 웹브라우저에서 "localhost:8080" 입력
    2.아래 코드를 디버깅 원하는 페이지(html 문서) 내 삽입
        <script src="http://localhost:8080/target/target-script-min.js#anonymous"></script>
    3.디버깅 원하는 페이지를 리로딩하고, Weinre 페이지(localhost:8080) 리로딩
    4.Weinre 페이지 내 debug client user interface: http://localhost:8080/client/#anonymous 클릭
    5.이제 디버깅 원하는 페이지를 크롬없이도 크롬 개발자 모드와 비슷하게 디버길 할 수 있음
◾Chrome Extension: https://www.getpostman.com/
    ◾유용한 RESTful API Tool: HTTP Request methods and JSON body support

크롬 설정:
기본 HTTPS 가 아닌 경우 GeoLocation(위치) 사용 서비스 기능 등 몇몇 사용자 정보를 사용하는 서비스를 사용 못하도록 막혀 있음
이를 테스트나 방화벽등으로 HTTPS를 사용하지 못할때 사용 할 수 있도록 하기 위해서 아래 설정변경 필요
크롬 URL 창에 다음 입력 → chrome://flags (엔터) → Search flags에서 "Unsafely treat" (엔터) → Insecure origins treated as secure 항목을 Disabled에서 Enabled로 변경
    1.GeoLocation 서비스 기능: 웹사이트 방문자의 위도와 경도 정보를 얻을 수 있음
    2.Network State 서비스 기능: 사용자의 네트워크 상태를 확인 할 수 있음
    3.Battery State 서비스 기능: 디바이스의 배터리 정보를 확인 할 수 있음
    4.Media Query 서비스 기능: 디바이스의 가로/세로 모드 및 해상도 정보를 얻을 수 있음
    5.Vibration API 서비스 기능: 모바일 기기에 Vibration 기능이 있는 경우 사용자에게 진동을 통한 알림을 줄 수 있음
    6.이 외 Timer, History API, Device Orientation Event 등의 서비스 기능들

Framework:
•Web Framework for Node.js: Express (Light-weight)
    a.#npm install
    b.#npm init ← index.js 파일이 기본 Main 파일
    c.#npm install express --save ← 폴더명이 Express와 동일하면 안됨
    d.#npm install serve-index --save ← 디렉토리내 파일들 목록 출력
    e.#node index.js
•View Framework: React (Heavy-weight)
    •페이스북이  2013년 5월 발표한 프레임워크, M(Model)-V(View)-C(Controller) 구조 중 View 영역에 집중
    •현재 글로벌하게 가장 많이 사용되고 있음 (전세계 탑2 내)
    •페이스북 웹페이지 및 모바일페이지에서 사용 및 인스타그램, 야후, 넷플릭스에서도 사용
    •Node.js 의 경우 프레임워크가 아니라 자바스크립트 엔진임(eg. 크롬 V8 자바스크립트 엔진)
    •버전 v15부터 IE8 이하 버전을 지원하지 않음
        •페이스북은 이 버전부터 Production 에서 사용해도 된다고 안정성을 약속함

참고자료:
•https://opentutorials.org/course/743
•http://expressjs.com/en/starter/installing.html
•https://velopert.com/594 ← Express
•https://velopert.com/436 ← MongoDB 실행: #mongod.exe --dbpath=".\data\db"
•리액트 튜토리얼:
    •https://pro-self-studier.tistory.com/19
    •https://velopert.com/775
•http://mdn.io
