import React, {
  // useEffect,
  useState,
  useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';


import { List, InputItem, Toast, Button } from 'antd-mobile';
// import { useDispatch, useSelector } from 'react-redux';
import './index.less';


const Login = () => {
  //  路由 history
  const history = useHistory();
  //  全局 状态 token信息
  // const globalState = useSelector((state) => state.global);
  // dispatch
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const { token } = globalState;
  //   if (token && token.access_token) {
  //     history.push('/');
  //   }
  // }, [globalState, history]);

  const [form, setForm] = useState({ tel: '', password: '' });

  const errTel = useCallback(() => {
    Toast.fail('errTel');
  }, []);
  const errPassword = useCallback(() => {
    Toast.fail('errPassword');
  }, []);

  const [hasError, setHasError] = useState(false);

  const change = useCallback((value) => {
    if (value.replace(/\s/g, '').length < 11) {
      setHasError(true);
    } else {
      setHasError(false);
    }
    setForm({ ...form, tel: value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = useCallback(() => {
    console.log(form);
    console.log(history);
    history.push('/home');
  }, [form, history]);

  return (
    <div className="login center-y">
      <List>
        <List.Item>
          <div className="center">系统</div>
        </List.Item>
        <InputItem
          type="phone"
          placeholder="input your phone"
          error={hasError}
          onErrorClick={errTel}
          onChange={change}
          value={form.tel}
        >
          手机号码
        </InputItem>
        <InputItem
          type="password"
          placeholder="input your password"
          error={hasError}
          onErrorClick={errPassword}
          onChange={(value) => setForm({ ...form, password: value })}
          value={form.password}
        >
          密码
        </InputItem>
        <List.Item>
          <Button type="primary" onClick={submit}>
            登录
          </Button>
        </List.Item>
      </List>
    </div>
  );
};

export default Login;
