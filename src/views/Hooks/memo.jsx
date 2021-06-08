import React, {
  // useMemo,
  useCallback,
} from 'react';
import { WhiteSpace } from 'antd-mobile';
let Counter = ({ value, children, onClick }) => {
  console.log('Render: ', children);

  return (
    <div onClick={onClick}>
      {children}: {value}
    </div>
  );
};
Counter = React.memo(Counter); // 将组件 缓存  只有绑定该组件的值发生变化时 组件才更新

const App = () => {
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  const increaseCounter1 = useCallback(() => {
    setCount1((count1) => count1 + 1);
  }, []);
  const increaseCounter2 = useCallback(() => {
    setCount2((count2) => count2 + 1);
  }, []);
  // console.log(increaseCounter1);

  return (
    <div>
      <Counter value={count1} onClick={increaseCounter1}>
        Counter 1
      </Counter>
      <WhiteSpace size="xs" />
      <Counter value={count2} onClick={increaseCounter2}>
        Coutner 2
      </Counter>
    </div>
  );
};

export default App;
