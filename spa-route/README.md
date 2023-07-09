# 원티드 7월 챌린지 과제

## 💻 **Redux 레포지토리에서 코드 분석하고 직접 scratch 작성해보기**

**1) 해당 주소로 진입했을 때 아래 주소에 맞는 페이지가 렌더링 되어야 한다.**

- `/` → `root` 페이지
- `/about` → `about` 페이지

**2) 버튼을 클릭하면 해당 페이지로, 뒤로 가기 버튼을 눌렀을 때 이전 페이지로 이동해야 한다.**

- 힌트) `window.onpopstate`, `window.location.pathname` History API(`pushState`)

**3) Router, Route 컴포넌트를 구현해야 하며, 형태는 아래와 같아야 한다.**

```tsx
ReactDOM.createRoot(container).render(
  <Router>
    <Route path="/" component={<Root />} />
    <Route path="/about" component={<About />} />
  </Router>
);
```

**4) 최소한의 push 기능을 가진 useRouter Hook을 작성한다.**

## 💁‍♂️ **과제 구현 설명**

### 1. Router

```js
const Router = ({ children }: RouteProps) => {
  const [pathName, setPathName] = useState(window.location.pathname);

  const changePath = (path: string) => {
    window.history.pushState({}, '', path);
    setPathName(path);
  };

  useEffect(() => {
    const popStateHandler = () => setPathName(window.location.pathname);

    window.addEventListener('popstate', popStateHandler);
    return () => {
      window.removeEventListener('popstate', popStateHandler);
    };
  }, []);

  return (
    <NavigationContext.Provider value={{ currentpath: pathName, changePath }}>
      {children}
    </NavigationContext.Provider>
  );
};
```

MPA 라우팅은 매번 경로가 바뀔 때마다, 네트워크 요청을 통해 새로운 HTML 파일을 서버로부터 받아오기 때문에 새로고침이 발생한다. SPA는 렌더링에 필요한 요소를 이미 받아온 상태이기 때문에 해당 경로에 따라 리렌더링을 시켜야 한다.

리액트는 props 또는 상태 변경 시 리렌더링이 발생하기 때문에, 현재 pathname을 상태로 관리하여 history 가 변경될 때 상태를 업데이트 하도록 구현하였다. 이를 위해 Context API를 활용해 하위에 상태를 공유하였다.

### 2. Routes

```js
const Routes = ({ children }: { children: ReactNode }) => {
  const { currentpath } = useContext(NavigationContext);

  const routeElements: ReactNode[] = Children.toArray(children).filter(
    (child) => {
      return (
        isValidElement < RouteProps > child && child.props.path === currentpath
      );
    }
  );

  return routeElements;
};
```

Routes 는 하위 children 중에서 현재 경로에 맞는 children 만 선택적 렌더링을 하기 위한 컴포넌트이다. 처음 구현 시, Route에서 경로에 맞지 않을 경우 null 을 return 하도록 하였지만, null을 리턴하는 것도 결국 컴포넌트가 mount 되어 useEffect 가 실행된다는 것을 알게 되었다.

만약 경로가 많아질 경우, 모든 Route들이 다시 그려져야 하기 때문에 성능상 불이익이 발생할 것이다. 이를 위해서 Routes 컴포넌트에서 실제 렌더링에 필요한 컴포넌트만 선별하도록 구현하였다.

### 3. Route

```js
const Route = ({ component }: RouteProps) => {
  return component;
};
```

### **App.tsx**

```js
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" component={<Home />} />
        <Route path="/about" component={<About />} />
      </Routes>
    </Router>
  );
}
```
